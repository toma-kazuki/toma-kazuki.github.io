#!/usr/bin/env bash
# Sync habitat-dx HTML slides into this site repo and push. The push triggers the site deploy.
# Usage:
#   ./scripts/sync-habitat-dx-slides.sh
# Optional:
#   HABITAT_DX_SLIDES=/path/to/habitat-dx/slides ./scripts/sync-habitat-dx-slides.sh
#   SYNC_NO_PUSH=1 ./scripts/sync-habitat-dx-slides.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${HABITAT_DX_SLIDES:-$HERE/../habitat-dx/slides}"
DEST="$HERE/public/slides/habitat-dx"
BRANCH="$(git -C "$HERE" rev-parse --abbrev-ref HEAD)"

if [[ ! -d "$SRC" ]]; then
  echo "Source not found: $SRC" >&2
  echo "Set HABITAT_DX_SLIDES to the habitat-dx slides/ directory." >&2
  exit 1
fi

cd "$HERE"

echo "==> Fetch origin"
git fetch origin

echo "==> Rsync $SRC → $DEST"
mkdir -p "$DEST"
rsync -a --delete \
  --exclude 'export/' \
  --exclude 'handoff/' \
  --exclude '__pycache__/' \
  --exclude '*.pyc' \
  --exclude '*.py' \
  --exclude '.DS_Store' \
  "$SRC"/ "$DEST"/

echo "==> Stage & commit"
git add public/slides/habitat-dx docs/slides.md scripts/sync-habitat-dx-slides.sh

if git diff --staged --quiet; then
  echo "No slide-related changes to commit."
else
  git commit -m "$(cat <<'MSG'
Publish habitat-dx HTML slides to GitHub Pages.

Sync the static deck into public/slides/habitat-dx; the site build serves it at /slides/habitat-dx/.
MSG
)"
fi

echo "==> Pull --rebase (autostash) then push"
git pull --rebase --autostash origin "$BRANCH"

if [[ "${SYNC_NO_PUSH:-}" == "1" ]]; then
  echo "SYNC_NO_PUSH=1 — skipping push."
  exit 0
fi

git push origin "$BRANCH"
echo "Done. Live after the deploy finishes: https://toma-kazuki.github.io/slides/habitat-dx/"
