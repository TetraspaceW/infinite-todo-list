// Browser half of the backend black box: signing in, and proving to our own
// API who is signed in. Swapping backends means rewriting this file and
// ./server.ts.

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_TOKEN, SUPABASE_ENDPOINT } from "astro:env/client";

const supabase = createClient(
  SUPABASE_ENDPOINT ?? "",
  SUPABASE_ANON_TOKEN ?? ""
);

export const authHeaders = async (): Promise<Record<string, string>> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? { Authorization: `Bearer ${session.access_token}` } : {};
};

export const signInWithDiscord = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "discord",
  });
};

export const signInWithPassword = async (email: string, password: string) => {
  await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://todo.thetetra.space/",
    },
  });
};
