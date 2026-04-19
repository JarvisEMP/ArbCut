# CLAUDE.md — ArbCut Website

You are working on a single-page marketing website for **ArbCut** (arboristas Mantas Gerulis), a Lithuanian arborist / tree-care business based in Lithuania. Read this file at the start of every session. Then read `PRD.md` for what to build and `CHANGELOG.md` for what has already been done.

---

## Project snapshot

- **Client:** Mantas Gerulis, one-man arborist company ArbCut (with an occasional crew).
- **Goal of the site:** Drive phone calls and email inquiries. That is the *only* conversion metric that matters. Every design decision should serve "make this person pick up the phone."
- **Language:** Lithuanian only. Do not translate to English. Copy is provided in `PRD.md`.
- **Scope:** Single-page site (one HTML file) with smooth-scroll sections + a simple success page for the contact form. No CMS, no backend.

---

## Tech stack (keep it boring and fast)

- **HTML5** — semantic, hand-written
- **CSS** — plain CSS with CSS custom properties (no framework, no Tailwind). Single `styles.css` file is fine; split only if it grows past ~800 lines.
- **Vanilla JS** — minimal. Used only for: mobile nav toggle, smooth scroll, gallery lightbox, scroll-reveal animations, sticky call button logic. No libraries unless absolutely required.
- **Fonts:** Google Fonts (see PRD for exact families)
- **Icons:** Inline SVG only. No icon fonts, no icon libraries.
- **Form backend:** [Web3Forms](https://web3forms.com) (free, no signup required for the user — just an access key in a hidden input). Formspree is an acceptable alternative. Do NOT write a backend.
- **Hosting target:** Static host. Default assumption is **Netlify drag-and-drop**, with Hostinger as a fallback since the client already uses it for the competitor site.

---

## File structure

```
arbcut/
├── index.html              # the entire site (single page)
├── success.html            # thank-you page after form submit
├── styles.css              # all styles
├── script.js               # all JS
├── assets/
│   ├── images/             # gallery photos, hero photo, about photo
│   ├── icons/              # SVG service icons if extracted to files
│   └── logo.svg            # (client will provide; use placeholder for now)
├── CLAUDE.md               # this file
├── PRD.md                  # what we're building
└── CHANGELOG.md            # session-by-session log
```

---

## Conventions

### Code style
- **HTML:** 2-space indent, semantic tags (`<header>`, `<section>`, `<nav>`, `<footer>`, `<article>`). Every `<section>` gets an `id` so we can link to it from the nav.
- **CSS:** BEM-ish naming (`.service-card`, `.service-card__title`, `.service-card--featured`). Mobile-first media queries. Use `clamp()` generously for fluid typography.
- **JS:** ES6+, no transpilation. One IIFE or module per feature. Comment the *why*, not the *what*.
- **Lithuanian special characters:** always UTF-8. Test that ą, č, ę, ė, į, š, ų, ū, ž render correctly.

### Design conventions
- Mobile-first. Test at 375px, 768px, 1280px, 1920px.
- Never break the sticky "Skambinti" (Call) button on mobile — this is THE conversion element.
- Accessibility: all images have alt text in Lithuanian, focus states on every interactive element, color contrast ≥ 4.5:1 on body text.
- Performance budget: LCP < 2.0s on 4G, all images lazy-loaded except hero, all images served at appropriate sizes (no 4000px-wide JPEGs).

---

## Content rules (IMPORTANT)

- **Do not invent services, certifications, experience years, or testimonials.** If content is missing, use a `{{ PLACEHOLDER }}` marker in the HTML and add an entry to `CHANGELOG.md` under a "Content needed from client" section.
- **Phone and email are sacred.** They must be correct everywhere: `+370 603 66901` and `aukstuminiai.darbai@yahoo.com`. Phone in `tel:` links must be `tel:+37060366901` (no spaces).
- **Facebook link:** `https://www.facebook.com/MesGalimeTaiPadaryti/`
- **Tone of voice:** Competent, direct, a little rugged. Not corporate. Not salesy. Like a skilled tradesman who takes pride in his craft.

---

## Deployment flow

1. Build/edit locally. Open `index.html` in a browser to preview (no build step needed).
2. When ready, drag the `arbcut/` folder (excluding `.md` docs if preferred) onto Netlify.
3. Connect the client's domain once purchased.
4. Form submissions → Web3Forms → client's email inbox.

---

## What to do at the start of every session

1. Read this file.
2. Read `PRD.md`.
3. Read `CHANGELOG.md` — specifically the most recent entries.
4. Ask the user what they want to do in this session before touching files.

## What to do at the end of every session

1. Append a dated entry to `CHANGELOG.md` describing what changed.
2. If content is still missing from the client, list it under "Content needed from client" in `CHANGELOG.md`.
3. Do not commit placeholder `lorem ipsum` — use real Lithuanian copy from `PRD.md` or flag the gap.
