import { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Megaphone } from "lucide-react";
import { api } from "@/lib/api";

export default function NewsTicker() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/news");
      setItems(data);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (!items.length) return null;
  return (
    <div className="bg-brand-navy text-white py-2.5 border-b border-brand-gold/30" data-testid="news-ticker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0 pr-4 border-r border-white/20">
          <Megaphone className="w-4 h-4 text-brand-gold" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Latest</span>
        </div>
        <Marquee gradient={false} speed={40} pauseOnHover>
          {items.map((n) => (
            <span key={n.id} className="mx-8 text-sm">
              <span className="font-semibold">{n.title}</span>
              <span className="mx-3 text-white/40">•</span>
              <span className="text-white/70">{n.content}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
