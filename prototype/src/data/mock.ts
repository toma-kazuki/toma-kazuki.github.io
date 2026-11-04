// ── Mock data for prototype validation ─────────────────────────────────────
// In production, this will come from src/data/publications.json and cv.yaml

export const PROFILE = {
  name: "Kazuki Toma",
  name_ja: "藤間一輝",
  title: "Ph.D. Student, Aerospace Engineering",
  institution: "Texas A&M University",
  lab: "SEAK Lab",
  tagline: "Designing autonomous systems for the future of human spaceflight.",
  email: "kazengtoma@tamu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/toma-kazuki/",
    github: "https://github.com/toma-kazuki",
    scholar: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID",
  },
};

export type ProjectLabel =
  | "research" | "work" | "capstone"
  | "hardware" | "mission"
  | "systems-engineering" | "human-factors"
  | "software" | "collaboration";

export interface Project {
  slug: string;
  title: string;
  status: "active" | "completed";
  start: string;
  start_date: string;
  end?: string;
  end_date?: string;
  description: string;
  labels: ProjectLabel[];
  topics: string[];
  cover_image?: string;
  timeline_image?: string;
  funding?: string[];
  institutions?: string[];
  related_publications?: string[];
  featured?: boolean;
  /** Absolute site path or URL to an interactive deck / talk materials */
  slides_url?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "habitat-anomaly",
    title: "Physics-Based Diagnosis Model for Space Habitat Anomaly Resolution",
    status: "active",
    start: "Aug 2024",
    start_date: "2024-08",
    end: "May 2028",
    end_date: "2028-05",
    description: "Developing a digital twin and physics-based anomaly diagnosis system for autonomous space habitat operations during long-duration deep-space missions.",
    labels: ["research", "software", "human-factors", "collaboration"],
    topics: ["digital-twin", "ECLSS", "autonomy", "HSI", "Daphne-AT"],
    funding: ["NASA HRP (Grant #80NSSC19K0656)", "NASA STTR Phase II (Award #80NSSC24CA028)"],
    institutions: ["Texas A&M University", "TRACLabs Inc."],
    related_publications: ["C1", "C9"],
    featured: true,
    slides_url: "/slides/habitat-dx/",
  },
  {
    slug: "lunar-rover-eclss",
    title: "Trade Study: Regenerative ECLSS for Lunar Pressurized Rover",
    status: "completed",
    start: "Apr 2023",
    start_date: "2023-04",
    end: "Aug 2024",
    end_date: "2024-08",
    description: "ESM-based comparative analysis between current rover designs and an advanced pressurized rover with a regenerative life support system, in collaboration with JAXA.",
    labels: ["research", "collaboration", "systems-engineering"],
    topics: ["ECLSS", "ESM", "lunar", "pressurized-rover"],
    institutions: ["University of Tokyo", "JAXA"],
    related_publications: ["C2", "C3"],
    featured: true,
  },
  {
    slug: "space-music-hall",
    title: "Space Music Hall: Human-Centered Module Design for LEO",
    status: "completed",
    start: "Dec 2021",
    start_date: "2021-12",
    end: "Feb 2022",
    end_date: "2022-02",
    description: "Bachelor's capstone: systems engineering and human-centered design of a cultural facility module for a future LEO space station. First application of HSI principles — includes anthropometric design via Blender and ECLSS sizing.",
    labels: ["capstone", "systems-engineering", "human-factors"],
    topics: ["space-station", "LEO", "ECLSS", "anthropometrics", "systems-engineering"],
    related_publications: ["C4", "C8"],
    featured: true,
    cover_image: "/images/spectacle4.png",
    timeline_image: "/images/spectacle4.png",
  },
  {
    slug: "lnss",
    title: "Trade Study of Lunar Navigation Satellite System (LNSS)",
    status: "completed",
    start: "Apr 2021",
    start_date: "2021-04",
    end: "Mar 2024",
    end_date: "2024-03",
    description: "System design optimization of a nano-satellite constellation for lunar navigation and IoT communication, considering uncertain lunar development demand in a phased approach.",
    labels: ["research", "systems-engineering"],
    topics: ["lunar", "navigation", "satellite", "constellation-design"],
    funding: ["MEXT Space Exploration Fundamental Technology Program"],
    institutions: ["University of Tokyo"],
    related_publications: ["C7"],
  },
  {
    slug: "arkedge-cubsat",
    title: "Structural Design Lead — SPHERE EYE-1 & ONGLAISAT",
    status: "completed",
    start: "Apr 2022",
    start_date: "2022-04",
    end: "Aug 2024",
    end_date: "2024-08",
    description: "Chief responsibility for structural development of two geostationary CubeSat missions at ArkEdge Space Inc. Structural analysis (CAD, FEA), vibration test verification, hardware assembly, safety assessment.",
    labels: ["work", "hardware", "mission", "systems-engineering"],
    topics: ["CubeSat", "structural-design", "SPHERE-EYE-1", "ONGLAISAT", "GEO"],
    institutions: ["ArkEdge Space Inc."],
    related_publications: ["J1", "C6", "C10"],
  },
  {
    slug: "equuleus",
    title: "Thermal Operations Engineer — EQUULEUS Deep Space CubeSat",
    status: "completed",
    start: "Aug 2022",
    start_date: "2022-08",
    end: "Mar 2024",
    end_date: "2024-03",
    description: "Thermal operations from initial critical phase to nominal phase for EQUULEUS, a 6U CubeSat lunar mission (JAXA/UTokyo) launched aboard NASA SLS in Nov 2022.",
    labels: ["work", "hardware", "mission"],
    topics: ["CubeSat", "thermal", "deep-space", "EQUULEUS", "SLS"],
    institutions: ["ISAS/JAXA", "University of Tokyo"],
    related_publications: ["C5"],
  },
];

