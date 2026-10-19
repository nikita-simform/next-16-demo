import { Suspense } from "react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { setVisitedCookie, clearVisitedCookie } from "../actions";

// Cache Components requires generateStaticParams to return at least one
// param so Next.js has something to prerender a static shell for. Any
// slug not listed here is still served fine — it's just rendered (and its
// shell streamed) at request time instead of build time.
export async function generateStaticParams() {
  return [{ slug: "hello-world" }];
}

export default function AsyncApisPage({ params, searchParams }: PageProps<"/async-apis/[slug]">) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <Link href="/" className="text-sm underline underline-offset-4">
        ← Overview
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Async request APIs
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Since Next.js 16, <code>params</code>, <code>searchParams</code>,{" "}
        <code>cookies()</code> and <code>headers()</code> can only be read
        asynchronously — the temporary synchronous fallback from 15 is gone.
        This page also shows the Cache Components pattern for it: pass the
        promises straight down and <code>await</code> them inside a{" "}
        <code>&lt;Suspense&gt;</code> boundary, so the rest of the page can
        still prerender.
      </p>

      <div className="mt-6 rounded-md bg-black/5 p-4 dark:bg-white/5">
        <Suspense fallback={<p>Reading request data…</p>}>
          <RequestInfo params={params} searchParams={searchParams} />
        </Suspense>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <form action={setVisitedCookie}>
          <button className="rounded-md bg-foreground px-3 py-2 text-sm text-background hover:opacity-90">
            Set cookie
          </button>
        </form>
        <form action={clearVisitedCookie}>
          <button className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
            Clear cookie
          </button>
        </form>
        <Link
          href="/async-apis/next-js-16?greeting=howdy"
          className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          Try a different slug + query →
        </Link>
      </div>
    </main>
  );
}

async function RequestInfo({
  params,
  searchParams,
}: Pick<PageProps<"/async-apis/[slug]">, "params" | "searchParams">) {
  const { slug } = await params;
  const query = await searchParams;
  const cookieStore = await cookies();
  const headerList = await headers();

  const visited = cookieStore.get("demo-visited")?.value;
  const userAgent = headerList.get("user-agent") ?? "unknown";

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
      <dt className="text-neutral-500">params.slug</dt>
      <dd className="font-mono">{slug}</dd>

      <dt className="text-neutral-500">searchParams</dt>
      <dd className="font-mono">{JSON.stringify(query)}</dd>

      <dt className="text-neutral-500">cookies().get(&quot;demo-visited&quot;)</dt>
      <dd className="font-mono">{visited ?? "(not set)"}</dd>

      <dt className="text-neutral-500">headers().get(&quot;user-agent&quot;)</dt>
      <dd className="truncate font-mono" title={userAgent}>
        {userAgent}
      </dd>
    </dl>
  );
}
