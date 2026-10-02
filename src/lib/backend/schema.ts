import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export * from "./auth-schema";

export const project = pgTable("project", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
