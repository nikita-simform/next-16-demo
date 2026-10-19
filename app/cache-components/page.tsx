import { Suspense } from "react";
import Link from "next/link";
import { getCachedRecord } from "./data";
import { LiveClock, NotificationBadge } from "./DynamicWidgets";
import { saveWithRevalidate, saveWithUpdate, pingNotification } from "./actions";

export default function CacheComponentsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <Link href="/" className="text-sm underline underline-offset-4">
        ← Overview
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Cache Components
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        With <code>cacheComponents: true</code> in{" "}
        <code>next.config.ts</code>, nothing is cached and nothing is
        prerendered by default — every dynamic read must be wrapped in{" "}
        <code>&lt;Suspense&gt;</code>, and anything you <em>do</em> want
        cached needs an explicit <code>&quot;use cache&quot;</code>{" "}
        directive. This page has three sections that show the difference.
      </p>

      <section className="mt-10 rounded-lg border border-black/10 p-5 dark:border-white/15">
        <h2 className="font-semibold">1. Cached (&quot;use cache&quot;)</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Cached with <code>cacheLife(&quot;minutes&quot;)</code> and tagged{" "}
          <code>demo-record</code>. Reload the page — this won&rsquo;t
          change until the cache is invalidated below.
        </p>
        <div className="mt-4 rounded-md bg-black/5 p-4 dark:bg-white/5">
          <Suspense fallback={<p>Loading cached record…</p>}>
            <CachedRecord />
          </Suspense>
        </div>

        <form className="mt-4 flex flex-col gap-2 sm:flex-row" action={saveWithRevalidate}>
          <input
            name="message"
            placeholder="New message…"
            className="flex-1 rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/20"
          />
          <button
            formAction={saveWithRevalidate}
            className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            Save with revalidateTag (eventually fresh)
          </button>
          <button
            formAction={saveWithUpdate}
            className="rounded-md bg-foreground px-3 py-2 text-sm text-background hover:opacity-90"
          >
            Save with updateTag (instantly fresh)
          </button>
        </form>
        <p className="mt-2 text-xs text-neutral-500">
          Both buttons write the new message, then invalidate the{" "}
          <code>demo-record</code> tag differently. With{" "}
          <code>revalidateTag</code> the cache is marked stale-while-
          revalidate, so this render may still show the old value — try it,
          then submit again or reload to see it catch up. With{" "}
          <code>updateTag</code> the cache is expired <em>and</em>{" "}
          re-fetched before this render finishes, so the new value shows up
          immediately.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-black/10 p-5 dark:border-white/15">
        <h2 className="font-semibold">2. Uncached &amp; dynamic</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          No <code>&quot;use cache&quot;</code> here — just{" "}
          <code>connection()</code> plus <code>new Date()</code>, wrapped in
          Suspense. It changes on every reload, independent of the cached
          section above.
        </p>
        <div className="mt-4 rounded-md bg-black/5 p-4 dark:bg-white/5">
          <Suspense fallback={<p>Loading live clock…</p>}>
            <LiveClock />
          </Suspense>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-black/10 p-5 dark:border-white/15">
        <h2 className="font-semibold">3. refresh() — uncached data only</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          A Server Action can call <code>refresh()</code> to re-render
          uncached parts of the page (like this badge) without touching any
          cache entries — the cached section above stays untouched.
        </p>
        <div className="mt-4 flex items-center gap-4 rounded-md bg-black/5 p-4 dark:bg-white/5">
          <Suspense fallback={<span>…</span>}>
            <NotificationBadge />
          </Suspense>
          <form action={pingNotification}>
            <button className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
              Simulate a notification
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

async function CachedRecord() {
  const record = await getCachedRecord();
  return (
    <div>
      <p className="text-lg">{record.message}</p>
      <p className="mt-1 text-xs text-neutral-500">
        cached at {new Date(record.updatedAt).toLocaleTimeString()}
      </p>
    </div>
  );
}
