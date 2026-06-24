/** @module services/ollama
 * Service Ollama - Génération de scripts JavaScript
 */

const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

class OllamaService {
  constructor() {
    this.client = axios.create({
      baseURL: config.ollama.url,
      timeout: config.ollama.timeout,
      headers: {
        'Authorization': `Bearer ${config.ollama.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * @checkpoint Générer un script de remplissage
   * @param {Object} scrapedData - Données du scraping
   * @param {Object} userProfile - Profil du candidat
   * @returns {string} Script JavaScript généré
   */
  async generateScript(scrapedData, userProfile) {
    const prompt = this.buildPrompt(scrapedData, userProfile);

    try {
      logger.info('[Ollama] Génération script...');

      const response = await this.client.post('/api/generate', {
        model: config.ollama.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 2000
        }
      });

      const generatedText = response.data.response || response.data.text || '';
      
      // Nettoie le script
      const script = this.cleanScript(generatedText);
      
      logger.info(`[Ollama] Script généré: ${script.length} caractères`);
      
      return script;

    } catch (error) {
      logger.error('[Ollama] Erreur génération:', error.message);
      throw new Error('GENERATION_FAILED');
    }
  }

  /**
   * @checkpoint Construire le prompt
   */
  buildPrompt(scrapedData, userProfile) {
    const { metadata, formFields } = scrapedData;
    
    // Formate les champs du formulaire
    const fieldsDescription = formFields
      .map(f => `- ${f.tag}${f.type ? `[${f.type}]` : ''} name="${f.name || ''}" id="${f.id || ''}" placeholder="${f.placeholder || ''}"`)
      .join('\n');

    // Formate les compétences
    const skills = userProfile.skills ? userProfile.skills.join(', ') : '';
    
    // Génère une lettre de motivation basique si non fournie
    const defaultMotivation = `Passionné(e) par le développement web, je suis très intéressé(e) par le poste de ${metadata.title} chez ${metadata.company}. Mon expérience en ${skills} me permettra de contribuer efficacement à vos équipes.`;

    return `
Tu es un expert en manipulation DOM et automatisation web. Génère un script JavaScript qui remplit automatiquement un formulaire de candidature.

=== INFORMATIONS DE L'OFFRE ===
Titre: ${metadata.title || 'Non spécifié'}
Entreprise: ${metadata.company || 'Non spécifiée'}
URL: ${metadata.url}

=== CHAMPS DU FORMULAIRE ===
${fieldsDescription || 'Formulaire non détecté'}

=== PROFIL DU CANDIDAT ===
Prénom: ${userProfile.firstName || ''}
Nom: ${userProfile.lastName || ''}
Email: ${userProfile.email || ''}
Téléphone: ${userProfile.phone || ''}
LinkedIn: ${userProfile.linkedin || ''}
Portfolio: ${userProfile.portfolio || ''}
Compétences: ${skills}

CV (texte): ${userProfile.cvText ? userProfile.cvText.substring(0, 500) : 'Non fourni'}

Lettre de motivation: ${userProfile.motivationLetter || defaultMotivation}

=== INSTRUCTIONS POUR LE SCRIPT ===
1. Crée un IIFE (Immediately Invoked Function Expression)
2. Détecte le formulaire avec des sélecteurs robustes (querySelector avec fallbacks)
3. Pour chaque champ, utilise le sélecteur le plus approprié (name, id, ou placeholder)
4. Remplis avec les données du candidat:
   - firstName → prénom
   - lastName → nom
   - email → email
   - phone → téléphone
   - linkedin → LinkedIn
   - message/lettre → motivation
5. Simule les events 'input' et 'change' pour déclencher validations
6. Gère les cas où un champ n'existe pas (sans erreur)
7. Affiche "✅ Formulaire rempli avec succès" en console
8. Optionnellement clique sur le bouton submit si trouvé

=== FORMAT DE SORTIE ===
- Code JavaScript UNIQUEMENT
- Minifié sur une seule ligne (mais lisible si possible)
- PAS de markdown, PAS d'explication
- Prêt à copier-coller dans la console

=== EXEMPLE ===
(function(){const d={firstName:"${userProfile.firstName}",lastName:"${userProfile.lastName}",email:"${userProfile.email}"};const f=document.querySelector('form');if(!f){console.error('Formulaire non trouvé');return;}const fill=(s,v)=>{const el=f.querySelector(s);if(el){el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));}};fill('[name="firstName"]',d.firstName);console.log('✅ OK');})();

Génère maintenant le script:
`;
  }

  /**
   * @checkpoint Nettoyer le script généré
   */
  cleanScript(raw) {
    return raw
      // Enlève markdown
      .replace(/^```[\w]*\n?/gm, '')
      .replace(/\n?```$/gm, '')
      // Enlève commentaires d'explication
      .replace(/^(Voici|Here is|Script:|Le script:).*/gim, '')
      // Trim
      .trim();
  }

  /**
   * @checkpoint Générer avec retry
   */
  async generateWithRetry(scrapedData, userProfile, retries = 2) {
    for (let i = 0; i <= retries; i++) {
      try {
        return await this.generateScript(scrapedData, userProfile);
      } catch (error) {
        if (i === retries) throw error;
        
        logger.warn(`[Ollama] Retry ${i + 1}/${retries}`);
        await new Promise(r => setTimeout(r, 3000));
      }
    }
  }

  /**
   * @checkpoint Vérifier santé Ollama
   */
  async healthCheck() {
    try {
      const response = await this.client.get('/api/tags');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

module.exports = OllamaService;
