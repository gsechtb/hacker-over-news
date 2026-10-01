import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-mono font-medium text-foreground">{SITE_NAME}</p>
          <p>{SITE_TAGLINE}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/blog" className="text-muted hover:text-accent">Blog</Link>
          <Link href="/news" className="text-muted hover:text-accent">News</Link>
          <Link href="/tags" className="text-muted hover:text-accent">Tags</Link>
          <Link href="/about" className="text-muted hover:text-accent">About</Link>
          <a href="/rss.xml" className="text-muted hover:text-accent">RSS</a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {SITE_NAME}. Content is for educational and defensive security purposes only.
      </div>
    </footer>
  );
}
