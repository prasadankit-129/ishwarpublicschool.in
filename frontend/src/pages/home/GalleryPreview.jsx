import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function GalleryPreview({ items }) {
  return (
    <section className="py-20 md:py-28" data-testid="gallery-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-brand-ochre mb-2">Campus Life</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">Moments from our world</h2>
          </div>
          <Link to="/gallery" className="text-sm font-semibold text-brand-ochre inline-flex items-center gap-1 hover:gap-2 transition-all">
            View full gallery <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((g, i) => (
            <div key={g.id} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <img src={g.image_url} alt={g.title} className={`w-full ${i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"} object-cover group-hover:scale-105 transition-transform duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-medium text-sm">{g.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
