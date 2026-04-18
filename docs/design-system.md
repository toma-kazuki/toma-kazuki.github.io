# Design System

## Design Concept: "Human System Integration"

The visual language is derived from **Human-Systems Integration (HSI)** — the engineering discipline that bridges human cognition, behavior, and complex engineered systems. This is not decorative metaphor; it reflects Kazuki's actual research on autonomous anomaly resolution and space habitat design.

### What HSI looks like visually:
- **Precision**: Crisp grid lines, consistent spacing, no ambiguity in hierarchy
- **Adaptability**: Layouts that breathe and respond (to screen size, to content density)
- **Interface clarity**: Every element is either functional or structural — no pure decoration
- **System awareness**: Subtle reference to diagrams, schematics, orbital mechanics — not as illustration, but as design grammar

The contrast: Space Music Hall is the archetypal example of HSI in action — engineering systems (ECLSS, anthropometric design, structural modules) designed primarily around human experience and culture. The amber/gold accent signals "the human is the primary design constraint here," not merely "this is creative work." It is the color of inhabitable space.

---

## Color System

All colors are defined as CSS custom properties and mapped to Tailwind tokens.

### Semantic Tokens

| Token | Purpose |
|-------|---------|
| `--color-bg` | Page background |
| `--color-surface` | Card / panel backgrounds |
| `--color-border` | Dividers, card borders |
| `--color-text-primary` | Body text |
| `--color-text-secondary` | Captions, metadata |
| `--color-text-muted` | Placeholders, disabled |
| `--color-accent` | Links, active states, highlights |
| `--color-accent-creative` | Creative/personal content accent |
| `--color-accent-hover` | Hover state for accent elements |

### Light Mode Palette

```css
:root {
  --color-bg:              #FAFAF8;  /* Warm white — not cold paper */
  --color-surface:         #F0EFF9;  /* Slightly elevated surface */
  --color-border:          #E2E0DA;  /* Subtle warm dividers */
  --color-text-primary:    #1A1A1A;  /* Near-black */
  --color-text-secondary:  #555550;  /* Warm gray */
  --color-text-muted:      #9A9A94;  /* Muted */
  --color-accent:          #1E3A8A;  /* Deep space blue */
  --color-accent-hover:    #1E40AF;
  --color-accent-creative: #92400E;  /* Warm amber — Space Music Hall */
}
```

### Dark Mode Palette

```css
[data-theme="dark"] {
  --color-bg:              #0D1117;  /* GitHub dark — deep space */
  --color-surface:         #161B22;  /* Slightly elevated */
  --color-border:          #30363D;  /* Subtle dark border */
  --color-text-primary:    #E6EDF3;  /* Near-white */
  --color-text-secondary:  #8B949E;  /* Muted blue-gray */
  --color-text-muted:      #484F58;  /* Very muted */
  --color-accent:          #60A5FA;  /* Electric blue */
  --color-accent-hover:    #93C5FD;
  --color-accent-creative: #FCD34D;  /* Gold — warm in the dark */
}
```

### Functional Colors (mode-independent)

```css
--color-success:  #16A34A;
--color-warning:  #D97706;
--color-error:    #DC2626;
--color-info:     #0284C7;
```

---

## Typography

### Type Scale

| Step | Size | Line Height | Usage |
|------|------|-------------|-------|
| `text-xs` | 12px | 1.5 | Labels, badges |
| `text-sm` | 14px | 1.6 | Captions, meta, secondary |
| `text-base` | 16px | 1.75 | Body text |
| `text-lg` | 18px | 1.6 | Lead paragraphs |
| `text-xl` | 20px | 1.5 | Section subtitles |
| `text-2xl` | 24px | 1.4 | Section headings (h3) |
| `text-3xl` | 30px | 1.3 | Page headings (h2) |
| `text-4xl` | 36px | 1.2 | Hero subtitle |
| `text-5xl` | 48px | 1.1 | Hero name (h1) |

