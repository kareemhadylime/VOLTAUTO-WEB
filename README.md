# voltauto-website

Public marketing website for VoltAuto — Egypt's China-EV import specialist.

See design spec: <https://github.com/kareemhadylime/voltauto-pricing/blob/main/docs/superpowers/specs/2026-05-07-voltauto-website-design.md>

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # Vitest
pnpm typecheck    # tsc strict
pnpm build        # production build
```

## Deploy

Auto-deploys to Vercel project `voltauto-website` (lime-investments team) on every push to `main`.

## Phase

Phase 1 — Static Skeleton. Inventory + content from seed data. No Supabase / Sanity / AR locale yet.
