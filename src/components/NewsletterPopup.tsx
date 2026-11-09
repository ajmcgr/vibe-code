import { useEffect, useState, type ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import alex from "@/assets/alex-macgregor-portrait.jpg.asset.json";

export function NewsletterPopup({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 8000);
    const onScroll = () => {
      const firstChapter = document.getElementById("how-to-use");
      if (firstChapter && firstChapter.getBoundingClientRect().bottom < 0) {
        setOpen(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="newsletter-popup max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md gap-0 overflow-y-auto rounded-button p-0 motion-reduce:animate-none" onOpenAutoFocus={(event) => event.preventDefault()}>
        <div className="gradient-accent h-1 w-full" aria-hidden="true" />
        <div className="px-6 pb-5 pt-8 sm:px-8">
          <img src={alex.url} alt="Alex MacGregor" className="mb-5 h-20 w-20 border border-border object-cover" />
          <p className="mb-3 text-xs font-medium text-muted-foreground">ALEX MACGREGOR</p>
          <DialogTitle className="text-3xl font-bold leading-tight tracking-normal">More from the author.</DialogTitle>
          <DialogDescription className="mt-4 text-base leading-relaxed">
            Get my take on startups, vibe coding, AI tools and distribution—straight to your inbox.
          </DialogDescription>
          {children}
          <DialogClose asChild>
            <Button variant="ghost" className="mt-3 min-h-11 w-full rounded-button text-muted-foreground">Not now, keep reading</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}