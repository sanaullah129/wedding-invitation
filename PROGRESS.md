# Invitation Rebuild Progress

Read this file before starting each chunk, and update it when a chunk is finished.

## Goal

- Single invitation for Arsalaan & Heena, sent from Mohammed Arif Ansari and the Ansari family.
- Remove the `invitation-v2.html` link and build one React app.
- Split the UI into reusable React components.
- Use Motion (`motion/react`) for the opening, scroll reveals, word-by-word fades, parallax and countdown.
- Keep the design elegant and wedding-themed, mobile-friendly, keyboard-accessible and respectful of reduced motion.

## Constraints and decisions

- Package manager: pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml` allows the esbuild build).
- Stack: Vite 7, React 19, Motion 14.14 (`motion`, `AnimatePresence`, `useAnimate`, `useScroll`, `useTransform`, `useSpring`, `useReducedMotion`, `MotionConfig`, `stagger`).
- “Invitation veto” is interpreted as `invitation-v2.html`. The standalone originals remain in `archive/classic.html` and `archive/envelope.html`.
- The project is not a git repository, so removed files cannot be restored from git.
- Event facts must stay unchanged:
  - Nikah: Monday, 14 December 2026, after Namaz-e-Zohar, Patliputra Mosque, https://maps.app.goo.gl/dQGdPnnshuR5Bq379
  - Reception: Wednesday, 16 December 2026, 7:00 PM onwards, The Grand FM Banquet, 2nd Floor, S.V. Road, Above Delhi Darbar, Jogeshwari West, Mumbai. These are sample details and must be labeled as unconfirmed.
  - The countdown targets the reception: `2026-12-16T19:00:00+05:30`.

## Chunks

| # | Chunk | Status |
|---|-------|--------|
| 1 | Single entry, folder structure, data module, global CSS | Done |
| 2 | Motion primitives (`Reveal`, `RevealGroup`, `FadeWords`, `Ornament`, `SectionHeading`) | Done |
| 3 | Envelope opening with `useAnimate` and `AnimatePresence` | Done |
| 4 | Sections: hero parallax and petals, blessing, events, countdown, closing, scroll progress | Done |
| 5 | Styling polish and responsive layout | Done |
| 6 | Verification: build, desktop, mobile, keyboard, reduced motion, README | Done |

## Log

- Initial state: one `src/main.jsx` rendered both variants. The CSS was embedded in `index.html` and `invitation-v2.html`. Vite had two inputs. Motion was installed but unused.
- Chunk 1 (done):
  - Deleted `invitation-v2.html`.
  - `index.html` is now a minimal shell with Amiri, Cormorant, DM Sans and Great Vibes fonts.
  - `vite.config.js` has a single entry, uses `@vitejs/plugin-react` 5.2 (dev dependency, automatic JSX runtime), and keeps `base: './'`.
  - All copy and event facts are in `src/data/invitation.js`.
  - Design tokens and shared classes (`.eyebrow`, `.section`, `.section-inner`, `.gold-text`, `body.is-locked`) are in `src/styles/global.css`.
  - `src/main.jsx` renders `<App />` in `StrictMode`.
  - `src/App.jsx` is a placeholder until chunk 4.
  - `pnpm run build` passes.
- Chunk 2 (done): `src/components/motion/`
  - `variants.js` defines `easeOut`, `fadeUp` (opacity, y and blur) and `stagger(interval, delay)`.
  - `Reveal` uses `whileInView` and `once`; it supports `as`, `delay`, `y` and `amount`.
  - `RevealGroup` and `RevealItem` provide staggered variants.
  - `FadeWords` splits text into inline-block `motion.span` words that fade in from blur and keeps the spaces as text nodes.
  - `Ornament` is an SVG floral divider drawn with `pathLength`, using `custom` to stagger the paths.
  - `SectionHeading` combines the eyebrow, word-by-word title, ornament and optional intro.
  - Styles are in `motion.css`, imported by `index.js`, which is the barrel export.
  - `motion[as]` is used for polymorphic tags.
  - The build passes. The JS bundle is about 366 KB, or 119 KB gzipped.
- Chunk 3 (done): `src/components/Opening/{Opening.jsx,Opening.css}`
  - The overlay is deep green with an ivory envelope, a red wax `A & H` seal and drifting gold sparkles. The envelope floats while idle, and the “Tap to open” prompt pulses.
  - Clicking runs a `useAnimate` sequence: copy fades, the seal pops, the flap `rotateX: 180` opens, the flap `zIndex: 1` moves behind the letter, the letter rises with `y: '-62%'`, and the envelope zooms in.
  - The component then calls `onOpen`. When `useReducedMotion()` is true, it skips the sequence.
  - The seal is centered with negative margins, not CSS transforms, so Motion can control scale and rotation.
  - `App.jsx` owns `opened` and uses `MotionConfig reducedMotion="user"` and `AnimatePresence`. The overlay exits with fade, scale and blur. The content wrapper is `inert` until opened, and `body.is-locked` is toggled.
  - Verified in the browser: no errors, a correct mid-animation frame, and the page unlocks afterward.
  - The dev server runs with `pnpm run dev --host 127.0.0.1 --port 5173 --strictPort`.
- Chunk 4 (done). Components are in `src/components/<Name>/<Name>.jsx` with co-located CSS.
  - `Hero`:
    - Uses `useScroll` on the hero for a parallax photo (`y` and `scale`) and content drift and fade.
    - Has an arched gold frame and a staggered name entrance gated by the `revealed` prop. The gold `&` scales in.
    - Shows event dates from data and a CTA with an animated scroll line. The CTA receives focus after opening.
    - `Petals.jsx` renders 16 deterministic falling petals and returns `null` with reduced motion.
  - `ScrollProgress`: gold bar using `useSpring(scrollYProgress)`.
  - `Blessing` (`#invitation`): mandala SVG rotated by section scroll, Bismillah, word-by-word translation and message, “Invited by”, the host, and the family.
  - `Events` (`#events`): `SectionHeading`, `RevealGroup` grid, and `EventCard`.
    - Cards are arched ivory cards with a spring hover lift.
    - Each card has a `dl` for date, time and venue, a “Details to be confirmed” tag for tentative events, and a map pill.
    - `EventIcon` draws a crescent and star or rings with `pathLength`.
  - `Countdown`: `hooks/useCountdown.js` provides units and `done`. Digits flip with `AnimatePresence mode="popLayout"`. Arched unit tiles use `role="timer"`.
  - `Closing`: drawn double-circle monogram, word-fade title and message, and a signature revealed with a left-to-right `clipPath`.
  - `App` renders the footer and sample note.
  - Data now has `label` (`Nikah`/`Reception`), and the reception icon is `rings`.
  - Verified: no console errors and all sections render. The integrated browser viewport is about 607px wide.
  - Found for chunk 5:
    - The monogram text crowds the inner ring.
    - The Blessing section's accessible name is the whole message.
    - The countdown exposes both exiting and entering digits to assistive technology.
