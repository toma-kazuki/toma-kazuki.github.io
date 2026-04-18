# Content Strategy

## Philosophy

> Content should be editable by the Coding Agent without touching any HTML or component code.

All structured content lives in `src/data/` (JSON/YAML) or `src/content/` (Markdown/MDX).
The Astro content layer enforces schemas with TypeScript — type errors surface immediately if a field is missing or malformed.

---

## Content Collections

### 1. Publications — `src/data/publications.json`

Single JSON file (not MDX) because publications are structured data, not narrative content.

**Schema:**

```typescript
type Publication = {
  id: string;           // "J1", "C1", etc.
  type: "journal" | "conference";
  role: "first" | "co";
  title: string;
  authors: string[];    // Full name list; Kazuki's name will be bolded automatically
  venue: string;        // Full venue name
  venue_short?: string; // Abbreviated (e.g., "IAC 2024")
  location?: string;    // "Milan, Italy"
  month?: string;       // "Oct"
  year: number;
  links?: {
    pdf?: string;
    poster?: string;
    slides?: string;
    doi?: string;
    materials?: string;
  };
  tags?: string[];      // Additional classification tags
}
```

**Example entry:**

```json
{
  "id": "C1",
  "type": "conference",
  "role": "first",
  "title": "Development of a Physics-Based Diagnosis Model and Digital Twin Simulation of a Space Habitat for End-To-End Autonomous Anomaly Resolution",
  "authors": ["Toma, K.", "Elston, J.", "Kortenkamp, D.", "Diaz-Artiles, A.", "Selva, D."],
  "venue": "2025 NASA Human Research Program Investigators' Workshop",
  "venue_short": "NASA HRP IWS",
  "location": "Galveston, USA",
  "month": "Jan",
  "year": 2025,
  "links": {
    "poster": "https://drive.google.com/file/d/1DnlPYFNfGEwaeDGkW9aJ82pf4FLKCvzh/view"
  }
}
```

**Ordering:** Display in reverse chronological order by default. Filter/sort controls on the Publications page.

---

### 2. CV Data — `src/data/cv.yaml`

YAML for human-readability. Structured sections map directly to CV page layout.

**Top-level sections:**

```yaml
profile:
  name: Kazuki Toma
  name_ja: 藤間一輝
  title: Ph.D. Student
  institution: Texas A&M University
  department: Aerospace Engineering
  lab: Systems Engineering, Autonomy and Knowledge Laboratory (SEAK)
  advisor: Prof. Daniel Selva
  email: kazengtoma@tamu.edu
  phone: "+1-979-326-3668"
  address: "620C H.R. Bright Building, College Station, TX 77843"
  links:
    linkedin: https://www.linkedin.com/in/toma-kazuki/
    github: https://github.com/toma-kazuki
    scholar: https://scholar.google.com/citations?user=SCHOLAR_ID  # TODO: fill in

education:
  - degree: Ph.D. in Aerospace Engineering
    institution: Texas A&M University
    end: "May 2028 (Scheduled)"
    gpa: null
    thesis: "Design of a Physics-Based Diagnostic Model and Digital Twin Simulation for Autonomous Anomaly Resolution in Space Habitats (tentative)"
    advisor: Prof. Daniel Selva

  - degree: M.S. in Aerospace Engineering
    institution: University of Tokyo
    end: "Mar 2024"
    gpa: "4.00/4.00"
    thesis: "System design optimization of a lunar navigation and communications constellation to meet uncertain lunar development demands in a phased manner."
    advisor: Prof. Shinichi Nakasuka

  - degree: B.S. in Aerospace Engineering
    institution: University of Tokyo
    end: "Mar 2022"
    gpa: "3.80/4.00"
    thesis: "A study on satellite system and their orbit estimation in the early lunar navigation satellite system"
    advisor: Prof. Shinichi Nakasuka

research_experience:
  - title: Design of Space Habitat Anomaly Diagnosis System
    start: "Aug 2024"
    end: "May 2028"
    description: "Research on virtual assistants (VA) for spacecraft anomaly treatment during long duration exploration missions"
    funding:
      - "NASA Human Research Program (Grant #80NSSC19K0656)"
      - "NASA STTR Phase II (Award #80NSSC24CA028, with TRACLabs)"
    contribution: "Developing a physics-based anomaly diagnosis capability for Daphne-AT..."
    advisor: Prof. Daniel Selva
    related_publications: ["C1", "C9"]

# ... (work_experience, teaching, appointments, fellowships, skills follow same pattern)
```

---

### 3. Projects & Experiences — `src/content/projects/*.mdx`

> **Naming change:** `src/content/research/` → `src/content/projects/`  
> This collection covers both research projects AND work experiences that deserve a dedicated page.
> Not every work experience needs an MDX file; minor roles live only in `cv.yaml`.

