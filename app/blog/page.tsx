import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Application security, incident response, and defensive engineering write-ups.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-mono text-2xl font-semibold">Blog</h1>
      <p className="mt-2 max-w-xl text-muted">
        {posts.length} post{posts.length === 1 ? "" : "s"} on application security, incident
        response, and defensive engineering.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
