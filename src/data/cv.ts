// The CV page, the Timeline page and the career chart on Home all read this file.
//
// Fields: `date` is the text shown. `start` / `end` ("YYYY-MM") place the entry on the
// timeline; leave `end` off for something ongoing or a single event.
// `span: true` also puts it on the Home chart. `timeline: false` keeps it off the Timeline.
// `link` is where the timeline card goes (defaults to this entry on the CV page).
// Lines may contain HTML, so write & as &amp;. `{ muted }` renders a quieter line.

export type Line = string | { muted: string };

export interface CvEntry {
  id: string;
  title: string;
  date: string;
  start: string;
  end?: string;
  lines: Line[];
  related?: string[];
  span?: boolean;
  /** Chart style: human = Space Music Hall accent, fund = outlined fellowship bar. */
  tone?: 'human' | 'fund';
  timeline?: boolean;
  link?: string;
  /** The Education thesis lines are long, so the card shows this line instead. */
  summary?: string;
}

export interface CvSection {
  id: string;
  title: string;
  type: 'education' | 'research' | 'work' | 'award';
  entries: CvEntry[];
}

export const CV_SECTIONS: CvSection[] = [
  {
    id: 'education', title: 'Education', type: 'education',
    entries: [
      {
        id: 'phd', title: 'Ph.D. in Aerospace Engineering', date: 'May, 2028 (Scheduled)', start: '2024-08', end: '2028-05',
        lines: [
          'Department of Aerospace Engineering, Faculty of Engineering, Texas A&amp;M University',
          { muted: 'GPA: -/4.00' },
          'Thesis: "Design of a Physics-Based Diagnostic Model and Digital Twin Simulation for Autonomous Anomaly Resolution in Space Habitats" (tentative)',
          { muted: 'Advisor: Prof. Daniel Selva' },
        ],
      },
      {
        id: 'ms', title: 'M.S. in Aerospace Engineering', date: 'Mar, 2024', start: '2022-04', end: '2024-03',
        lines: [
          'Department of Aeronautics and Astronautics, Faculty of Engineering, University of Tokyo',
          { muted: 'GPA: 4.00/4.00' },
          'Thesis: "System design optimization of a lunar navigation and communications constellation to meet uncertain lunar development demands in a phased manner."',
          { muted: 'Advisor: Prof. Shinichi Nakasuka' },
        ],
      },
      {
        id: 'bs', title: 'B.S. in Aerospace Engineering', date: 'Mar, 2022', start: '2018-04', end: '2022-03',
        lines: [
          'Department of Aeronautics and Astronautics, Faculty of Engineering, University of Tokyo',
          { muted: 'GPA: 3.80/4.00' },
          'Thesis: "A study on satellite system and their orbit estimation in the early lunar navigation satellite system"',
          { muted: 'Advisor: Prof. Shinichi Nakasuka' },
        ],
      },
    ],
  },
  {
    id: 'research-experience', title: 'Research Experience', type: 'research',
    entries: [
      {
        id: 'habitat', title: 'Design of Space Habitat Anomaly Diagnosis System', date: 'Aug, 2024 - May, 2028', start: '2024-08', end: '2028-05', span: true,
        link: '/research/habitat-anomaly/',
        lines: [
          '<em>Research on virtual assistants (VA) for spacecraft anomaly treatment during long duration exploration missions</em>',
          "Supported by NASA's Human Research Program (Grant #80NSSC19K0656) and NASA STTR Phase II (Award #80NSSC24CA028, with TRACLabs)",
          '<strong>Contribution:</strong> Developing a physics-based anomaly diagnosis capability for Daphne-AT, a prototype VA, using hybrid model-based reasoning and simulation-based fault trend analysis with real-time telemetry.',
          { muted: 'Advisor: Prof. Daniel Selva' },
        ],
        related: ['c11', 'c12', 'c1', 'c9'],
      },
      {
        id: 'rover', title: 'Trade Study of Regenerative System for a Pressurized Rover', date: 'Apr, 2023 - August, 2024', start: '2023-04', end: '2024-08', span: true,
        link: '/research/lunar-rover-eclss/',
        lines: [
          '<em>Collaborative research project with JAXA on lunar pressurized rover systems</em>',
          '<strong>Contribution:</strong> Conducted Equivalent System Mass (ESM) calculations and comparative analysis between current rover designs and an advanced pressurized rover with a regenerative life support system.',
          { muted: 'Advisor: Dr. Masato Sakurai &amp; Prof. Shinichi Nakasuka' },
        ],
        related: ['c2', 'c3'],
      },
      {
        id: 'hall', title: 'Conceptual Design of "SPACE MUSIC HALL"', date: 'Dec, 2021 - Feb, 2022', start: '2021-12', end: '2022-02', span: true, tone: 'human',
        link: '/research/space-music-hall/',
        lines: [
          '<em>Space Music Hall is a cultural facility module for a future space station in low Earth orbit</em>',
          '<strong>Contribution:</strong> Systems engineering process (Stakeholder Analysis, Cost Estimation, Conops, Requirements, and subsystem integration)',
        ],
        related: ['c4', 'c8'],
      },
      {
        id: 'lnss', title: 'Trade Study of Lunar Navigation Satellite System (LNSS)', date: 'Apr, 2021 - Mar, 2024', start: '2021-04', end: '2024-03', span: true,
        link: '/research/lnss/',
        lines: [
          '<em>Nano-satellite to provide navigation and IoT communication services to lunar orbiters and spacecraft on the moon</em>',
          'Funding: Space Exploration Fundamental Technology Advancement Program adopted by MEXT',
          { muted: 'Advisor: Prof. Shinichi Nakasuka &amp; Dr. Toshiki Tanaka' },
        ],
        related: ['c7'],
      },
    ],
  },
  {
    id: 'work-experience', title: 'Work Experience', type: 'work',
    entries: [
      {
        id: 'arkedge', title: '<strong>Structural Design Lead</strong> at ArkEdge Space Inc', date: 'Apr, 2022 - Aug, 2024', start: '2022-04', end: '2024-08', span: true,
        link: '/research/arkedge-cubesat/',
        lines: [
          '<em>Two geostationary satellite missions "SPHERE EYE-1" (launched Jan 2023) and "ONGLAISAT" (launched Nov 2024)</em>',
          '<strong>Contribution:</strong> Chief responsibility of structure development, structure analysis with CAD and verification by vibration test, management and standardization of complex hardware assembly, safety assessment review',
        ],
        related: ['j1', 'c6', 'c10'],
      },
      {
        id: 'equuleus', title: '<strong>Thermal Operation Engineer</strong> at ISAS/JAXA', date: 'Aug, 2022 - Mar, 2024', start: '2022-08', end: '2024-03', span: true,
        link: '/research/equuleus/',
        lines: [
          '<em>EQUULEUS 6U CubeSat lunar mission jointly proposed by JAXA and University of Tokyo, launched as secondary payload of NASA SLS rocket in Nov 2022</em>',
          '<strong>Contribution:</strong> Thermal operation from initial critical phase to nominal phase, maintaining thermal conditions within allowable range through passive monitoring and active heater control, dealing with thermal transition uncertainty during thrusting operations',
        ],
        related: ['c5'],
      },
      {
        id: 'spacebd', title: '<strong>Marketing Assistant</strong> at SpaceBD Inc', date: 'Oct, 2022 - Nov, 2022', start: '2022-10', end: '2022-11', span: true,
        lines: [
          '<em>Business development of commercial utilization of protein crystallization experiments using microgravity at JEM on ISS</em>',
          '<strong>Contribution:</strong> Research on potential business partners and clients to identify their needs regarding protein crystallization experiments using microgravity at JEM',
        ],
      },
    ],
  },
  {
    id: 'teaching-experience', title: 'Teaching Experience', type: 'work',
    entries: [
      {
        id: 'ta', title: 'Graduate Teaching Assistant', date: 'Apr, 2022 - Aug, 2022', start: '2022-04', end: '2022-08', span: true,
        lines: [
          'To Prof.Shinichi Nakasuka in “Exercises in Space Engineering “',
          'Created report assignments: satellite system design for a GEO communication mission',
          { muted: 'Topics: multi disciplinary design optimization, subsystem design of spacecraft' },
        ],
      },
    ],
  },
  {
    id: 'academic-appointments', title: 'Academic Appointments', type: 'work',
    entries: [
      {
        id: 'isas', title: 'Assistant Researcher of ISAS/JAXA', date: 'Aug, 2022 - Present', start: '2022-08',
        lines: ['To Operation of the SLS onboard CubeSat explorer project (EQUULEUS)'],
      },
    ],
  },
  {
    id: 'fellowships-awards', title: 'Fellowships &amp; Awards', type: 'award',
    entries: [
      {
        id: 'nakajima', title: 'Nakajima Foundation Study Abroad Fellowship', date: 'Sep, 2024 - Sep, 2026', start: '2024-09', end: '2026-09', span: true, tone: 'fund',
        lines: [
          'Two-year funding (tuition + stipend) for Ph.D. study abroad. Maximum 5 years for stipend.',
          { muted: 'Agency: <a href="https://www.nakajimafound.or.jp/" target="_blank" rel="noopener">Nakajima Foundation, Japan</a>' },
        ],
      },
      {
        id: 'wings', title: 'WINGS CFS Fellowship', date: 'Sep, 2022 - Aug, 2024', start: '2022-09', end: '2024-08', span: true, tone: 'fund',
        lines: [
          'Two-year stipend funding for graduate study',
          { muted: 'Agency: <a href="https://cfs.t.u-tokyo.ac.jp/about.html" target="_blank" rel="noopener">WINGS CFS, The University of Tokyo, Japan</a>' },
        ],
      },
      {
        id: 'iseb', title: 'ISEB Student Embassy @ IAC2024 in Italy', date: 'Oct, 2024', start: '2024-10',
        lines: [
          'Selected as one of the JAXA-sponsored students for the ISEB Student Programme at IAC 2024, participated in specialized events, presentations, panel sessions, and meetings with senior representatives in the global space community.',
          { muted: 'Agency: <a href="https://iseb.space/iseb-partners-programme-at-iac/" target="_blank" rel="noopener">ISEB</a>' },
        ],
      },
      {
        id: 'campus-genius', title: '28th Campus Genius Contest Finalist', date: 'Nov, 2022', start: '2022-11',
        lines: [
          'Title of work: The Design of Space Music Hall',
          'Nominated as one of the 28 great works in the artistic category from 404 works',
          { muted: 'Archive: <a href="https://archive.campusgenius.jp/2022/works/6304/" target="_blank" rel="noopener" style="overflow-wrap:anywhere">https://archive.campusgenius.jp/2022/works/6304/</a>' },
        ],
      },
      {
        id: 'nec', title: 'Travel Award for Researchers Attending International Conferences', date: 'Apr, 2023', start: '2023-04',
        lines: [
          'Travel expense for the 52nd International Conference on Environmental Systems in Calgary',
          { muted: 'Agency: The NEC C&amp;C Foundation, Japan' },
        ],
      },
    ],
  },
];

