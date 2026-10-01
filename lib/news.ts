import fs from "node:fs";
import path from "node:path";

const NEWS_PATH = path.join(process.cwd(), "data", "news.json");

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  snippet: string;
}

interface NewsFile {
  generatedAt: string;
  items: NewsItem[];
}

export function getAllNews(): NewsItem[] {
  if (!fs.existsSync(NEWS_PATH)) return [];
  const raw = fs.readFileSync(NEWS_PATH, "utf8");
  const parsed = JSON.parse(raw) as NewsFile;
  return parsed.items ?? [];
}

export function getNewsGeneratedAt(): string | null {
  if (!fs.existsSync(NEWS_PATH)) return null;
  const raw = fs.readFileSync(NEWS_PATH, "utf8");
  const parsed = JSON.parse(raw) as NewsFile;
  return parsed.generatedAt ?? null;
}
