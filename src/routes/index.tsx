import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExpandedPlaybook } from "@/components/ExpandedPlaybook";
import alex from "@/assets/playbook-alex.jpg.asset.json";
import bookPdf from "@/assets/vibe-code-book-expanded.pdf.asset.json";
import { List, ChevronDown } from "lucide-react";

const TITLE = "Vibe Coding: From Idea to Launch and Beyond";
const SUB =
  "A structured 7-phase path for early-stage founders to go from idea to market, build momentum, and keep growing.";
const PDF = bookPdf.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${TITLE} | Vibe Code Book` },
      { name: "description", content: SUB },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: SUB },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: SUB },
    ],
  }),
  component: Index,
});

const CHAPTERS = [
  ["how-to-use", "Start here", "→"],
  ["idea", "Idea", "01"],
  ["build", "Build", "02"],
  ["brand", "Brand", "03"],
  ["launch", "Launch", "04"],
  ["pr", "PR", "05"],
  ["content", "Content", "06"],
  ["analytics", "Analytics", "07"],
  ["summary", "Summary", "↳"],
  ["thirty-days", "30-day plan", "↳"],
  ["glossary", "Glossary", "↳"],
  ["about", "Author", "↳"],
] as const;

const SITE = "https://vibecodebook.org";
const SHARE_TEXT =
  "Vibe Coding: From Idea to Launch and Beyond — a free 7-phase playbook for founders by Alex MacGregor";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
      <ellipse cx="12" cy="14.2" rx="8.4" ry="6.4" />
      <path d="M12.1 7.9 13.3 3.4l3.5.9" />
      <circle cx="17.4" cy="4.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="9.1" cy="13.2" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="14.9" cy="13.2" r="1.15" fill="currentColor" stroke="none" />
      <path d="M9.3 16.6c1.7 1.3 3.7 1.3 5.4 0" />
    </svg>
  );
}

function shareLinks(url: string, text: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  return [
    ["X", `https://twitter.com/intent/tweet?text=${t}&url=${u}`, XIcon],
    ["Reddit", `https://www.reddit.com/submit?url=${u}&title=${t}`, RedditIcon],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, LinkedInIcon],
  ] as const;
}

function ShareRow({ url, text, label = "Share", size = "sm" }: { url: string; text: string; label?: string; size?: "sm" | "md" }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <span className="w-full text-xs font-medium tracking-[0.18em] text-muted-foreground sm:w-auto">{label.toUpperCase()}</span>
      {shareLinks(url, text).map(([name, href, Icon]) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border transition-colors hover:bg-accent ${size === "md" ? "px-4 py-2 text-[15px]" : "px-3 py-1.5 text-sm"}`}
        >
          <Icon className={size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"} />
          {name}
        </a>
      ))}
    </div>
  );
}

function ShareIcons({ url, text, label = "Share this phase" }: { url: string; text: string; label?: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1">
      {shareLinks(url, text).map(([name, href, Icon]) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} on ${name}`}
          title={`${label} on ${name}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:h-7 sm:w-7"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </span>
  );
}

function DownloadButton({ size = "md", free = true }: { size?: "sm" | "md"; free?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 sm:gap-3">
      <a
        href={PDF}
        download
        className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-85 ${size === "sm" ? "px-3 py-2 text-xs sm:px-4 sm:py-1.5 sm:text-sm" : "px-6 py-3 text-base"}`}
      >
        Download PDF
      </a>
      {free && <span className="text-xs text-muted-foreground">(free)</span>}
    </span>
  );
}

