// Applies any new migrations in ./drizzle to DATABASE_URL. Runs before every
// build, so deploying is enough to keep the database up to date.
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL not set; skipping database migrations.");
} else {
  const db = drizzle(process.env.DATABASE_URL);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await db.$client.end();
  console.log("Database migrations applied.");
}
