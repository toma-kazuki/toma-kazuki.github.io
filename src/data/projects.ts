// To add a project: add an entry here and it gets a card on Research and its own page at
// /research/<slug>/. Set `cv` to the matching entry id in cv.ts, which supplies the page's
// description and related publications. `rows` may contain HTML, so write & as &amp;.

export interface Project {
  slug: string;
  title: string;
  date: string;
  status: 'active' | 'completed';
  kind: 'research' | 'work';
  levels: ('phd' | 'ms' | 'bs')[];
  group: 'Current Research' | 'Previous Research Projects' | 'Industry Experience';
  cv: string;
  rows: [string, string][];
  /** A figure from src/assets/figures, or else one of the line drawings in ProjectArt. */
  cover?: { fig: string; dark?: boolean };
  art?: 'rover' | 'lnss' | 'cube' | 'lunar';
  human?: boolean;
  home?: boolean;
  figures?: { fig: string; caption: string; dark?: boolean; module?: boolean }[];
}

export const LEVEL_LABEL = { phd: 'Ph.D.', ms: 'M.S.', bs: 'B.S.' };
export const KIND_LABEL = { research: 'Research', work: 'Work' };

export const PROJECTS: Project[] = [
  {
    slug: 'habitat-anomaly',
    title: 'Physics-Based Diagnosis Model and Digital Twin Simulation for Space Habitats',
    date: 'Aug, 2024 - May, 2028 (Ongoing)',
    status: 'active', kind: 'research', levels: ['phd'], group: 'Current Research',
    cv: 'habitat',
    cover: { fig: 'daphne-ui', dark: true },
    home: true,
    rows: [
      ['Advisor', 'Prof. Daniel Selva'],
      ['Institution', 'Texas A&amp;M University, Systems Engineering, Autonomy and Knowledge Laboratory (SEAK)'],
      ['Funding', 'NASA Human Research Program (Grant #80NSSC19K0656) &amp; NASA STTR Phase II (Award #80NSSC24CA028)'],
    ],
  },
  {
    slug: 'space-music-hall',
    title: 'Space Music Hall Design',
    date: 'Dec, 2021 - Feb, 2022',
    status: 'completed', kind: 'research', levels: ['bs'], group: 'Previous Research Projects',
    cv: 'hall',
    cover: { fig: 'hall-wide', dark: true },
    human: true,
    home: true,
    rows: [
      ['Advisor', 'Prof. Shinichi Nakasuka'],
      ['Focus', 'Conceptual design of a cultural facility module for low Earth orbit space stations'],
    ],
    figures: [
      { fig: 'hall-wide', caption: 'View of the Earth through the stage and window in "Space Music Hall" rendered by Kazuki Toma and Shuto Takashita', dark: true },
      { fig: 'hall-module', caption: 'Line drawing of the Space Music Hall module', module: true },
    ],
  },
  {
    slug: 'lunar-rover-eclss',
    title: 'Trade Study of Regenerative System for a Pressurized Rover',
    date: 'Apr, 2023 - Aug, 2024',
    status: 'completed', kind: 'research', levels: ['ms'], group: 'Previous Research Projects',
    cv: 'rover',
    art: 'rover',
    home: true,
    rows: [
      ['Collaboration', 'JAXA'],
      ['Advisors', 'Dr. Masato Sakurai &amp; Prof. Shinichi Nakasuka'],
      ['Focus', 'Equivalent System Mass (ESM) calculations and comparative analysis for lunar pressurized rover systems with regenerative life support'],
    ],
  },
  {
    slug: 'lnss',
    title: 'Lunar Navigation Satellite System (LNSS)',
    date: 'Apr, 2021 - Mar, 2024',
    status: 'completed', kind: 'research', levels: ['bs', 'ms'], group: 'Previous Research Projects',
    cv: 'lnss',
    art: 'lnss',
    rows: [
      ['Advisors', 'Prof. Shinichi Nakasuka &amp; Dr. Toshiki Tanaka'],
      ['Funding', 'MEXT Space Exploration Fundamental Technology Advancement Program'],
      ['Focus', 'Nano-satellite navigation and IoT communication services for lunar missions'],
    ],
  },
  {
    slug: 'arkedge-cubesat',
    title: 'Structural Design Lead - ArkEdge Space Inc.',
    date: 'Apr, 2022 - Aug, 2024',
    status: 'completed', kind: 'work', levels: ['ms'], group: 'Industry Experience',
    cv: 'arkedge',
    art: 'cube',
    rows: [
      ['Projects', 'SPHERE EYE-1 and ONGLAISAT geostationary satellite missions'],
      ['Responsibilities', 'Structure development, CAD analysis, vibration testing, hardware assembly management'],
    ],
  },
  {
    slug: 'equuleus',
    title: 'Thermal Operation Engineer - ISAS/JAXA',
    date: 'Aug, 2022 - Mar, 2024',
    status: 'completed', kind: 'work', levels: ['ms'], group: 'Industry Experience',
    cv: 'equuleus',
    art: 'lunar',
    rows: [
      ['Project', 'EQUULEUS 6U CubeSat lunar mission (launched on NASA SLS, Nov 2022)'],
      ['Responsibilities', 'Thermal operations from critical to nominal phases, heater control, attitude control'],
    ],
  },
];

