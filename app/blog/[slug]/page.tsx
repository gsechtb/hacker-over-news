import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { MDXContent } from "@/components/mdx";
import { FormattedDate } from "@/components/formatted-date";
import { TagBadge } from "@/components/tag-badge";
import { SeverityBadge } from "@/components/severity-badge";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/blog" className="text-sm text-accent hover:underline">
        ← Back to blog
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <FormattedDate date={post.date} />
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{post.author}</span>
          {post.severity && (
            <>
              <span aria-hidden>·</span>
              <SeverityBadge severity={post.severity} />
            </>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-lg text-muted">{post.description}</p>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral mt-10 max-w-none">
        <MDXContent source={post.content} />
      </div>
    </article>
  );
}
