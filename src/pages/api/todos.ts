import type { APIRoute } from "astro";
import { listEntries } from "../../lib/backend/server";
import { serverError } from "../../lib/http";

export const GET: APIRoute = async () => {
  try {
    // Revalidate projects every minute
    return Response.json(
      { projects: await listEntries() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
        },
      }
    );
  } catch (error) {
    return serverError(error);
  }
};
