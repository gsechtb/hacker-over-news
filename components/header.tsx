import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight text-foreground">
          <span aria-hidden className="text-accent">&gt;_</span>
          <span>{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex items-center gap-5 overflow-x-auto border-t border-border px-4 py-2 text-sm font-medium sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 text-muted transition-colors hover:text-accent">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
