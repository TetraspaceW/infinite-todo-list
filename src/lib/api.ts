// Browser-side calls to our own API. Backend-agnostic: proof of who is signed
// in comes from the backend black box.

import { authHeaders } from "./backend/client";
import type { Entry, Me } from "./backend/types";

export const fetchMe = async (): Promise<Me> => {
  const response = await fetch("/api/me", { headers: await authHeaders() });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const createEntry = async (name: string): Promise<Entry> => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const destroyEntry = async (id: string) => {
  const response = await fetch(`/api/todos/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
};
