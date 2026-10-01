import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllNews } from "@/lib/news";
import { PostCard } from "@/components/post-card";
import { NewsCard } from "@/components/news-card";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const news = getAllNews().slice(0, 6);

  return (
    <>
      <section className="grid-fade border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-mono text-sm text-accent">{"// cybersecurity blog & news"}</p>
          <h1 className="terminal-glow mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            {SITE_NAME}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{SITE_TAGLINE}</p>
          <p className="mt-2 max-w-xl text-muted">
            Deep dives on application security, incident response, and defensive engineering —
            plus a feed of the latest industry headlines, refreshed automatically.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Read the blog
            </Link>
            <Link
              href="/news"
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Latest news
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xl font-semibold">Latest posts</h2>
          <Link href="/blog" className="text-sm text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-xl font-semibold">From the news feed</h2>
            <Link href="/news" className="text-sm text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-surface px-5">
            {news.map((item) => (
              <NewsCard key={item.link} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
