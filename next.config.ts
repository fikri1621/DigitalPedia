import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Matikan fitur eksperimental yang tidak didukung penuh di Cloudflare
  // cacheComponents: true,
  // partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
