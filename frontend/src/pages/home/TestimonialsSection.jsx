import { Star } from "lucide-react";

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export default function TestimonialsSection({ items }) {
  return (
    <section className="py-20 md:py-28" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-ochre mb-2">In Their Words</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">Voices from our community</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.id} className="p-8 rounded-3xl bg-white border border-border/60 hover:border-brand-ochre transition-colors" data-testid={`testimonial-${t.id}`}>
              <div className="flex gap-1 text-brand-gold mb-4">
                {STAR_KEYS.slice(0, t.rating).map((k) => <Star key={k} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-brand-navy leading-relaxed">"{t.content}"</p>
              <div className="mt-6 pt-6 border-t border-border/60">
                <div className="font-semibold text-brand-navy">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
