import PageHeader from "@/components/PageHeader";
import { Calendar, MapPin } from "lucide-react";
import { ASSETS, events } from "@/data/siteData";

export default function Events() {
  return (
    <div data-testid="events-page">
      <PageHeader eyebrow="Events" title="Where learning meets celebration." subtitle="From sports days to science fairs — a look at what's happening on our campuses." image={ASSETS.celebration} />
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {events.map((e) => (
            <div key={e.id} className="p-6 md:p-8 rounded-3xl border border-border/60 hover:border-brand-ochre transition-colors bg-white flex flex-col md:flex-row gap-6" data-testid={`event-${e.id}`}>
              <div className="w-24 h-24 rounded-2xl bg-brand-navy text-white flex flex-col items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-brand-gold" />
                <div className="text-xs mt-2 font-semibold uppercase text-white/70">{new Date(e.event_date).toLocaleDateString("en-IN", { month: "short" })}</div>
                <div className="font-display text-2xl font-bold text-brand-gold">{new Date(e.event_date).getDate()}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-brand-navy">{e.title}</h3>
                <p className="mt-2 text-muted-foreground">{e.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-brand-ochre font-semibold">
                  <MapPin className="w-4 h-4" />{e.location}
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="text-center text-muted-foreground py-10">No upcoming events. Please check back soon.</p>}
        </div>
      </section>
    </div>
  );
}
