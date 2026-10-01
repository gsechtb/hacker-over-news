import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search blog posts by title, description, tags, and content.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-mono text-2xl font-semibold">Search</h1>
      <p className="mt-2 text-muted">Search across every blog post.</p>
      <div className="mt-6">
        <SearchClient />
      </div>
    </div>
  );
}