Each project/experience gets its own MDX file. The frontmatter is structured; the body is rich narrative.

**Label vocabulary (controlled):**

```typescript
const PROJECT_LABELS = [
  "research",           // Academic research with investigation question
  "work",               // Industry / institutional employment
  "capstone",           // Formal graduation project (B.S. or M.S.)
  "hardware",           // Hands-on hardware dev / test / operation
  "mission",            // Involvement in an actual space mission
  "systems-engineering",// SE process was a primary methodology
  "human-factors",      // Human-centered design / HSI was primary
  "software",           // Software development was primary contribution
  "collaboration",      // Multi-institution or industry-academia collab
] as const;
```

**Frontmatter schema (`src/content/config.ts`):**

```typescript
const projectSchema = z.object({
  title: z.string(),
  title_ja: z.string().optional(),
  status: z.enum(["active", "completed"]),
  start: z.string(),                   // "Aug 2024" (display format)
  start_date: z.string(),              // "2024-08" (ISO, for timeline sorting)
  end: z.string().optional(),          // "May 2028" (display)
  end_date: z.string().optional(),     // "2028-05" (ISO)
  description: z.string(),             // 1-2 sentences (card + SEO)
  labels: z.array(z.enum(PROJECT_LABELS)), // multi-label; used for filtering
  topics: z.array(z.string()),         // free-form topic tags (more specific)
  funding: z.array(z.string()).optional(),
  advisor: z.string().optional(),
  collaborators: z.array(z.string()).optional(),
  institutions: z.array(z.string()).optional(),
  related_publications: z.array(z.string()).optional(),
  featured: z.boolean().default(false),// show on home page
  cover_image: z.string().optional(),  // card thumbnail
  timeline_image: z.string().optional(),// image used in /timeline (can differ from cover)
  timeline_show: z.boolean().default(true), // include in timeline
  order: z.number().optional(),        // manual sort override for /research page
});
```

**Label assignments for existing projects:**

| Project | Labels |
|---------|--------|
| Space Music Hall | `capstone`, `systems-engineering`, `human-factors` |
| Space Habitat Anomaly Diagnosis | `research`, `software`, `human-factors`, `collaboration` |
| Lunar Rover ECLSS Trade Study | `research`, `collaboration` |
| LNSS | `research`, `systems-engineering` |
| ArkEdge Space (SPHERE EYE-1, ONGLAISAT) | `work`, `hardware`, `mission`, `systems-engineering` |
| EQUULEUS / ISAS JAXA | `work`, `hardware`, `mission` |

**Example file: `src/content/research/habitat-anomaly.mdx`**

```mdx
---
title: "Physics-Based Diagnosis Model for Space Habitat Anomaly Resolution"
status: active
start: "Aug 2024"
end: "May 2028"
description: "Developing a digital twin-based anomaly detection and diagnosis system for autonomous space habitat operations."
tags: ["autonomy", "space-habitat", "digital-twin", "ECLSS", "HSI"]
funding:
  - "NASA Human Research Program (Grant #80NSSC19K0656)"
  - "NASA STTR Phase II (Award #80NSSC24CA028)"
advisor: "Prof. Daniel Selva"
collaborators: ["J. Elston", "D. Kortenkamp", "A. Diaz-Artiles"]
institutions: ["Texas A&M University", "TRACLabs Inc."]
related_publications: ["C1", "C9"]
featured: true
---

## Motivation

Astronauts in deep space exploration missions will experience communication delays
of up to 24 minutes with mission control...

## Approach

We develop a physics-based model of the space habitat's Environmental Control
and Life Support System (ECLSS) that can be coupled with real-time telemetry...

## Current Status

[Description of progress, key results, next steps]
```

---

### 4. Blog Posts (EN) — `src/content/blog/*.mdx`

**Frontmatter schema:**

```typescript
const blogSchema = z.object({
  title: z.string(),
  date: z.date(),
  updated: z.date().optional(),
  description: z.string(),    // 1-2 sentence summary for cards/SEO
  category: z.enum(["tech-note", "life-log"]),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
  cover_image: z.string().optional(),
});
```

**File naming convention:** `YYYY-MM-DD-kebab-slug.mdx`

**Example: `src/content/blog/2025-03-15-digital-twin-intro.mdx`**

```mdx
---
title: "Building a Digital Twin for Space Habitats: A Primer"
date: 2025-03-15
description: "An introduction to digital twin methodology as applied to ECLSS anomaly detection."
category: tech-note
tags: ["digital-twin", "ECLSS", "python", "simulation"]
---

## What is a Digital Twin?

A digital twin is a real-time synchronized virtual model of a physical system...
```

---

### 5. Blog Posts (JA) — `src/content/blog-ja/*.mdx`

Same schema as EN blog, with `title_en` optional field for cross-referencing.

File naming: `YYYY-MM-DD-kebab-slug.mdx` (slug can be Japanese romanization or descriptive English)

