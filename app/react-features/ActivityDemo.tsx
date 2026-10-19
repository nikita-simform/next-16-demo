"use client";

import { Activity, useState } from "react";

export default function ActivityDemo() {
  const [tab, setTab] = useState<"a" | "b">("a");

  return (
    <div>
      <div className="flex gap-2">
        <TabButton active={tab === "a"} onClick={() => setTab("a")}>
          Panel A
        </TabButton>
        <TabButton active={tab === "b"} onClick={() => setTab("b")}>
          Panel B
        </TabButton>
      </div>

      <div className="mt-4 rounded-md bg-black/5 p-4 dark:bg-white/5">
        {/* mode="hidden" keeps each panel mounted (display: none) instead
            of unmounting it, so its useState survives switching tabs. */}
        <Activity mode={tab === "a" ? "visible" : "hidden"}>
          <Panel label="A" />
        </Activity>
        <Activity mode={tab === "b" ? "visible" : "hidden"}>
          <Panel label="B" />
        </Activity>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Type into a panel, switch tabs, then switch back — the text is
        still there. A plain <code>{"{tab === 'a' && <Panel/>}"}</code>{" "}
        would have unmounted it and lost the value.
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-3 py-2 text-sm ${
        active
          ? "border-black/30 bg-black/5 dark:border-white/40 dark:bg-white/10"
          : "border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Panel({ label }: { label: string }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Panel {label} — its own local state:
      </p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`type something in ${label}…`}
        className="mt-2 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/20"
      />
    </div>
  );
}
