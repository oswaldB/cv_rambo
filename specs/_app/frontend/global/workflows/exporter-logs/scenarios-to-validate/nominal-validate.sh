#!/bin/bash
# Validation - 11 checkpoints
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/global/workflows/exporter-logs/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "settings-displayed" "$CODE_FILE" || exit 1
grep -q "export-button-visible" "$CODE_FILE" || exit 1
grep -q "export-triggered" "$CODE_FILE" || exit 1
grep -q "errors-fetched" "$CODE_FILE" || exit 1
grep -q "json-formatted" "$CODE_FILE" || exit 1
grep -q "blob-created" "$CODE_FILE" || exit 1
grep -q "filename-ready" "$CODE_FILE" || exit 1
grep -q "download-link-created" "$CODE_FILE" || exit 1
grep -q "download-triggered" "$CODE_FILE" || exit 1
grep -q "success-toast" "$CODE_FILE" || exit 1
grep -q "delete-option-ready" "$CODE_FILE" || exit 1

echo "=== ✅ exporter-logs: 11/11 OK ==="
