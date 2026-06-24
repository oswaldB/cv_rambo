# CV Rambo - Frontend Makefile

.PHONY: help install dev test clean

PORT ?= 8080

help:
	@echo "🎨 CV Rambo Frontend - Commandes disponibles:"
	@echo ""
	@echo "  make install      Installer les dépendances"
	@echo "  make dev          Lancer en mode développement"
	@echo "  make start        Lancer le serveur (production)"
	@echo "  make test         Lancer les tests"
	@echo "  make clean        Nettoyer les dépendances"
	@echo ""

install:
	@echo "📦 Installation des dépendances..."
	@npm install
	@echo "✅ Dépendances installées"

dev:
	@echo "🚀 Démarrage mode développement..."
	@npm run dev

start:
	@echo "🚀 Démarrage serveur..."
	@npm start

test:
	@echo "🧪 Tests..."
	@cd tests && npm test

clean:
	@echo "🧹 Nettoyage..."
	@rm -rf node_modules
	@cd tests && rm -rf node_modules test-results playwright-report
	@echo "✅ Nettoyé"
