// Browser-side calls to our own API. Backend-agnostic: proof of who is signed
// in comes from the backend black box.

import { authHeaders } from "./backend/client";
import type { Me } from "./backend/types";

export const fetchMe = async (): Promise<Me> => {
  const response = await fetch("/api/me", { headers: await authHeaders() });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};
