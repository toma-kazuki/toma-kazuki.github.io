#!/usr/bin/env bash
# Export the slide deck (the slides in nav.js's SLIDES order) to PDF and
# PPTX: headless Chrome screenshots each slide at its native 1280x720, then
# export_build.py assembles the PNGs into one PDF and one PPTX.
#
# Requires: the slide server already running (see README.md), Google Chrome,
# and the repo's .venv with Pillow + python-pptx (pip install python-pptx —
# Pillow is already a matplotlib dependency).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8080}"
BASE_URL="http://127.0.0.1:${PORT}"
OUT_DIR="$HERE/export"
PNG_DIR="$OUT_DIR/pngs"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if ! curl -s -o /dev/null "$BASE_URL/index.html"; then
  echo "No server at $BASE_URL — start one first (see README.md), e.g.:" >&2
  echo "  cd $HERE && python3 -m http.server $PORT --bind 127.0.0.1 &" >&2
  exit 1
fi
if [ ! -x "$CHROME" ]; then
  echo "Google Chrome not found at: $CHROME" >&2
  echo "Edit this script's \$CHROME to point at your Chrome/Chromium binary." >&2
  exit 1
fi

rm -rf "$PNG_DIR"
mkdir -p "$PNG_DIR"

# Same order as nav.js's SLIDES array — keep the two in sync by hand.
SLIDES=(c01-title c02-motivation c03-objective c04-architecture c05-framework \
  c06-sandbox c07-studies c08-detection c09-diagnosis c10-recovery c11-synthesis \
  backup-index \
  01-title 02-introduction 03-objective 04-architecture 04b-demonstration \
  05-framework 06-hera 07-case-study-setup 08-playout 09-evaluation \
  10-results-overall 11-results-scenarios 12-recovery-method 13-recovery-playout \
  14-recovery-ordering 15-recovery-overall 16-recovery-scenarios 17-recovery-tree \
  18-lstm-model 19-lstm-cell 20-lstm-windows 21-lstm-norm 22-lstm-training \
  23-lstm-onset 24-lstm-playout 25-lstm-scenarios 26-lstm-noise-mc 27-lstm-reflection \
  28-discussion 29-conclusion 30-references 31-backup \
  b1-confidence-gate b2-validation-plan b3-results-example b4-decision-tree \
  b5-lstm-classifier-model b6-lstm-classifier-cell b7-lstm-classifier-windows \
  b8-lstm-classifier-norm b9-lstm-classifier-training b10-lstm-classifier-onset \
  b11-lstm-classifier-playout b12-lstm-classifier-scenarios b13-lstm-classifier-reflection)


i=0
for s in "${SLIDES[@]}"; do
  i=$((i + 1))
  n=$(printf "%02d" "$i")
  echo "Rendering $n: $s"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1280,720 \
    --virtual-time-budget=2000 \
    --screenshot="$PNG_DIR/${n}-${s}.png" \
    "$BASE_URL/${s}.html" 2>/dev/null
done

"$HERE/../.venv/bin/python" "$HERE/export_build.py" "$PNG_DIR" "$OUT_DIR"
