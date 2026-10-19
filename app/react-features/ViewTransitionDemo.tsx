"use client";

import { ViewTransition, startTransition, useState } from "react";

const ITEMS = ["Turbopack", "Cache Components", "proxy.ts", "React Compiler"];

export default function ViewTransitionDemo() {
  const [reversed, setReversed] = useState(false);
  const items = reversed ? [...ITEMS].reverse() : ITEMS;

  return (
    <div>
      <button
        onClick={() => startTransition(() => setReversed((r) => !r))}
        className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
      >
        Reverse order
      </button>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          // Wrapping each row lets the browser's View Transition API
          // animate it to its new position instead of just popping there —
          // but only because the state change above happens inside
          // startTransition(). A plain setState wouldn't trigger it.
          <ViewTransition key={item} default="auto">
            <li className="rounded-md border border-black/10 px-4 py-2 text-sm dark:border-white/15">
              {item}
            </li>
          </ViewTransition>
        ))}
      </ul>
      <p className="mt-3 text-xs text-neutral-500">
        Chrome/Edge animate the reorder smoothly; browsers without the View
        Transition API just re-render instantly.
      </p>
    </div>
  );
}
