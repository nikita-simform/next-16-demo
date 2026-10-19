import { cacheLife, cacheTag } from "next/cache";

// In-memory stand-in for a database row, plus a notification counter used
// by the refresh() demo below. Module-level state only survives for the
// life of one server process — good enough for a local demo, not for
// production.
let record = { message: "Hello from the cache", updatedAt: new Date().toISOString() };
let notificationCount = 0;

export async function writeRecord(message: string) {
  record = { message, updatedAt: new Date().toISOString() };
}

export async function bumpNotifications() {
  notificationCount += 1;
}

export async function readNotificationCount() {
  return notificationCount;
}

// The "use cache" directive turns this function's result into a cache
// entry. Next.js derives the cache key from the function + its arguments
// automatically. cacheLife controls how long it stays fresh; cacheTag
// gives it a name that revalidateTag()/updateTag() can target later.
export async function getCachedRecord() {
  "use cache";
  cacheLife("minutes");
  cacheTag("demo-record");

  return record;
}
