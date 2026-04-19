# CHANGELOG — ArbCut Website

Newest entries at the top. Each session appends its own dated block.

---

## 2026-04-19 — Replaced Fraunces with Playfair Display
- Replaced Fraunces with Playfair Display due to missing Lithuanian ū glyph in Fraunces. Updated Google Fonts import in `index.html` and `success.html`, `--font-display` in `styles.css`, and all 6 SVG logo files. Zero remaining Fraunces references in code.

---

## 2026-04-19 — Large-screen font scaling
- Added `html { font-size: 18px }` at ≥1440px and `html { font-size: 20px }` at ≥1920px — scales all rem-based values proportionally on large monitors.

---

## 2026-04-19 — Hero portrait frame, About text-only, service card border fix

### Fix 1 — Hero: portrait-frame layout on desktop
- Grid changed from `50fr 50fr` to `1fr minmax(280px, 440px)` — text column fluid, photo column portrait-constrained
- Tablet: `1fr minmax(240px, 360px)`
- Photo: reverted to `height: auto; object-fit: contain` (no cropping); `max-width: 440px` desktop, `max-width: 400px` mobile
- Border: thinned from `2px` to `1.5px`. Added rust-tinted offset shadow `6px 6px 0 0 rgba(184,91,50,0.25)` for framed-portrait feel
- Mobile: untouched — no styling changes below 768px

### Fix 2 — About: text-only layout, bigger stats
- Removed `.about__grid` wrapper and `.about__image` / `about-collage.jpg` reference from HTML
- New layout: single column, `max-width: 760px; margin-inline: auto; text-align: center`
- Added `.about__rule` — 40×2px rust rule above eyebrow
- Section padding increased ~20%: `calc(var(--section-py) * 1.2)`
- Stat numbers: `clamp(2.2rem→2.75rem, 5vw, 4rem→4.5rem)` — significantly bolder
- `.about__stat` now `align-items: center` for centered column content
- `about-collage.jpg` still on disk at `assets/images/gallery/` — no longer referenced
- Optional upgrade noted in PRD: portrait photo of Mantas can be re-introduced later

### Fix 3 — Service card: featured card border
- Root cause: `border-color: transparent` left a 1px transparent border; CSS `background-image` stops at the content/padding edge, not the border edge — creating a 1px cream-colored outline at card edges
- Fix: changed `border-color: transparent` → `border: none` on `.service-card--featured`
- Removed redundant `border-color: transparent` on `.service-card--featured:hover`
- Secondary service cards unchanged (keep intentional 1px border)

### Content needed from client
1. `YOUR_WEB3FORMS_ACCESS_KEY` — replace in both forms
2. `redirect` hidden inputs — absolute URL once domain is live
3. ~~`{{ METAI_PATIRTIES }}`~~ — filled: **15+**
4. Confirm all gallery captions
5. Confirm FAQ insurance item
6. Optional: professional portrait photo of Mantas for About section

---

## 2026-04-19 — Gallery complete, hero photo desktop fix, about image integrated

### Change 1 — Gallery: all real photos, no placeholders
- Removed all 8 arbor2–arbor9 placeholder items (images never delivered)
- Added 5 new photos from `assets/images/gallery/`: `485918178...jpg`, `485962117...jpg`, `58933234...jpg`, `60338341...jpg`, `67232092...jpg`
- Gallery is now 11 real photos, 0 placeholders
- Layout: 2 `--tall` items (featured position + Laidai2); all others standard
- All captions flagged for client confirmation — currently using descriptive Lithuanian placeholders

### Change 2 — Hero photo: explicit height on desktop
- Changed from `height: auto; object-fit: contain` to `height: clamp(380px, 65vh, 720px); object-fit: cover` on desktop
- Tablet: `height: clamp(320px, 55vh, 500px)`
- Mobile unchanged: `height: auto; object-fit: contain; max-width: 400px` (was working well)
- Note: `cover` crops slightly vs. `contain` — if the full photo must be uncropped, switch back and accept the height limitation

### Change 3 — About image: full-height integration
- `.about__grid` on desktop: `align-items: stretch` (was `start`)
- `.about__image` on desktop: `align-self: stretch; min-height: 560px` — fills full section height
- Removed `translateY(24px)` editorial offset
- Stronger shadow: `8px 8px 0 0 var(--color-bark), var(--shadow-heavy)`
- `.about__img`: `height: 100%; object-fit: cover; object-position: center top` — fills the column

