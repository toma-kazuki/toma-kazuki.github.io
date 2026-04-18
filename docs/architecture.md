# Site Architecture

## Directory Structure

```
toma-kazuki.github.io/
├── SPEC.md                    # Master design spec (this project's CLAUDE.md equivalent)
├── docs/                      # Design documentation
│   ├── architecture.md        # This file
│   ├── design-system.md
│   ├── content-strategy.md
│   └── roadmap.md
├── public/
│   ├── images/                # Static images (migrated from current site)
│   │   ├── bg_tokyo.jpeg
│   │   ├── toma.png
│   │   ├── spectacle4.png
│   │   └── icons/             # Social icons
│   ├── cv/                    # PDF CV output
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Nav.astro
│   │   │   └── BaseLayout.astro
│   │   ├── ui/
│   │   │   ├── ThemeToggle.astro
│   │   │   ├── LangToggle.astro
│   │   │   ├── PublicationCard.astro
│   │   │   ├── ResearchCard.astro
│   │   │   ├── BlogCard.astro
│   │   │   └── Tag.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── About.astro
│   │       ├── RecentPubs.astro
│   │       └── RecentPosts.astro
│   ├── content/
│   │   ├── config.ts          # Content collection schemas
│   │   ├── research/          # Research project MDX files
│   │   │   ├── habitat-anomaly.mdx
│   │   │   ├── lunar-rover-eclss.mdx
│   │   │   ├── space-music-hall.mdx
│   │   │   └── lnss.mdx
│   │   ├── blog/              # English blog posts (MDX)
│   │   │   └── YYYY-MM-DD-slug.mdx
│   │   └── blog-ja/           # Japanese blog posts (MDX)
│   │       └── YYYY-MM-DD-slug.mdx
│   ├── data/
│   │   ├── publications.json  # All publications (structured data)
│   │   ├── cv.yaml            # CV data (education, experience, awards, skills)
│   │   └── profile.ts         # Basic profile info (name, links, etc.)
│   ├── i18n/
│   │   ├── en.ts              # English strings
│   │   └── ja.ts              # Japanese strings
│   ├── pages/
│   │   ├── index.astro        # Home (EN)
│   │   ├── cv.astro           # CV / About (EN)
│   │   ├── research.astro     # Research projects list (EN)
│   │   ├── research/
│   │   │   └── [slug].astro   # Individual research project (EN)
│   │   ├── publications.astro # Publications list (EN)
│   │   ├── projects.astro     # Creative projects (EN)
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog list (EN)
│   │   │   └── [slug].astro   # Blog post (EN)
│   │   └── ja/
│   │       ├── index.astro    # Home (JA)
│   │       ├── about.astro    # 自己紹介 (JA)
│   │       └── blog/
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── styles/
│   │   ├── global.css
│   │   └── print.css          # Print styles for CV page
│   └── utils/
│       ├── i18n.ts            # Language utilities
│       ├── publications.ts    # Publication sorting/filtering helpers
│       └── theme.ts           # Dark/light mode utilities
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Routing Strategy

### English Routes (Primary)

| URL | Page | Notes |
|-----|------|-------|
| `/` | Home | Hero, bio summary, recent pubs, recent blog posts |
| `/cv` | CV | Full academic CV, print-to-PDF |
| `/research` | Projects & Experience | All projects/experiences as filterable cards (multi-label) |
| `/research/[slug]` | Project Detail | Per-project page |
| `/publications` | Publications | Filterable list |
| `/timeline` | Career Timeline | Visual vertical timeline with images |
| `/blog` | Blog Index | EN blog posts, category filter |
| `/blog/[slug]` | Blog Post | Individual post |
| `/rss.xml` | RSS Feed | Blog RSS |

### Japanese Routes (`/ja/*`)

| URL | Page | Notes |
|-----|------|-------|
| `/ja` | ホーム | Japanese home, redirects to ja-specific content |
| `/ja/about` | 自己紹介 | Japanese-language self-intro + CV highlights |
| `/ja/blog` | ブログ | Japanese-only blog posts |
| `/ja/blog/[slug]` | 記事 | Individual Japanese post |

### Language Toggle Behavior

- EN→JA: If a JA equivalent of the current page exists, navigate there; otherwise go to `/ja`
- JA→EN: Navigate to EN equivalent of current page
- The current language is stored in `localStorage` and respected on load

---

## Navigation Structure

```
[Logo: Kazuki Toma]    [Research] [Timeline] [Publications] [CV] [Blog]    [日本語] [🌙]
```

On mobile, collapses to:
```
[Logo: Kazuki Toma]                                                          [☰]
```

Drawer menu includes all links + language toggle + theme toggle.

### Active State

The current page link is underlined/highlighted in the nav. Use Astro's `Astro.url.pathname` to determine active route.

---

## Page-by-Page Breakdown

### `/` — Home

**Purpose:** First impression, scannable overview.

**Sections:**
1. **Hero** — Name, title, institution, short tagline (1 sentence), CTA buttons (CV, Publications)
2. **Bio** — 2-3 paragraph research statement (from `index.html` bio)
3. **Research Highlights** — 2-3 research project cards (latest/featured)
4. **Recent Publications** — 3-5 latest publications
5. **Recent Blog Posts** — 2-3 latest posts
6. **Contact** — Email, social links

**Notes:**
- Hero uses `bg_tokyo.jpeg` as background with dark overlay (consistent with current site)
- Tagline: Something like "Designing autonomous systems for the future of human spaceflight."

---

### `/cv` — CV / About

**Purpose:** Comprehensive academic CV with print support.

**Sections (collapsible on mobile):**
1. About / Mission Statement
2. Education
3. Research Experience
4. Work Experience
5. Teaching Experience
6. Academic Appointments
7. Fellowships & Awards
8. Skills (Languages, Programming, Engineering)
9. Publications (link to `/publications`)

**Print behavior:** `@media print` hides nav/footer, expands all sections, uses print.css for clean PDF output. A "Download CV" button triggers `window.print()`.

---

### `/research` — Projects & Experience

**Purpose:** All of Kazuki's projects and experiences in one browsable, filterable view. The "Research" vs. "Work" distinction is replaced by a multi-label taxonomy.

**Layout:** Filter bar + card grid (2-column on desktop, 1-column mobile).

**Filter bar:**
- Label buttons at the top: `All` · `Research` · `Work` · `Capstone` · `Hardware` · `Mission` · `Systems Engineering` · `Human Factors` · `Software`
- Active filter highlighted in accent color; inactive = muted
- Multiple filters can be active simultaneously (OR logic: show cards matching ANY active label)
- Filter state is reflected in URL query param (`?labels=research,hardware`) for shareability
- Filter interaction is client-side JS (Astro island, minimal JS)

Each card shows:
- Project title
- Duration (start – end or "Ongoing")
- Label tags (colored by category group)
- Representative image (thumbnail, 16:9 crop)
- 1-2 sentence description
- Status badge (Active / Completed)
- Related publications count
- Link to detail page

**Data source:** All entries come from `src/content/projects/` MDX files (renamed from `research/`).

---

### `/timeline` — Career Timeline

**Purpose:** Visual narrative of Kazuki's full career as a single scrollable page.

**Layout:** Vertical timeline, single central axis.

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   2021                  │                       │
│           ┌─────────────●                       │
│           │ Space Music Hall                    │
│           │ [render image]                      │
│           │ Dec 2021 – Feb 2022                 │
│           │ capstone · systems-eng · human-fac  │
│                         │                       │
│                         ●─────────────┐         │
│                         │  ArkEdge    │         │
│   2022                  │  [image]    │         │
│                         │  Apr 2022 – │         │
│                         │  Aug 2024   │         │
│                         │  work · hw  │         │
│                         │             │         │
│           ┌─────────────●             │         │
│           │ EQUULEUS                  │         │
│           │ [satellite image]         │         │
│   2023    │ Aug 2022 – Mar 2024       │         │
│           │ work · hardware · mission │         │
│                         │                       │
│   2024                  ●─────────────┐         │
│                           Texas A&M   │         │
│                           PhD begins  │         │
│                           [lab image] │         │
└─────────────────────────────────────────────────┘
```

**Detailed behavior:**

- Entries alternate left/right to maximize visual density
- On mobile: all annotations on the right, single-column
- Year labels float beside the axis as sticky markers while scrolling
- Filter buttons at the top (same label taxonomy as `/research`) — inactive entries fade to 20% opacity (not hidden, so the timeline density is preserved)
- Clicking an entry navigates to its detail page (or CV anchor if no detail page)
- Entries include: research projects, work experiences, major publications/presentations, fellowships
- Each node has a representative image: if no image → stylized placeholder with label color

**Data source:** Entries are pulled from both `src/content/projects/` (for projects) and `src/data/cv.yaml` (for education, work, fellowships). Each YAML entry can include `timeline_image` and `timeline_show: true/false`.

**Technical note:** The timeline requires client-side JS only for filtering. The DOM structure is rendered statically; filter interaction adds/removes a CSS class (`opacity-20 pointer-events-none`) on entries. No heavy animation library needed.

---

### `/publications` — Publications

**Purpose:** Complete, filterable publication list.

**Filters:**
- Type: All / Journal / Conference
- Role: All / First Author / Co-Author
- Year: All / individual years

**Each entry:**
- Number (J1, C1, etc.)
- Full citation
- Venue, location, date
- Tags (type, role)
- Links: [PDF] [Poster] [Slides] [DOI] (shown only when available)
- BibTeX copy button (nice-to-have)

Data source: `src/data/publications.json`

---

### `/projects` — Projects

**Purpose:** Non-academic personal projects (hobby, music, etc.). Initially may be omitted or minimal.

> **Note:** Space Music Hall is NOT here. See `/research/space-music-hall` below.

---

### `/research/space-music-hall` — Space Music Hall

**Purpose:** Dedicated case-study page for Space Music Hall as an HSI engineering project.

**Key framing:** This is Kazuki's bachelor's capstone project and the **origin point of his identity as a Human System Integration Engineer**. The page should read like a rigorous engineering case study, not a portfolio piece.

**Page structure:**
1. **Overview** — LEO space station module for cultural use; systems engineering approach
2. **Human-Centered Design** — Anthropometric design using Blender 3D simulation with human body models; inhabitable space sizing, ergonomics, line-of-sight analysis
3. **ECLSS Design** — Environmental control system sizing for habitation (atmosphere, thermal, etc.)
4. **Systems Engineering Process** — Stakeholder Analysis → ConOps → Requirements → Subsystem Integration
5. **Recognition** — 28th Campus Genius Contest Finalist (1 of 28 from 404 submissions); mentored by JAXA Kibo module senior manager
6. **Publications** — C4 (ICES 2023), C8 (Space Sciences Conference 2023)
7. **Media / Materials** — Renders (from Blender), images

**Visual treatment:** This page uses the amber accent more prominently — it is the most "human at the center" project on the site.

---

### `/blog` — Blog

**Purpose:** Knowledge sharing, research notes, personal reflections.

**Categories:**
- `tech-note` — Research memos, technical investigation results
- `life-log` — Travel, music, personal

**Each post:**
- Title, date, category tags
- Reading time estimate
- MDX body with code highlighting support

---

### `/ja/*` — Japanese Section

**Purpose:** Japanese-language content hub for Japanese audience.

**`/ja` (ホーム):**
- Japanese bio
- Links to JA blog, JA CV highlights

**`/ja/about` (自己紹介):**
- Full Japanese CV/self-intro equivalent of `/cv`
- Tailored to Japanese academic/industry norms

**`/ja/blog` (ブログ):**
- Japanese-only posts
- Mix of tech notes and life log (同 EN blog categories)

---

## Internationalization (i18n)

All UI strings (nav labels, section headers, meta text) are externalized in `src/i18n/en.ts` and `src/i18n/ja.ts`.

Content (blog posts, research pages) exists as separate files per language in separate content collections.

The CV data in `cv.yaml` may include both `title_en` and `title_ja` fields where relevant.

---

## SEO / Meta

Each page defines:
```astro
<BaseLayout
  title="Kazuki Toma — Research"
  description="..."
  ogImage="/images/og/research.png"
/>
```

OGP images: Static pre-generated PNGs (not dynamic). One per major section.

Canonical URL set to `https://toma-kazuki.github.io/[path]`.

---

## GitHub Actions / CI

```yaml
# .github/workflows/deploy.yml
# On push to main:
# 1. npm ci
# 2. npm run build
# 3. Deploy /dist to gh-pages branch
```

Astro's `@astrojs/github-pages` adapter handles base path configuration.

---

*See also: `../SPEC.md`, `design-system.md`, `content-strategy.md`*
