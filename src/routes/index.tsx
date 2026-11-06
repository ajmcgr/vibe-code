import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import reddit from "@/assets/reddit-example.jpg.asset.json";
import lovable from "@/assets/lovable-example.jpg.asset.json";
import chatbase from "@/assets/chatbase-example.jpg.asset.json";
import producthunt from "@/assets/producthunt-example.jpg.asset.json";
import stripe from "@/assets/stripe-example.jpg.asset.json";
import cluely from "@/assets/cluely-example.jpg.asset.json";
import alex from "@/assets/alex-macgregor.jpg.asset.json";
import ahrefs from "@/assets/ahrefs-example.jpg.asset.json";

const TITLE = "Vibe Coding: From Idea to Launch and Beyond";
const SUB =
  "A structured 7-phase path for early-stage founders to go from idea to market, build momentum, and keep growing.";
const PDF = "/vibe-coding-founder-playbook.pdf";

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

const PHASES = [
  ["idea", "Idea"],
  ["build", "Build"],
  ["brand", "Brand"],
  ["launch", "Launch"],
  ["pr", "PR"],
  ["content", "Content"],
  ["analytics", "Analytics"],
] as const;

type Item = [string, string];

function DownloadButton({ size = "md", free = true }: { size?: "sm" | "md"; free?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <a
        href={PDF}
        download
        className={`inline-flex items-center rounded-full bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-85 ${size === "sm" ? "px-4 py-1.5 text-sm" : "px-6 py-3 text-base"}`}
      >
        Download PDF
      </a>
      {free && <span className="text-xs text-muted-foreground">(free)</span>}
    </span>
  );
}

function Card({ title, children, num }: { title: string; children: ReactNode; num?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {num && <div className="mb-3 text-sm font-medium text-muted-foreground">{num}</div>}
      <h4 className="font-semibold">{title}</h4>
      <div className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-8 border-l-2 border-primary py-1 pl-5 text-[17px] leading-relaxed">
      <strong className="font-semibold">{label}:</strong> {children}
    </div>
  );
}

function BulletList({ items }: { items: Item[] }) {
  return (
    <ul className="space-y-4">
      {items.map(([k, v]) => (
        <li key={k} className="border-b border-border pb-4 text-[16px] leading-relaxed last:border-0">
          <strong className="font-semibold">{k}:</strong> <span className="text-muted-foreground">{v}</span>
        </li>
      ))}
    </ul>
  );
}

