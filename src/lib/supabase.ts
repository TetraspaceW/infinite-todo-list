import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_TOKEN, SUPABASE_ENDPOINT } from "astro:env/client";

export const supabase = createClient(
  SUPABASE_ENDPOINT ?? "",
  SUPABASE_ANON_TOKEN ?? ""
);