### Font Families

```css
--font-heading: 'Space Grotesk', sans-serif;
--font-body:    'Inter', sans-serif;
--font-mono:    'JetBrains Mono', monospace;
--font-ja:      'Noto Sans JP', sans-serif;
```

Loading via `@fontsource` (bundled, no Google Fonts external dependency):
```
@fontsource/space-grotesk
@fontsource/inter
@fontsource/jetbrains-mono
@fontsource/noto-sans-jp
```

### Heading Hierarchy

All headings use `Space Grotesk`. In Japanese mode, heading font falls back to `Noto Sans JP` for JP characters while maintaining the same weight.

```css
h1 { font-family: var(--font-heading); font-weight: 700; letter-spacing: -0.02em; }
h2 { font-family: var(--font-heading); font-weight: 600; letter-spacing: -0.01em; }
h3 { font-family: var(--font-heading); font-weight: 500; }
```

### Body Text

Body uses `Inter` at `font-size: 16px`, `line-height: 1.75`. Academic paragraphs should breathe.

For Japanese text: `Noto Sans JP` with slightly tighter `line-height: 1.9` (CJK characters need more vertical space).

---

## Spacing System

Tailwind's default spacing scale (4px base) is used throughout. Key reference values:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight internal padding |
| `space-2` | 8px | Badge padding |
| `space-4` | 16px | Default card padding |
| `space-6` | 24px | Section gap (mobile) |
| `space-8` | 32px | Component separation |
| `space-12` | 48px | Section separation (mobile) |
| `space-16` | 64px | Section separation (desktop) |
| `space-24` | 96px | Hero section padding |

---

## Layout Grid

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;  /* mobile */
}
@media (min-width: 768px) {
  .container { padding: 0 48px; }
}
@media (min-width: 1200px) {
  .container { padding: 0 64px; }
}
```

### Content Width Constraints

| Context | Max Width | Notes |
|---------|-----------|-------|
| Body text (blog, CV) | `65ch` | Optimal reading width |
| Publication list | `900px` | Dense but readable |
| Homepage sections | `100%` container | Full width |
| Hero | `100vw` | Full bleed |

---

## Component Patterns

### Navigation Bar

```
Height: 64px (desktop) / 56px (mobile)
Background: var(--color-bg) with backdrop-blur + border-bottom
Position: sticky, top: 0, z-index: 50
```

Active link indicator: 2px bottom border in `--color-accent`.

### Card

Standard card used for research projects, blog posts, publications:

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
```

Dark mode hover: `box-shadow: 0 4px 20px rgba(96,165,250,0.1);`

### Badge / Tag

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-mono);
}
```

Tag color variants:
- `tag-journal` → accent blue
- `tag-conference` → gray
- `tag-first-author` → creative amber
- `tag-active` → green
- `tag-completed` → muted

### Section Divider

Thin 1px horizontal rule with an optional section label. Style: `border-top: 1px solid var(--color-border)`. The section label floats left, set in `text-sm` `text-muted`.

### Filter Bar (Projects & Timeline)

```css
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 0;
  position: sticky;
  top: 64px;  /* below nav */
  background: var(--color-bg);
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
}

.filter-btn {
  padding: 4px 14px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  font-size: 13px;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.15s;
}
.filter-btn[data-active="true"] {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}
.filter-btn:hover:not([data-active="true"]) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### Timeline Component

The most complex visual component on the site. Key design decisions:

**Axis:**
```css
.timeline-axis {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--color-border) 5%,
    var(--color-border) 95%,
    transparent
  );
}
```

**Node (dot on axis):**
```css
.timeline-node {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-bg);
  box-shadow: 0 0 0 2px var(--color-accent);
  z-index: 2;
}
/* Active/featured nodes are larger */
.timeline-node[data-featured="true"] {
  width: 18px;
  height: 18px;
}
```

