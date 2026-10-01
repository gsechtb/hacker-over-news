export const SITE_NAME = "Hacker Over News";
export const SITE_TAGLINE = "Cybersecurity blog & news, scanned daily.";
export const SITE_DESCRIPTION =
  "Hacker Over News covers application security, incident response, and the vulnerabilities shaping the threat landscape — plus an auto-updating feed of the latest cybersecurity news.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const GITHUB_REPO_URL = "https://github.com/gsechtb/hacker-over-news";
export const TWITTER_HANDLE = "";

export const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
] as const;
