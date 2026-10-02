// Server half of the backend black box: reading and writing entries, and
// working out who is making a request. Swapping backends means rewriting this
// folder; the rest of the app only uses this file, ./client.ts and ./types.ts.

import { OWNER_DISCORD_ID } from "astro:env/server";
import { and, asc, eq } from "drizzle-orm";
import { auth } from "./auth";
import { db } from "./db";
import { account, project } from "./schema";
import type { Entry, User } from "./types";

const toEntry = (row: { id: number; name: string }): Entry => ({
  id: String(row.id),
  name: row.name,
});

export const listEntries = async (): Promise<Entry[]> => {
  const rows = await db()
    .select({ id: project.id, name: project.name })
    .from(project)
    .orderBy(asc(project.id));
  return rows.map(toEntry);
};

export const addEntry = async (name: string): Promise<Entry> => {
  const [row] = await db()
    .insert(project)
    .values({ name })
    .returning({ id: project.id, name: project.name });
  return toEntry(row);
};

// Returns false if there was no entry with that id.
export const deleteEntry = async (id: string): Promise<boolean> => {
  const numericId = Number(id);
  if (!Number.isSafeInteger(numericId)) {
    return false;
  }
  const deleted = await db()
    .delete(project)
    .where(eq(project.id, numericId))
    .returning({ id: project.id });
  return deleted.length > 0;
};

// Works out who sent a request from their login cookie.
export const currentUser = async (request: Request): Promise<User | null> => {
  const session = await auth().api.getSession({ headers: request.headers });
  if (!session) {
    return null;
  }

  const [discord] = await db()
    .select({ discordId: account.accountId })
    .from(account)
    .where(
      and(eq(account.userId, session.user.id), eq(account.providerId, "discord"))
    );
  return {
    id: session.user.id,
    name: session.user.name,
    discordId: discord?.discordId ?? null,
  };
};

// The list owner is whoever logs in with the Discord account OWNER_DISCORD_ID.
export const canEdit = (user: User | null) =>
  user !== null &&
  OWNER_DISCORD_ID !== undefined &&
  user.discordId === OWNER_DISCORD_ID;
