import { canEdit, currentUser } from "./backend/server";

export const serverError = (error: unknown) =>
  new Response(error instanceof Error ? error.message : String(error), {
    status: 500,
  });

// Returns an error response unless the request comes from the list owner.
export const requireOwner = async (request: Request) => {
  const user = await currentUser(request);
  if (!user) {
    return new Response("Not logged in.", { status: 401 });
  }
  if (!canEdit(user)) {
    return new Response("Only the list owner can change entries.", {
      status: 403,
    });
  }
  return null;
};
