# Published slide decks

Static HTML decks served by GitHub Pages (no build step).

| Path | Source of truth | Live URL |
|------|-----------------|----------|
| `habitat-dx/` | Local sibling repo `habitat-dx` → `slides/` | https://toma-kazuki.github.io/slides/habitat-dx/ |

## Viewing

Open the URL above (or `index.html` / `c01-title.html`). Use ← / → to navigate.

## Refreshing after you edit slides in habitat-dx

From this site repo:

```bash
./scripts/sync-habitat-dx-slides.sh
```

That script: `git pull --rebase` → rsync from `../habitat-dx/slides` → commit if needed → `git push`.

Do not edit HTML under `slides/habitat-dx/` by hand; change habitat-dx, then re-run the script.
