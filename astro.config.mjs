// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      // Set automatically by Vercel's Neon integration.
      DATABASE_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      // Any long random string; signs login cookies.
      BETTER_AUTH_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      // From the Discord developer portal (OAuth2 page of your app).
      DISCORD_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      DISCORD_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      // The Discord user ID allowed to add and delete entries. Unset means
      // no one can.
      OWNER_DISCORD_ID: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
});
