/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_ANON_TOKEN: process.env.SUPABASE_ANON_TOKEN,
    SUPABASE_ENDPOINT: process.env.SUPABASE_ENDPOINT,
  },
};

module.exports = nextConfig;
