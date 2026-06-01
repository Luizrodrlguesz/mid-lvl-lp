# Project context — mid-level-lp

Generated from repository inspection. Stack is **Next.js 16** (App Router) with **React 19**, **Tailwind CSS v4** (CSS-first config), **shadcn/ui** (New York style), **Framer Motion**, and **React Three Fiber** for WebGL backgrounds.

---

## Relevant libraries and versions

From `package.json` (exact ranges as declared):

| Area | Package | Version |
|------|---------|---------|
| Framework | `next` | `16.0.10` |
| UI | `react`, `react-dom` | `19.2.1` |
| Styling | `tailwindcss` | `^4` |
| PostCSS | `@tailwindcss/postcss` | `^4` |
| Animation | `framer-motion` | `^12.23.26` |
| Theming | `next-themes` | `^0.4.6` |
| shadcn stack | `class-variance-authority` | `^0.7.1` |
| | `clsx` | `^2.1.1` |
| | `tailwind-merge` | `^3.4.0` |
| Radix (UI primitives) | `@radix-ui/react-*` (progress, separator, slot, switch, tooltip) | various `^1.x` |
| Icons | `lucide-react` | `^0.561.0` |
| 3D | `@react-three/fiber` | `^9.4.2` |
| | `@react-three/drei` | `^10.7.7` |
| | `three` | `^0.182.0` |
| Other GL | `ogl` | `^1.0.11` |
| Dev | `typescript` | `^5` |
| | `eslint`, `eslint-config-next` | `^9` / `16.0.10` |
| CSS extras | `tw-animate-css` | `^1.4.0` |

---

## Folder structure

High-level layout (excluding `node_modules`, `.next`, lockfiles):

```text
mid-lvl-lp/
├── components.json          # shadcn/ui config (aliases, globals.css path)
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs       # Tailwind v4 PostCSS plugin
├── public/                  # Static assets (favicon, SVGs, /assets/*)
├── README.md
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind entry + @theme + design tokens
│   │   ├── layout.tsx       # Root layout (fonts, ThemeProvider)
│   │   ├── page.tsx         # Main landing (client)
│   │   ├── hero-demo/
│   │   │   └── page.tsx     # Scroll-zoom demo route
│   │   └── second-page/
│   │       └── page.tsx     # Alternate hero / scroll experiment
│   ├── components/
│   │   ├── ui/              # shadcn-style primitives (button, card, badge, …)
│   │   ├── *.tsx            # Feature components (aurora, header, canvas, …)
│   │   └── hero-animations.md
│   └── lib/
│       ├── utils.ts         # `cn()` helper (clsx + tailwind-merge)
│       └── content.ts       # Site copy / structured content
```

