import type { APIRoute } from "astro";
import { currentUser } from "../../lib/backend/server";
import type { Me } from "../../lib/backend/types";
import { serverError } from "../../lib/http";

export const GET: APIRoute = async ({ request }) => {
  try {
    const me: Me = { user: await currentUser(request) };
    return Response.json(me, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return serverError(error);
  }
};