// Closed-loop explorer on the Research page. Text comes from the habitat-dx deck.
export const STAGES = [
  {
    name: 'Habitat simulation', label: ['Habitat', 'simulation'], who: '',
    html: '<p>Telemetry stream · physical state</p><p>NASA Human Exploration Research Analog (HERA): 68 telemetry parameters with caution / warning limits and 31 anomaly scenarios across CO₂ removal, O₂ generation, fans / TCCS, fuel cells &amp; power, water pressure &amp; leaks, and trace contaminants.</p>',
    fig: { name: 'hera-telemetry', caption: 'Telemetry: predefined linear ramps. Example: CDRA Failure — injected at 20 s, recovered at 100 s' },
  },
  {
    name: 'Detection', label: ['Detection'], who: 'Daphne-AT',
    html: '<p>When is “anomaly” declared? — limits vs learned binary score.</p>',
    fig: { name: 'detection-onset', caption: 'Onset — p(anomaly) after inject' },
  },
  {
    name: 'Hypothesis generation', label: ['Hypothesis', 'generation'], who: 'Daphne-AT',
    html: '<p>Shared catalog: detection and hypotheses stay fixed while the evaluation method is swapped.</p>',
  },
  {
    name: 'Evaluation', label: ['Evaluation'], who: 'Daphne-AT',
    html: '<p>Hosts several diagnostic methods side by side: knowledge-graph symptom matching, Bayesian network inference, time-series matching. Every evaluator outputs a probability distribution over hypotheses.</p>',
    fig: { name: 'eval-ts-multi', caption: 'Same scenario (CDRA Failure) — score timeline, TS multi' },
  },
  {
    name: 'Prognosis', label: ['Prognosis'], who: 'Daphne-AT', dashed: true,
    html: '<p>Optional / not yet closed-loop.</p>',
  },
  {
    name: 'Decision-making', label: ['Decision-', 'making'], who: 'Daphne-AT',
    html: '<p>Run top hypothesis procedures in series. Verify on alarms; else eliminate &amp; re-rank. Orderings: P/T · Highest P · Shortest T · Random.</p>',
    fig: { name: 'recovery-orderings', caption: 'Outcome mix for each recovery ordering' },
  },
  {
    name: 'Execution', label: ['Execution'], who: 'PRIDE + CRAFTSMAN',
    html: '<p>Adjustably autonomous procedure execution, and semi-autonomous IVA and EVA robotic caretakers that perform inspection and repair. Robotic inspection evidence refines hypotheses.</p>',
    fig: { name: 'craftsman-robot', caption: 'CRAFTSMAN robot arm at the air filter rack in simulation' },
  },
];