---

### 6. Profile / Site Config — `src/data/profile.ts`

```typescript
export const PROFILE = {
  name: "Kazuki Toma",
  name_ja: "藤間一輝",
  title_en: "Ph.D. Student, Aerospace Engineering",
  title_ja: "航空宇宙工学 博士課程",
  institution: "Texas A&M University",
  tagline: "Designing autonomous systems for the future of human spaceflight.",
  tagline_ja: "人類の宇宙進出を支える自律システムの設計",
  email: "kazengtoma@tamu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/toma-kazuki/",
    github: "https://github.com/toma-kazuki",
    scholar: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID",
    researchgate: "https://www.researchgate.net/profile/Kazuki-Toma",
  },
  analytics: {
    ga4_id: "G-3PBJPS4WJX",
  },
} as const;
```

---

## Astro Content Config (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const researchCollection = defineCollection({
  type: 'content',
  schema: z.object({ /* ... as above ... */ }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({ /* ... as above ... */ }),
});

const blogJaCollection = defineCollection({
  type: 'content',
  schema: z.object({ /* ... as above ... */ }),
});

export const collections = {
  research: researchCollection,
  blog: blogCollection,
  'blog-ja': blogJaCollection,
};
```

---

## Content Workflow

### Adding a Publication

1. Open `src/data/publications.json`
2. Add a new entry with the next sequential ID (J2, C11, etc.)
3. Fill in all required fields
4. Add any available links (PDF, DOI, poster)
5. Run `npm run build` to verify no type errors

### Adding a Blog Post

1. Create `src/content/blog/YYYY-MM-DD-title-slug.mdx`
2. Fill in frontmatter (title, date, description, category, tags)
3. Write content in MDX
4. Set `draft: false` when ready to publish
5. Push to main → CI deploys automatically

### Updating CV

1. Edit `src/data/cv.yaml`
2. Add new entries to the appropriate section
3. If generating a PDF CV, run `npm run build` and print `/cv` page

### Adding a Research Project

1. Create `src/content/research/project-slug.mdx`
2. Fill in frontmatter
3. Write narrative content
4. Link related publications by ID
5. Set `featured: true` if it should appear on the home page

---

## Migrations from Current Site

### Publications (done manually once)

All publications from `publication.html` will be migrated to `publications.json`.
Cross-reference map: J1, C1–C10 → structured JSON entries.

### CV Data

All sections from `index.html` will be migrated to `cv.yaml`.
Unfinished sections (GPA for PhD: `-/4.00`) will be preserved as `null`.

### Research Projects

Five projects identified; order below reflects display priority on `/research`:

1. Space Habitat Anomaly Diagnosis (`habitat-anomaly.mdx`) — active, primary current research
2. Lunar Rover ECLSS Trade Study (`lunar-rover-eclss.mdx`)
3. Lunar Navigation Satellite System (`lnss.mdx`)
4. **Space Music Hall** (`space-music-hall.mdx`) — bachelor's capstone; HSI origin story
5. CubeSat development (EQUULEUS, ISSL6U, SPHERE EYE-1, ONGLAISAT) — may be one bundled project or distributed across work experience section

**Space Music Hall — special content notes:**

This project requires the most narrative work. The MDX body should be written as a rigorous engineering case study:
- Human-centered design rationale (why a cultural facility in LEO, who are the stakeholders)
- Anthropometric design methodology: Blender 3D simulation with human body models — what dimensions were designed, what constraints were applied (reach envelope, lines of sight, egress clearance, etc.)
- ECLSS design: which subsystems were sized, what design approach, what constraints drove decisions
- Systems Engineering process: Stakeholder Analysis → ConOps → Requirements derivation → Subsystem integration
- Results and recognition (Campus Genius Contest, JAXA mentorship)

Images to include:
- `images/spectacle4.png` — existing render (Earth view through stage window, rendered by Kazuki Toma and Shuto Takashita)
- Additional Blender renders or CAD/diagram exports → place in `public/images/projects/space-music-hall/`

**Framing note:** The page header / intro should explicitly frame this as Kazuki's first work as an HSI engineer, not as a "creative project." Lead with the engineering challenge, not the artistic vision.

---

## SEO & Metadata

Each page's `<BaseLayout>` accepts:

```typescript
interface LayoutProps {
  title: string;             // "<page title> — Kazuki Toma"
  description: string;       // 150-160 chars
  ogImage?: string;          // Default: /images/og/default.png
  ogType?: "website" | "article";
  publishedDate?: Date;      // For blog posts
  lang?: "en" | "ja";
}
```

Canonical URLs are set based on `Astro.url`.
Blog posts include `<link rel="alternate">` pointing to JA version if it exists.

---

*See also: `../SPEC.md`, `architecture.md`, `design-system.md`, `roadmap.md`*
