/** @module services/scraper
 * Service Puppeteer - Scraping des pages d'offres
 */

const puppeteer = require('puppeteer');
const config = require('../config');
const logger = require('../utils/logger');

class ScraperService {
  constructor() {
    this.browser = null;
  }

  /**
   * @checkpoint Initialiser Puppeteer
   */
  async init() {
    try {
      this.browser = await puppeteer.launch({
        headless: config.puppeteer.headless,
        args: config.puppeteer.args
      });

      logger.info('[Scraper] Puppeteer initialisé');
    } catch (error) {
      logger.error('[Scraper] Erreur initialisation:', error.message);
      throw error;
    }
  }

  /**
   * @checkpoint Scraper une URL
   * @param {string} url - URL de l'offre
   * @returns {Object} HTML et métadonnées extraites
   */
  async scrape(url) {
    let page = null;

    try {
      logger.info(`[Scraper] Scraping: ${url}`);

      page = await this.browser.newPage();

      // User agent réaliste
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      );

      // Navigation
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: config.puppeteer.timeout
      });

      // Attendre que le contenu soit chargé
      await page.waitForTimeout(2000);

      // Extraction HTML complet
      const html = await page.content();

      // Extraction métadonnées
      const metadata = await page.evaluate(() => {
        // Sélecteurs pour différents sites
        const titleSelectors = [
          'h1[data-testid="job-title"]',
          'h1.job-title',
          'h1',
          '[data-testid="job-title"]',
          '.job-title'
        ];

        const companySelectors = [
          '[data-testid="company-name"]',
          '.company-name',
          '.organization-name',
          'a[href*="company"]'
        ];

        const descSelectors = [
          '[data-testid="job-description"]',
          '.job-description',
          '.description',
          '[class*="description"]'
        ];

        const findText = (selectors) => {
          for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el) return el.innerText.trim();
          }
          return '';
        };

        return {
          title: findText(titleSelectors) || document.title,
          company: findText(companySelectors),
          description: findText(descSelectors).substring(0, 2000),
          url: window.location.href
        };
      });

      // Extraction formulaire (champs input, textarea)
      const formFields = await page.evaluate(() => {
        const fields = [];
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
          fields.push({
            tag: input.tagName.toLowerCase(),
            type: input.type,
            name: input.name,
            id: input.id,
            placeholder: input.placeholder,
            required: input.required,
            selector: input.name ? `[name="${input.name}"]` : 
                     input.id ? `#${input.id}` : 
                     input.placeholder ? `[placeholder*="${input.placeholder.substring(0, 20)}"]` : null
          });
        });

        return fields.filter(f => f.name || f.id).slice(0, 30); // Limite
      });

      await page.close();

      logger.info(`[Scraper] Succès: ${metadata.title || 'Titre inconnu'}`);

      return {
        html: html.substring(0, 50000), // Limite taille
        metadata,
        formFields,
        scrapedAt: new Date().toISOString()
      };

    } catch (error) {
      if (page) await page.close();
      
      logger.error(`[Scraper] Erreur scraping ${url}:`, error.message);
      
      // Détection type d'erreur
      if (error.message.includes('timeout')) {
        throw new Error('SCRAPE_TIMEOUT');
      }
      if (error.message.includes('404')) {
        throw new Error('PAGE_NOT_FOUND');
      }
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        throw new Error('ANTI_BOT_DETECTED');
      }
      
      throw error;
    }
  }

  /**
   * @checkpoint Scraper avec retry
   */
  async scrapeWithRetry(url, retries = 2) {
    for (let i = 0; i <= retries; i++) {
      try {
        return await this.scrape(url);
      } catch (error) {
        if (i === retries) throw error;
        
        logger.warn(`[Scraper] Retry ${i + 1}/${retries} pour ${url}`);
        await new Promise(r => setTimeout(r, 2000 * (i + 1)));
      }
    }
  }

  /**
   * @checkpoint Fermer proprement
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      logger.info('[Scraper] Navigateur fermé');
    }
  }
}

module.exports = ScraperService;