export interface Publication {
  id: string;
  type: "journal" | "conference";
  role: "first" | "co";
  title: string;
  authors: string;
  venue: string;
  venue_short?: string;
  location?: string;
  month?: string;
  year: number;
  links?: { pdf?: string; poster?: string; slides?: string; doi?: string; materials?: string };
}

export const PUBLICATIONS: Publication[] = [
  {
    id: "J1",
    type: "journal",
    role: "first",
    title: "Versatility of the ISSL6U CubeSat Bus for Low Earth Orbit Missions",
    authors: "Kazuki Toma, Akihiro Ishikawa, Kosuke Ogino, Takahiro Takano, Ryu Funase, and Shinichi Nakasuka",
    venue: "The 34th Journal of Evolving Space Activities (JESA)",
    year: 2024,
  },
  {
    id: "C1",
    type: "conference",
    role: "first",
    title: "Development of a Physics-Based Diagnosis Model and Digital Twin Simulation of a Space Habitat for End-To-End Autonomous Anomaly Resolution",
    authors: "Toma, K., Elston, J., Kortenkamp, D., Diaz-Artiles, A., & Selva, D.",
    venue: "2025 NASA Human Research Program Investigators' Workshop",
    venue_short: "NASA HRP IWS",
    location: "Galveston, USA",
    month: "Jan",
    year: 2025,
    links: {
      poster: "https://drive.google.com/file/d/1DnlPYFNfGEwaeDGkW9aJ82pf4FLKCvzh/view",
      slides: "/slides/habitat-dx/",
    },
  },
  {
    id: "C2",
    type: "conference",
    role: "first",
    title: "Research on efficient life support systems for space habitation activities, considering both crewed and uncrewed Period",
    authors: "Kazuki Toma, Masato Sakurai, Shinichi Nakasuka",
    venue: "75th International Astronautical Congress (IAC 2024)",
    venue_short: "IAC 2024",
    location: "Milan, Italy",
    month: "Oct",
    year: 2024,
  },
  {
    id: "C3",
    type: "conference",
    role: "first",
    title: "Regenerative ECLSS Station for Early Stage of Lunar Activities, Considering Both Crewed and Uncrewed Periods",
    authors: "Kazuki Toma, Masato Sakurai, Shinichi Nakasuka",
    venue: "The 53rd International Conference on Environmental Systems",
    venue_short: "ICES 2024",
    location: "Louisville, USA",
    month: "Jul",
    year: 2024,
  },
  {
    id: "C4",
    type: "conference",
    role: "first",
    title: "Design of Space Music Hall as a Module of Low Earth Orbit Space Station",
    authors: "Kazuki Toma, Shuto Takashita, Shinichi Nakasuka",
    venue: "The 52nd International Conference on Environmental Systems",
    venue_short: "ICES 2023",
    location: "Calgary, Canada",
    month: "Jul",
    year: 2023,
  },
  {
    id: "C5",
    type: "conference",
    role: "first",
    title: "Thermal Operation for the 6U Deep Space CubeSat EQUULEUS in the Initial Critical Phase",
    authors: "Kazuki Toma, Toshihiro Shibukawa, Shuhei Matsushita, Shingo Nishimoto, Ryu Funase, et al.",
    venue: "Small Satellite Conference",
    venue_short: "SmallSat 2023",
    location: "Logan, USA",
    month: "Aug",
    year: 2023,
  },
  {
    id: "C6",
    type: "conference",
    role: "first",
    title: "Structural Design and Validation of its Versatility of 6U CubeSat Bus ISSL6U",
    authors: "Kazuki Toma, Akihiro Ishikawa, Ryuichi Hirayama, Kosuke Ogino, Shinichi Nakasuka, et al.",
    venue: "The 34th International Symposium on Space Technology and Science",
    venue_short: "ISTS 2023",
    location: "Fukuoka, Japan",
    month: "Jun",
    year: 2023,
  },
  {
    id: "C7",
    type: "conference",
    role: "first",
    title: "A study on satellite system and their orbit estimation in the early lunar navigation satellite system",
    authors: "Kazuki Toma, Hirotaka Sekine, Toshiki Tanaka, Shinichi Nakasuka",
    venue: "The 66th Space Sciences and Technology Conference, Student Poster Session",
    location: "Japan",
    month: "Nov",
    year: 2022,
  },
  {
    id: "C8",
    type: "conference",
    role: "first",
    title: "Space Music Hall — Conceptual Design of a Cultural Facility on a Low Earth Orbit Platform",
    authors: "Kazuki Toma, Shuto Takashita, Shinichi Nakasuka",
    venue: "The 67th Space Sciences and Technology Conference",
    location: "Toyama, Japan",
    month: "Oct",
    year: 2023,
  },
  {
    id: "C9",
    type: "conference",
    role: "co",
    title: "Bayesian Network Approach to Collaborative Anomaly Diagnosis in Human-Agent Environments",
    authors: "Elston, J. T., Toma, K., Diaz-Artiles, A., Kortenkamp, D., & Selva, D.",
    venue: "2025 NASA Human Research Program Investigators' Workshop",
    venue_short: "NASA HRP IWS",
    location: "Galveston, USA",
    month: "Jan",
    year: 2025,
    links: { materials: "https://drive.google.com/file/d/1hVYeR38zx6TgwakuBrXjXcf7-7JACvMA/view" },
  },
  {
    id: "C10",
    type: "conference",
    role: "co",
    title: "Strategy of CubeSat Electrical Interface Design for Comprehensive Management and Efficient Verification",
    authors: "Taiki Karakawa, Nobuhiro Funabiki, Kota Kakihara, Akihiro Ishikawa, Kenta Suda, Kazuma Fujimoto, Ryuichi Hirayama, Kazuki Toma, et al.",
    venue: "The 33rd International Symposium on Space Technology and Science",
    venue_short: "ISTS 2022",
    location: "Japan",
    year: 2022,
  },
];

