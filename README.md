# Preet Panaviya · EWEM Semester 5

A hand-built static archive for **E-Waste Management (EWEM), Semester 5, 2026–27** at Vidyalankar Institute of Technology.

**Live site:** https://preet8808.github.io/preet-ewem-dashboard/

Eleven submissions — four ISA and seven ESE — collected on one shelf with previews, source files, four live tools and a month-by-month record. The design is original: paper, graphite, copper and signal green, with an eleven-node circuit ring as the hero. Light is the default; a dark theme is one click away and remembered.

## What is in the archive

| # | Assessment | Submission | Formats | Live |
|---|---|---|---|---|
| A00 | ISA | Course Insights | PDF | — |
| A01 | ISA | Madhya Pradesh E-Waste Ledger | DOCX, XLSX | [mp-ewaste-buddy.lovable.app](https://mp-ewaste-buddy.lovable.app) |
| A02 | ISA | Elemental Blueprint | JPEG poster | — |
| A03 | ISA | Kerala E-Waste Landscape | PDF deck | — |
| A04 | ESE | Plasma Arc Metal Recovery | PDF | — |
| A05 | ESE | EPR Compliance Review — five companies | DOCX | [ewastecalc-98.netlify.app](https://ewastecalc-98.netlify.app) |
| A06 | ESE | India Environmental Policy Briefing | PPTX | — |
| A07 | ESE | E-Waste Week Campus Campaign | JPEG, MP4 | [edashb.netlify.app](https://edashb.netlify.app) |
| A08 | ESE | Green Building Scorecard | XLSX | [zippy-llama-956de9.netlify.app](https://zippy-llama-956de9.netlify.app) |
| A09 | ESE | Pune's SWaCH Model | DOCX | — |
| A10 | ESE | Cartify — IEEE paper | PDF | — |

The four `.txt` website shortcuts were turned into proper live-link rows, using each filename as the link text. All source files are published as handed in; nothing has been redacted or excluded. Dates are recorded at month level. All eleven submissions are marked submitted, and no marks are shown.

## Structure

```
.
├── index.html          page shell, hero, sections, dialog
├── styles.css          full design system, light + dark, responsive
├── app.js              renders cards, ring, timeline, projects, themes
├── data.js             all content — edit this to change the archive
├── files/              the 13 published source files
├── thumbs/             eleven WebP card previews
├── favicon.svg         circuit-ring monogram
├── og.png              1200 × 630 social card
└── README.md
```

There is no build step, framework or package install. GitHub Pages serves the folder as-is.

## Editing the archive

Everything visible comes from `data.js`:

- `SITE` — name, course, college, repository and live URLs.
- `ASSIGNMENTS` — one object per submission. Fields include `id`, `type`, `title`, `kicker`, `description`, `tags`, `date`, `dateLabel`, `status`, `group`, `cover`, `files` and an optional `feature: "video"`.
- `PROJECTS` — the four live-project cards.
- `THEMES` — Evidence, Recovery and Adoption, each with its assignment codes.

To add a file, drop it into `files/`, add a preview to `thumbs/`, then add a file entry in `data.js`. Office documents (`DOCX`, `XLSX`, `PPTX`) need `office: true` so the detail view uses Microsoft's online viewer; PDFs, images and video open directly.

## Local preview

Any static server works:

```bash
npx serve .
```

Then open the printed localhost URL. Opening `index.html` from the filesystem also works, though Office previews only resolve once the site is served over HTTP.

## Deployment

The site is published from the `main` branch root of the public repository:

**https://github.com/Preet8808/preet-ewem-dashboard**

GitHub Pages: **Settings → Pages → Deploy from a branch → main → / (root)**.

## Colophon

Design and build: Preet Panaviya. Typefaces: Instrument Serif, Space Grotesk and IBM Plex Mono (Google Fonts). Previews were rendered from the source documents; A01, A05 and A08 use screenshots of their live sites. No template, no marks, one semester.
