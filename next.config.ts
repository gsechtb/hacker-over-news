import type { NextConfig } from "next";

// Project sites on GitHub Pages (username.github.io/<repo>) are served from a
// subpath, so the base path has to be baked into the build. Set
// NEXT_PUBLIC_BASE_PATH in the deploy workflow (or .env.local) when the repo
// isn't deployed at the domain root (e.g. a custom domain).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    // next/image's optimizer needs a server; static export has none.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