### Content needed from client
1. `YOUR_WEB3FORMS_ACCESS_KEY` — replace in both forms
2. `redirect` hidden inputs — absolute URL once domain is live
3. `{{ METAI_PATIRTIES }}` — years of experience
4. Confirm all gallery captions
5. Confirm FAQ insurance item

---

## 2026-04-19 — New logo system, larger hero photo, PRD update

### Change 1 — Logo system (5 new SVG files)
- `assets/logo-horizontal.svg` — primary logo, forest green wordmark + rust line-art tree; for cream/scrolled header
- `assets/logo-horizontal-light.svg` — same, cream wordmark; for dark backgrounds (hero, footer)
- `assets/logo-stacked.svg` — stacked brand asset (rust circle + dark tree, rust rule, wordmark, "ARBORISTAI"); light backgrounds
- `assets/logo-stacked-light.svg` — stacked brand asset, cream wordmark; dark backgrounds
- `assets/favicon.svg` — rust rounded-square with deep-forest tree; browser tab icon
- Retired `logo.svg` and `logo-dark.svg` — replaced by horizontal variants in all site references
- Header: swapped to `logo-horizontal-light.svg` (over hero) and `logo-horizontal.svg` (scrolled); existing CSS swap mechanism unchanged
- Footer: swapped to `logo-horizontal-light.svg`; width `126px`/height `36px`
- `<head>`: added `<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">`
- Stacked logos are brand assets only — not rendered on the site

### Change 2 — Hero photo enlarged
- Desktop: `max-width` 480px → 640px; grid `55fr 45fr` → `50fr 50fr` (equal columns)
- Tablet (768–1023px): grid `60fr 40fr` → `55fr 45fr`; photo `max-width` 340px → 420px
- Mobile: photo `max-width` 320px → 400px
- All other photo CSS unchanged (border, border-radius, object-fit, saturate filter)

### Change 3 — Documentation
- `PRD.md` bumped to v1.3 (2026-04-19)
- §4.1 header: logo swap behavior documented with correct filenames
- §4.2 hero: updated to reflect solid-bg grid layout with new photo sizes
- §5.8 Logo system: new subsection added
- §9: removed "Logo SVG" from content-needed list

### Content needed from client
1. `YOUR_WEB3FORMS_ACCESS_KEY` — replace in both forms (inline + modal)
2. `redirect` hidden inputs — update to absolute URL once domain is live
3. `{{ METAI_PATIRTIES }}` — years of experience
4. `arbor2–arbor9.jpg` — drop into `assets/images/`
5. Confirm captions for `wrok3.jpg`, `469310067_...jpg`, `51851939_...jpg`
6. Confirm FAQ insurance item (still commented out)
7. Client may commission a fully custom logo later — current set is production-ready but type-only (no bespoke illustration)

---

## 2026-04-19 — Hero layout restore, collage, header type, gallery, placeholder logo

