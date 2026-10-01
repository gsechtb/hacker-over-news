export const SITE_NAME = "Threat Horizon";
export const SITE_TAGLINE = "Cybersecurity blog & news, scanned daily.";
export const SITE_DESCRIPTION =
  "Threat Horizon covers application security, incident response, and the vulnerabilities shaping the threat landscape — plus an auto-updating feed of the latest cybersecurity news.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const GITHUB_REPO_URL = "https://github.com/";
export const TWITTER_HANDLE = "";

export const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
] as const;
