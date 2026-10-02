import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  BETTER_AUTH_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
} from "astro:env/server";
import { db } from "./db";

const createAuth = () =>
  betterAuth({
    database: drizzleAdapter(db(), { provider: "pg" }),
    secret: BETTER_AUTH_SECRET,
    // Production, Vercel previews and local dev all work out their own URL.
    baseURL: {
      allowedHosts: ["todo.thetetra.space", "*.vercel.app", "localhost:*"],
      fallback: "https://todo.thetetra.space",
    },
    // Email/password sign-in is off; set `emailAndPassword: { enabled: true }`
    // to use the commented-out form on the login page.
    socialProviders: {
      discord: {
        clientId: DISCORD_CLIENT_ID ?? "",
        clientSecret: DISCORD_CLIENT_SECRET ?? "",
        // Phone-only Discord accounts have no email, which Better Auth
        // requires. This is Better Auth's recommended placeholder.
        mapProfileToUser: (profile) => ({
          email: profile.email ?? `${profile.id}@discord.placeholder.invalid`,
        }),
      },
    },
  });

let instance: ReturnType<typeof createAuth> | undefined;

export const auth = () => (instance ??= createAuth());
