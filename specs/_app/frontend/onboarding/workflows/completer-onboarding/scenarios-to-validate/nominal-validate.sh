#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/onboarding/workflows/completer-onboarding/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "completion-screen-displayed" "$CODE_FILE" || exit 1
grep -q "profile-summary-shown" "$CODE_FILE" || exit 1
grep -q "flag-created" "$CODE_FILE" || exit 1
grep -q "start-button-enabled" "$CODE_FILE" || exit 1
grep -q "settings-link-ready" "$CODE_FILE" || exit 1
grep -q "onboarding-closed" "$CODE_FILE" || exit 1
grep -q "app-unlocked" "$CODE_FILE" || exit 1
grep -q "shortcuts-saved" "$CODE_FILE" || exit 1

echo "=== ✅ completer-onboarding: 10/10 OK ==="