function Example({ title, img, alt, children }: { title: string; img?: string; alt?: string; children: ReactNode }) {
  return (
    <div className="mx-auto mt-16 max-w-[1100px]">
      <h3 className="mx-auto max-w-[720px] text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
      <div className={`mt-6 grid gap-8 ${img ? "md:grid-cols-[1.2fr_1fr] md:items-start" : "mx-auto max-w-[720px]"}`}>
        {img && (
          <img src={img} alt={alt} loading="lazy" className="w-full rounded-xl border border-border" />
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

function Phase({ n, id, title, intro, children }: { n: number; id: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-border px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[720px]">
        <div className="text-xs font-medium tracking-[0.18em] text-muted-foreground">PHASE {n}</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{intro}</p>
      </div>
      {children}
    </section>
  );
}

const Grid = ({ cols, children }: { cols: 2 | 3; children: ReactNode }) => (
  <div className={`mx-auto mt-10 grid max-w-[1100px] gap-4 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</div>
);
const Sub = ({ children }: { children: ReactNode }) => (
  <h3 className="mx-auto mt-12 max-w-[1100px] text-sm font-semibold tracking-wide text-muted-foreground">{children}</h3>
);

function useActive() {
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      let cur = "";
      for (const [id] of PHASES) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      const s = document.getElementById("summary");
      if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = "";
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
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5">
          <a href="#top" className="text-xl font-bold tracking-tight">Vibe Code</a>
          <DownloadButton size="sm" />
        </div>
      </header>

      <nav aria-label="Phases" className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
        <ol className="rounded-2xl border border-border bg-background/95 p-2 backdrop-blur">
          {PHASES.map(([id, label], i) => (
            <li key={id}>
              <a href={`#${id}`} title={label} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${active === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                <span className="tabular-nums">0{i + 1}</span>
                <span className="hidden 2xl:inline">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main id="top">
        <section className="px-5 pb-20 pt-20 md:pt-32">
          <div className="mx-auto max-w-[720px]">
            <div className="text-xs font-medium tracking-[0.18em] text-muted-foreground">VIBE CODE BOOK</div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{TITLE}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">{SUB}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <DownloadButton free={false} />
              <a href="#idea" className="inline-flex items-center rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-accent">
                Start reading
              </a>
            </div>
          </div>
        </section>

        <Phase n={1} id="idea" title="Idea: Find Something Worth Building" intro="Before writing a single line of code, validate that the problem is real and the market exists. Use AI research tools and community signals to narrow in on a wedge worth pursuing.">
          <Sub>Your Research Stack</Sub>
          <Grid cols={3}>
            <Card title="ChatGPT & Claude">Brainstorm problems, explore markets, and stress-test assumptions fast.</Card>
            <Card title="Perplexity">AI-powered search with cited sources for deeper market research.</Card>
            <Card title="Reddit & X">Listen to real conversations — find pain points people are already complaining about.</Card>
          </Grid>
          <div className="mx-auto max-w-[720px]">
            <Callout label="Founder tip">The best ideas often hide in plain sight — in forum rants, support tickets, and "there has to be a better way" moments.</Callout>
          </div>
          <Example title="Idea Example: Reddit Subreddits" img={reddit.url} alt="Reddit search results showing subreddit discussions about a problem">
            <BulletList items={[
              ["Problems", "Search for existing apps or generic phrases describing the problem e.g. Reddit, Facebook etc"],
              ["Research", "Read the comments, ask questions via replies"],
              ["Lists", "Make a list of all the pain points and issues regarding potential solutions"],
              ["Idea(s)", "Use AI plus your own intuition to narrow down to the idea"],
            ]} />
          </Example>
        </Phase>

        <Phase n={2} id="build" title="Build: Ship Your MVP" intro="Speed is your unfair advantage. Use modern AI-assisted dev tools to go from zero to shipped in days, not months. Focus on the core loop; everything else is secondary.">
          <Grid cols={3}>
            <Card title="AI Vibe Code Platforms">Cursor, Lovable, v0, Bolt — Generate, edit, and scaffold code with AI at your side.</Card>
            <Card title="Dev Environments">Codex, GitHub — Spin up projects instantly and collaborate with version control from day one.</Card>
            <Card title="Backend & Payments">Supabase, Stripe — Plug in auth, databases, and payments without reinventing the wheel.</Card>
          </Grid>
          <Example title="Build Example: Lovable .com" img={lovable.url} alt="Lovable.com homepage screenshot">
            <BulletList items={[
              ["Vibe Coding Platform", "Sign up to Lovable, great for MVPS (I built my multiple MVP apps using it)"],
              ["Backend", "Sign up to Supabase and Github, link to your Lovable project"],
              ["Payments", "Add Stripe to accept payments"],
              ["Advanced", "Use more advanced AI coding environments when you're ready i.e Codex"],
            ]} />
          </Example>
        </Phase>

        <Phase n={3} id="brand" title="Brand: Turn MVP into a Trusted Product" intro="Great products fail without a great story. Rocket gives founders the brand strategy, positioning, and launch assets to show up like a company not a side project.">
          <Sub>Brand consists of:</Sub>
          <Grid cols={2}>
            <Card title="Strategy">positioning · tagline · naming</Card>
            <Card title="Copy">landing page · product descriptions</Card>
            <Card title="Visuals">screenshots · social assets</Card>
            <Card title="Launch">checklist · launch assets</Card>
          </Grid>
          <Grid cols={3}>
            <Card title="Brand Strategy & Positioning">Define who you are, who you serve, and why you win.</Card>
            <Card title="Tagline, Naming & Copy">Craft the words that make people remember you.</Card>
            <Card title="Landing Page & Launch Assets">Screenshots, social assets, product descriptions, and a full launch checklist.</Card>
          </Grid>
          <Example title="Brand Example: Chatbase Homepage" img={chatbase.url} alt="Chatbase homepage screenshot showing its tagline and hero">
            <BulletList items={[
              ["Brand positioning", "e.g. Chatbase is the brand for AI chat agents"],
              ["Tagline", "e.g. AI agents for magical customer experiences'"],
              ["Key messaging", "e.g. 'Chatbase is the complete platform for building & deploying AI support agents for your business'"],
              ["Assets", "Launch assets created e.g hero graphics, customer logos etc"],
            ]} />
          </Example>
        </Phase>

        <Phase n={4} id="launch" title="Launch: Get Discovered" intro="Launch day is not luck; it's a system. Build your presence across the right platforms, optimize for discovery, and activate communities before you hit publish.">
          <Grid cols={2}>
            <Card title="Landing Page">Your product's main funnel — optimized for conversion and first impressions.</Card>
            <Card title="SEO & Discovery">Rank for the right keywords and get found by the right people.</Card>
            <Card title="Community Platforms">Product Hunt, Hacker News, Reddit, Indie Hackers — activate each with a tailored strategy.</Card>
            <Card title="Founder Profile">Your story is a differentiator. Build a founder profile that earns trust and drives clicks.</Card>
          </Grid>
          <Example title="Launch Example: Product Hunt (Obviously)" img={producthunt.url} alt="Product Hunt launch page screenshot">
            <p className="mb-6 leading-relaxed text-muted-foreground">Launch day is not luck; it's a system. Build your presence across the right platforms, optimize for discovery, and activate communities before you hit publish.</p>
            <div className="space-y-6">
              {([
                ["Platforms launched on", ["Product Hunt", "Hacker News", "Reddit subreddits (e.g., /r/saas, /r/startups)", "Twitter/X", "LinkedIn"]],
                ["Community activation", ["Early adopter engagement", "Pre-launch outreach to influencers/beta users", "Engagement on launch day posts"]],
                ["Initial traction", ["Sign-ups/users acquired", "Website traffic", "Mentions/shares"]],
                ["Launch day results", ["Key metrics achieved", "Learnings and next steps"]],
              ] as [string, string[]][]).map(([h, items]) => (
                <div key={h}>
                  <div className="font-semibold">{h}:</div>
                  <ul className="mt-2 space-y-1.5">
                    {items.map((x) => (
                      <li key={x} className="flex gap-3 text-muted-foreground">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full border border-muted-foreground" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Example>
        </Phase>

        <Phase n={5} id="pr" title="PR: Get People Talking" intro="Press doesn't happen by accident. Build relationships with journalists, creators, and influencers then run structured outreach campaigns that earn coverage and build credibility.">
          <Sub>Media Strategy</Sub>
          <div className="mx-auto max-w-[720px]">
            <Callout label="Key insight">A single well-placed media mention can outperform weeks of paid ads. Build the relationships early.</Callout>
          </div>
          <Grid cols={2}>
            <Card num={1} title="Journalists">Identify and pitch reporters who cover your space.</Card>
            <Card num={2} title="Creators & Influencers">Partner with voices your audience already trusts.</Card>
            <Card num={3} title="Outreach & Email Templates">Personalized, scalable outreach that gets replies.</Card>
            <Card num={4} title="Campaigns">Coordinate press drops with launch timing for maximum impact.</Card>
          </Grid>
          <Example title="PR Example: Stripe Internal Data" img={stripe.url} alt="Stripe post sharing internal data as content">
            <BulletList items={[
              ["Identify Data", "Every startup produces data, access yours"],
              ["Turn Data Into Content", "Create engaging content from the data e.g Tweets, infographics, videos etc"],
              ["Distribute", "Distribute the content on your personal and brand accounts, experiment across different social media channels, email and wherever works best for your startup"],
            ]} />
          </Example>
        </Phase>

        <Phase n={6} id="content" title="Content: Stay Visible" intro="Launch day is just the beginning. A consistent content engine keeps your product top of mind, builds audience trust, and compounds over time all the way to your next launch.">
          <Grid cols={3}>
            <Card title="Repurpose">Turn one piece of content into posts, threads, reels, and newsletters.</Card>
            <Card title="Schedule">Batch-create and schedule posts so consistency never depends on motivation.</Card>
            <Card title="Distribute">Publish across X, LinkedIn, Threads, Instagram, and TikTok — meet your audience where they are.</Card>
          </Grid>
          <Example title="Content Example: Cluely Founder Roy Lee" img={cluely.url} alt="Social media profile of Cluely founder Roy Lee">
            <BulletList items={[
              ["Content Pillars", "Design content pillars to define your main topics and themes, Cluely is focused on startups, ragebait and founders"],
              ["Posting Frequency", "Develop a posting frequency to specify how often you publish content across channels whether thats X, Instagram, TikTok, YouTube etc"],
              ["Best Content", "Identify top performing content then double down on content that outperforms and put paid ads behind it if possible"],
              ["Content Growth", "Drive audience growth by outlining content's role in reaching and engaging new users and expand from there"],
            ]} />
          </Example>
        </Phase>

        <Phase n={7} id="analytics" title="Analytics: Understand What Worked" intro="Data closes the loop. Use analytics to see what drove traffic, what converted, and what to double down on then feed those insights directly into your next build cycle.">
          <Sub>Analytics Stack</Sub>
          <Grid cols={2}>
            <Card title="GA4">Traffic sources, user behavior, and conversion funnels.</Card>
            <Card title="PostHog">Product analytics and feature usage tracking.</Card>
            <Card title="Google Search Console">Search performance and indexing insights.</Card>
            <Card title="Ahrefs & Plausible">SEO intelligence and privacy-friendly web analytics.</Card>
          </Grid>
          <Example title="Analytics Example: Ahrefs SEO Data" img={ahrefs.url} alt="Ahrefs dashboard showing SEO traffic data">
            <BulletList items={[
              ["Traffic sources", "e.g., Organic Search, Social, Paid"],
              ["Conversion rate", "e.g., 5%, 10% from signup to paid"],
              ["Key learnings", "e.g., X feature drives Y engagement"],
              ["Next iteration focus", "e.g., A/B test pricing, improve onboarding"],
            ]} />
          </Example>
        </Phase>

        <section id="summary" className="border-t border-border px-5 py-20 md:py-28">
          <div className="mx-auto max-w-[720px]">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Summary</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Every phase feeds the next. This is the full operating system — from first idea to second launch and beyond. The best founders don't stop at launch; they build the loop.</p>
          </div>
          <ol className="mx-auto mt-12 grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Idea", "Validate the problem"], ["Build", "Ship the MVP"], ["Brand", "Brand & launch assets"], ["Launch", "Discovery & community"],
              ["PR", "PR & outreach"], ["Content", "Content distribution"], ["Analytics", "Measure & learn"], ["Keep Building", "Iterate with data"],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-xl border border-border p-6">
                <div className="text-sm text-muted-foreground">0{i + 1}</div>
                <div className="mt-3 font-semibold">{t}</div>
                <div className="mt-1 text-[15px] text-muted-foreground">{d}</div>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="border-t border-border px-5 py-20 md:py-28">
          <div className="mx-auto flex max-w-[720px] flex-col gap-8 sm:flex-row sm:items-center">
            <img src={alex.url} alt="Portrait of Alex MacGregor" loading="lazy" className="h-32 w-32 shrink-0 border border-border object-cover" />
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Alex MacGregor</h2>
            <p className="mt-4 text-lg text-muted-foreground">I build software, help founders launch & document the process.</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              {[
                ["X", "https://x.com/alexmacgregor__"],
                ["Instagram", "https://instagram.com/alexmacgregor__"],
                ["YouTube", "https://youtube.com/@alexmacgregor"],
                ["TikTok", "https://tiktok.com/@alexmacgregor__"],
                ["LinkedIn", "https://linkedin.com/in/alexmacgregor2"],
              ].map(([l, h]) => (
                <li key={l}><a href={h} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:decoration-foreground">{l}</a></li>
              ))}
            </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Alex MacGregor · Vibe Code Book</span>
          <span className="inline-flex items-center gap-3">
            <a href={PDF} download className="font-medium text-foreground underline underline-offset-4">Download PDF</a>
            <span className="text-xs">(free)</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
