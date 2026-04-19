# PRD — ArbCut Website

**Version:** 1.4
**Last updated:** 2026-04-19
**Owner:** [your name]
**Client:** Mantas Gerulis — ArbCut (arborist / tree-care services, Lithuania)

---

## 1. Problem & goal

Mantas runs ArbCut, a one-man arborist operation (with a small crew when needed). He has a partially-finished competitor site built on WordPress/Elementor that looks generic and is not yet complete. He wants to see whether a custom-designed alternative is better before paying the previous developer to finish.

**Primary goal of the site:** generate phone calls and form inquiries from people in Lithuania who need tree work done (cutting, pruning, dangerous tree removal, stump grinding, aerial platform work, plot clearing).

**Success looks like:** a visitor lands on the site, understands within 5 seconds that ArbCut does tree work, sees proof (gallery), and taps either the phone button or fills the inquiry form.

**Non-goals:**
- E-commerce, booking calendar, payments.
- Blog or CMS.
- Multi-language support.
- Customer login / account area.

---

## 2. Audience

- Homeowners in Lithuania with a problem tree (dangerous, overgrown, fallen, blocking a view).
- Property managers, small businesses.
- Likely on mobile. Likely in a hurry. Likely comparing 2–3 arborists.

**Implication:** the site must load fast, work perfectly on mobile, and put the phone number everywhere.

---

## 3. Scope — pages & sections

### 3.1 Single-page site (`index.html`)

Order of sections top-to-bottom:

1. **Sticky header / nav**
2. **Hero**
3. **Quick contact strip** (phone + email as visible cards)
4. **About** ("Apie mus" / "ARBCUT")
5. **Services** ("Paslaugos") — 8 cards
6. **Gallery** ("Darbų galerija") — masonry/grid with lightbox
7. **Why ArbCut** (trust section — NEW vs. competitor)
8. **FAQ** (NEW vs. competitor — handles objections)
9. **Inquiry form** ("Palikite užklausą")
10. **Footer**

Plus a **sticky mobile call button** pinned to the bottom-right on mobile, always visible while scrolling.

### 3.2 Second page (`success.html`)

Minimal thank-you page shown after form submission. Says "Ačiū, susisieksime artimiausiu metu" with a button back to the home page. Keep header/footer consistent.

---

## 4. Section-by-section spec

### 4.1 Sticky header / nav

- Left: logo — `assets/logo-horizontal-light.svg` over hero, swaps to `assets/logo-horizontal.svg` when scrolled. Two `<img>` tags toggled via `.is-scrolled` CSS class on `<header>`.
- Right desktop: nav links — `Paslaugos`, `Galerija`, `Apie`, `DUK`, `Kontaktai`. All scroll-to-section. Font-weight 500.
- Right mobile: hamburger → fullscreen menu overlay.
- **Prominent "Palikti užklausą" button** on the right (`data-modal-trigger`), opens the inquiry modal (see §4.12). Visible from 480px up. Mobile menu CTA also opens the modal.
- **Two header states:**
  - **State 1 — over hero (transparent):** No background. Nav links `--color-text-light` with `text-shadow` for readability over photo. Logo: `logo-horizontal-light.svg` (cream wordmark + rust tree). Hamburger bars white.
  - **State 2 — scrolled past hero:** `background-color: rgba(244,239,230,0.95)` cream + `backdrop-filter: blur(12px)` + subtle border-bottom. Nav links `--color-forest`. Logo: `logo-horizontal.svg` (forest wordmark + rust tree). Hamburger bars `--color-forest`.
- Transition triggers when user has scrolled 80% of the hero height (`heroSection.offsetHeight * 0.8`).
- **Active section indicator:** nav link for the currently visible section shows a 2px rust underline (scaleX animation). Set via `IntersectionObserver` with 35% threshold.

### 4.2 Hero — solid dark background, split-grid with supporting photo

