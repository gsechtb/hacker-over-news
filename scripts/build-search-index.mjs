#!/usr/bin/env node
// Generates public/search-index.json at build time so the client-side search
// page (Fuse.js) has something static to fetch — no server/API route needed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const OUT_PATH = path.join(__dirname, "..", "public", "search-index.json");

function build() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.writeFileSync(OUT_PATH, "[]\n");
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const index = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      if (data.draft) return null;
      return {
        slug,
        title: data.title,
        description: data.description,
        tags: data.tags ?? [],
        date: data.date,
        body: content.replace(/\s+/g, " ").slice(0, 5000),
      };
    })
    .filter(Boolean)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(index, null, 2)}\n`);
  console.log(`[build-search-index] wrote ${index.length} entries to ${path.relative(process.cwd(), OUT_PATH)}`);
}

build();
