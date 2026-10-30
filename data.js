/* ------------------------------------------------------------------
   EWEM · Semester 5 — content
   Edit this file to add or change an assignment. The page reads it.
   ------------------------------------------------------------------ */

const SITE = {
  name: "Preet Panaviya",
  shortName: "PP",
  className: "TE CMPN A",
  roll: "24102A0033",
  college: "Vidyalankar Institute of Technology",
  course: "E-Waste Management",
  courseCode: "VEC02",
  semester: "Semester 5",
  year: "2026–27",
  github: "https://github.com/Preet8808",
  repo: "https://github.com/Preet8808/preet-ewem-dashboard",
  live: "https://preet8808.github.io/preet-ewem-dashboard/"
};

const ASSIGNMENTS = [
  {
    id: 0,
    type: "ISA",
    title: "Course Insights",
    kicker: "Check AAP · Course insights",
    description:
      "A first read of the EWEM course: the six VIT curriculum buckets, the two-credit environmental course, COs mapped to POs, 30 planned lectures and a theory-only evaluation structure.",
    tags: ["Course insights", "AAP", "VEC02"],
    date: null,
    dateLabel: null,
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ise-00-course-insights.webp",
      alt: "First page of the EWEM course insights assignment"
    },
    files: [
      {
        kind: "PDF",
        label: "Course insights (AAP)",
        path: "files/ise-00-course-insights.pdf",
        meta: "PDF · 3 pages"
      }
    ]
  },
  {
    id: 1,
    type: "ISA",
    title: "Madhya Pradesh E-Waste Ledger",
    kicker: "State tracker · Report + dashboard",
    description:
      "A 20-district e-waste ledger for Madhya Pradesh: 43,575 tonnes a year of generation, a 68% collection rate, 175 collection centres and a 100-point state scorecard — shipped as a formal report, a seven-sheet tracker and a live intelligence dashboard.",
    tags: ["Madhya Pradesh", "20 districts", "Tracker", "Live dashboard"],
    date: "2026-07",
    dateLabel: "Jul 2026",
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ise-01-mp-dashboard.webp",
      alt: "Madhya Pradesh E-Waste Intelligence Command Center dashboard"
    },
    files: [
      {
        kind: "DOCX",
        label: "Madhya Pradesh State E-Waste Management Report",
        path: "files/ise-01-mp-report.docx",
        meta: "DOCX · State report",
        office: true
      },
      {
        kind: "XLSX",
        label: "Madhya Pradesh E-Waste Tracker",
        path: "files/ise-01-mp-tracker.xlsx",
        meta: "XLSX · 7-sheet tracker",
        office: true
      },
      {
        kind: "LINK",
        label: "mp-ewaste-buddy.lovable.app",
        url: "https://mp-ewaste-buddy.lovable.app",
        note: "MP E-Waste Intelligence Command Center"
      }
    ]
  },
  {
    id: 2,
    type: "ISA",
    title: "Elemental Blueprint",
    kicker: "In class · Elemental blueprint",
    description:
      "A plasma-arc elemental blueprint for PCB e-waste: the five recovered metals (Au, Ag, Cu, Pd, Pt), a five-stage recovery flow and the process metrics behind the concept.",
    tags: ["Materials", "Au · Ag · Cu · Pd · Pt", "Poster"],
    date: null,
    dateLabel: null,
    status: "Submitted",
    group: ["Kalpesh Sawkare", "Dhiraj Pawar"],
    cover: {
      src: "thumbs/ise-02-elemental-blueprint.webp",
      alt: "Plasma arc metal recovery elemental blueprint poster"
    },
    files: [
      {
        kind: "JPEG",
        label: "Elemental Blueprint poster",
        path: "files/ise-02-elemental-blueprint.jpeg",
        meta: "JPEG · Poster"
      }
    ]
  },
  {
    id: 3,
    type: "ISA",
    title: "Kerala E-Waste Landscape",
    kicker: "State deck · Kerala",
    description:
      "A 13-slide state study of Kerala's e-waste system: 38,395.84 tonnes generated a year, 75.83% material recovery, a 62.6% collection rate and an authorised capacity base that covers only 22.4% of generation.",
    tags: ["Kerala", "Presentation", "Circular economy"],
    date: "2026-08",
    dateLabel: "Aug 2026",
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ise-03-kerala-deck.webp",
      alt: "Title slide of the Kerala e-waste landscape deck"
    },
    files: [
      {
        kind: "PDF",
        label: "Kerala E-Waste Landscape deck",
        path: "files/ise-03-kerala-deck.pdf",
        meta: "PDF · 13 slides"
      }
    ]
  },
  {
    id: 4,
    type: "ESE",
    title: "Plasma Arc Metal Recovery",
    kicker: "Design patent · Plasma arc",
    description:
      "A patent-style design for an ultra-high-temperature plasma arc system that smelts PCB e-waste at 5,000–15,000 °C, separates off-gas and slag, and recovers Au, Ag, Cu, Pd and Pt at a claimed >95% recovery efficiency.",
    tags: ["Plasma arc", "PCB recovery", "Patent concept"],
    date: "2026-08",
    dateLabel: "Aug 2026",
    status: "Submitted",
    group: ["Kalpesh Sawkare", "Dhiraj Pawar"],
    cover: {
      src: "thumbs/ese-04-plasma-arc.webp",
      alt: "Plasma arc metal recovery system diagram"
    },
    files: [
      {
        kind: "PDF",
        label: "Plasma Arc Metal Recovery — design documentation",
        path: "files/ese-04-plasma-arc.pdf",
        meta: "PDF · 6 pages"
      }
    ]
  },
  {
    id: 5,
    type: "ESE",
    title: "EPR Compliance Review",
    kicker: "Compliance review · Five companies",
    description:
      "A compliance review of Dixon, Kaynes Technology, Syrma SGS, Foxconn India and Tata Electronics against the E-Waste (Management) Rules, 2022 — EPR targets, registration fees and what their BRSR filings actually disclose.",
    tags: ["EPR", "CPCB", "5 companies", "BRSR"],
    date: "2026-09",
    dateLabel: "Sep 2026",
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ese-05-epr-tool.webp",
      alt: "Circuit and Salvage EPR compliance review website"
    },
    files: [
      {
        kind: "DOCX",
        label: "E-Waste Compliance Review — 5 Companies",
        path: "files/ese-05-epr-review.docx",
        meta: "DOCX · Compliance paper",
        office: true
      },
      {
        kind: "LINK",
        label: "ewastecalc-98.netlify.app",
        url: "https://ewastecalc-98.netlify.app",
        note: "Circuit & Salvage — EPR calculator"
      }
    ]
  },
  {
    id: 6,
    type: "ESE",
    title: "India Environmental Policy Briefing",
    kicker: "Policy briefing · Five-country study",
    description:
      "A six-slide India briefing distilled from a comparison of Australia, the USA, Japan, India and Russia: environmental statutes, the 45% emissions-intensity target, ~50% non-fossil capacity by 2030 and the policy instruments behind them.",
    tags: ["Policy", "Emissions", "India", "5-country study"],
    date: "2026-08",
    dateLabel: "Aug 2026",
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ese-06-india-policy.webp",
      alt: "Title slide of the India environmental policy briefing"
    },
    files: [
      {
        kind: "PPTX",
        label: "India Environmental Policy Briefing",
        path: "files/ese-06-india-policy.pptx",
        meta: "PPTX · 6 slides",
        office: true
      }
    ]
  },
  {
    id: 7,
    type: "ESE",
    title: "E-Waste Week",
    kicker: "Campus campaign · E-Waste Week",
    description:
      "A campus-wide E-Waste Week campaign: a sort-and-score challenge, a goodies quiz, reels and posters, a skit and film night, and a drop-off point in the main block. Paired with a formal-vs-informal recycling dashboard.",
    tags: ["Campaign", "Campus", "Reuse", "Live dashboard"],
    date: "2026-09",
    dateLabel: "Sep 2026",
    status: "Submitted",
    group: [],
    feature: "video",
    cover: {
      src: "thumbs/ese-07-campaign-poster.webp",
      alt: "E-Waste Week campus campaign poster"
    },
    files: [
      {
        kind: "JPEG",
        label: "E-Waste Week campaign poster",
        path: "files/ese-07-campaign-poster.jpeg",
        meta: "JPEG · Poster"
      },
      {
        kind: "MP4",
        label: "E-Waste Week campaign video",
        path: "files/ese-07-campaign-video.mp4",
        meta: "MP4 · 10 sec",
        video: true
      },
      {
        kind: "LINK",
        label: "edashb.netlify.app",
        url: "https://edashb.netlify.app",
        note: "Formal vs Informal E-Waste Recycling Dashboard"
      }
    ]
  },
  {
    id: 8,
    type: "ESE",
    title: "Green Building Scorecard",
    kicker: "Green buildings · LEED scorecard",
    description:
      "A comparative scorecard for ten certified green buildings across India, scored on six criteria out of 60, plus a live tool that lets you score your own building and compare certifications.",
    tags: ["LEED", "Green buildings", "Scorecard", "Live tool"],
    date: "2026-09",
    dateLabel: "Sep 2026",
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ese-08-green-building.webp",
      alt: "Green Building Scorecard live website"
    },
    files: [
      {
        kind: "XLSX",
        label: "Green Building Scorecard workbook",
        path: "files/ese-08-green-building.xlsx",
        meta: "XLSX · 10 buildings · 6 criteria",
        office: true
      },
      {
        kind: "LINK",
        label: "zippy-llama-956de9.netlify.app",
        url: "https://zippy-llama-956de9.netlify.app",
        note: "Green Building Scorecard"
      }
    ]
  },
  {
    id: 9,
    type: "ESE",
    title: "Pune's SWaCH Model",
    kicker: "Case study · Pune's SWaCH",
    description:
      "A case study of Pune's worker-owned SWaCH cooperative: 3,800+ members, roughly nine lakh households, user-fee door-to-door collection, source segregation and a municipal partnership that turns waste pickers into formal partners.",
    tags: ["Case study", "SWaCH", "Informal sector", "Circular economy"],
    date: "2026-09",
    dateLabel: "Sep 2026",
    status: "Submitted",
    group: [],
    cover: {
      src: "thumbs/ese-09-swach-case-study.webp",
      alt: "First page of the Pune SWaCH case study"
    },
    files: [
      {
        kind: "DOCX",
        label: "Pune's SWaCH Model — case study",
        path: "files/ese-09-swach-case-study.docx",
        meta: "DOCX · Case study",
        office: true
      }
    ]
  },
  {
    id: 10,
    type: "ESE",
    title: "Cartify",
    kicker: "IEEE paper · Cartify",
    description:
      "An IEEE-format recommender paper: a quality-gated catalogue pipeline certifying 17,931 products from 572,083 records, a star-schema warehouse and a four-model attention fusion that beats NCF (HR@10 0.327 vs 0.260).",
    tags: ["IEEE format", "Recommender systems", "AI", "Data engineering"],
    date: "2026-10",
    dateLabel: "Oct 2026",
    status: "Submitted",
    group: ["Dhiraj Pawar", "Kalpesh Sawkare", "Sainath Nanaware"],
    cover: {
      src: "thumbs/ese-10-cartify-paper.webp",
      alt: "First page of the Cartify research paper"
    },
    files: [
      {
        kind: "PDF",
        label: "Cartify — IEEE paper",
        path: "files/ese-10-cartify-paper.pdf",
        meta: "PDF · 5 pages"
      }
    ]
  }
];

