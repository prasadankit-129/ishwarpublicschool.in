import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import { X } from "lucide-react";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/gallery");
      setItems(data);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div data-testid="gallery-page">
      <PageHeader
        eyebrow="Gallery"
        title="A window into our world."
        subtitle="Moments captured across classrooms, playgrounds and celebrations at both our campuses."
        image="https://images.pexels.com/photos/35493021/pexels-photo-35493021.jpeg"
      />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {items.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelected(g)}
                className="group relative rounded-2xl overflow-hidden aspect-square focus:outline-none focus:ring-2 focus:ring-brand-ochre"
                data-testid={`gallery-item-${g.id}`}
              >
                <img src={g.image_url} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-left text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {g.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[60] bg-brand-navy/95 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setSelected(null)} data-testid="gallery-lightbox">
          <button className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" onClick={() => setSelected(null)} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image_url} alt={selected.title} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <div className="text-center mt-4 text-white/80">{selected.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
