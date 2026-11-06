import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import content from "@/content/playbook.md?raw";
import reddit from "@/assets/playbook-reddit.jpg.asset.json";
import lovable from "@/assets/playbook-lovable.jpg.asset.json";
import chatbase from "@/assets/playbook-chatbase.jpg.asset.json";
import producthunt from "@/assets/playbook-producthunt.jpg.asset.json";
import stripe from "@/assets/playbook-stripe-data.jpg.asset.json";
import cluely from "@/assets/playbook-cluely.jpg.asset.json";
import ahrefs from "@/assets/playbook-ahrefs.jpg.asset.json";
import loop from "@/assets/playbook-loop-diagram.jpg.asset.json";

const images: Record<string, string> = {
  "images/reddit.jpg": reddit.url,
  "images/lovable.jpg": lovable.url,
  "images/chatbase.jpg": chatbase.url,
  "images/producthunt.jpg": producthunt.url,
  "images/stripe-data.jpg": stripe.url,
  "images/cluely.jpg": cluely.url,
  "images/ahrefs.jpg": ahrefs.url,
  "images/loop-diagram.jpg": loop.url,
};

const chapters = content.split(/^---\s*$/m).flatMap((chapter) => {
  const heading = chapter.match(/^# (.+) \{#([^}]+)\}$/m);
  const title = heading?.[1];
  const id = heading?.[2];
  if (!title || !id || id === "about") return [];
  const label = chapter.match(/^PHASE LABEL: (.+)$/m)?.[1] ?? "";
  const intro = chapter.match(/^LEAD: (.+)$/m)?.[1] ?? "";
  const body = chapter
    .replace(/^PHASE LABEL: .+\n/m, "")
    .replace(/^# .+\n/m, "")
    .replace(/^LEAD: .+\n/m, "")
    .replace(/^CHECKLIST:\s*\n/gm, "")
    .replace(/^CALLOUT: (.+)$/gm, "> $1");
  return [{ id, title, label, intro, body }];
});

function MarkdownHeading({ children }: { children?: ReactNode }) {
  const parts = Array.isArray(children) ? [...children] : [children];
  let id: string | undefined;
  const last = parts[parts.length - 1];
  if (typeof last === "string") {
    const match = last.match(/\s*\{#([^}]+)\}$/);
    if (match) {
      id = match[1];
      parts[parts.length - 1] = last.replace(/\s*\{#[^}]+\}$/, "");
    }
  }
  return <h3 id={id}>{parts}</h3>;
}

export function ExpandedPlaybook({ share }: { share: (id: string, title: string, label: string) => ReactNode }) {
  return chapters.map((chapter) => (
    <section key={chapter.id} id={chapter.id} className="border-t border-border px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[720px]">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs font-medium tracking-[0.18em] text-muted-foreground">{chapter.label}</div>
          {share(chapter.id, chapter.title, chapter.label)}
        </div>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{chapter.title}</h2>
        {chapter.intro && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{chapter.intro}</p>}
        <div className="book-content mt-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: MarkdownHeading,
              h3: ({ children }) => <h4>{children}</h4>,
              table: ({ children }) => <div className="book-table"><table>{children}</table></div>,
              img: ({ src, alt }) => {
                const url = src ? images[src] : undefined;
                return url ? <img src={url} alt={alt ?? ""} loading="lazy" /> : null;
              },
            }}
          >
            {chapter.body}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  ));
}