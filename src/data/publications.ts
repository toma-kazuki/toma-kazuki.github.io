// To add a paper: add an entry to PUBLICATIONS, then list its id under `related`
// on the matching entry in cv.ts. Newest first within a year.
// `id` is never shown; it is only the link target on the Publications page.

export interface Publication {
  id: string;
  year: number;
  kind: 'journal' | 'conference';
  role: 'first' | 'co';
  title: string;
  authors: string;
  venue: string;
  links?: { label: string; href: string }[];
  /** Shows the paper as a large card with this figure on Home and Publications. */
  featured?: { fig: string; caption: string; dark?: boolean };
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'c11', year: 2026, kind: 'conference', role: 'first',
    title: 'Initial Study of a Physics-Based Virtual Assistant for Real-Time Fault Diagnosis in Space Habitats',
    authors: 'K. Toma, J. T. Elston, D. Kortenkamp, D. Selva',
    venue: '2026 IEEE Aerospace Conference, 1-15',
    links: [{ label: '[IEEE Xplore]', href: 'https://ieeexplore.ieee.org/abstract/document/11519837/' }],
    featured: { fig: 'daphne-ui', caption: 'Daphne-AT time-series matching analysis and chatbot approval request', dark: true },
  },
  {
    id: 'c12', year: 2026, kind: 'conference', role: 'co',
    title: 'A Bayesian Framework for Human-Agent Collaborative Fault Diagnosis in Space Habitats',
    authors: 'J. T. Elston, K. Toma, D. Kortenkamp, D. Selva',
    venue: '2026 IEEE Aerospace Conference, 1-18',
    links: [{ label: '[IEEE Xplore]', href: 'https://ieeexplore.ieee.org/abstract/document/11519931' }],
    featured: { fig: 'interaction-sequence', caption: 'Interaction sequence between BioSim, Daphne-AT, operator, PRIDE, and robot' },
  },
  {
    id: 'c1', year: 2025, kind: 'conference', role: 'first',
    title: 'Development of a Physics-Based Diagnosis Model and Digital Twin Simulation of a Space Habitat for End-To-End Autonomous Anomaly Resolution',
    authors: 'Toma, K., Elston, J., Kortenkamp, D., Diaz-Artiles, A., & Selva, D',
    venue: '2025 NASA HRP IWS. Galveston, USA, Jan, 2025.',
    links: [
      { label: '[Poster]', href: 'https://drive.google.com/file/d/1DnlPYFNfGEwaeDGkW9aJ82pf4FLKCvzh/view?usp=sharing' },
      { label: '[Slides]', href: '/slides/habitat-dx/' },
    ],
  },
  {
    id: 'c9', year: 2025, kind: 'conference', role: 'co',
    title: 'Bayesian Network Approach to Collaborative Anomaly Diagnosis in Human-Agent Environments',
    authors: 'Elston, J. T., Toma, K., Diaz-Artiles, A., Kortenkamp, D., & Selva, D.',
    venue: '2025 NASA HRP IWS, Galveston, USA, Jan, 2025.',
    links: [{ label: '[Materials]', href: 'https://drive.google.com/file/d/1hVYeR38zx6TgwakuBrXjXcf7-7JACvMA/view?usp=sharing' }],
  },
  {
    id: 'j1', year: 2024, kind: 'journal', role: 'first',
    title: 'Versatility of the ISSL6U CubeSat Bus for Low Earth Orbit Missions',
    authors: 'Kazuki Toma, Akihiro Ishikawa, Kosuke Ogino, Takahiro Takano, Ryu Funase, and Shinichi Nakasuka',
    venue: 'The 34th Journal of Evolving Space Activities (JESA), 2024',
  },
  {
    id: 'c2', year: 2024, kind: 'conference', role: 'first',
    title: 'Research on efficient life support systems for space habitation activities, considering both crewed and uncrewed Period',
    authors: 'Kazuki Toma, Masato Sakurai, Shinichi Nakasuka',
    venue: '75th International Astronautical Congress (IAC 2024), Milan, Italy, Oct, 2024',
  },
  {
    id: 'c3', year: 2024, kind: 'conference', role: 'first',
    title: 'Regenerative ECLSS Station for Early Stage of Lunar Activities, Considering Both Crewed and Uncrewed Periods',
    authors: 'Kazuki Toma, Masato Sakurai, Shinichi Nakasuka',
    venue: 'The 53rd International Conference on Environmental Systems, Louisville, USA, July, 2024',
  },
  {
    id: 'c8', year: 2023, kind: 'conference', role: 'first',
    title: 'Space Music Hall - Conceptual Design of a Cultural Facility on a Low Earth Orbit Platform',
    authors: 'Kazuki Toma, Shuto Takashita, Shinichi Nakasuka',
    venue: 'The 67th the Space Sciences and Technology Conference, Toyama, Japan, October, 2023',
  },
  {
    id: 'c5', year: 2023, kind: 'conference', role: 'first',
    title: 'Thermal Operation for the 6U Deep Space CubeSat EQUULEUS in the Initial Critical Phase',
    authors: 'Kazuki Toma, Toshihiro Shibukawa, Shuhei Matsushita, Shingo Nishimoto, Ryu Funase, et al.',
    venue: 'Small Satellite Conference, Logan, USA, August, 2023',
  },
  {
    id: 'c4', year: 2023, kind: 'conference', role: 'first',
    title: 'Design of Space Music Hall as a Module of Low Earth Orbit Space Station',
    authors: 'Kazuki Toma, Shuto Takashita, Shinichi Nakasuka',
    venue: 'The 52nd International Conference on Environmental Systems, Calgary, Canada, July, 2023',
  },
  {
    id: 'c6', year: 2023, kind: 'conference', role: 'first',
    title: 'Structural Design and Validation of its Versatility of 6U CubeSat Bus ISSL6U',
    authors: 'Kazuki Toma, Akihiro Ishikawa, Ryuichi Hirayama, Kosuke Ogino, Shinichi Nakasuka, et al.',
    venue: 'The 34th International Symposium on Space Technology and Science, Fukuoka, Japan, June, 2023',
  },
  {
    id: 'c7', year: 2022, kind: 'conference', role: 'first',
    title: 'A study on satellite system and their orbit estimation in the early lunar navigation satellite system',
    authors: 'Kazuki Toma, Hirotaka Sekine, Toshiki Tanaka, Shinichi Nakasuka',
    venue: 'The 66th the Space Sciences and Technology Conference Student Poster Session, Japan, November, 2022',
  },
  {
    id: 'c10', year: 2022, kind: 'conference', role: 'co',
    title: 'Strategy of CubeSat Electrical Interface Design for Comprehensive Management and Efficient Verification',
    authors: 'Taiki Karakawa, Nobuhiro Funabiki, Kota Kakihara, Akihiro Ishikawa, Kenta Suda, Kazuma Fujimoto, Ryuichi Hirayama, Kazuki Toma, Shuhei Matsushita, Ryu Funase, Shinichi Nakasuka',
    venue: 'The 33th International Symposium on Space Technology and Science, Japan, 2022',
  },
];

export const pubById = (id: string) => {
  const pub = PUBLICATIONS.find((p) => p.id === id);
  if (!pub) throw new Error(`Unknown publication id: ${id}`);
  return pub;
};

/** Authors as HTML with your own name marked. */
export const markAuthors = (authors: string) =>
  authors
    .replace(/&/g, '&amp;')
    .replace(/Kazuki Toma|K\. Toma|Toma, K\./g, (me) => `<span class="me">${me}</span>`);
