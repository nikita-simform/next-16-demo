import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renames `middleware.ts` -> `proxy.ts` (and the exported
// `middleware` function -> `proxy`) to make the network boundary explicit.
// Behavior is unchanged, but it now always runs on the Node.js runtime —
// there's no more Edge-only middleware confusion. `middleware.ts` still
// works for Edge use cases today, but is deprecated.
export default function proxy(request: NextRequest) {
  const hasToken = request.nextUrl.searchParams.get("token") === "letmein";

  if (!hasToken) {
    const url = new URL("/", request.url);
    url.searchParams.set("blocked", "admin");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run this proxy for the /admin demo route.
export const config = {
  matcher: ["/admin/:path*"],
};
