# Sweepstakes Casino Engine

A full-featured sweepstakes casino platform with original game mechanics, dynamic animations, and a comprehensive admin dashboard for game control and analytics.

## Run & Operate

- `pnpm install` — install all dependencies
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/web run dev` — run the web UI (port 5173)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Web: React 19 + Vite
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- Animations: Framer Motion, CSS animations
- Admin Dashboard: React with role-based access control
- UI Components: Shadcn/ui

## Where things live

```
packages/
  api-server/       Express API, game logic, auth
  web/              React web app (player & admin)
  db/               Drizzle schema, migrations
  shared/           Shared types, utils, game constants
```

## Architecture decisions

- **Monorepo structure** — shared types between API and web, single source of truth
- **Game engine in backend** — payout calculations, random number generation, fairness auditable
- **Real-time updates** — WebSockets for live animations and multiplayer awareness
- **Admin-controlled mechanics** — all payouts, odds, and game parameters configurable via dashboard
- **Audit trail** — every bet, win, and admin change logged for compliance

## Product

**Player Experience:**
- Original slot-style game with 5 reels and multiple paylines
- Smooth reel animations and win celebrations
- Live payout animations and balance updates
- Session persistence (continue where you left off)
- Leaderboards and achievement tracking

**Admin Controls:**
- Real-time game parameter adjustment (RTP, paylines, bet ranges)
- Player account management and balance adjustments
- Comprehensive analytics (win/loss, popular features, player retention)
- Payout table management and testing
- Audit logs for all admin actions

## User preferences

_Populate as you build_

## Gotchas

_Populate as you build_

## Pointers

- See package READMEs for individual setup instructions
- API spec defined in `packages/api-server/openapi.yaml`
