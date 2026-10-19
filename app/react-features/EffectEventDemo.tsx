"use client";

import { useEffect, useEffectEvent, useState } from "react";

export default function EffectEventDemo() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // useEffectEvent wraps "event-like" logic that should always see the
  // latest props/state, but must NOT cause the effect below to re-run
  // when those values change.
  const onTick = useEffectEvent((currentCount: number) => {
    setLog((prev) => [`tick — count is ${currentCount}`, ...prev].slice(0, 5));
  });

  useEffect(() => {
    const id = setInterval(() => onTick(count), 1200);
    return () => clearInterval(id);
    // `count` is intentionally left out: without useEffectEvent this would
    // either need `count` in the deps (restarting the interval on every
    // click) or read a stale closure value forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-foreground px-3 py-2 text-sm text-background hover:opacity-90"
      >
        Increment ({count})
      </button>
      <p className="mt-3 text-xs text-neutral-500">
        The interval below was set up once on mount and never restarts —
        yet it always logs the current count.
      </p>
      <ul className="mt-2 space-y-1 font-mono text-sm">
        {log.map((line, i) => (
          <li key={i} className="text-neutral-600 dark:text-neutral-300">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
