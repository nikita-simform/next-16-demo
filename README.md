# Next.js 16 feature demo

A small, hands-on tour of what's new in Next.js 16 (released October 2025).
Built with `create-next-app@latest`, running Next.js 16.3 + React 19.2.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `next dev` uses Turbopack automatically —
that's Next.js 16's new default, no flag needed.

## What each route demonstrates

| Route | Feature |
| --- | --- |
| `/` | Home page. Reads `searchParams` inside its own `<Suspense>` boundary — the Cache Components pattern in miniature. |
| `/cache-components` | The `"use cache"` directive, `cacheLife`/`cacheTag`, and the three cache-invalidation APIs: `revalidateTag()` (stale-while-revalidate), `updateTag()` (read-your-writes), `refresh()` (uncached-only). |
| `/async-apis/[slug]` | `params`, `searchParams`, `cookies()`, and `headers()` — all async-only now, no sync fallback. |
| `/react-features` | React 19.2's `<ViewTransition>`, `<Activity>`, and `useEffectEvent`, all available because the App Router runs on React's canary channel. |
| `/admin` | Gated by `proxy.ts` (Next.js 16's replacement for `middleware.ts`) — visit without `?token=letmein` and watch it redirect you home. |

## Where to look in the code

- [`next.config.ts`](./next.config.ts) — turns on `cacheComponents`.
- [`proxy.ts`](./proxy.ts) — the renamed `middleware.ts`.
- [`app/cache-components/`](./app/cache-components) — `data.ts` (the cache
  itself), `actions.ts` (the three invalidation Server Actions),
  `DynamicWidgets.tsx` (the uncached counterparts), `page.tsx` (wiring it
  all together with `<Suspense>`).
- [`app/async-apis/[slug]/page.tsx`](<./app/async-apis/[slug]/page.tsx>) —
  the documented pattern for awaiting `params`/`searchParams` inside
  `<Suspense>` so the rest of a dynamic route can still prerender.
- [`app/react-features/`](./app/react-features) — one client component per
  React 19.2 API.

## Features covered only in text (no code to click through)

These are compiler/bundler-level changes, not something a page can visibly
demo — see the cards under "Under the hood" on the home page:

- **Turbopack, stable & default** — 2–5x faster builds, up to 10x faster
  Fast Refresh, zero config. `next build --webpack` opts back out.
- **React Compiler, stable** — set `reactCompiler: true` in
  `next.config.ts` after `npm install -D babel-plugin-react-compiler`.
  Off by default here to keep dev/build fast.
- **Next.js DevTools MCP** — gives AI coding agents routing/caching/
  rendering context plus unified browser+server logs.
- **Smarter prefetching** — shared layouts across many prefetched `<Link>`s
  download once instead of once per link.

## Source

Built from the official [Next.js 16 release notes](https://nextjs.org/blog/next-16)
and the [version 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16).
