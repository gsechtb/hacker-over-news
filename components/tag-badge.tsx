import Link from "next/link";
import { slugifyTag } from "@/lib/posts";

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${slugifyTag(tag)}`}
      className="inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-0.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      #{tag}
    </Link>
  );
}
