#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../../../../../cv_rambo" && pwd)"
CODE_FILE="$PROJECT_ROOT/frontend/onboarding/workflows/verifier-extractions/code/index.js"

[ ! -f "$CODE_FILE" ] && echo "❌ Fichier manquant" && exit 1

grep -q "step-2-displayed" "$CODE_FILE" || exit 1
grep -q "name-editable" "$CODE_FILE" || exit 1
grep -q "email-editable" "$CODE_FILE" || exit 1
grep -q "experiences-editable" "$CODE_FILE" || exit 1
grep -q "competences-editable" "$CODE_FILE" || exit 1
grep -q "validation-passed" "$CODE_FILE" || exit 1
grep -q "profile-updated" "$CODE_FILE" || exit 1
grep -q "next-button-enabled" "$CODE_FILE" || exit 1
grep -q "step-3-triggered" "$CODE_FILE" || exit 1

echo "=== ✅ verifier-extractions: 10/10 OK ==="
