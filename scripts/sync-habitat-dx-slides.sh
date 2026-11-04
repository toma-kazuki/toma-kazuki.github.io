#!/usr/bin/env bash
# Sync habitat-dx HTML slides into this site repo and push to GitHub Pages.
# Usage:
#   ./scripts/sync-habitat-dx-slides.sh
# Optional:
#   HABITAT_DX_SLIDES=/path/to/habitat-dx/slides ./scripts/sync-habitat-dx-slides.sh
#   SYNC_NO_PUSH=1 ./scripts/sync-habitat-dx-slides.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${HABITAT_DX_SLIDES:-$HERE/../habitat-dx/slides}"
DEST="$HERE/slides/habitat-dx"
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

mkdir -p "$HERE/prototype/public/slides"
ln -sfn ../../../slides/habitat-dx "$HERE/prototype/public/slides/habitat-dx"

# GitHub Pages: skip Jekyll so HTML/assets under slides/ publish as-is
touch "$HERE/.nojekyll"

echo "==> Stage & commit"
git add slides/habitat-dx slides/README.md prototype/public/slides \
  scripts/sync-habitat-dx-slides.sh .nojekyll
git add research.html prototype/src/data/mock.ts \
  "prototype/src/pages/research/[slug].astro" \
  prototype/src/pages/publications.astro 2>/dev/null || true

git reset HEAD -- '*.DS_Store' 2>/dev/null || true

if git diff --staged --quiet; then
  echo "No slide-related changes to commit."
else
  git commit -m "$(cat <<'MSG'
Publish habitat-dx HTML slides to GitHub Pages.

Sync the static deck into slides/habitat-dx and keep research links pointed at /slides/habitat-dx/.
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
echo "Done. Live: https://toma-kazuki.github.io/slides/habitat-dx/"
