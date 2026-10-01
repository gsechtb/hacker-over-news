import type { NewsItem } from "@/lib/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="border-b border-border py-4 last:border-b-0">
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium leading-snug text-foreground hover:text-accent"
      >
        {item.title}
      </a>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="font-mono text-accent">{item.source}</span>
        <span aria-hidden>·</span>
        <time dateTime={item.pubDate} suppressHydrationWarning>
          {new Date(item.pubDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </time>
      </div>
      {item.snippet && <p className="mt-2 text-sm text-muted">{item.snippet}</p>}
    </article>
  );
}
