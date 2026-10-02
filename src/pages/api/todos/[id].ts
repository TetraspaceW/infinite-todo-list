import type { APIRoute } from "astro";
import { deleteEntry } from "../../../lib/backend/server";
import { requireOwner, serverError } from "../../../lib/http";

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const denied = await requireOwner(request);
    if (denied) {
      return denied;
    }

    const deleted = await deleteEntry(params.id!);
    return new Response(null, { status: deleted ? 204 : 404 });
  } catch (error) {
    return serverError(error);
  }
};
