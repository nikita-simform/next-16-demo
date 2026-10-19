"use server";

import { cookies } from "next/headers";

export async function setVisitedCookie() {
  // cookies() is async even inside a Server Action.
  const cookieStore = await cookies();
  cookieStore.set("demo-visited", new Date().toLocaleTimeString());
}

export async function clearVisitedCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("demo-visited");
}
