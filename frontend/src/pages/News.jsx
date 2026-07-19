import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import { Megaphone } from "lucide-react";
import { fallbackNews } from "@/lib/fallbackContent";

export default function News() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/news");
      setItems(data.length ? data : fallbackNews);
    } catch {
      setItems(fallbackNews);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div data-testid="news-page">
      <PageHeader eyebrow="News & Notices" title="Latest from our campuses." subtitle="Announcements, notices and stories from Ishwar Public School." />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {items.map((n) => (
            <div key={n.id} className="p-6 md:p-8 rounded-2xl border border-border/60 hover:border-brand-ochre transition-colors bg-white" data-testid={`news-${n.id}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-ochre">{n.category}</span>
                <span className="text-xs text-muted-foreground ml-auto">{new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-brand-navy">{n.title}</h3>
              <p className="mt-2 text-muted-foreground">{n.content}</p>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-muted-foreground py-10">No news at the moment. Please check back soon.</p>}
        </div>
      </section>
    </div>
  );
}
