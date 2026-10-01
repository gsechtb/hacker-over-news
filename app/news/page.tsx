import type { Metadata } from "next";
import { getAllNews, getNewsGeneratedAt } from "@/lib/news";
import { NewsCard } from "@/components/news-card";

export const metadata: Metadata = {
  title: "News",
  description: "Latest cybersecurity headlines, aggregated from established industry sources.",
};

export default function NewsPage() {
  const items = getAllNews();
  const generatedAt = getNewsGeneratedAt();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-mono text-2xl font-semibold">News</h1>
      <p className="mt-2 text-muted">
        Headlines aggregated from Krebs on Security, The Hacker News, BleepingComputer, Dark
        Reading, SecurityWeek, and The Record. Each link goes to the original publisher — nothing
        is rehosted here.
      </p>
      {generatedAt && (
        <p className="mt-1 text-xs text-muted">
          Last refreshed{" "}
          <time dateTime={generatedAt} suppressHydrationWarning>
            {new Date(generatedAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "UTC",
            })}{" "}
            UTC
          </time>
        </p>
      )}

      <div className="mt-8 rounded-lg border border-border bg-surface px-5">
        {items.length === 0 ? (
          <p className="py-8 text-center text-muted">No news items yet.</p>
        ) : (
          items.map((item) => <NewsCard key={item.link} item={item} />)
        )}
      </div>
    </div>
  );
}