**Path aliases:** `@/*` → `./src/*` (`tsconfig.json`). shadcn `components.json` also documents `@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, and `@/hooks` (no `src/hooks` directory is present yet).

**Note:** There is no root `tailwind.config.js/ts` — Tailwind v4 is driven from CSS (`globals.css`) plus PostCSS.

---

## Component patterns

- **Client boundaries:** Interactive routes and most UI live under `"use client"` at the top of the file (e.g. `src/app/page.tsx`, `src/app/second-page/page.tsx`, `src/app/hero-demo/page.tsx`, and many components in `src/components/`).
- **Server components:** `src/app/layout.tsx` is a server layout: metadata, `next/font` (Geist / Geist Mono), global CSS import, wraps children with `ThemeProvider`.
- **shadcn/ui:** `components.json` sets `style: "new-york"`, `rsc: true`, `tsx: true`, `tailwind.cssVariables: true`, `baseColor: "neutral"`. UI primitives live in `src/components/ui/` and compose Radix + `cva` + `cn()` from `@/lib/utils`.
- **Imports:** Prefer `@/…` alias. UI pieces import `cn` from `@/lib/utils`.
- **Naming:** Files are mostly **kebab-case** for components (`scroll-zoom-hero.tsx`, `site-header.tsx`) and **PascalCase** for exported component identifiers inside files.
- **Barrel exports:** No widespread `index.ts` barrel files under `src/components`; imports target concrete module paths (e.g. `@/components/scroll-zoom-hero`).

---

## Tailwind configuration

- **Entry:** `@import "tailwindcss";` and `@import "tw-animate-css";` in `src/app/globals.css`.
- **Build:** `postcss.config.mjs` uses only `@tailwindcss/postcss` (Tailwind v4 pipeline).
- **Theme (v4):** `@theme inline { … }` maps design tokens to Tailwind theme keys (e.g. `--color-background`, `--font-sans`, radius scale, chart/sidebar colors) referencing CSS variables.
- **CSS variables:** `:root` and `.dark` define **oklch**-based semantic colors (`--background`, `--foreground`, `--primary`, …) plus **aurora** custom properties (`--aurora-primary`, etc.).
- **Dark mode:** `@custom-variant dark (&:is(.dark *));` — class-based dark targeting (aligned with `next-themes`).
- **Base layer:** global `*` border/outline defaults; `body` uses `bg-background text-foreground antialiased`.
- **Custom utilities / components in CSS:** `.section-card`, `.grain`, aurora keyframes, scroll-zoom-related keyframes (e.g. `grain-shift`), `.text-gradient`, `.glass`, `.glow`, `.gradient-border`, `.animate-float`, `.shimmer`, `html { scroll-behavior: smooth; }`, GPU hint classes.

---

## Motion library

- **Library:** **`framer-motion`** (not `motion/react`).
- **Typical imports:** `import { motion, … } from "framer-motion"` (also `AnimatePresence`, `useScroll`, `useTransform`, `useMotionValueEvent` where needed).
- **Files using Framer Motion (non-exhaustive):** `src/app/page.tsx`, `src/app/second-page/page.tsx`, `src/app/hero-demo/page.tsx`, `src/components/scroll-zoom-hero.tsx`, `src/components/cursor-glow.tsx`, `src/components/loading-screen.tsx`. Documentation in `hero-animations.md` references `useInView` from `framer-motion`.

---

## Scroll-linked animation patterns

1. **Page scroll progress → React state → WebGL:** `src/app/page.tsx` uses `useScroll()` for `scrollYProgress`, `useMotionValueEvent` to mirror progress into React state, and passes that number into `BackgroundCanvas` as `scrollProgress` so Three.js content (e.g. star field rotation) reacts to scroll.
2. **Scroll progress → transforms (hero zoom):** `src/components/scroll-zoom-hero.tsx` uses `useScroll` with a **container ref** and `offset` to get localized `scrollYProgress`, then **`useTransform`** to map progress to **scale** and **opacity** (optionally composed with springs). Tall spacer (`height: N * 100vh`) creates scroll runway. Related exports: `useScrollZoom`, `ParallaxLayer`, depth layers — same scroll + transform pattern.
3. **Dual scroll sources + custom motion values:** `src/app/second-page/page.tsx` combines **`useScroll()`** (document) with **`useScroll({ target, offset })`** (hero track) and uses **`useTransform` with function form** reading `.get()` on progress motion values to merge wheel/gate logic with hero-track scroll for scale and opacity.
4. **Viewport-triggered motion (not scroll mapping):** `src/app/page.tsx` uses **`whileInView`** on sections for enter animations (opacity / translate) as elements enter the viewport.
5. **Native scroll listeners (non-Framer):** `window` `scroll` listeners with `{ passive: true }` for UI like floating nav visibility (`page.tsx`), back-to-top visibility (`back-to-top.tsx`), header shadow (`site-header.tsx`), and some scroll restoration / section jump logic (`second-page`, `site-header`, `page` smooth `scrollTo` helpers).

There is no **GSAP / ScrollTrigger** usage in the scanned TypeScript sources; scroll-driven effects are primarily **Framer Motion** plus **imperative DOM scroll** where noted.
