#!/usr/bin/env bash
# Publish this slides/ tree to toma-kazuki.github.io and push Pages.
set -euo pipefail
SITE="${SITE_REPO:-$(cd "$(dirname "$0")/../../toma-kazuki.github.io" && pwd)}"
export HABITAT_DX_SLIDES="$(cd "$(dirname "$0")" && pwd)"
exec "$SITE/scripts/sync-habitat-dx-slides.sh"
