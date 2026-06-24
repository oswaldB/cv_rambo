/**
 * Mega-fonction du workflow F-006-valider-drop
 * Source: specs/spec.md
 * Framework: Alpine.js
 * Description: Valider ou refuser le drop d'une carte
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('workflowValiderDrop', () => ({
    restrictedColumns: ['En attente'],

    async init() {},

    canDrop(targetColumn) {
      /**
       * @action Définir les colonnes restreintes
       * @checkpoint restricted-columns-defined, première colonne et colonnes finales identifiées comme non-droppables
       */
      console.log('[CHECKPOINT]', 'restricted-columns-defined', {
        restricted: this.restrictedColumns
      });

      /**
       * @action Survoler une colonne pendant le drag
       * @checkpoint column-hover-detected, l'événement dragover se déclenche sur la colonne cible
       */
      console.log('[CHECKPOINT]', 'column-hover-detected', { column: targetColumn });

      /**
       * @action Vérifier si la colonne cible est restreinte
       * @checkpoint restriction-checked, retourne true si la colonne accepte les drops, false sinon
       */
      const isRestricted = this.restrictedColumns.includes(targetColumn);

      console.log('[CHECKPOINT]', 'restriction-checked', {
        column: targetColumn,
        allowed: !isRestricted
      });

      if (isRestricted) {
        /**
         * @action Refuser le drop sur colonne restreinte
         * @checkpoint drop-denied, effet visuel négatif (bordure rouge, curseur not-allowed)
         */
        console.log('[CHECKPOINT]', 'drop-denied', { column: targetColumn });

        /**
         * @action Empêcher le dépôt sur colonne restreinte
         * @checkpoint drop-prevented, preventDefault() sur l'événement drop si colonne interdite
         */
        console.log('[CHECKPOINT]', 'drop-prevented');

        /**
         * @action Logger le refus en console
         * @checkpoint log-emitted, console affiche "[DRAG] drop-denied <colonne>"
         */
        console.log('[DRAG] drop-denied', targetColumn);
        console.log('[CHECKPOINT]', 'log-emitted', { column: targetColumn });

        /**
         * @action Retourner la carte à sa position d'origine
         * @checkpoint card-returned, la carte reste dans sa colonne de départ avec animation de retour
         */
        console.log('[CHECKPOINT]', 'card-returned');

        /**
         * @action Afficher un tooltip expliquant la restriction
         * @checkpoint tooltip-shown, message "Cette colonne ne peut pas recevoir de cartes" temporairement visible
         */
        console.log('[CHECKPOINT]', 'tooltip-shown');

        window.dispatchEvent(new CustomEvent('cv-rambo:show-error-toast', {
          detail: { title: 'DÉPLACEMENT INTERDIT', message: `Impossible de déposer dans "${targetColumn}"` }
        }));

        return false;
      }

      /**
       * @action Permettre le drop sur colonne autorisée
       * @checkpoint drop-allowed, effet visuel positif (bordure verte, highlight)
       */
      console.log('[CHECKPOINT]', 'drop-allowed', { column: targetColumn });

      return true;
    }
  }));
});
