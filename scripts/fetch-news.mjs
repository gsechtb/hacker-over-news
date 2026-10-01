#!/usr/bin/env node
// Pulls headlines from public cybersecurity RSS feeds and writes data/news.json.
// Run manually with `npm run fetch-news`, or on a schedule via
// .github/workflows/update-news.yml. Each feed is isolated in a try/catch so
// one dead feed doesn't blank out the whole news page.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "data", "news.json");
const MAX_ITEMS = 60;
const PER_FEED_LIMIT = 15;
const FETCH_TIMEOUT_MS = 15_000;

const FEEDS = [
  { source: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
  { source: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { source: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { source: "Dark Reading", url: "https://www.darkreading.com/rss.xml" },
  { source: "SecurityWeek", url: "https://www.securityweek.com/feed/" },
  { source: "The Record", url: "https://therecord.media/feed" },
];

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

function stripHtml(input) {
  if (!input) return "";
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, max = 220) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CybersecBlogNewsBot/1.0; +https://github.com/)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function normalizeItem(rawItem, source) {
  const title = stripHtml(rawItem.title);
  const link =
    typeof rawItem.link === "string"
      ? rawItem.link
      : rawItem.link?.["@_href"] ?? rawItem.link?.[0]?.["@_href"] ?? "";
  const pubDateRaw =
    rawItem.pubDate ?? rawItem.published ?? rawItem.updated ?? rawItem["dc:date"] ?? null;
  const pubDate = pubDateRaw ? new Date(pubDateRaw).toISOString() : new Date().toISOString();
  const snippetSource = rawItem.description ?? rawItem.summary ?? rawItem["content:encoded"] ?? "";

  if (!title || !link) return null;

  return {
    title,
    link,
    source,
    pubDate,
    snippet: truncate(stripHtml(snippetSource)),
  };
}

async function fetchFeed({ source, url }) {
  try {
    const xml = await fetchWithTimeout(url);
    const parsed = parser.parse(xml);
    const rssItems = parsed?.rss?.channel?.item;
    const atomEntries = parsed?.feed?.entry;
    const rawItems = [].concat(rssItems ?? atomEntries ?? []);

    const items = rawItems
      .slice(0, PER_FEED_LIMIT)
      .map((item) => normalizeItem(item, source))
      .filter(Boolean);

    console.log(`[fetch-news] ${source}: ${items.length} items`);
    return items;
  } catch (err) {
    console.warn(`[fetch-news] ${source} failed: ${err.message}`);
    return [];
  }
}

async function main() {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const allItems = results.flat();

  const deduped = new Map();
  for (const item of allItems) {
    if (!deduped.has(item.link)) deduped.set(item.link, item);
  }

  const sorted = [...deduped.values()]
    .sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate))
    .slice(0, MAX_ITEMS);

  if (sorted.length === 0) {
    console.warn(
      "[fetch-news] no items fetched from any feed — leaving existing data/news.json untouched. Check network access or feed URLs.",
    );
    return;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    items: sorted,
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`[fetch-news] wrote ${sorted.length} items to ${path.relative(process.cwd(), OUT_PATH)}`);
}

main().catch((err) => {
  console.error("[fetch-news] fatal error:", err);
  process.exitCode = 1;
});
