#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/onboarding/workflows/importer-cv/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "first-launch-detected" "$CODE_FILE" || exit 1
grep -q "overlay-injected" "$CODE_FILE" || exit 1
grep -q "modal-blocking-active" "$CODE_FILE" || exit 1
grep -q "step-1-displayed" "$CODE_FILE" || exit 1
grep -q "file-upload-ready" "$CODE_FILE" || exit 1
grep -q "file-validated" "$CODE_FILE" || exit 1
grep -q "extraction-started" "$CODE_FILE" || exit 1
grep -q "manual-form-ready" "$CODE_FILE" || exit 1
grep -q "profile-saved" "$CODE_FILE" || exit 1
grep -q "step-2-triggered" "$CODE_FILE" || exit 1

echo "=== ✅ importer-cv: 11/11 OK ==="
