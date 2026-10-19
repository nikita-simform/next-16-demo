import Link from "next/link";
import ViewTransitionDemo from "./ViewTransitionDemo";
import ActivityDemo from "./ActivityDemo";
import EffectEventDemo from "./EffectEventDemo";

export default function ReactFeaturesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <Link href="/" className="text-sm underline underline-offset-4">
        ← Overview
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        React 19.2, via the App Router
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Next.js 16&rsquo;s App Router runs on React&rsquo;s canary channel,
        which is where React 19.2 shipped these three APIs.
      </p>

      <section className="mt-10">
        <h2 className="font-semibold">
          &lt;ViewTransition&gt; — animated reorders
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Wraps the browser&rsquo;s View Transition API. It only activates
          for changes made inside a <code>startTransition</code>{" "}
          (or a Suspense reveal / <code>useDeferredValue</code>) — a plain{" "}
          <code>setState</code> never triggers it.
        </p>
        <div className="mt-4 rounded-lg border border-black/10 p-5 dark:border-white/15">
          <ViewTransitionDemo />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">&lt;Activity&gt; — hide, don&rsquo;t unmount</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Renders &quot;background&quot; UI with <code>display: none</code>{" "}
          while keeping its state and skipping its effects, instead of
          unmounting it. Next.js 16 uses this internally to preserve page
          state across navigations too.
        </p>
        <div className="mt-4 rounded-lg border border-black/10 p-5 dark:border-white/15">
          <ActivityDemo />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">useEffectEvent — non-reactive effect logic</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Extracts an &quot;event-like&quot; function out of an Effect. It
          always sees the latest props/state without needing to be in the
          Effect&rsquo;s dependency array.
        </p>
        <div className="mt-4 rounded-lg border border-black/10 p-5 dark:border-white/15">
          <EffectEventDemo />
        </div>
      </section>
    </main>
  );
}
