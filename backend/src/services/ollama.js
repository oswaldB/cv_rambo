/**
 * Service Ollama - Génération de scripts via IA locale
 */

const axios = require('axios');
const config = require('../../config');
const logger = require('./logger');

class OllamaService {
  constructor() {
    this.url = config.ollama.url;
    this.model = config.ollama.model;
  }

  async generateScript(cible, profil) {
    /**
     * @checkpoint ollama-generation-started
     */
    logger.info('[CHECKPOINT] ollama-generation-started', {
      cibleId: cible._id,
      url: cible.url
    });

    const prompt = this.buildPrompt(cible, profil);

    try {
      const response = await axios.post(`${this.url}/api/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 2000
        }
      }, {
        timeout: config.ollama.timeout
      });

      const script = response.data.response;

      logger.info('[CHECKPOINT] ollama-generation-completed', {
        cibleId: cible._id,
        scriptLength: script.length
      });

      return script;

    } catch (err) {
      logger.error('[CHECKPOINT] ollama-generation-error', {
        cibleId: cible._id,
        error: err.message
      });
      throw err;
    }
  }

  buildPrompt(cible, profil) {
    const siteType = cible.siteType || 'générique';
    const competences = profil?.competences || 'Non spécifié';
    const cvTexte = profil?.cvTexte || 'Non spécifié';
    const poste = cible.title || 'Poste non spécifié';

    return `Tu es un expert en automatisation de candidatures. Génère un script JavaScript pour remplir automatiquement un formulaire de candidature sur ${siteType}.

INFORMATIONS DU CANDIDAT:
- Prénom: ${profil?.prenom || 'John'}
- Nom: ${profil?.nom || 'Doe'}
- Email: ${profil?.email || 'john@example.com'}
- Téléphone: ${profil?.telephone || '+33 6 12 34 56 78'}
- LinkedIn: ${profil?.linkedin || 'https://linkedin.com/in/johndoe'}
- Compétences: ${competences}
- Poste visé: ${poste}

CV/Résumé:
${cvTexte}

INSTRUCTIONS:
1. Génère un script JavaScript IIFE (Immediately Invoked Function Expression)
2. Le script doit sélectionner les champs du formulaire via querySelector/querySelectorAll
3. Remplir automatiquement: prénom, nom, email, téléphone, LinkedIn
4. Si possible, uploader CV (simuler click sur input file si nécessaire)
5. Remplir le message de motivation personnalisé basé sur le poste et les compétences
6. Ajouter des commentaires expliquant chaque étape
7. Le script doit être prêt à être copié-collé dans la console du navigateur

Format de sortie: Uniquement le code JavaScript, sans explication markdown.`;
  }

  async checkHealth() {
    try {
      const response = await axios.get(`${this.url}/api/tags`, { timeout: 5000 });
      return {
        status: 'ok',
        models: response.data.models?.map(m => m.name) || []
      };
    } catch (err) {
      return {
        status: 'error',
        error: err.message
      };
    }
  }
}

module.exports = new OllamaService();
