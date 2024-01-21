import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_ENDPOINT ?? "",
  process.env.SUPABASE_ANON_TOKEN ?? ""
);
