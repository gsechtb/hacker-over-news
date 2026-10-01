"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  body: string;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE_PATH}/search-index.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SearchEntry[]) => {
        if (cancelled) return;
        setEntries(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "tags", weight: 0.15 },
          { name: "body", weight: 0.05 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [entries],
  );

  const results = query.trim() ? fuse.search(query).map((r) => r.item) : entries;

  return (
    <div>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts — e.g. ransomware, MFA, SSRF..."
        className="w-full rounded-md border border-border bg-surface px-4 py-3 text-base outline-none focus:border-accent"
      />

      <div className="mt-6">
        {status === "loading" && <p className="text-muted">Loading search index…</p>}
        {status === "error" && (
          <p className="text-muted">
            Couldn&apos;t load the search index. Run <code>npm run build</code> to generate it.
          </p>
        )}
        {status === "ready" && results.length === 0 && (
          <p className="text-muted">No posts match &quot;{query}&quot;.</p>
        )}

        <ul className="divide-y divide-border">
          {results.map((entry) => (
            <li key={entry.slug} className="py-4">
              <Link href={`/blog/${entry.slug}`} className="text-lg font-medium text-foreground hover:text-accent">
                {entry.title}
              </Link>
              <p className="mt-1 text-sm text-muted">{entry.description}</p>
              {entry.tags.length > 0 && (
                <p className="mt-1 font-mono text-xs text-muted">
                  {entry.tags.map((t) => `#${t}`).join(" ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