const PROJECTS = [
  {
    title: "MP E-Waste Intelligence",
    subtitle: "Command Center",
    description:
      "A live 20-district view of Madhya Pradesh's e-waste generation, collection, recycling, compliance and outreach.",
    assignment: "Assignment 01",
    url: "https://mp-ewaste-buddy.lovable.app",
    cta: "Open the command center"
  },
  {
    title: "Circuit & Salvage",
    subtitle: "EPR Compliance Review",
    description:
      "An EPR compliance reference and target calculator for five Indian electronics manufacturers.",
    assignment: "Assignment 05",
    url: "https://ewastecalc-98.netlify.app",
    cta: "Open the EPR tool"
  },
  {
    title: "Formal vs Informal",
    subtitle: "E-Waste Dashboard",
    description:
      "A global and EU comparison of formal collection against informal recycling, with health, cost and material-value panels.",
    assignment: "Assignment 07",
    url: "https://edashb.netlify.app",
    cta: "Open the dashboard"
  },
  {
    title: "Green Building",
    subtitle: "Scorecard",
    description:
      "A comparative scorecard for ten Indian green buildings, with a live score-your-own-building tool.",
    assignment: "Assignment 08",
    url: "https://zippy-llama-956de9.netlify.app",
    cta: "Open the scorecard"
  }
];

const THEMES = [
  {
    number: "01",
    title: "Evidence",
    description:
      "Measure the problem before proposing a fix: state ledgers, district scorecards, building ratings and course-level outcomes.",
    assignments: ["A00", "A01", "A03", "A08"]
  },
  {
    number: "02",
    title: "Recovery",
    description:
      "Recover value from the material stream: plasma-arc smelting, recovered metals and the circular-economy case for urban mining.",
    assignments: ["A02", "A04"]
  },
  {
    number: "03",
    title: "Adoption",
    description:
      "Turn evidence into practice: EPR compliance, policy briefings, campus campaigns, cooperative case studies and AI systems.",
    assignments: ["A05", "A06", "A07", "A09", "A10"]
  }
];
