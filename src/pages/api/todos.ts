import type { APIRoute } from "astro";
import { addEntry, listEntries } from "../../lib/backend/server";
import { requireOwner, serverError } from "../../lib/http";

// Not cached: entries can change at any moment now.
export const GET: APIRoute = async () => {
  try {
    return Response.json({ projects: await listEntries() });
  } catch (error) {
    return serverError(error);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const denied = await requireOwner(request);
    if (denied) {
      return denied;
    }

    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    if (!name) {
      return new Response("Entry needs a name.", { status: 400 });
    }

    return Response.json(await addEntry(name), { status: 201 });
  } catch (error) {
    return serverError(error);
  }
};
