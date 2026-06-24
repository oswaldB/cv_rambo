/**
 * Composant global: Toast Notifications
 * Système de notifications toast pour Alpine.js
 * Usage: window.toast.success('Message') ou window.toast.error('Message')
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('toastContainer', () => ({
    toasts: [],

    add(message, type = 'info', duration = 3000) {
      const id = Date.now() + Math.random();
      const toast = { id, message, type, showing: true };
      this.toasts.push(toast);

      if (duration > 0) {
        setTimeout(() => this.remove(id), duration);
      }

      console.log('[CHECKPOINT]', 'toast-displayed', { type, message });
    },

    remove(id) {
      const toast = this.toasts.find(t => t.id === id);
      if (toast) {
        toast.showing = false;
        setTimeout(() => {
          this.toasts = this.toasts.filter(t => t.id !== id);
        }, 300);
      }
    },

    success(message, duration) {
      this.add(message, 'success', duration);
    },

    error(message, duration) {
      this.add(message, 'error', duration);
    },

    warning(message, duration) {
      this.add(message, 'warning', duration);
    },

    info(message, duration) {
      this.add(message, 'info', duration);
    }
  }));

  // Exposer globalement
  window.toast = {
    success: (msg, dur) => {
      const container = document.querySelector('[x-data*="toastContainer"]')?.__x?.$data;
      container?.success(msg, dur);
    },
    error: (msg, dur) => {
      const container = document.querySelector('[x-data*="toastContainer"]')?.__x?.$data;
      container?.error(msg, dur);
    },
    warning: (msg, dur) => {
      const container = document.querySelector('[x-data*="toastContainer"]')?.__x?.$data;
      container?.warning(msg, dur);
    },
    info: (msg, dur) => {
      const container = document.querySelector('[x-data*="toastContainer"]')?.__x?.$data;
      container?.info(msg, dur);
    }
  };
});
