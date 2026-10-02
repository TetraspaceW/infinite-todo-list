// Server half of the backend black box: reading and writing entries, and
// working out who is making a request. Swapping backends means rewriting this
// file and ./client.ts.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ENDPOINT } from "astro:env/client";
import { SUPABASE_TOKEN } from "astro:env/server";
import type { Entry, User } from "./types";

let client: SupabaseClient | undefined;

const db = () => {
  if (!SUPABASE_ENDPOINT || !SUPABASE_TOKEN) {
    throw new Error("SUPABASE_ENDPOINT or SUPABASE_TOKEN not set.");
  }
  client ??= createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
};

const toEntry = (row: { id: string | number; name: string }): Entry => ({
  id: String(row.id),
  name: row.name,
});

export const listEntries = async (): Promise<Entry[]> => {
  const { data, error } = await db().from("project").select("id, name");

  if (error) {
    throw new Error(error.message);
  }
  return data.map(toEntry);
};

// Works out who sent a request from the token ./client.ts attaches.
export const currentUser = async (request: Request): Promise<User | null> => {
  const token = request.headers
    .get("Authorization")
    ?.match(/^Bearer (.+)$/)?.[1];
  if (!token) {
    return null;
  }

  const { data, error } = await db().auth.getUser(token);
  if (error || !data.user) {
    return null;
  }
  return { id: data.user.id, name: data.user.user_metadata.full_name ?? "" };
};
