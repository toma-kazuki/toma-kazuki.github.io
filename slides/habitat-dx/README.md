# Running the slide deck

A plain static HTML deck (`index.html` + slide files + `detail/`), navigated with
`nav.js` (←/→ to move, ↑/↓ between recovery orderings on detail pages, O or Esc back).
No build step — serve over HTTP (not `file://`).

## Deck outline

| Slides | Content |
| --- | --- |
| `c01`–`c11` | **Conference main** (~12 min): intro→architecture→six-stage → HERA + study setup (legacy visuals) → packed detection/diagnosis/recovery → takeaways |
| `manuscript/` | Speaker notes per main slide (footer **notes** link; not in nav page count) |
| `backup-index` | Hyperlinked drawers into legacy detail |
| `01`–`31` | Legacy full research deck (unchanged content) |
| `b1`–`b4` | Backup: confidence gate, validation, example, decision tree |
| `b5`–`b13` | Backup: prior **LSTM classifier** (Stage-5 32-class) slides |
| `detail/*` | Per-(method × scenario) drill-downs linked from the matrices |

Conference example figures (one message each): `python slides/make_conference_figures.py` → `assets/conf_*.png`.

Recovery slides use the **timed-gate** (`delay_s=60`) priority runs under
`results/config_run/kg_priority*/` and `results/comparison/recovery/`. No-delay
counterparts live under `*_nodelay` / `recovery_nodelay/` for analysis but are
not wired into the deck by default.

## Launch it

From the repository root:

```bash
cd slides
python3 -m http.server 8080 --bind 127.0.0.1
```

Open **http://127.0.0.1:8080/** or **http://127.0.0.1:8080/c01-title.html**. `Ctrl+C` stops the server.

## Refreshing recovery slides from new runs

After re-running priority experiments and `experiment.recovery_compare` /
`experiment.decision_tree`:

```bash
# From repo root
PYTHONPATH=. .venv/bin/python slides/update_recovery_slides.py   # 15 + 16
PYTHONPATH=. .venv/bin/python slides/make_recovery_detail_slides.py  # detail pages + plot copy
```

Diagnosis detail pages: `make_detail_slides.py` (reads `results/comparison/confidence/`).
Figures helpers: `make_figures.py`.
LSTM detection Study C assets: `make_lstm_detector_slides.py` (Part B5 + `lstm_binary_open` + threshold compare).
Noise Monte Carlo (4 modes × 3 intensities × 32 × 10): `python -m experiment.lstm_binary_noise_mc` → `results/comparison/lstm_binary_noise_mc/`.
Prior classifier assets: `make_lstm_slides.py` (Stage-5 + `lstm_confidence/`) for backup slides `b5`–`b13`.

If you add/reorder/rename a main-deck slide, update the `SLIDES` array in both
`nav.js` and `export.sh`.

## Exporting to PDF / PPTX

With the server running:

```bash
cd slides
./export.sh            # or ./export.sh 9000
```

Writes `slides/export/habitat-dx-slides.pdf` and `.pptx` (gitignored). Image-based
full-bleed slides at 1280×720. Needs Chrome headless + `python-pptx` (Pillow already
in `requirements.txt`). See `export_build.py` for assembling PNGs by hand.
Export includes conference main **then** all backup/legacy slides in one file.
