import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/backend/schema.ts",
  out: "./drizzle",
});
