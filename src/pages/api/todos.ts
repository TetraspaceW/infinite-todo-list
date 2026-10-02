import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ENDPOINT } from "astro:env/client";
import { SUPABASE_TOKEN } from "astro:env/server";

export const GET: APIRoute = async () => {
  if (SUPABASE_ENDPOINT && SUPABASE_TOKEN) {
    const client = createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN);

    const { data: projects, error } = await client
      .from("project")
      .select("name");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    // Revalidate projects every minute
    return Response.json(
      { projects },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
        },
      }
    );
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
};
