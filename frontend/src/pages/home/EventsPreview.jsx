import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

export default function EventsPreview({ items }) {
  return (
    <section className="py-20 md:py-28 bg-brand-cream" data-testid="events-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-ochre mb-2">Save the Date</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">Upcoming events at Ishwar</h2>
          <p className="mt-4 text-muted-foreground">A calendar of learning, celebration and togetherness. Parents are always welcome.</p>
          <Link to="/events" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-brand-ochre transition-colors">
            See all events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="lg:col-span-2 space-y-4">
          {items.map((e) => (
            <div key={e.id} className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-border/60 hover:shadow-md transition-shadow" data-testid={`event-${e.id}`}>
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-brand-navy text-white flex flex-col items-center justify-center">
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span className="text-xs mt-1 font-semibold">{new Date(e.event_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-brand-navy">{e.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                <span className="text-xs text-brand-ochre font-semibold mt-2 inline-block">📍 {e.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
