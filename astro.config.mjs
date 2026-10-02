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
      SUPABASE_ENDPOINT: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SUPABASE_ANON_TOKEN: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SUPABASE_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
});
