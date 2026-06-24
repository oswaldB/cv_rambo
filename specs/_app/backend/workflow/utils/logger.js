/** @module utils/logger
 * Logger simple pour le workflow
 */

const config = require('../config');

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLevel = LOG_LEVELS[config.logLevel] || 2;

function formatMessage(level, message, ...args) {
  const timestamp = new Date().toISOString();
  const extra = args.length > 0 ? ' ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${extra}`;
}

module.exports = {
  error: (msg, ...args) => {
    if (currentLevel >= LOG_LEVELS.error) {
      console.error(formatMessage('error', msg, ...args));
    }
  },
  
  warn: (msg, ...args) => {
    if (currentLevel >= LOG_LEVELS.warn) {
      console.warn(formatMessage('warn', msg, ...args));
    }
  },
  
  info: (msg, ...args) => {
    if (currentLevel >= LOG_LEVELS.info) {
      console.log(formatMessage('info', msg, ...args));
    }
  },
  
  debug: (msg, ...args) => {
    if (currentLevel >= LOG_LEVELS.debug) {
      console.log(formatMessage('debug', msg, ...args));
    }
  }
};
