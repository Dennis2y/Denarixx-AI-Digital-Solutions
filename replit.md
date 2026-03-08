# Denarixx AI & Digital Solutions — replit.md

## Overview

This is the official company website for **Denarixx AI & Digital Solutions**, a luxury AI and digital agency. The site is a single-page React application with a premium black-and-gold dark aesthetic. It showcases services, company vision, client testimonials, and includes a functional contact form that persists submissions to a PostgreSQL database.

### Page Sections (in scroll order)
1. **Hero** — Full-screen video background, headline, CTA buttons, animated scroll indicator
2. **Stats** — 4 animated count-up numbers (150+ projects, 99.9% uptime, 5x ROI, 100% satisfaction)
3. **About** — Company story, values, image panel
4. **Services** — 6 service cards with tags (AI Integration, Web Design, Automation, Brand Identity, Digital Strategy, Digital Ecosystem)
5. **Process** — 4-step "How We Work" process with icons
6. **Innovation/Vision** — Full-bleed image banner with vision statement
7. **Testimonials** — 3 client testimonial cards with star ratings
8. **Why Us** — Value highlights + 4 differentiator metric cards
9. **CTA Banner** — Conversion section before Contact
10. **Contact** — Contact form (name, email, message) + response time info
11. **Footer** — Logo, nav links, services list, social icons, legal links

### Global Features
- **Scroll progress bar** — Gold gradient line at bottom of fixed navbar
- **Scroll-to-top button** — Appears after scrolling 600px
- **Dark luxury

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
- **Routing**: Single-page app; navigation uses anchor-based smooth scrolling within the `Home.tsx` page. Additional standalone pages (`About`, `Services`, `Vision`, `Contact`, `Landing`) exist but the primary experience is the single `Home` page.
- **Styling**: Tailwind CSS with CSS variables for theming. Forced dark/gold luxury theme via `index.css`. Custom fonts: `Outfit` (display) and `Plus Jakarta Sans` (body).
- **UI Components**: shadcn/ui component library (Radix UI primitives) with custom premium variants (`PremiumButton`, `premium-input`, `premium-textarea`) that apply gold glow effects.
- **Animations**: Framer Motion for scroll-triggered fade-ins, parallax hero effects, and page transitions. A `FadeIn` helper component is used throughout pages.
- **Data Fetching**: TanStack React Query for server state. A custom `useSubmitContact` hook wraps the contact form mutation.
- **Forms**: React Hook Form + Zod resolver, sharing the same schema as the server for validation consistency.
- **Theme**: Dark mode only enforced via CSS variables. A `useTheme` hook exists for potential light/dark toggle.

### Backend Architecture

- **Framework**: Express.js v5 (TypeScript) running as an HTTP server
- **Entry point**: `server/index.ts` creates the Express app and HTTP server, registers routes, and in development serves via Vite middleware; in production serves the built static files.
- **Routes**: Defined in `server/routes.ts`. Currently one endpoint: `POST /api/contact` — validates input with Zod, stores to the database, and returns the created contact.
- **Storage layer**: `server/storage.ts` exposes an `IStorage` interface and `DatabaseStorage` implementation using Drizzle ORM. This pattern makes swapping storage backends easy.
- **Static serving**: `server/static.ts` serves the Vite-built frontend with SPA fallback for client-side routing.
- **Build**: `script/build.ts` runs Vite for the client and esbuild for the server, bundling a curated allowlist of dependencies for faster cold starts.

### Shared Layer

- **Schema** (`shared/schema.ts`): Single `contacts` table defined with Drizzle's pg-core, plus Zod insert schema via `drizzle-zod`.
- **Routes** (`shared/routes.ts`): Typed API contract object (`api`) shared between frontend and backend — includes path, method, input schema, and response schemas. This ensures the frontend and backend stay in sync without code duplication.

### Data Storage

- **Database**: PostgreSQL (required via `DATABASE_URL` env variable)
- **ORM**: Drizzle ORM with `drizzle-kit` for migrations
- **Schema location**: `shared/schema.ts`
- **Current tables**:
  - `contacts`: id (serial PK), name (text), email (text), message (text), created_at (timestamp)
- **Migrations**: Output to `./migrations/`, applied with `drizzle-kit push`

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
- **Radix UI** — Accessible, headless component primitives
- **Tailwind CSS** — Utility-first CSS framework
- **Lucide React** — Icon library
- **react-icons (SiLinkedin, SiX, etc.)** — Social media brand icons
- **class-variance-authority + clsx + tailwind-merge** — Class name management utilities
- **Embla Carousel** — Carousel/slider component
- **vaul** — Drawer component
- **cmdk** — Command palette component
- **date-fns** — Date formatting utilities
- **recharts** — Chart components (available, not yet heavily used)

### Replit-Specific Plugins (dev only)
- `@replit/vite-plugin-runtime-error-modal` — Shows runtime errors in an overlay
- `@replit/vite-plugin-cartographer` — Replit code mapping
- `@replit/vite-plugin-dev-banner` — Dev environment banner

### Environment Variables Required
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (required at startup) |

### Assets
- Company logo: `attached_assets/Denarixx_1772975867904.png` (imported directly in React via `@assets/` alias)
- Media files (video, background images) expected at `/media/` in the public directory (e.g., `hero_video.mp4`, `tech-abstract-bg.png`, `ai-network-bg.png`, `innovation-bg.png`)