**Annotation arm (extends left or right from node):**
```css
.timeline-entry {
  position: relative;
  display: grid;
  /* Left entries: image | arm+node | empty */
  /* Right entries: empty | arm+node | image */
  grid-template-columns: 1fr 40px 1fr;
  align-items: start;
  margin-bottom: 48px;
}

.timeline-arm {
  height: 2px;
  background: var(--color-border);
  align-self: center;
  /* extends from node toward the card */
}

.timeline-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s, opacity 0.2s;
}
.timeline-card:hover {
  border-color: var(--color-accent);
}

/* Cover image inside card */
.timeline-card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Text content */
.timeline-card-body {
  padding: 12px 16px;
}
```

**Filtered-out state (fade, don't hide — preserves timeline density):**
```css
.timeline-entry[data-filtered-out="true"] {
  opacity: 0.15;
  pointer-events: none;
}
```

**Year labels (sticky while scrolling):**
```css
.timeline-year-label {
  position: sticky;
  top: calc(64px + 48px);  /* below nav + filter bar */
  left: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-muted);
  padding: 4px 8px;
  background: var(--color-bg);
  border-radius: 4px;
  width: fit-content;
  z-index: 5;
}
```

**Mobile layout:**
```css
@media (max-width: 768px) {
  .timeline-axis { left: 24px; }
  .timeline-entry {
    grid-template-columns: 24px 1fr;
    /* All entries: node column | card */
    padding-left: 48px;
  }
  .timeline-year-label { left: 0; }
}
```

---

## Iconography

Use **Lucide icons** (`lucide-astro` or inline SVG). Clean, consistent 24px stroke icons.

Key icons used:
| Icon | Usage |
|------|-------|
| `FileText` | Publications, PDF |
| `ExternalLink` | External links |
| `Github` | GitHub profile |
| `Linkedin` | LinkedIn |
| `Mail` | Email |
| `BookOpen` | Google Scholar |
| `Sun` / `Moon` | Theme toggle |
| `Globe` | Language toggle |
| `Search` | Site search |
| `Rss` | RSS feed |
| `ChevronRight` | Navigation arrows |

---

## Motion & Animation

Minimal, purposeful. No decorative animation.

```css
/* Global transition base */
* {
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

/* Entry animation for page content */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.4s ease forwards; }
```

Page transitions: None (Astro MPAs don't need client-side transitions for this scale).

Respect `prefers-reduced-motion: reduce` — disable all animations for accessibility.

---

## Print Styles (for CV page)

```css
@media print {
  /* Hide non-content elements */
  nav, footer, .theme-toggle, .lang-toggle, .print-button { display: none; }

  /* Reset backgrounds */
  body { background: white; color: black; }
  .card { border: 1px solid #ccc; box-shadow: none; }

  /* Full width */
  .container { max-width: 100%; padding: 0; }

  /* Page breaks */
  h2 { break-before: auto; }
  .no-break { break-inside: avoid; }

  /* Links: show URL after link text */
  a[href]::after { content: " (" attr(href) ")"; font-size: 11px; color: #555; }
  a[href^="#"]::after { content: ""; } /* No URL for internal links */
}
```

---

## Dark Mode Implementation

Theme stored in `localStorage` as `"light"` or `"dark"`.
On page load, a blocking inline script sets `data-theme` on `<html>` before paint (prevents flash).

```html
<!-- In <head>, before any CSS -->
<script is:inline>
  const theme = localStorage.getItem('theme') 
    ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

Toggle button dispatches a custom event `theme-change` that other components can listen to.

---

## Accessibility Standards

- All images have meaningful `alt` text
- Color contrast ratios meet WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- Focus indicators visible in both light and dark mode
- All interactive elements keyboard-navigable
- ARIA labels on icon-only buttons (theme toggle, lang toggle)
- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<aside>`, `<section>` used appropriately

---

*See also: `../SPEC.md`, `architecture.md`, `content-strategy.md`*