### Change 1 — Hero: solid background + right-side supporting photo
- Replaced cinematic full-bleed gradient hero with solid `--color-forest-deep` (#142620) background
- Layout: CSS Grid `55fr 45fr` (desktop), `60fr 40fr` (tablet 768–1023px), single column (mobile)
- Hero photo: `assets/images/hero.jpg` — `object-fit: contain`, `max-width: 480px` desktop / `340px` tablet / `320px` mobile; rust 2px border; `filter: saturate(0.95)`
- Mobile: photo column appears below text (`order: 1`)
- Removed `.hero__bg` div and all cinematic gradient CSS
- All copy unchanged: headline, subheadline, CTAs, trust line, scroll chevron

### Change 2 — About: collage image
- Found at `assets/images/gallery/about-collage.jpg`
- Updated About section `src` and `alt` (`ArbCut komandos darbai`)
- Kept existing editorial CSS (translateY offset, bark box-shadow)

### Change 3 — Header: typography bump
- `.site-nav__link` font-size: `0.9rem` → `1.05rem` desktop; `1rem` at 768–1023px
- Logo height bumped to `48px`
- `.site-header__cta` explicit `font-size: 1rem; padding: 13px 24px`

### Change 4 — Gallery: 6 new photos + tablet 3-col layout
- Added `@media (min-width: 768px)` for `grid-template-columns: repeat(3, 1fr)` (was 2→4 jump)
- 6 new real photos interspersed: `Geras namas.jpg`, `Laidai2.jpg`, `wrok3.jpg`, `Geras namas2.jpg`, `469310067_...jpg`, `51851939_...jpg`
- 3 generic captions flagged for client confirmation (`wrok3`, two Facebook-named files)
- arbor2–arbor9 placeholders kept; show broken until client provides files

### Change 5 — Logo: placeholder wordmark SVGs
- `assets/logo.svg` — Fraunces/Georgia 700, cream `#F4EFE6`, rust dot `#B85B32`
- `assets/logo-dark.svg` — same, forest `#1F3A2E` text
- Header: two `<img>` tags; CSS swaps on `.is-scrolled`
- Footer: removed `filter: brightness(0) invert(1)` — cream logo is legible on dark bg
- **Placeholder for pitch — client must commission professional logo before launch**

### Content needed from client
1. `YOUR_WEB3FORMS_ACCESS_KEY` — replace in both forms (inline + modal)
2. `redirect` hidden inputs — update to absolute URL once domain is live
3. `{{ METAI_PATIRTIES }}` — years of experience
4. `arbor2–arbor9.jpg` — drop into `assets/images/`
5. Professional logo SVG — current files are pitch placeholders
6. Confirm captions for `wrok3.jpg`, `469310067_...jpg`, `51851939_...jpg`
7. Confirm FAQ insurance item (still commented out)

---

Format:
```
## YYYY-MM-DD — short session title
- what changed
### Open items
- thing still to do
```

---

## 2026-04-18 — Cinematic hero, typography bump, header states, gallery pending

### Change 1 — Hero: cinematic full-bleed bottom-gradient
- Replaced split-screen (two-column CSS Grid) with single full-bleed photo hero
- `min-height: 100vh` on all breakpoints — cinematic full-viewport
- Photo: `assets/images/Main.jpg`, `background-size: cover`, `filter: saturate(0.9) contrast(1.05)`
- Gradient overlay (`::after` on `.hero__bg`): transparent at top, near-black at bottom (`rgba(15,21,18,0.95)` at 100%)
- Mobile gradient strengthened — starts darkening at 25% (desktop: 35%) for shorter viewports
- Text anchored bottom-left via `align-items: flex-end` + `padding: 0 clamp(24px,6vw,96px) clamp(64px,10vh,128px)`
- Mobile text centered; CTAs stacked full-width below 480px
- Rust rule (40×2px) above headline retained; scroll chevron retained
- Removed: `.hero__text-col`, `.hero__image-col`, `.hero__photo`, responsive split CSS

### Change 2 — Typography scale bump
| Element | Before | After |
|---------|--------|-------|
| Body mobile | 17px | 18px |
| Body desktop | 18px | 19px |
| `h1,h2,h3,h4` line-height | 1.15 | 1.1 |
| Body line-height | 1.6 | 1.65 |
| Section eyebrow | 0.75rem | 0.9rem |
| Hero headline | clamp(2.2rem,5.5vw,4.2rem) | clamp(2.75rem,7vw,6rem) |
| Hero subheadline | clamp(1rem,2vw,1.2rem) | clamp(1.1rem,1.5vw,1.35rem) |
| Section title H2 | clamp(1.9rem,4vw,3rem) | clamp(2.25rem,5vw,4rem) |
| About title H2 | clamp(1.7rem,3.5vw,2.5rem) | clamp(2.25rem,5vw,4rem) |
| Service card title | 1rem | clamp(1rem,1.4vw,1.2rem) |
| Featured service title | 1.2rem | clamp(1.25rem,2vw,1.6rem) |
| FAQ question | 1.05rem | 1.15rem |

### Change 3 — Header navigation contrast fix
- State 1 (over hero, transparent): nav links `--color-text-light` + `text-shadow: 0 1px 3px rgba(0,0,0,0.35)` for over-photo readability. Logo white (`filter: brightness(0) invert(1)`). Hamburger bars white.
- State 2 (scrolled past hero): `background-color: rgba(244,239,230,0.95)` cream + `backdrop-filter: blur(12px)` + `border-bottom: 1px solid rgba(20,38,32,0.06)`. Nav links `--color-forest`. Logo reverts to real SVG colors (`filter: none`). Hamburger bars `--color-forest`.
- `script.js`: header threshold changed from `scrollY > 60` to `scrollY > hero.offsetHeight * 0.8` — transitions only after 80% of hero is scrolled past
- Nav link `.is-active` indicator: 2px rust underline (`scaleX` animation, 200ms). Set via IntersectionObserver on section IDs matched to nav hrefs.
- Nav link `position: relative` added to support `::after` indicator

### Change 4 — Gallery new photos (BLOCKED)
- `assets/images/gallery/` folder does not exist — no new photos on disk
- No changes made to gallery HTML

### Content needed from client
1. **Hero photo** — current photo (`Main.jpg`) should be replaced with a dramatic climbing/at-height arborist shot. Provide high-res (≥1920px wide) when available.
2. **Gallery photos** — drop additional images from paslaugos.lt into `assets/images/gallery/` for integration next session
3. Gallery captions (`arbor2–arbor9`) still awaiting client confirmation
4. `{{ METAI_PATIRTIES }}` — years of experience still needed
5. `YOUR_WEB3FORMS_ACCESS_KEY` — must be replaced in both forms (inline + modal) before launch
6. `redirect` hidden inputs — update to absolute URL once domain is live
7. Replace placeholder `assets/logo.svg` with final client logo

---

## 2026-04-18 — M5 session: modal, split hero, featured services, polish

### Change 1 — Header "Palikti užklausą" modal
- Replaced `Skambinti` header CTA with a `Palikti užklausą` button (`data-modal-trigger`) that opens an inquiry modal overlay
- Replaced mobile menu CTA (`Skambinti +370…`) with the same modal trigger
- Hero secondary CTA now opens modal instead of scrolling to `#kontaktai` — all three "Palikti užklausą" instances consistent
- Modal spec: `rgba(15,21,18,0.72)` backdrop + `backdrop-filter: blur(4px)`, max-width 520px, mobile full-width, fade+slide-up 250ms, `prefers-reduced-motion` respected
- Modal fields match inline form (Vardas, Kontaktai, Miestas, Žinutė, hidden Web3Forms fields, botcheck honeypot)
- Modal accessibility: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, close button `aria-label="Uždaryti"`, focus trap, focus returns to trigger on close, body scroll locked
- `script.js`: new `openModal()`/`closeModal()` functions; Esc key, backdrop click, × button all close; Tab focus trap; mobile menu auto-closes on modal open

### Change 2 — Hero split-screen redesign
- Hero restructured from single-column full-bleed to CSS Grid split-screen
- Mobile (<768px): image on top (60vh, `Main.jpg`), forest-deep text block below
- Tablet (768–1023px): 60/40 text/image side-by-side, min-height 80vh
- Desktop (≥1024px): 55/45 text/image, min-height 85vh
- Hard vertical divide — no gradient blend between columns
- Image: `assets/images/Main.jpg`, `object-fit: cover`, `filter: saturate(0.9)`, subtle left-edge gradient overlay (20% opacity, 80px wide) on `::after`
- Rust decorative rule (40×2px) added above headline — editorial flourish
- Scroll-down chevron (`position: absolute`) still visible at bottom-center

### Change 3 — Services section: featured + grid hybrid
- Top row: 3 featured cards (Medžių pjovimas, Pavojingų medžių šalinimas, Darbai su autobokšteliu)
  - `Work1.jpg`, `Laidai.jpg`, `Technika.jpg` as background images respectively
  - Dark gradient overlay from bottom; title/desc pinned at bottom via `.service-card__featured-body`
  - Icon tucked top-right at 26px; on hover: overlay darkens, card lifts
- Bottom row: 5 secondary services (Genėjimas, Kelmų naikinimas, Aukštuminiai darbai, Aplinkos tvarkymas, Sklypų valymas)
  - Same icon-card style as before, slightly more compact (`padding: var(--space-5)`)
  - 5-column at ≥1024px, 3-col at ≥640px (via shared `.services__grid`), 1-col mobile

### Change 4 — Polish: about, stats, gallery hierarchy
- **About image**: `src` updated from missing `arbor2.jpg` to `assets/images/Geras namas2.jpg`
- **About image (desktop)**: column widened to 45fr, editorial `translateY(24px)` offset, `box-shadow: 5px 5px 0 0 var(--color-bark)` border treatment
- **Stats row**: numbers upgraded to `clamp(2.2rem, 5vw, 4rem)` Fraunces display font, thin `var(--color-moss)` vertical dividers between stats at ≥640px, labels uppercase + tracked-out
- **Gallery hierarchy**: first item already `gallery__item--tall` (spans 2 rows at ≥1024px) — confirmed working, no change needed
- **Grain texture**: confirmed rendering via `body::after` SVG feTurbulence at 3.5% opacity

### Content still needed from client
1. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in **both** `index.html` forms (inline + modal)
2. Update `redirect` hidden inputs to absolute URL once domain is live
3. Replace `{{ METAI_PATIRTIES }}` with actual years of experience
4. Supply `hero.jpg` if desired (currently using `Main.jpg`)
5. Replace placeholder logo SVG
6. Confirm FAQ insurance item (currently commented out)
7. Drop gallery images `arbor2.jpg`–`arbor9.jpg` into `assets/images/`

---

## 2026-04-18 — Mobile audit: 375px fixes

### Bugs fixed
| # | Issue | Fix |
|---|-------|-----|
| 1 | `html` missing `overflow-x: hidden` — iOS could still swipe horizontally | Added to `html` rule (body alone is insufficient on iOS) |
| 2 | Hamburger not pushed to right edge at 375px — CTA is `display:none` below 480px leaving no `margin-left: auto` on any element | Added `margin-left: auto` to `.hamburger` via `@media (max-width: 479px)` |
| 3 | Hamburger touch target 40×40px — 4px below 44px WCAG minimum | Bumped to 44×44px |
| 4 | Form inputs `font-size: 0.95rem` — fragile on iOS zoom threshold | Explicit `font-size: 16px` on inputs at `max-width: 767px` |
| 5 | `aukstuminiai.darbai@yahoo.com` overflowed contact card and footer at 375px | `word-break: break-all` + `overflow-wrap: break-word` on `.contact-card__value` and `.site-footer__contact li` |
| 6 | `.why__grid` was 2 columns on mobile — cards only ~87px wide after padding, text unreadable | Changed to 1 column on mobile, 2 cols from 480px, 4 cols from 900px |
| 7 | Hero CTAs (`flex-wrap`) could leave one wide + one narrow button side-by-side at 375px | Stacked to full-width column at `max-width: 479px` |
| 8 | About stats 3 cols cramped at 375px | Changed to 2-col grid at `max-width: 479px` |
| 9 | Lightbox arrows overlapped image on mobile | Reduced arrow size and inset on `max-width: 767px` |
| 10 | Sticky call button could be cut off by iOS home indicator | Added `safe-area-inset-bottom` via `@supports` |

---

## 2026-04-18 — M3 + M4: Form, polish, complete

### M3 — Form
- Built inquiry form section (`#kontaktai`) with Web3Forms `POST` action
- Fields: Vardas (required), Telefonas arba el. paštas (required), Miestas/vietovė (optional), Žinutė (required)
- Hidden fields: `access_key` placeholder, `subject`, `from_name`, `redirect`
- Honeypot `botcheck` field for spam protection
- Submit button disables itself (`.is-submitting`) during form post to prevent double-sends
- `redirect` value is currently relative (`success.html`) — **must be updated to absolute URL once domain is live for Web3Forms redirect to work**
- **`access_key` is a placeholder — client/developer must sign up at web3forms.com, enter `aukstuminiai.darbai@yahoo.com`, and paste the key into the HTML**

### M4 — Polish (items completed across M1–M3)
- Hero staggered fade-up on load ✓
- Scroll reveal via `IntersectionObserver` for all below-fold sections ✓
- Stagger delays on service cards and why-cards ✓
- Sticky call button pulse animation (4s loop, scale 1→1.05→1) ✓
- Sticky call button hides when form or footer enters viewport ✓
- Grain texture via inline SVG `feTurbulence` data-URI ✓
- All gallery images `loading="lazy"`, hero image served via `background-image` ✓
- `btn--forest` consolidated from `success.html` local `<style>` into `styles.css` ✓

### Action required before launch
1. Sign up at https://web3forms.com → enter `aukstuminiai.darbai@yahoo.com` → copy access key
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html` (line with `name="access_key"`)
3. Update `redirect` hidden input to absolute URL (e.g. `https://arbcut.lt/success.html`)
4. Drop gallery images (`arbor2.jpg`–`arbor9.jpg`) + hero photo into `assets/images/`
5. Replace `{{ METAI_PATIRTIES }}` in About section with actual years
6. Confirm FAQ insurance item with client → uncomment if applicable
7. Replace placeholder logo SVG with final client logo

---

## 2026-04-18 — M2: Content sections

### Built
- **Contact strip** — phone + email cards, earthy background, hover lift
- **About** — two-column layout (image + text), body copy from PRD, 3 stat blocks (`{{ METAI_PATIRTIES }}` placeholder), CTA to services
- **Services** — 8-card grid (4 cols desktop / 2 tablet / 1 mobile), hand-drawn SVG icons, hover lift + icon color shift
- **Gallery** — CSS Grid masonry (4 cols + 3 tall items on desktop), caption overlay on hover, full lightbox with prev/next/close/keyboard arrows/swipe
- **Why ArbCut** — dark forest section, 4 trust point cards with icons, subtle hover glow
- **FAQ** — `<details>/<summary>` accordion (5 items), animated chevron, max-width column
- **Scroll reveal** — `IntersectionObserver` for all `.js-reveal-scroll` elements with 12% threshold; service and why-card stagger delays
- **Lightbox** — keyboard nav (←/→/Esc), swipe support, focus management (returns to triggering item on close)
- `btn--forest` moved to main `styles.css` (was only in `success.html` local styles)

### Placeholders
- Gallery images (`arbor2.jpg`–`arbor9.jpg`) — not yet in repo; client/user to supply
- About image (uses `arbor2.jpg` as stand-in)
- `{{ METAI_PATIRTIES }}` in About stats — client to confirm years
- FAQ item 6 (insurance) — commented out pending client confirmation
- Gallery captions — Lithuanian placeholder labels, client to confirm

### Open items (M3)
- Build inquiry form section with Web3Forms integration
- Wire up `success.html` redirect
- Final CHANGELOG entry for M3

---

## 2026-04-18 — M1: Skeleton + design system

### Created
- `index.html` — full document skeleton: sticky header with hamburger nav, full hero section, footer with all three columns, sticky mobile call button, placeholder stubs (empty `<section>` tags) for all M2/M3 sections
- `styles.css` — complete design system (all CSS custom properties per PRD), reset, button variants, header scroll state, mobile menu overlay, hero with staggered reveal classes, sticky call button with pulse animation, full footer layout
- `script.js` — header `.is-scrolled` toggle, mobile nav open/close (Escape + backdrop click), hero staggered fade-up on load, sticky call button hides when form/footer in view, smooth-scroll polyfill
- `success.html` — minimal thank-you page with consistent header/footer
- `assets/logo.svg` — placeholder tree-mark + "ArbCut" wordmark using currentColor (works on both light and dark)
- `assets/images/` — directory created (empty; awaiting client photos)

### Design decisions
- Hero background is CSS gradient fallback until client supplies `hero.jpg` — drop the file in `assets/images/` and it auto-applies
- Logo uses `filter: brightness(0) invert(1)` in header/footer so a single SVG works on dark backgrounds
- Grain texture via inline SVG `feTurbulence` data-URI at 3.5% opacity — no extra network request

### Open items (M2)
- Build contact strip, about, services (8 cards + SVG icons), gallery (masonry + lightbox), why-arbcut, FAQ accordion
- Add gallery images — competitor images `arbor2.jpg`–`arbor9.jpg` still needed

### Content needed from client
- Hero photo (high-res, forest/climbing scene)
- Logo SVG (replacing placeholder)
- Years of experience (`{{ METAI_PATIRTIES }}`)
- Insurance status (FAQ item 6)
- Any testimonials
- Gallery image captions / confirmation of what each photo shows

---

## 2026-04-18 — Project kickoff

- Received competitor reference: https://white-locust-900345.hostingersite.com/
- Decided on single-page static HTML/CSS/JS site, Lithuanian, rugged/outdoorsy direction.
- Wrote `CLAUDE.md` (project context for every session).
- Wrote `PRD.md` v1.0 (scope, sections, copy, design system).
- No code written yet.
