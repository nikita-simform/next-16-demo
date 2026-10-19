import { connection } from "next/server";
import { readNotificationCount } from "./data";

// Reading the clock (or any Math.random()/crypto.randomUUID()-style call)
// during prerendering would throw a build error under Cache Components,
// because it can't be part of a static shell. Calling connection() first
// tells Next.js "run the rest of this at request time" — matching the
// official migration guidance for synchronous, uncacheable IO.
export async function LiveClock() {
  await connection();
  return (
    <p className="font-mono text-lg">
      {new Date().toLocaleTimeString()}{" "}
      <span className="text-xs font-sans text-neutral-500">
        uncached — re-renders on every request
      </span>
    </p>
  );
}

export async function NotificationBadge() {
  await connection();
  const count = await readNotificationCount();
  return (
    <span className="inline-flex items-center gap-1 font-mono text-lg">
      🔔 {count}
    </span>
  );
}
