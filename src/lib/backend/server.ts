// Server half of the backend black box: reading and writing entries, and
// working out who is making a request. Swapping backends means rewriting this
// file and ./client.ts.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ENDPOINT } from "astro:env/client";
import { OWNER_USER_ID, SUPABASE_TOKEN } from "astro:env/server";
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

// Supabase reports network failures as just "fetch failed"; the real reason
// (host not found, connection refused, ...) is buried in error.details.
const dbError = (error: { message: string; details: string }) => {
  const cause = error.details?.match(/Caused by: .*/)?.[0];
  return new Error(
    cause
      ? `${error.message}. ${cause} (connecting to ${SUPABASE_ENDPOINT})`
      : error.message
  );
};

const toEntry = (row: { id: string | number; name: string }): Entry => ({
  id: String(row.id),
  name: row.name,
});

export const listEntries = async (): Promise<Entry[]> => {
  const { data, error } = await db()
    .from("project")
    .select("id, name")
    .order("id");

  if (error) {
    throw dbError(error);
  }
  return data.map(toEntry);
};

export const addEntry = async (name: string): Promise<Entry> => {
  const { data, error } = await db()
    .from("project")
    .insert({ name })
    .select("id, name")
    .single();

  if (error) {
    throw dbError(error);
  }
  return toEntry(data);
};

// Returns false if there was no entry with that id.
export const deleteEntry = async (id: string): Promise<boolean> => {
  const { data, error } = await db()
    .from("project")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw dbError(error);
  }
  return data.length > 0;
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

export const canEdit = (user: User | null) =>
  user !== null && OWNER_USER_ID !== undefined && user.id === OWNER_USER_ID;
