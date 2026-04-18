# Kazuki Toma — Personal Website Redesign Spec

> This document serves as the central reference for the grand redesign of toma-kazuki.github.io.
> All implementation decisions should be traceable back to this spec.
> Keep this file updated as decisions evolve.

---

## Project Overview

A complete ground-up rebuild of Kazuki Toma's personal research website.
The old site was based on a Japanese HTML template ("Template Party") and has become outdated in structure, design, and maintainability.

**Goal:** A modern, maintainable, bilingual research website that reflects the full arc of Kazuki's work as a Human System Integration Engineer — from the origins of that identity in Space Music Hall, through nano-satellite hardware, to autonomous anomaly resolution for deep-space habitats.

---

## Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Astro** | Static output (GitHub Pages compatible), Markdown-native, zero JS by default, excellent DX |
| Styling | **Tailwind CSS** | Utility-first, consistent design tokens, purges unused CSS |
| Language | **TypeScript** | Type safety for content schemas and components |
| Content | **Markdown / MDX** | Human-readable, Coding-Agent-friendly, version-controllable |
| Deployment | **GitHub Pages** | Existing infrastructure, free, simple CI via GitHub Actions |

### Why Astro over Next.js

Next.js introduces SSR complexity (serverless functions, edge runtime) that is unnecessary for a personal site. Astro gives us:
- True static site generation (zero JS shipped unless needed)
- Native Markdown content collections with schema validation
- Better performance out of the box

---

## Design Concept: "Human System Integration"

The visual language is inspired by **Human-Systems Integration (HSI)** — the design discipline that bridges human cognition and engineered systems. This is not incidental: it mirrors Kazuki's research on autonomous anomaly resolution in space habitats.

### Core Visual Principles

1. **Sharp geometry** — Clean lines, precise grid, sharp typographic rhythm (like engineering diagrams or systems architecture schematics)
2. **Flexible composition** — Layouts adapt to content density; no rigid boxes (like how HSI adapts to human-machine interfaces)
3. **Space-awareness** — Subtle cosmic references without cliché; deep space palette in dark mode
4. **Legibility above all** — Academic content must be scannable; information hierarchy over decoration
5. **Human-centered thread** — Space Music Hall is not decoration; it is the origin point of Kazuki's HSI identity. Its presence signals that the engineering is always in service of people.

### Dark / Light Mode

Both modes are fully supported with a toggle. Dark mode is space-inspired; light mode is editorial/clean.

| | Light Mode | Dark Mode |
|-|------------|-----------|
| Background | `#FAFAF8` (warm white) | `#0D1117` (deep space navy) |
| Surface | `#F0EFE9` | `#161B22` |
| Text primary | `#1A1A1A` | `#E6EDF3` |
| Text secondary | `#555555` | `#8B949E` |
| Accent | `#1E40AF` (deep blue) | `#60A5FA` (electric blue) |
| Creative accent | `#92400E` / `#D97706` (amber) | `#FCD34D` (gold) |

The amber/gold accent is reserved for **human-centric design work** — content where the human experience is the primary design driver. Space Music Hall is the archetype of this: it is rigorous engineering (ECLSS, anthropometric design, systems engineering) _in service of human culture_. The amber signals "human at the center," not merely "creative."

### Typography

| Role | Font | Notes |
|------|------|-------|
| Headings | **Space Grotesk** | Technical, slightly futuristic, sharp |
| Body | **Inter** | Maximum legibility for academic text |
| Monospace | **JetBrains Mono** | Code, technical specs, CV dates |
| Japanese | **Noto Sans JP** | Harmonizes with Inter at matching weight |

Font loading: via `@fontsource` packages (npm, no external network dependency).

---

## Site Architecture

See `docs/architecture.md` for full detail.

### Pages

| Route | Title | Language |
|-------|-------|----------|
| `/` | Home | EN |
| `/cv` | CV / About | EN |
| `/research` | Research | EN |
| `/publications` | Publications | EN |
| `/projects` | Projects | EN |
| `/blog` | Blog | EN |
| `/blog/[slug]` | Blog Post | EN |
| `/timeline` | Career Timeline | EN |
| `/ja` | ホーム | JA |
| `/ja/about` | 自己紹介 | JA |
| `/ja/blog` | ブログ | JA |
| `/ja/blog/[slug]` | 記事 | JA |

### Navigation

A sticky top navigation bar with:
- Logo / name (left)
- Page links (center)
- Language toggle EN ↔ 日本語 + Dark/Light toggle (right)

Mobile: hamburger menu collapsing to a drawer.

---

## Content Management Strategy

See `docs/content-strategy.md` for schemas and file structure.

### Philosophy

All content lives as Markdown/MDX files in `src/content/`. The Coding Agent can update publications, add blog posts, or edit research project descriptions by editing these files — no HTML editing required.

### Content Collections

| Collection | Format | Path |
|------------|--------|------|
| Publications | `publications.json` | `src/data/publications.json` |
| Research projects | MDX | `src/content/research/` |
| Blog posts (EN) | MDX | `src/content/blog/` |
| Blog posts (JA) | MDX | `src/content/blog-ja/` |
| CV data | `cv.yaml` | `src/data/cv.yaml` |

