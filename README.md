# QualityModule — Landing Page

Marketing landing page for **QualityModule**, an enterprise-grade digital checklist and inspection workflow platform built on top of VisiLean.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Deployment**: Netlify (via `@netlify/plugin-nextjs`)
- **Language**: TypeScript

## Highlights

- Responsive design — mobile (iPhone 14 Pro Max mockup), tablet (iPad Pro mockup), desktop (monitor mockup)
- Scroll-driven 3D device animation in hero section
- Infinite logo marquee trust bar
- Animated scroll timeline (How It Works)
- Feature bento grid
- Impact stats section
- FAQ accordion (single-open)
- Contact form with custom inline validation
- Mobile slide-in drawer navigation with backdrop blur

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Deployment

Deployed on Netlify. Configuration in `netlify.toml`.

## Project Structure

```
quality-landing/
├── public/              # Static assets (logos, dashboard images)
├── src/
│   ├── app/
│   │   ├── page.tsx     # Main landing page
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles & animations
│   ├── components/
│   │   └── ui/          # Reusable UI components
│   └── lib/             # Utility functions
├── netlify.toml
└── next.config.ts
```

## Powered By

[VisiLean](https://visilean.com) — The Construction Management Platform
