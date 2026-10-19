import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold">🔓 Welcome to /admin</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">
        You only got here because <code>proxy.ts</code> at the project root
        checked the URL for <code>?token=letmein</code> before this page ever
        started rendering. Without it, the request was redirected back home.
      </p>

      <pre className="mt-6 overflow-x-auto rounded-lg border border-black/10 bg-black/5 p-4 text-xs dark:border-white/15 dark:bg-white/5">
        <code>{`// proxy.ts — replaces middleware.ts in Next.js 16.
// Same idea, clearer name: this always runs on the
// Node.js runtime, intercepting the request before
// any route renders.
export default function proxy(request: NextRequest) {
  const hasToken =
    request.nextUrl.searchParams.get("token") === "letmein";

  if (!hasToken) {
    const url = new URL("/", request.url);
    url.searchParams.set("blocked", "admin");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}`}</code>
      </pre>

      <Link href="/" className="mt-8 inline-block text-sm underline underline-offset-4">
        ← Back home
      </Link>
    </main>
  );
}
