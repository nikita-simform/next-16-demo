import Link from "next/link";
import { Suspense } from "react";

type Feature = {
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const interactive: Feature[] = [
  {
    title: "Cache Components",
    description:
      'The "use cache" directive + cacheLife/cacheTag, plus the new revalidateTag / updateTag / refresh() APIs, live side by side.',
    href: "/cache-components",
    cta: "Open demo",
  },
  {
    title: "Async request APIs",
    description:
      "params, searchParams, cookies() and headers() are now always Promises — no more sync fallback.",
    href: "/async-apis/hello-world?greeting=hi",
    cta: "Open demo",
  },
  {
    title: "React 19.2 in the App Router",
    description:
      "View Transitions, the <Activity/> component, and useEffectEvent — all shipped by the React canary Next.js 16 runs on.",
    href: "/react-features",
    cta: "Open demo",
  },
  {
    title: "proxy.ts (formerly middleware.ts)",
    description:
      '"/admin" is gated by proxy.ts. Visit it without a token and watch it redirect you right back here.',
    href: "/admin",
    cta: "Try without a token",
  },
];

const backgroundOnly: Feature[] = [
  {
    title: "Turbopack, stable & default",
    description:
      "next dev and next build both use Turbopack automatically now — up to 10x faster refresh, 2–5x faster builds, zero config. Opt out with --webpack.",
  },
  {
    title: "React Compiler, stable",
    description:
      "reactCompiler: true in next.config.ts turns on automatic memoization. Off by default while the team gathers build-time data.",
  },
  {
    title: "Next.js DevTools MCP",
    description:
      "An MCP server that hands an AI coding agent your routing, caching, and rendering context, plus unified browser/server logs.",
  },
  {
    title: "Smarter prefetching",
    description:
      "Shared layouts are downloaded once across many prefetched links instead of once per link, and only the missing pieces are fetched.",
  },
];

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <Suspense fallback={null}>
        <BlockedBanner searchParams={searchParams} />
      </Suspense>

      <h1 className="text-3xl font-bold tracking-tight">
        What&rsquo;s new in Next.js 16
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
        This app is running on the real thing — Next.js 16.3, React 19.2,
        Turbopack by default. Each card below is a live, working example, not
        just a description.
      </p>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Try it yourself
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {interactive.map((f) => (
          <Link
            key={f.title}
            href={f.href!}
            className="group rounded-lg border border-black/10 p-5 transition hover:border-black/30 dark:border-white/15 dark:hover:border-white/40"
          >
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              {f.description}
            </p>
            <span className="mt-3 inline-block text-sm font-medium underline-offset-4 group-hover:underline">
              {f.cta} →
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Under the hood (nothing to click)
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {backgroundOnly.map((f) => (
          <div
            key={f.title}
            className="rounded-lg border border-dashed border-black/10 p-5 dark:border-white/15"
          >
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

// Reading searchParams makes this component dynamic. Under Cache Components
// (see next.config.ts), any dynamic read must live inside its own
// <Suspense> boundary so the rest of the page still prerenders as a static
// shell — this banner is a live example of that rule, not just the proxy
// redirect message it displays.
async function BlockedBanner({
  searchParams,
}: Pick<PageProps<"/">, "searchParams">) {
  const params = await searchParams;
  if (params.blocked !== "admin") return null;

  return (
    <div className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-300">
      🛡️ <code>proxy.ts</code> just redirected you back here — you opened{" "}
      <code>/admin</code> without <code>?token=letmein</code> in the URL.
    </div>
  );
}
