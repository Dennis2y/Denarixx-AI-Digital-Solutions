# Denarixx AI & Digital Solutions — replit.md

## Overview

This is the official company website for **Denarixx AI & Digital Solutions**, a premium AI and digital solutions company. The site is a single-page React application with a luxury black-and-gold dark aesthetic. It showcases services, company vision, innovation lab, selected work, and includes a functional contact form that persists submissions to a PostgreSQL database.

### Page Sections (in scroll order)
1. **Hero** — Full-screen video background, eyebrow badge, headline, CTA buttons, trust line, scroll indicator
2. **About** — Company overview, AI-first approach, premium quality pillars
3. **Services** — 5 service cards: AI Solutions, Web Design & Development, Automation & Digital Transformation, Branding & Creative Design, Digital Strategy & Product Consulting
4. **Process** — 5-step process: Discover, Design, Build, Launch, Scale
5. **Vision** — Full-bleed banner + 5 innovation cards (AI Systems, Smart Platforms, Intelligent Automation, Future Products, Scalable Infrastructure)
6. **Projects / Focus Areas** — 6 project type cards showing what Denarixx builds
7. **Selected Work** — 4 premium project direction cards (AI Business Systems, Premium Company Websites, Startup Technology Ecosystems, Intelligent Automation Platforms)
8. **Founder** — Dennis Charles profile with photo, bio, role, and skill tags
9. **Denarixx Innovation Lab** — 4 product concepts (Denarixx Vision, Denarixx REMEMO, AI Automation Systems, Future Platforms)
10. **Who We Work With** — 5 audience cards (Startups, SMBs, Premium Brands, Founders & Innovators, Digital-First Companies)
11. **Why Choose Denarixx** — 6 credibility points + side panel with differentiators
12. **CTA Banner** — Conversion section before Contact
13. **Contact** — Enhanced form (name, email, company, project type dropdown, budget dropdown, message) + response time + email + location
14. **Newsletter** — "Join the Denarixx Network" email signup (client-side only)
15. **Footer** — Logo, description, innovation tagline, nav links, services list, social icons, legal links

### Global Features
- **Language selector** — 10 languages with flag emojis (EN, DE, FR, ES, IT, PT, NL, TR, AR, ZH) in navbar dropdown. Translations stored in `client/src/lib/translations.ts`, managed via `LanguageProvider` context. Selection persists in localStorage.
- **Scroll progress bar** — Gold gradient line at bottom of fixed navbar
- **Scroll-to-top button** — Appears after scrolling 600px
- **Dark luxury theme** — Black-and-gold design system with cyan accents
- **Smooth scroll** — All navigation uses smooth anchor scrolling
- **AI Chatbot** — Floating chat widget (bottom-right) with model selection (GPT-4o Mini, Deepseek, Gemini). Uses backend proxy at `/api/chat` to forward requests to external AI API. All labels translated for 10 languages.

The app is a full-stack TypeScript monorepo:
- **Frontend**: React + Vite served from `client/`
- **Backend**: Express.js REST API in `server/`
- **Shared**: Type-safe schema and route definitions in `shared/`
- **Database**: PostgreSQL via Drizzle ORM

---

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Single-page app; navigation uses anchor-based smooth scrolling within the `Home.tsx` page
- **Styling**: Tailwind CSS with CSS variables for theming. Dark/gold luxury theme via `index.css`. Custom fonts: `Outfit` (display) and `Plus Jakarta Sans` (body).
- **UI Components**: shadcn/ui component library (Radix UI primitives) with custom premium variants (`PremiumButton`, `premium-input`, `premium-textarea`) that apply gold glow effects.
- **Animations**: Framer Motion for scroll-triggered fade-ins, parallax hero effects, and hover interactions. A `FadeIn` helper component is used throughout.
- **Data Fetching**: TanStack React Query for server state. A custom `useSubmitContact` hook wraps the contact form mutation.
- **Forms**: React Hook Form + Zod resolver, sharing the same schema as the server for validation consistency. Contact form has optional fields (company, projectType, budget) that are extended with Zod on the frontend and appended to the message before submission.
- **Theme**: Dark mode enforced via CSS variables. A `ThemeProvider` wraps the app for potential light/dark toggle.

### Backend Architecture

- **Framework**: Express.js v5 (TypeScript) running as an HTTP server
- **Entry point**: `server/index.ts` creates the Express app and HTTP server, registers routes, and in development serves via Vite middleware; in production serves the built static files.
- **Routes**: Defined in `server/routes.ts`. Endpoints: `POST /api/contact` (validates input with Zod, stores to database) and `POST /api/chat` (proxies chat messages to external AI API at `firebase-ai-models.matrixzat99.workers.dev`).
- **Storage layer**: `server/storage.ts` exposes an `IStorage` interface and `DatabaseStorage` implementation using Drizzle ORM.
- **Static serving**: `server/static.ts` serves the Vite-built frontend with SPA fallback for client-side routing.

### Shared Layer

- **Schema** (`shared/schema.ts`): Single `contacts` table defined with Drizzle's pg-core, plus Zod insert schema via `drizzle-zod`.
- **Routes** (`shared/routes.ts`): Typed API contract object (`api`) shared between frontend and backend.

### Data Storage

- **Database**: PostgreSQL (required via `DATABASE_URL` env variable)
- **ORM**: Drizzle ORM with `drizzle-kit` for migrations
- **Schema location**: `shared/schema.ts`
- **Current tables**:
  - `contacts`: id (serial PK), name (text), email (text), message (text), created_at (timestamp)

### Path Aliases

| Alias | Resolves to |
|---|---|
| `@/*` | `client/src/*` |
| `@shared/*` | `shared/*` |
| `@assets/*` | `attached_assets/*` |

---

## External Dependencies

### Core Libraries
- **Express v5** — HTTP server and REST API
- **React 18 + Vite** — Frontend SPA framework and dev server
- **Drizzle ORM + drizzle-kit** — Type-safe database queries and migrations
- **PostgreSQL (pg)** — Database driver; requires `DATABASE_URL` environment variable
- **TanStack React Query v5** — Client-side server state management
- **Framer Motion** — Animation library for scroll effects and transitions
- **React Hook Form + @hookform/resolvers** — Form state management with Zod validation
- **Zod + drizzle-zod** — Schema validation shared across frontend and backend

### UI
- **shadcn/ui (new-york style)** — Base UI component library built on Radix UI primitives
- **Tailwind CSS** — Utility-first CSS framework
- **Lucide React** — Icon library
- **react-icons (SiLinkedin, SiX, etc.)** — Social media brand icons
- **class-variance-authority + clsx + tailwind-merge** — Class name management utilities

### Environment Variables Required
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (required at startup) |

### Assets
- Company logo: `attached_assets/Denarixx_1772975867904.png` (imported directly in React via `@assets/` alias)
- Founder photo: `attached_assets/dennis2_1772985309786.png` (imported via `@assets/` alias)
- Media files in `client/public/media/`: `hero_video.mp4`, `tech-abstract-bg.png`, `ai-network-bg.png`, `innovation-bg.png`

### Placeholders to Update
- **Social media links**: All currently `#` in Footer (LinkedIn, X, Instagram, GitHub)
- **Legal pages**: Privacy Policy, Terms & Conditions, Impressum, Cookie Policy — all `#`
- **Contact email**: `hello@denarixxai.com` (update if different)
- **Newsletter**: Client-side only (no backend persistence)