export const SKILLS = [
  { title: 'Languages:', html: 'English (High level, TOEFL 99/120)<br>Japanese (Native)' },
  { title: 'Programming Skills:', html: 'Python, MATLAB, C, C++, JavaScript, HTML, CSS, LaTeX, Git' },
  {
    title: 'Engineering Skills &amp; Certificates:',
    html: 'First-Class Technical Radio Operator for On-The-Ground Services<br>CAD (SolidWorks, Inventor, Fusion360) &amp; Femap<br>Thermal Desktop<br>Circuit board design<br>Hobbyist systems: Arduino',
  },
];

export const ADDRESS = [
  'Graduate Student (Ph.D. Program)',
  'Department of Aeronautics and Astronautics, Faculty of Engineering',
  'Texas A&amp;M University',
  'Systems Engineering, Autonomy and Knowledge Laboratory (SEAK)',
  '3141 TAMU, 620C H.R. Bright Building',
  'College Station, TX, United States, 77843',
];

export const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

export const allEntries = () =>
  CV_SECTIONS.flatMap((section) => section.entries.map((entry) => ({ ...entry, section })));

export const cvEntry = (id: string) => {
  const entry = allEntries().find((e) => e.id === id);
  if (!entry) throw new Error(`Unknown CV entry: ${id}`);
  return entry;
};

export const entryHref = (entry: { id: string; link?: string }) => entry.link ?? `/cv/#${entry.id}`;
