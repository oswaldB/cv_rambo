# Dockerfile pour le workflow CV Rambo
FROM node:18-slim

# Dépendances système pour Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Variable d'environnement pour Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Crée répertoire app
WORKDIR /app

# Copie package.json
COPY package*.json ./

# Installe dépendances
RUN npm ci --only=production

# Copie code source
COPY . .

# Expose pas de port (connexion sortante uniquement)

# Démarrage
CMD ["node", "index.js"]
