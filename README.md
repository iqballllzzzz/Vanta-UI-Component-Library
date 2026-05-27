# Vanta UI

> 500+ open-source React components inspired by Vercel's design language. Built by **M Iqbal S**.

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

## ⚡ Quickstart

Scaffold a new app with the Vanta UI starter:

```bash
npx vanta-ui init my-app
cd my-app
npm run dev
```

That command:
1. Creates `my-app/` with the recommended Vite + React + TanStack Start template.
2. Installs Tailwind, Framer Motion, Radix UI, Lucide, GSAP, Swiper, AOS, i18next.
3. Drops a `vanta.config.ts` and adds the Vanta theme tokens to `styles.css`.
4. Pre-installs the 30 most-used Vanta components.

## 📦 Adding individual components

```bash
# Add a single component
npx vanta-ui add button-gradient

# Add several at once
npx vanta-ui add bento card pricing-trio ai-chat-thread

# List everything available
npx vanta-ui list
```

Or install the umbrella package:

```bash
npm i @vanta-ui/react
```

```tsx
import { ButtonGradient, BentoFeatureGrid } from "@vanta-ui/react";

export default function Page() {
  return (
    <>
      <ButtonGradient>Deploy with Vanta</ButtonGradient>
      <BentoFeatureGrid />
    </>
  );
}
```

## 🧩 What's inside

- **500+ components** across Actions, Forms, Navigation, Overlays, Data Display,
  Feedback, Layout, Media, Marketing, AI, Animation, Auth, Dashboard.
- **Cmd+K command palette** with fuzzy search across name, props, tags, docs.
- **Per-component pages** with Preview / Code tabs, device toggles (mobile/tablet/desktop),
  install commands (CLI / NPM / `vanta-ui init`), props tables, and a11y notes.
- **Favorites/Bookmarks** persisted to `localStorage` (`vanta-ui:favorites`).
- **Shareable URLs** with `?variant=` and `?section=` query params.
- **Dark mode** with persisted preference and no-flash hydration.
- **Animated logo + hero** powered by Framer Motion.

## 🚀 Deploy

The repo is preconfigured for **Vite + Vercel**. The included `vercel.json` rewrites all
routes to `index.html` so the SPA shell handles routing. Push to GitHub and import the
repo in Vercel — no extra config needed.

```bash
npm run build
```

## 📁 Stack

React 19 · TypeScript · Vite 7 · Tailwind v4 · TanStack Router · Framer Motion ·
Radix UI · Lucide · sonner · GSAP · Swiper · AOS · i18next

## 📝 License

MIT © 2026 M Iqbal S
