import Link from "next/link";
import type { Post } from "@/lib/posts";
import { FormattedDate } from "@/components/formatted-date";
import { TagBadge } from "@/components/tag-badge";
import { SeverityBadge } from "@/components/severity-badge";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <FormattedDate date={post.date} />
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
        {post.severity && (
          <>
            <span aria-hidden>·</span>
            <SeverityBadge severity={post.severity} />
          </>
        )}
      </div>

      <h3 className="mt-2 text-lg font-semibold leading-snug">
        <Link href={`/blog/${post.slug}`} className="text-foreground hover:text-accent">
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm text-muted">{post.description}</p>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