export interface TimelineEntry {
  id: string;
  title: string;
  type: "project" | "education" | "award" | "publication";
  start_date: string;
  end_date?: string;
  start: string;
  end?: string;
  description: string;
  labels?: ProjectLabel[];
  image?: string;
  link?: string;
  featured?: boolean;
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: "bs-utokyo",
    title: "B.S. Aerospace Engineering — University of Tokyo",
    type: "education",
    start_date: "2018-04",
    end_date: "2022-03",
    start: "Apr 2018",
    end: "Mar 2022",
    description: "GPA 3.80/4.00. Thesis: Lunar navigation satellite system orbit estimation.",
  },
  {
    id: "space-music-hall",
    title: "Space Music Hall — Capstone Project",
    type: "project",
    start_date: "2021-12",
    end_date: "2022-02",
    start: "Dec 2021",
    end: "Feb 2022",
    description: "First HSI engineering work: systems engineering + anthropometric design + ECLSS for a LEO cultural module.",
    labels: ["capstone", "systems-engineering", "human-factors"],
    image: "/images/spectacle4.png",
    link: "/research/space-music-hall",
    featured: true,
  },
  {
    id: "campus-genius",
    title: "28th Campus Genius Contest — Finalist",
    type: "award",
    start_date: "2022-11",
    start: "Nov 2022",
    description: "1 of 28 finalists from 404 submissions (artistic category) for Space Music Hall.",
  },
  {
    id: "arkedge",
    title: "Structural Design Lead — ArkEdge Space Inc.",
    type: "project",
    start_date: "2022-04",
    end_date: "2024-08",
    start: "Apr 2022",
    end: "Aug 2024",
    description: "Structural development for SPHERE EYE-1 (launched Jan 2023) and ONGLAISAT (launched Nov 2024).",
    labels: ["work", "hardware", "mission"],
    featured: true,
  },
  {
    id: "equuleus",
    title: "Thermal Operations — EQUULEUS / ISAS JAXA",
    type: "project",
    start_date: "2022-08",
    end_date: "2024-03",
    start: "Aug 2022",
    end: "Mar 2024",
    description: "Thermal ops for the 6U lunar CubeSat EQUULEUS, launched on NASA SLS Nov 2022.",
    labels: ["work", "hardware", "mission"],
    featured: true,
  },
  {
    id: "ms-utokyo",
    title: "M.S. Aerospace Engineering — University of Tokyo",
    type: "education",
    start_date: "2022-04",
    end_date: "2024-03",
    start: "Apr 2022",
    end: "Mar 2024",
    description: "GPA 4.00/4.00. Thesis: LNSS constellation system design optimization.",
  },
  {
    id: "lnss",
    title: "LNSS Trade Study",
    type: "project",
    start_date: "2021-04",
    end_date: "2024-03",
    start: "Apr 2021",
    end: "Mar 2024",
    description: "System design optimization of a lunar navigation and IoT satellite constellation.",
    labels: ["research", "systems-engineering"],
  },
  {
    id: "lunar-rover",
    title: "Regenerative ECLSS for Lunar Pressurized Rover (JAXA collab)",
    type: "project",
    start_date: "2023-04",
    end_date: "2024-08",
    start: "Apr 2023",
    end: "Aug 2024",
    description: "ESM analysis for advanced lunar pressurized rover with regenerative life support.",
    labels: ["research", "collaboration"],
  },
  {
    id: "nakajima",
    title: "Nakajima Foundation Study Abroad Fellowship",
    type: "award",
    start_date: "2024-09",
    end_date: "2026-09",
    start: "Sep 2024",
    end: "Sep 2026",
    description: "Tuition + stipend for Ph.D. study abroad. Competitive fellowship from Nakajima Foundation.",
    featured: true,
  },
  {
    id: "phd-tamu",
    title: "Ph.D. Aerospace Engineering — Texas A&M University",
    type: "education",
    start_date: "2024-08",
    end_date: "2028-05",
    start: "Aug 2024",
    end: "May 2028 (scheduled)",
    description: "SEAK Lab, advisor: Prof. Daniel Selva. Research: autonomous anomaly resolution for space habitats.",
    featured: true,
  },
  {
    id: "habitat-anomaly",
    title: "Space Habitat Anomaly Diagnosis System (NASA)",
    type: "project",
    start_date: "2024-08",
    end_date: "2028-05",
    start: "Aug 2024",
    end: "Ongoing",
    description: "Physics-based digital twin for autonomous ECLSS anomaly detection — NASA HRP + STTR Phase II.",
    labels: ["research", "software", "human-factors", "collaboration"],
    featured: true,
  },
  {
    id: "iseb-iac2024",
    title: "ISEB Student Embassy @ IAC 2024",
    type: "award",
    start_date: "2024-10",
    start: "Oct 2024",
    description: "JAXA-sponsored participant at the ISEB Student Programme, IAC 2024, Milan.",
  },
];
