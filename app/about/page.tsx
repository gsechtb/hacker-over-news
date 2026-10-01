import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE_NAME} is, and what it isn't.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-mono text-2xl font-semibold">About {SITE_NAME}</h1>

      <div className="prose prose-neutral mt-6 max-w-none">
        <p>
          {SITE_NAME} is a cybersecurity blog and news aggregator covering application security,
          incident response, and defensive engineering. The goal is practical, accurate writing
          that a working engineer or security practitioner can act on — not clickbait and not
          marketing copy.
        </p>

        <h2>What&apos;s here</h2>
        <ul>
          <li>
            <strong>Blog</strong> — long-form, evergreen write-ups: how a vulnerability class
            works, how an attack unfolds end to end, how to actually implement a defensive
            control.
          </li>
          <li>
            <strong>News</strong> — a feed of recent headlines pulled automatically from
            established cybersecurity publications, refreshed on a schedule via a GitHub Actions
            workflow. Headlines link out to the original source; nothing is rehosted.
          </li>
        </ul>

        <h2>What this site is not</h2>
        <p>
          Nothing published here includes working exploit code, malware, or step-by-step attack
          instructions against systems you don&apos;t own or have authorization to test.
          Technical detail is written for defenders: understanding how an attack class works is
          how you defend against it, and that&apos;s the line this blog tries to stay on.
        </p>

        <h2>Corrections</h2>
        <p>
          Security writing ages fast and mistakes happen. If something here is inaccurate or
          out of date, please open an issue or pull request on the{" "}
          <a href="https://github.com/">GitHub repository</a> this site is built from.
        </p>
      </div>
    </div>
  );
}
