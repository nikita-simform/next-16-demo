import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pins Turbopack's workspace root explicitly. Not a Next.js 16 feature —
  // just quiets a warning since this demo doesn't live inside a git repo.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // New in Next.js 16: Cache Components (the evolution of Partial
  // Prerendering). With this on, nothing is cached and nothing renders
  // statically unless you explicitly say so with the "use cache"
  // directive — every other dynamic read (cookies, headers, searchParams,
  // Math.random, etc.) must be wrapped in <Suspense>. See
  // app/cache-components/page.tsx and app/async-apis/[slug]/page.tsx.
  cacheComponents: true,

  // React Compiler is stable in Next.js 16 but not on by default yet.
  // Turn it on after `npm install -D babel-plugin-react-compiler`:
  // reactCompiler: true,
};

export default nextConfig;
