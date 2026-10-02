import { DATABASE_URL } from "astro:env/server";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let database: NodePgDatabase<typeof schema> | undefined;

export const db = () => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL not set.");
  }
  database ??= drizzle(DATABASE_URL, { schema });
  return database;
};
