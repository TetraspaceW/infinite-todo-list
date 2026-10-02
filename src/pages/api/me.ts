import type { APIRoute } from "astro";
import { canEdit, currentUser } from "../../lib/backend/server";
import type { Me } from "../../lib/backend/types";
import { serverError } from "../../lib/http";

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await currentUser(request);
    const me: Me = { user, canEdit: canEdit(user) };
    return Response.json(me, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return serverError(error);
  }
};
