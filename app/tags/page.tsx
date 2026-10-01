import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, slugifyTag } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by topic.",
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-mono text-2xl font-semibold">Tags</h1>
      <p className="mt-2 text-muted">Browse every post by topic.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${slugifyTag(tag)}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            <span className="font-mono">#{tag}</span>
            <span className="text-xs text-muted">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
