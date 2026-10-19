"use server";

import { revalidateTag, updateTag, refresh } from "next/cache";
import { writeRecord, bumpNotifications } from "./data";

export async function saveWithRevalidate(formData: FormData) {
  const message = String(formData.get("message") ?? "");
  await writeRecord(message);

  // Stale-while-revalidate: this request may still render the old cached
  // value below. The tag is marked stale and Next.js refreshes it in the
  // background, so a later request gets the new value. A cacheLife
  // profile is now required as the second argument — 'max' is recommended
  // for most cases.
  revalidateTag("demo-record", "max");
}

export async function saveWithUpdate(formData: FormData) {
  const message = String(formData.get("message") ?? "");
  await writeRecord(message);

  // Read-your-writes: expires AND re-fetches the tag within this same
  // request, so the change is visible immediately, right after this
  // action runs. Only callable from a Server Action.
  updateTag("demo-record");
}

export async function pingNotification() {
  await bumpNotifications();

  // refresh() re-renders the *uncached* dynamic parts of the current
  // route (like the notification badge) without touching any "use cache"
  // entries at all.
  refresh();
}
