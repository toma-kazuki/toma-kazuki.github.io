# Published slide decks

Static HTML decks in `public/slides/`, copied as-is into the site build.

| Path | Source of truth | Live URL |
|------|-----------------|----------|
| `public/slides/habitat-dx/` | Local sibling repo `habitat-dx` → `slides/` | https://toma-kazuki.github.io/slides/habitat-dx/ |

## Viewing

Open the URL above (or `index.html` / `c01-title.html`). Use ← / → to navigate.

## Refreshing after you edit slides in habitat-dx

From this site repo:

```bash
./scripts/sync-habitat-dx-slides.sh
```

That script: rsync from `../habitat-dx/slides` → commit if needed → `git pull --rebase` → `git push`. The push rebuilds and deploys the site.

Do not edit HTML under `public/slides/habitat-dx/` by hand; change habitat-dx, then re-run the script.