function useActive() {
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      let cur = "";
      for (const [id] of CHAPTERS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { active, progress };
}

function Index() {
  const { active, progress } = useActive();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} />
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:flex sm:justify-between sm:gap-4 sm:px-5">
          <a href="#top" className="min-w-0 text-4xl font-bold leading-none sm:text-5xl md:text-8xl">Vibe Code</a>
          <DownloadButton size="sm" />
        </div>
        <details className="mobile-chapters relative border-t border-border lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 text-sm font-medium">
            <List className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1">{CHAPTERS.find(([id]) => id === active)?.[1] ?? "Contents"}</span>
            <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile book chapters" className="absolute inset-x-0 top-full max-h-[60dvh] overflow-y-auto border-b border-border bg-background px-4 py-2">
            {CHAPTERS.map(([id, label, number]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); }} className={`flex min-h-11 items-center gap-3 border-b border-border px-2 text-sm last:border-0 ${active === id ? "bg-accent font-semibold text-foreground" : "text-muted-foreground"}`}>
                <span className="w-5 shrink-0 text-center tabular-nums" aria-hidden="true">{number}</span>{label}
              </a>
            ))}
          </nav>
        </details>
      </header>

      <nav aria-label="Book chapters" className="fixed left-3 top-[calc(50%+3rem)] z-30 hidden max-h-[calc(100dvh-11rem)] w-32 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-background/95 p-1.5 backdrop-blur lg:block">
        <ol>
          {CHAPTERS.map(([id, label, number]) => (
            <li key={id}>
              <a href={`#${id}`} title={label} aria-current={active === id ? "location" : undefined} className={`flex items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors ${active === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                <span className="w-4 shrink-0 text-center tabular-nums" aria-hidden="true">{number}</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main id="top">
        <section className="px-5 pb-14 pt-10 sm:pb-20 sm:pt-20 md:pt-32">
          <div className="mx-auto max-w-[720px]">
            <div className="text-xs font-medium tracking-[0.18em] text-muted-foreground">VIBE CODE BOOK</div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{TITLE}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">{SUB}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <DownloadButton free={false} />
              <a href="#how-to-use" className="inline-flex items-center rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-accent">
                Start reading
              </a>
            </div>
            <div className="mt-10">
              <ShareRow url={SITE} text={SHARE_TEXT} label="Share the book" size="md" />
            </div>
          </div>
        </section>

        <ExpandedPlaybook share={(id, title, label) => (
          <ShareIcons url={`${SITE}/#${id}`} text={`${label}: ${title} — Vibe Code Book`} label="Share this chapter" />
        )} />

        <section id="about" className="border-t border-border px-5 py-20 md:py-28">
          <div className="mx-auto flex max-w-[720px] flex-col gap-8 sm:flex-row sm:items-center">
            <img src={alex.url} alt="Portrait of Alex MacGregor" loading="lazy" className="h-32 w-32 shrink-0 border border-border object-cover" />
            <div className="min-w-0">
            <div className="text-xs font-medium tracking-[0.18em] text-muted-foreground">AUTHOR</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Alex MacGregor</h2>
            <p className="mt-4 text-lg text-muted-foreground">Alex MacGregor builds software and helps founders launch and document the process.</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              {[
                ["X", "https://x.com/alexmacgregor__"],
                ["Instagram", "https://instagram.com/alexmacgregor__"],
                ["YouTube", "https://youtube.com/@alexmacgregor"],
                ["TikTok", "https://tiktok.com/@alexmacgregor__"],
                ["LinkedIn", "https://linkedin.com/in/alexmacgregor2"],
              ].map(([l, h]) => (
                <li key={l}><a href={h} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-border underline-offset-4 hover:decoration-foreground">{l}</a></li>
              ))}
            </ul>
            <div className="mt-8">
              <ShareRow url={SITE} text={SHARE_TEXT} label="Share" />
            </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Alex MacGregor · Vibe Code Book</span>
          <span className="inline-flex flex-wrap items-center gap-2 sm:gap-3">
            <a href={PDF} download className="inline-flex min-h-11 items-center font-medium text-foreground underline underline-offset-4">Download PDF</a>
            <span className="text-xs">(free)</span>
            <span className="mx-2 h-4 w-px bg-border" />
            <ShareIcons url={SITE} text={SHARE_TEXT} label="Share the book" />
          </span>
        </div>
      </footer>
    </div>
  );
}
