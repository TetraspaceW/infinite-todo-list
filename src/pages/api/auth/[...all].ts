import type { APIRoute } from "astro";
import { auth } from "../../../lib/backend/auth";

// Better Auth's own endpoints: Discord sign-in, its callback, sign-out, etc.
export const ALL: APIRoute = ({ request }) => auth().handler(request);