- Chunk 5 (done):
  - Monogram text is set to 23px, `y=67`, so it fits inside the rings.
  - `Blessing` is labeled by its eyebrow (`#blessing-title`).
  - Countdown digits and labels are `aria-hidden`; each unit has `.sr-only` text containing its value and label. `.sr-only` is in `global.css`.
  - `.gold-text` has a 6-second shimmer keyframe, disabled for reduced motion.
  - Opening:
    - Uses `align-content: safe center` and `overflow-y: auto`.
    - `.opening-copy` has `pointer-events: none`, so decorative text never blocks taps.
    - Names use `clamp(40px, 11vw, 84px)`.
  - Hero names use `clamp(56px, 19vw, 124px)`, and hero padding uses a responsive clamp.
  - Countdown tiles are flex items (`flex: 1 1 0`, `max-width: 122px`), and the font size clamps down for narrow screens.
  - Verified at 375×740 and 232×458: no horizontal overflow, copy stays above the envelope, and the button receives taps.
  - Note: Playwright `setViewportSize` is unreliable in the integrated browser. Use `elementFromPoint` or the keyboard for interaction checks.
- Chunk 6 (done):
  - Reduced motion: the opening skips the sequence and closes in about 1.3 seconds with only the overlay fade. No petals render, cards still reveal, and focus moves to `.hero-cta`.
  - The production build passes. `dist/` contains only `index.html` and `assets/` (about 136 KB gzipped JS). `vite preview` shows no console errors.
  - Editor diagnostics are clean.
  - The README was updated for pnpm, the single link, the content location and deployment.

## Not done / possible follow-ups

- Confirm the reception date and venue, then remove `tentative` and `sampleNote` in `src/data/invitation.js`.
- Optional: switch to `LazyMotion` with `m` components to reduce the Motion bundle size.
- Optional: replace the Unsplash hero photo with a couple or venue photo in `public/`, and add background music or RSVP if requested.
- The integrated browser could not render a true desktop-width viewport. Narrow layouts were verified, and the grid automatically uses two columns at 700px or wider.
