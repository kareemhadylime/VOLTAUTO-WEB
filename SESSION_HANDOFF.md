# voltauto-website — Session Handoff

This file tracks what was built and the current state so any new session can pick up instantly.

---

## Current State — 2026-05-10

**Live URL:** https://voltauto.biz  
**Repo:** https://github.com/kareemhadylime/VOLTAUTO-WEB  
**Vercel project:** `voltauto-website` (lime-investments team)  
**Latest commit:** `37e475d` — mobile hamburger menu

---

## Tech Stack

- Next.js 16 + TypeScript, App Router, Turbopack
- Tailwind CSS (v4 via `@import "tailwindcss"`)
- Supabase (anon key reads from `public_inventory`, `public_gallery`, `public_ad_creative`)
- pnpm (NOT npm — use `pnpm install`, `pnpm run build`)
- Vercel deployment: `vercel --prod --yes` then `vercel alias set <url> voltauto.biz`

---

## Pages (27 total)

| Route | Description | Data source |
|---|---|---|
| `/` | Home — hero, featured vehicles, fleet teaser | `public_inventory` (featured) |
| `/vehicles` | All vehicles grid | `public_inventory` |
| `/vehicles/[slug]` | Vehicle detail — gallery, specs, timeline | `public_inventory` |
| `/uae` | UAE branch — AED pricing | `public_inventory` (delivery_branch=ae/both) |
| `/fleet` | Fleet TCO calculator | Static |
| `/gallery` | Masonry gallery — photos + creatives | `public_gallery` |
| `/offers` | Ad creatives grid + reels | `public_gallery` (category=creative) |
| `/charging` | EV charging map — Leaflet + OCM API | Open Charge Map API |
| `/calculator` | Lease/finance calculator | `public_inventory` |
| `/import` | Import process page | Static |
| `/about` | About page | Static |
| `/contact` | Contact form | `website_leads` (Supabase insert) |
| `/privacy` | Privacy policy | Static |
| `/terms` | Terms & conditions | Static |
| `/data-deletion` | Meta-required deletion request | Static |

---

## Key Files

```
src/
  app/
    layout.tsx          ← Root layout: Nav, Footer, CookieBanner, GA4, MetaPixel, TikTokPixel
    page.tsx            ← Home page metadata (canonical, OG)
    robots.ts           ← robots.txt (BASE URL trimmed to avoid newline bug)
    sitemap.ts          ← XML sitemap (27 pages + vehicle slugs)
  lib/
    inventory.ts        ← getAllVehicles(), getFeaturedVehicles(), getVehicleBySlug()
    gallery.ts          ← getPublicGallery()
    charging.ts         ← fetchOcmPois() — server-only
    charging-shared.ts  ← COUNTRY_CONFIG, ocmStats, types — shared client+server
    uae.ts              ← getUAEVehicles(), formatAed()
    offers (via gallery) ← uses getPublicGallery() filtered by category=creative
    analytics.ts        ← grantConsent(), trackEvent()
  components/
    layout/
      Nav.tsx           ← 'use client', hamburger menu, usePathname auto-close
      CookieBanner.tsx  ← Consent banner, writes voltauto-consent-v1 to localStorage
    analytics/
      GoogleAnalytics.tsx ← loads /ga4-consent.js + GA4 tag (NEXT_PUBLIC_GA_ID)
      MetaPixel.tsx     ← fbq (NEXT_PUBLIC_META_PIXEL_ID — NOT YET SET)
      TikTokPixel.tsx   ← ttq (NEXT_PUBLIC_TIKTOK_PIXEL_ID — NOT YET SET)
    gallery/
      GalleryClient.tsx ← tab filter, CSS-columns masonry, video support
    charging/
      ChargingClient.tsx ← country tabs, stats bar, Leaflet map dynamic import
      LeafletMap.tsx    ← CartoDB dark tiles, custom divIcon pins, FlyTo
    vehicles/
      VehicleCard.tsx   ← 'use client', renders heroImageUrl via next/image
  public/
    ga4-consent.js      ← reads localStorage consent, sets gtag defaults
    ga4-init.js         ← gtag('config', 'G-F2TPWF62H9')
```

---

## Vercel Environment Variables

| Var | Value | Status |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | set | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | set | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `https://voltauto.biz` (has trailing newline — trimmed in code) | ✅ |
| `NEXT_PUBLIC_GA_ID` | `G-F2TPWF62H9` | ✅ live |
| `NEXT_PUBLIC_META_PIXEL_ID` | **NOT SET** | ⏳ pending |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | **NOT SET** | ⏳ pending |

---

## Supabase DB — Key Views

| View | Used by | Notes |
|---|---|---|
| `public_inventory` | vehicles, uae, calculator | `is_publishable=true` rows only |
| `public_gallery` | gallery, offers | `is_publishable=true`; offers filters `category=creative` |
| `public_ad_creative` | (not yet used on site) | needs `status=approved` + `is_publishable=true` |
| `ads_lead_funnel` | CRM analytics | not used on website |
| `website_leads` | contact form | written via RPC |

**Published catalog rows:** 6 (ids: 92, 154, 156, 191, 204, 281)  
**Hero images set:** 154 (Q05), 191 (A06), 281 (BMW iX3) — 92, 156, 204 need photos  
**Published creatives:** 26 (kind=creative, is_publishable=true)

---

## Analytics & SEO

- **GA4:** G-F2TPWF62H9 (Voltauto Car Trading property), confirmed working in Realtime
- **GSC:** voltauto.biz verified (domain DNS method), sitemap submitted, 23 pages discovered, avg position 4.9
- **Lighthouse (mobile):** Performance 99, Accessibility 100, Best Practices 100, SEO 91
- **robots.txt:** clean (Sitemap on one line)
- **Canonical URLs:** home + vehicle detail pages have `alternates.canonical`

---

## Known Issues / Pending

1. **Meta Pixel ID + TikTok Pixel ID** — set in Vercel → redeploy to activate
2. **Hero images missing** for catalog ids 92 (BYD Seal 07), 156 (Denza D9), 204 (NEVO Q07) — upload photos via CRM
3. **Gallery + UAE pages** show empty until more rows published via CRM
4. **Sanity CMS + /ar/ routing** — Phase 3 of spec, deferred
5. **`NEXT_PUBLIC_SITE_URL` trailing newline** — trimmed in code but ideally re-set in Vercel without the newline

---

## Deploy Runbook

```bash
cd C:\voltauto-website
pnpm run build          # verify locally first
git add .
git commit -m "..."
git push origin main
vercel --prod --yes
# then grab the deployment URL and:
vercel alias set voltauto-website-XXXXX-lime-investments.vercel.app voltauto.biz
```

---

## Previous Session Summary (2026-05-09 → 2026-05-10)

- Built /gallery, /charging, /uae, /offers (Phase 5)
- Phase 6: GA4 consent mode v2, Meta Pixel, TikTok Pixel infrastructure
- DNS cutover: voltauto.biz → voltauto-website (moved from voltauto-pricing CRM)
- Lighthouse 99/100/100/91 after fixing apex→www redirect
- SEO: keyword-optimised titles/descriptions, canonical URLs, OG image
- Legal pages: /privacy, /terms, /data-deletion
- GSC: verified + sitemap submitted (23 pages, Status: Success)
- robots.txt: fixed trailing newline bug in BASE URL
- Mobile nav: hamburger menu with full-screen overlay (was completely missing)
- Hero images: set for Q05, A06, BMW iX3 via DB SQL
- VehicleCard: added `<Image>` for heroImageUrl (was gradient-only)
- GalleryClient: video items now render `<video preload="none">` not broken Image
