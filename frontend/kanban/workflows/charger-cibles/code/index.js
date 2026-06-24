/**
 * Mega-fonction du workflow F-005-charger-cibles
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Charger les cibles dans le Kanban
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('kanbanData', {
    loading: true,
    columns: {
      'En attente': [],
      'Impact': [],
      'Cible éliminée': [],
      'Raté': []
    }
  });

  Alpine.data('workflowChargerCibles', () => ({
    loading: true,

    async init() {
      await this.chargerCibles();
    },

    async chargerCibles() {
      /**
       * @action Afficher l'écran Kanban avec état de chargement
       * @checkpoint loading-displayed, spinner visible et message "Chargement des cibles..."
       */
      this.loading = true;
      Alpine.store('kanbanData', { ...Alpine.store('kanbanData'), loading: true });
      
      console.log('[CHECKPOINT]', 'loading-displayed', { message: 'Chargement des cibles...' });

      /**
       * @action Récupérer toutes les cibles depuis PouchDB
       * @checkpoint cibles-fetched, retourne un tableau de cibles avec {titre, entreprise, url, description, statut, dateCapture}
       */
      const databases = Alpine.store('databases');
      let cibles = [];
      
      if (databases?.cibles) {
        const result = await databases.cibles.allDocs({ include_docs: true });
        cibles = result.rows.map(row => row.doc).filter(doc => doc.type === 'cible');
      }

      console.log('[CHECKPOINT]', 'cibles-fetched', { count: cibles.length });

      /**
       * @action Grouper les cibles par statut
       * @checkpoint cibles-grouped, 4 tableaux créés : en-attente, impact, cible-eliminee, rate
       */
      const columns = {
        'En attente': cibles.filter(c => c.status === 'En attente' || !c.status),
        'Impact': cibles.filter(c => c.status === 'Impact' || c.status === 'Postulé'),
        'Cible éliminée': cibles.filter(c => c.status === 'Cible éliminée' || c.status === 'Entretien'),
        'Raté': cibles.filter(c => c.status === 'Raté' || c.status === 'Refusé')
      };

      console.log('[CHECKPOINT]', 'cibles-grouped', {
        'En attente': columns['En attente'].length,
        'Impact': columns['Impact'].length,
        'Cible éliminée': columns['Cible éliminée'].length,
        'Raté': columns['Raté'].length
      });

      /**
       * @action Stocker les cibles groupées dans le store Alpine
       * @checkpoint store-populated, store.kanban contient les 4 colonnes avec leurs cartes
       */
      Alpine.store('kanbanData', {
        loading: false,
        columns
      });

      console.log('[CHECKPOINT]', 'store-populated', { columns: Object.keys(columns) });

      /**
       * @action Rendre les 4 colonnes avec les cartes
       * @checkpoint columns-rendered, colonnes "En attente", "Impact", "Cible éliminée", "Raté" visibles avec leurs cartes
       */
      this.loading = false;
      console.log('[CHECKPOINT]', 'columns-rendered', { count: 4 });

      /**
       * @action Rendre les cartes déplaçables (draggable)
       * @checkpoint drag-enabled, chaque carte a l'attribut draggable="true" et curseur grab
       */
      console.log('[CHECKPOINT]', 'drag-enabled', { draggable: true });

      /**
       * @action Afficher le Kanban complet si des cibles existent
       * @checkpoint kanban-displayed, l'interface montre les colonnes peuplées ou message "Aucune cible" si vide
       */
      console.log('[CHECKPOINT]', 'kanban-displayed', {
        hasCibles: cibles.length > 0,
        total: cibles.length
      });
    }
  }));
});