---

## Feature Requirements

### Must Have (v1.0)
- [ ] Bilingual site (EN full, JA partial)
- [ ] Dark/Light mode toggle
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Publications list with filter by type (Journal / Conference / First Author / Co-Author)
- [ ] Project/Experience pages with **multi-label taxonomy + frontend filter** (see below)
- [ ] **Visual career timeline page** (`/timeline`) — see below
- [ ] CV page with print-to-PDF support
- [ ] Blog with categories (Technical Notes / Life Log)
- [ ] Google Analytics (GA4, replacing legacy `analytics.js`)
- [ ] OGP / SNS card meta tags

#### Project Multi-Label Taxonomy

Projects and experiences are no longer split into hard categories (Research vs. Work). Instead, each entry carries one or more labels from a controlled vocabulary:

| Label | Meaning |
|-------|---------|
| `research` | Academic research with a clear investigation question |
| `work` | Industry / institutional employment |
| `capstone` | Formal academic graduation project (B.S. or M.S.) |
| `hardware` | Hands-on hardware development (fabrication, test, operation) |
| `mission` | Involvement in an actual space mission |
| `systems-engineering` | SE process was a primary methodology |
| `human-factors` | Human-centered design / HSI was a primary methodology |
| `software` | Software development was a primary contribution |
| `collaboration` | Multi-institution or industry-academia collaboration |

The `/research` page (renamed to `/experience` or kept as `/research`) renders all projects as cards and provides filter buttons for each label. Multiple labels can be active simultaneously (AND or OR logic — to be decided; OR is more discoverable).

Example assignments:
- Space Music Hall: `capstone`, `systems-engineering`, `human-factors`
- Space Habitat Anomaly Diagnosis: `research`, `software`, `human-factors`, `collaboration`
- ArkEdge Space: `work`, `hardware`, `mission`
- EQUULEUS: `work`, `hardware`, `mission`
- LNSS: `research`, `systems-engineering`

#### Visual Career Timeline (`/timeline`)

A dedicated page with a **vertical timeline** as the primary visual element:

- Central vertical axis runs top (oldest) to bottom (newest)
- Each entry is a **node** on the axis at the correct time position
- From each node, an **annotation arm** extends left or right (alternating) containing:
  - Entry title
  - Representative image (project render, satellite photo, conference venue, etc.)
  - Duration badge
  - Label tags
  - Short description (1–2 lines)
- Entries can be filtered by label (same taxonomy as above) — inactive entries collapse or fade
- On mobile: single-column layout, all annotations on the right

This page is the most visually distinctive element of the site. It tells the full career story at a glance — from Space Music Hall (2021) through PhD research (ongoing).
- [ ] RSS feed for blog
- [ ] Site search (Pagefind — fully static, no server needed)

### Nice to Have (v1.x)
- [ ] Google Scholar auto-fetch (client-side via Scholar profile page or Semantic Scholar API)
- [ ] BibTeX copy button on publications
- [ ] Timeline visualization for CV
- [ ] Dedicated Space Music Hall project page with rendered images

### Out of Scope
- Server-side features (no database, no auth)
- CMS dashboard (Coding Agent + Markdown is sufficient)
- Comments system (not needed for academic site)

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Core Web Vitals (LCP) | < 2.5s |
| First meaningful paint | < 1.0s |
| Bundle size (JS) | < 50KB gzipped |

---

## Content to Migrate

The following content from the current site must be preserved in the new site:

- All publications (J1, C1–C10) from `publication.html`
- Full CV content from `index.html` (Education, Research Experience, Work Experience, Teaching, Fellowships, Skills)
- Mission / Vision / Value text from `about.html`
- Current bio paragraphs from `index.html`
- Background image: `images/bg_tokyo.jpeg`
- Profile photo: `images/toma.png`
- Space Music Hall render: `images/spectacle4.png`

---

## Open Questions

- **[RESOLVED]** Space Music Hall is positioned as a research project under `/research/`, not a side project under `/projects/`. It is Kazuki's first significant work as an HSI engineer (bachelor's capstone). The dedicated page should emphasize: Anthropometric design (Blender + human body models), ECLSS design, Systems Engineering process (Stakeholder Analysis, ConOps, Requirements, subsystem integration), and the Campus Genius Contest recognition.
- [ ] What goes in the "Japanese Contents" section beyond JA blog and JA CV? (e.g., media coverage, Japanese-language talks)
- [ ] Google Scholar ID — need to update `YOUR_SCHOLAR_ID` placeholder
- [ ] Should `/projects` be separate from `/research`, or merged? (Research = academic, Projects = creative/side)
- [ ] Any specific Google Analytics events to track beyond pageview? (e.g., publication link clicks, CV downloads)

---

*Last updated: April 2026*
*See also: `docs/architecture.md`, `docs/design-system.md`, `docs/content-strategy.md`, `docs/roadmap.md`*
