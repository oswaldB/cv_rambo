/**
 * Service de logging avec Winston
 */

const winston = require('winston');
const config = require('../../config');

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
      }
      return msg;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Créer le dossier logs si nécessaire
const fs = require('fs');
const path = require('path');
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

module.exports = logger;
