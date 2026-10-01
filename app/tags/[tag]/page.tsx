import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getPostsByTag, slugifyTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link href="/tags" className="text-sm text-accent hover:underline">
        ← All tags
      </Link>
      <h1 className="mt-4 font-mono text-2xl font-semibold">#{tag}</h1>
      <p className="mt-2 text-muted">
        {posts.length} post{posts.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
