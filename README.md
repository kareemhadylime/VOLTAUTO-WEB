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

Hosted on Vercel project `voltauto-website` under the `lime-investments` team.

- **Production:** <https://voltauto-web.vercel.app> (preview URL — custom domain `voltauto.biz` swap is a separate ops step)
- **Auto-deploys:** on every push to `main`.
- **First-time setup:** `vercel --prod` from the repo root, link to `lime-investments/voltauto-website` (project will be auto-created on first deploy).

## Phase 1 status

- 11 routes prerendered statically: `/`, `/vehicles`, `/vehicles/[slug]` (6 cars), `/import`, `/about`, `/contact`, `/_not-found`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`.
- Form posts to mock `/api/contact` (logs to console). Phase 2 wires Supabase `website_leads`.
- Tailwind v4 + Next 16.2.5 + React 19 + Vitest 21 tests passing.

## Phase 2 status

- `/contact` form submits via a Next.js Server Action that calls the
  `insert_website_lead` Supabase RPC (defined in `voltauto-pricing` migration
  `20260508_website_leads_and_funnel_extension.sql`).
- Leads land in `public.website_leads` and surface in the existing pricing-app
  CRM inbox via the extended `ads_lead_funnel` view (platform = 'website',
  platform_label = '🌐 Website').
- Server-side reCAPTCHA v3 verification gates submissions (graceful dev-mode
  pass when keys aren't configured).
- Customer success state shows a `wa.me` deep-link prefilled with the lead
  reference, so they can optionally start the WhatsApp chat themselves.
- No automated outbound email or WhatsApp from the website — your sales team
  handles outreach from the existing CRM inbox.