- **Full-viewport height:** `min-height: 100vh` on all breakpoints.
- **Solid background:** `--color-forest-deep` (#142620). No gradient overlay.
- **CSS Grid split:** `1fr minmax(280px, 440px)` desktop (text fluid, photo portrait-framed), `1fr minmax(240px, 360px)` tablet (768–1023px), single column mobile (photo below text, `order: 1`).
- **Supporting photo** (`assets/images/hero.jpg`): portrait-frame treatment on desktop — `height: auto; object-fit: contain; max-width: 440px` — displays at natural aspect ratio, no cropping. Rust 1.5px border, offset rust shadow `6px 6px 0 0 rgba(184,91,50,0.25)`, `border-radius: 4px`. Mobile: `max-width: 400px; height: auto; object-fit: contain`.
- **Text block:** grid column left, vertically centered. Mobile: centered, single column.
- Small rust horizontal rule (40×2px) above headline — editorial flourish. Centered on mobile.
- **Headline (H1):** `Medžių priežiūra aukštumoje — saugiai, atsakingai, iki galo.` `font-size: clamp(2.75rem, 7vw, 6rem)`.
- **Subheadline:** `Kvalifikuotas arboristas aukštalipys su komanda…` `font-size: clamp(1.1rem, 1.5vw, 1.35rem)`.
- **Two CTAs:** Primary `Skambinti +370 603 66901` (rust), Secondary `Palikti užklausą` (outline-light, opens modal §4.12). Stacked full-width below 480px.
- Trust line: `Veikiame visoje Lietuvoje • Dirbame saugiai ir švariai`.
- Animated scroll chevron at bottom-center (absolutely positioned, bob animation).

### 4.3 Quick contact strip

Two cards side by side (stack on mobile), full-width band with a slightly lighter earthy/wood-tone background:

- Card 1 — Phone icon + `+370 603 66901` (clickable `tel:` link).
- Card 2 — Email icon + `aukstuminiai.darbai@yahoo.com` (clickable `mailto:` link).

### 4.4 About — "Apie mus / ARBCUT"

- **Text-only layout** — no section image. Single column, `max-width: 760px`, centered horizontally.
- 40×2px rust rule above the eyebrow.
- Small eyebrow label: `APIE MUS`
- H2: `ARBCUT — medžių priežiūros meistrai`
- Body copy: two short paragraphs.
- **Three stat blocks** — large Playfair Display serif numbers `clamp(2.75rem, 5vw, 4.5rem)` (intentionally bold, visual anchor):
  - `{{ METAI_PATIRTIES }}+` / `metų patirtis` — **placeholder, client must confirm**
  - `20m` / `Aukštyje su nuosavu autobokšteliu`
  - `LT` / `Išvykstame visur Lietuvoje`
  - Centered within each column. Thin `var(--color-moss)` vertical dividers between stats.
  - Labels are uppercase, tracked-out, small (0.72rem).
- CTA button: `Žiūrėti paslaugas` → scrolls to services, centered.
- **Optional upgrade:** if client provides a professional portrait photo of Mantas (not an action shot from the gallery), a small right-side image can be re-introduced as a `45fr 55fr` split.

### 4.5 Services — "Paslaugos" — featured + grid hybrid

- H2: `Paslaugos` / Eyebrow: `KĄ DAROME`
- **Top row — 3 featured cards** (money-making services): Medžių pjovimas, Pavojingų medžių šalinimas, Darbai su autobokšteliu.
  - 3-col desktop (≥900px), 2-col tablet (≥640px), 1-col mobile.
  - Each card: background photo fills card, bottom-anchored dark gradient overlay, title + desc pinned to bottom. Icon tucked top-right (26px, semi-transparent).
  - Hover: overlay darkens, card lifts 4px.
  - Images: `Work1.jpg` / `Laidai.jpg` / `Technika.jpg`.
- **Bottom row — 5 secondary services**: Medžių genėjimas, Kelmų naikinimas, Aukštuminiai darbai, Aplinkos tvarkymas, Sklypų valymas.
  - 5-col desktop (≥1024px), uses shared `.services__grid` (3-col at 640px, 2-col at 580px, 1-col mobile).
  - Standard icon-card style, compact padding.
- Hover state on secondary cards: card lifts, icon shifts to rust, border glow.
- **Featured cards:** `border: none` (not `border-color: transparent`) — transparent border caused a 1px gap at card edges where the CSS background-image doesn't extend into the border area.

Cards (titles + descriptions locked from competitor, lightly refined):

1. **Medžių pjovimas** — Saugus medžių pjovimas įvairiomis sąlygomis — kiemuose, prie pastatų ar kitose sudėtingose vietose.
2. **Medžių genėjimas** — Profesionalus genėjimas ir lajos formavimas, kad medis liktų sveikas ir gražus.
3. **Pavojingų medžių šalinimas** — Avarinių ar pavojų keliančių medžių pjovimas šalia pastatų, elektros linijų ar kitų kliūčių.
4. **Kelmų naikinimas** — Kelmų frezavimas arba išrovimas, kad teritorija būtų paruošta tolimesniems darbams.
5. **Darbai su autobokšteliu** — Aukštuminiai darbai iki 20 metrų naudojant nuosavą autobokštelį.
6. **Aukštuminiai darbai** — Darbai aukštyje naudojant profesionalią alpinizmo įrangą sudėtingose vietose.
7. **Aplinkos tvarkymas** — Šakų smulkinimas, medienos išvežimas ir teritorijos sutvarkymas po darbų.
8. **Sklypų valymas** — Apaugusių sklypų, gyvatvorių ir po audrų nuvirtusių medžių tvarkymas.

### 4.6 Gallery — "Darbų galerija"

- H2: `Darbų galerija` / Eyebrow: `MŪSŲ DARBAI`
- **Masonry CSS Grid** (4 cols desktop, 2 tablet, 1 mobile). First item (`gallery__item--tall`) spans 2 rows at ≥1024px — featured hero image gives the eye a landing point.
- 8 images currently: `arbor2.jpg`–`arbor9.jpg` (placeholders, client to supply).
- ⚠️ **Pending:** client to drop additional photos from paslaugos.lt into `assets/images/gallery/` — next session will integrate them and renumber the grid for visual balance.
- Lightbox: vanilla JS, keyboard nav, touch swipe.
- Caption overlay on hover. Exact captions: **placeholder, client to confirm**.

### 4.7 Why ArbCut (NEW — competitor doesn't have this)

- Section with dark background (variant of forest green), light text.
- H2: `Kodėl ArbCut?`
- Four-up row of trust points, each with a small icon:
  1. **Saugu** — Dirbame naudodami profesionalią alpinizmo įrangą ir laikomės visų saugos reikalavimų.
  2. **Atsakingai** — Už kiekvieną darbą atsakome patys, nuo pradžios iki pabaigos.
  3. **Švariai** — Po darbų išsivežame šakas ir medieną, paliekame sutvarkytą teritoriją.
  4. **Greitai** — Atvykstame operatyviai, ypač avarinėmis situacijomis.

### 4.8 FAQ — "Dažniausiai užduodami klausimai" (NEW)

- H2: `Dažniausiai užduodami klausimai`
- Eyebrow: `DUK`
- Accordion, 5–6 items. Plain `<details>`/`<summary>` styled nicely is fine.
- Starter questions (finalize with client):

  1. **Ar dirbate visoje Lietuvoje?** — Taip, išvykstame į visus Lietuvos regionus. Didesniems objektams sutariame individualiai.
  2. **Ar galite dirbti prie elektros linijų?** — Taip, turime patirties dirbti pavojingose vietose šalia elektros linijų ir pastatų.
  3. **Ar išsivežate medieną ir šakas?** — Taip, po darbų sutvarkome teritoriją ir išsivežame visas liekanas.
  4. **Koks yra darbų įkainis?** — Kaina priklauso nuo darbų apimties ir sudėtingumo. Susisiekite — pateiksime individualų pasiūlymą.
  5. **Ar dirbate savaitgaliais?** — Taip, dirbame kasdien 08:00–18:00, įskaitant savaitgalius.
  6. **{{ PLACEHOLDER — klausti kliento, ar yra draudimas }}** — confirm with client whether he has liability insurance; if yes, add as an FAQ.

### 4.9 Inquiry form — "Palikite užklausą"

- H2: `Palikite užklausą`
- Eyebrow: `SUSISIEKTI`
- Short subtext: `Atsakysime per vieną darbo dieną. Arba skambinkite tiesiogiai: +370 603 66901.`
- Fields:
  - `Vardas` (required, text)
  - `Telefonas arba el. paštas` (required, text — one field, flexible)
  - `Miestas / vietovė` (optional, text)
  - `Žinutė` (required, textarea)
  - Hidden: Web3Forms `access_key`
  - Hidden honeypot field for spam protection
- Button: `Siųsti užklausą`
- On success → redirect to `success.html`.

### 4.10 Footer

- Three columns on desktop, stacked on mobile:
  - **Column 1:** Logo, short tagline (`Kvalifikuotas arboristas aukštalipys su komanda`), Facebook icon linking to `https://www.facebook.com/MesGalimeTaiPadaryti/`.
  - **Column 2 — Paslaugos:** list of 8 service names (anchors back to services section).
  - **Column 3 — Kontaktai:** phone, email, working hours (`Pirmadienis–Sekmadienis: 08:00–18:00`).
- Bottom bar: `© 2026 ArbCut. Visos teisės saugomos.`

### 4.11 Sticky mobile call button

- Visible on viewports < 768px.
- Fixed to bottom-right, 16px from edges.
- Circular, 56px diameter, dark green with phone icon.
- `tel:+37060366901`.
- Subtle pulse animation every 4 seconds to draw eye.
- Hides when the inquiry form or the footer is in view (user already at the contact point).

### 4.12 Inquiry modal

Triggered by any `[data-modal-trigger]` button: header CTA, hero secondary CTA, mobile menu CTA.

- **Overlay:** `rgba(15,21,18,0.72)` + `backdrop-filter: blur(4px)`. Clicking backdrop closes modal.
- **Panel:** max-width 520px, centered. Mobile: full-width with 16px margins. Max-height `calc(100svh - 32px)`, scrollable internally.
- **Animation:** fade + slide-up 250ms (`cubic-bezier(0.16,1,0.3,1)`). Respects `prefers-reduced-motion`.
- **Close:** × button (top-right), Esc key, backdrop click. All return focus to the trigger element.
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`. Tab key cycles within modal (focus trap). Body scroll locked while open.
- **Form fields:** identical to inline form — Vardas (required), Kontaktai (required), Miestas (optional), Žinutė (required), same Web3Forms hidden fields + botcheck honeypot. Subject line distinguishes "modalas" from inline form.
- **Submit:** `Siųsti užklausą` → redirects to `success.html` (same as inline form).

---

## 5. Design system

### 5.1 Aesthetic direction

**Rugged / outdoorsy / crafted.** This is a guy who climbs trees with a chainsaw. The site should feel grounded, competent, a little raw — not a SaaS landing page.

References in tone: premium outdoor gear brands (Filson, Hestra, Stihl's newer brand work), craft coffee roasters, editorial outdoor magazines. Not: generic construction/tradesman WordPress templates.

### 5.2 Color palette

All as CSS custom properties in `:root`:

```css
--color-bg:          #0F1512;   /* near-black with green undertone, only for "Why ArbCut" and footer */
--color-bg-cream:    #F4EFE6;   /* warm off-white, main background */
--color-bg-card:     #FFFFFF;   /* service cards, FAQ */
--color-forest:      #1F3A2E;   /* primary dark green */
--color-forest-deep: #142620;   /* hover state, deep variant */
--color-moss:        #5C7A63;   /* secondary green, dividers */
--color-bark:        #3E2C1F;   /* earthy brown accent */
--color-rust:        #B85B32;   /* CTA accent, used sparingly — call buttons, key highlights */
--color-text:        #1A1F1C;   /* body text on cream */
--color-text-muted:  #5A5F56;
--color-text-light:  #E8E4DA;   /* text on dark bg */
--color-border:      #D8D1C1;
```

Accent color `--color-rust` is the one sharp note in the palette. Use it for the primary CTA buttons, the sticky call button, and sparingly for underlines / key highlights. Everything else lives in the green/cream/bark world.

### 5.3 Typography

- **Display / headings:** **"Playfair Display"** (Google Fonts) — characterful serif with full Lithuanian character support. Weight 600 for H1/H2, 500 for H3. (Replaced Fraunces which lacked proper ū glyph.)
- **Body / UI:** **"Inter Tight"** (Google Fonts). Weights 400, 500, 600.
- **Scale (v1.2):**
  | Element | Size |
  |---------|------|
  | Base mobile | 18px |
  | Base desktop | 19px |
  | H1 hero | `clamp(2.75rem, 7vw, 6rem)` |
  | H2 sections | `clamp(2.25rem, 5vw, 4rem)` |
  | H3 service cards (secondary) | `clamp(1rem, 1.4vw, 1.2rem)` |
  | H3 service cards (featured) | `clamp(1.25rem, 2vw, 1.6rem)` |
  | FAQ questions | `1.15rem` |
  | Hero subheadline | `clamp(1.1rem, 1.5vw, 1.35rem)` |
  | Eyebrow labels | `0.9rem` |
  | About stat numbers | `clamp(2.2rem, 5vw, 4rem)` |
- Line-height: `1.1` for display (H1–H4), `1.65` for body.

### 5.4 Spacing scale

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px — expose as CSS vars `--space-1` through `--space-10`.

### 5.5 Layout

- Max content width: `1240px`, centered.
- Section vertical padding: `clamp(64px, 10vw, 128px)` top and bottom.
- Gutter: `24px` mobile, `48px` desktop.

### 5.6 Motion

- **Page load:** staggered fade-up on hero headline, subheadline, CTAs (100ms stagger).
- **Scroll reveal:** elements fade-up-and-in when they enter viewport. Use `IntersectionObserver`, not a library.
- **Hover:** cards lift 4px with a subtle shadow, 200ms ease.
- **Sticky call button pulse:** a 4s loop, very subtle scale 1.0 → 1.05 → 1.0.
- Respect `prefers-reduced-motion`.

### 5.8 Logo system

Five SVG files in `assets/`:

| File | Usage |
|------|-------|
| `logo-horizontal.svg` | Header when scrolled (cream background) — forest green wordmark |
| `logo-horizontal-light.svg` | Header over hero + footer — cream wordmark |
| `logo-stacked.svg` | Brand asset: social media, business cards (light bg) |
| `logo-stacked-light.svg` | Brand asset: social media, business cards (dark bg) |
| `favicon.svg` | Browser tab icon |

All logos share the same design language:
- **Wordmark:** "ArbCut" in Playfair Display 700 — forest green (`#1F3A2E`) on light, cream (`#F4EFE6`) on dark.
- **Tree icon:** minimalist line-art. Single trunk + 4 branch pairs tapering upward. Rust strokes (`#B85B32`) throughout.
- **Stacked variant:** rust circle background with tree on top, rust rule divider, wordmark + "ARBORISTAI" label.
- **Favicon:** rust rounded-square background, deep-forest tree centered for legibility at small size.

The stacked logos are brand assets for the client — not rendered on the site itself.

### 5.7 Visual texture

- Subtle grain / noise overlay on the cream background (CSS `background-image` with a data-URI noise PNG, 5% opacity). Makes it feel less flat-digital.
- Section dividers: a single thin line in `--color-moss`, 1px, never a gradient or fancy divider.
- Shadows: low and warm, never neutral gray. `0 10px 30px -15px rgba(20, 38, 32, 0.35)`.
- All photos slightly desaturated (CSS `filter: saturate(0.9)`) for a cohesive editorial look.

---

## 6. SEO & meta

- `<title>`: `ArbCut — Medžių priežiūra ir aukštuminiai darbai Lietuvoje`
- Meta description: `Kvalifikuotas arboristas aukštalipys. Medžių pjovimas, genėjimas, pavojingų medžių šalinimas, darbai su autobokšteliu iki 20 m. Skambinkite: +370 603 66901.`
- Open Graph image: use hero photo.
- `lang="lt"` on `<html>`.
- Structured data (JSON-LD): `LocalBusiness` schema with name, phone, email, opening hours, service area (Lithuania).

---

## 7. Accessibility

- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text.
- All interactive elements reachable by keyboard with visible focus ring.
- Form inputs have associated `<label>` elements (not placeholder-only).
- Gallery lightbox traps focus while open, closes on `Esc`.
- `alt` text on every image. Decorative images get `alt=""`.

---

## 8. Performance

- All gallery images served at max 1600px wide, compressed.
- Use `loading="lazy"` on everything below the fold.
- Inline critical CSS for above-the-fold if needed in a later pass.
- Defer non-critical JS.

---

## 9. Content still needed from client

> These are marked with `{{ PLACEHOLDER }}` in the HTML. Client must provide before launch.

- [ ] Years of experience number
- [ ] Confirmation on insurance (to add to FAQ if yes)
- [ ] Any testimonials? (would unlock an optional testimonials section)
- [ ] Specific service-area towns if he wants local SEO pages later
- [ ] Confirm gallery image captions / what each photo shows

---

## 10. Out of scope (for this version)

- Multi-language (Lithuanian only)
- Booking calendar
- Online payment
- Blog / news section
- Customer testimonials section (can be added once client provides quotes)
- Before/after image slider (nice-to-have, deferred)

---

## 11. Milestones

1. **M1 — Skeleton + design system** (colors, fonts, spacing, header, hero, footer).
2. **M2 — Content sections** (about, services, gallery, why, FAQ).
3. **M3 — Form + success page + Web3Forms integration**.
4. **M4 — Polish** (motion, scroll reveals, sticky call button, grain texture, performance pass).
5. **M5 — Review with client → iterate → deploy to Netlify**.
