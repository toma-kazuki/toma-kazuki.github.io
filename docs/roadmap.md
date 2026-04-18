# Implementation Roadmap

## Overview

The redesign is broken into phases. Each phase delivers a working, deployable state.
Phase 1 is the complete rebuild; subsequent phases add features incrementally.

---

## Phase 1: Foundation & Core Pages (v1.0)

**Goal:** A fully functional, deployed site replacing the current one.

### 1.1 — Project Setup
- [ ] Initialize Astro project (`npm create astro@latest`)
- [ ] Install and configure Tailwind CSS (`@astrojs/tailwind`)
- [ ] Install `@fontsource` packages (Space Grotesk, Inter, JetBrains Mono, Noto Sans JP)
- [ ] Set up GitHub Actions for automated deploy to `gh-pages` branch
- [ ] Configure `astro.config.mjs` for GitHub Pages base path (`/`)
- [ ] Set up TypeScript strict mode
- [ ] Migrate `public/images/` from current site

### 1.2 — Design System Tokens
- [ ] Implement CSS custom properties (light/dark color tokens) in `global.css`
- [ ] Configure Tailwind to use CSS custom properties
- [ ] Implement dark mode toggle with `localStorage` persistence
- [ ] Implement anti-flash script in `<head>`

### 1.3 — Layout Components
- [ ] `BaseLayout.astro` (meta, OGP, lang attribute, theme script)
- [ ] `Header.astro` with sticky nav + theme/lang toggles
- [ ] `Footer.astro`
- [ ] Mobile hamburger menu + drawer

### 1.4 — Content Migration
- [ ] Migrate all publications to `src/data/publications.json`
- [ ] Migrate CV to `src/data/cv.yaml`
- [ ] Create 4 research project MDX files
- [ ] Set up `src/data/profile.ts`

### 1.5 — Core Pages (English)
- [ ] `/` — Home page with all sections
- [ ] `/cv` — Full CV page with print CSS
- [ ] `/research` — Projects & Experience cards with **multi-label filter** (client-side JS island)
- [ ] `/research/[slug]` — Individual project detail pages
- [ ] `/publications` — Filterable publications list
- [ ] `/timeline` — Visual vertical career timeline (see design-system.md for spec)
- [ ] `/blog` — Blog index
- [ ] Blog post template (`/blog/[slug].astro`)

### 1.6 — Japanese Pages
- [ ] `/ja` — Japanese home
- [ ] `/ja/about` — Japanese self-introduction
- [ ] `/ja/blog` — Japanese blog index
- [ ] Language toggle routing logic

### 1.7 — RSS & Search
- [ ] RSS feed for `/rss.xml` (blog EN) and `/ja/rss.xml` (blog JA)
- [ ] Integrate Pagefind for static site search
  - Add build script to run Pagefind after `astro build`
  - Search modal component triggered by search icon in nav

### 1.8 — Analytics
- [ ] Replace legacy `analytics.js` with GA4 (`gtag.js`)
- [ ] Respect `prefers-do-not-track` header (disable analytics if set)

### 1.9 — Quality Assurance
- [ ] Lighthouse audit ≥ 95 on Performance and Accessibility
- [ ] Test print/PDF on `/cv` page (Chrome print dialog)
- [ ] Test responsive layout at 375px, 768px, 1280px, 1440px
- [ ] Test dark/light mode on all pages
- [ ] Test language toggle on all pages
- [ ] Validate all external links work

**Estimated effort:** 2–3 sessions with Coding Agent

---

## Phase 2: Polish & Features (v1.1)

**Goal:** Enhance the experience and fill in content.

- [ ] Google Scholar integration
  - Client-side fetch from Semantic Scholar API (`api.semanticscholar.org`)
  - Display citation count on publication cards
  - Or: link directly to Scholar profile (simpler, no API needed)
- [ ] BibTeX copy button on publication entries
- [ ] CV timeline visualization (horizontal or vertical timeline component)
- [ ] Space Music Hall dedicated sub-page with rendered images and project story
- [ ] OGP image generation (static `og/*.png` per section)
- [ ] Sitemap generation (`@astrojs/sitemap`)
- [ ] `robots.txt`
- [ ] 404 page (custom, on-brand)

---

## Phase 3: Content Expansion (v1.2+)

**Goal:** Populate with ongoing content as career progresses.

- [ ] First English blog posts (tech notes from research)
- [ ] First Japanese blog posts
- [ ] Update Google Scholar ID once confirmed
- [ ] Add new publications as they're accepted
- [ ] Add CV sections: Mentorship, Academic Appointments (currently sparse)
- [ ] Japanese media coverage / interview links (if applicable)

---

## Technical Decisions Log

Decisions made during design phase that future-you should know about:

| Date | Decision | Rationale |
|------|----------|-----------|
| Apr 2026 | Astro over Next.js | Static-first, Markdown-native, GH Pages compatible |
| Apr 2026 | `publications.json` (not MDX) | Publications are structured data, not narrative content |
| Apr 2026 | Pagefind for search | Fully static, no server, runs at build time |
| Apr 2026 | `@fontsource` over Google Fonts | Bundled fonts, no external network dependency, privacy |
| Apr 2026 | CSS custom properties for theming | More flexible than Tailwind's `dark:` class variants alone |
| Apr 2026 | `/ja/*` prefix routing | Cleaner than query params; matches academic site conventions |
| Apr 2026 | Multi-label project taxonomy (not hard Research/Work split) | More accurate to reality; enables richer filtering |
| Apr 2026 | Timeline fades (not hides) filtered entries | Preserves visual density of the timeline; hiding creates gaps |
| Apr 2026 | Timeline filter uses URL query params | Shareable filtered views (e.g., `?labels=hardware,mission`) |

---

## Known TODOs (Content)

- [ ] Fill in Google Scholar ID in `profile.ts`
- [ ] Add PhD GPA when available
- [ ] Write narrative content for each research project MDX
- [ ] Write first blog posts (can be stubs initially)
- [ ] Decide on content for "Japanese Contents" section beyond blog and JA CV
- [ ] Decide if `/projects` and `/research` should be separate (academic research vs creative projects)
  - Current proposal: Yes, keep separate. Research = NASA-funded academic. Projects = Space Music Hall, etc.

---

## Dependencies

```json
{
  "dependencies": {
    "astro": "latest",
    "@astrojs/tailwind": "latest",
    "@astrojs/sitemap": "latest",
    "tailwindcss": "latest",
    "@fontsource/space-grotesk": "latest",
    "@fontsource/inter": "latest",
    "@fontsource/jetbrains-mono": "latest",
    "@fontsource/noto-sans-jp": "latest",
    "lucide-astro": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "pagefind": "latest"
  }
}
```

---

*See also: `../SPEC.md`, `architecture.md`, `design-system.md`, `content-strategy.md`*
