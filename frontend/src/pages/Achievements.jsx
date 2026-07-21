import PageHeader from "@/components/PageHeader";
import { Trophy } from "lucide-react";
import { ASSETS, achievements } from "@/data/siteData";

export default function Achievements() {
  return (
    <div data-testid="achievements-page">
      <PageHeader eyebrow="Achievements" title="Moments of pride." subtitle="Milestones our students, teachers and school have earned over the years." image={ASSETS.faculty} />
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          {achievements.map((a) => (
            <div key={a.id} className="p-8 rounded-3xl border border-border/60 hover:border-brand-ochre transition-colors bg-white flex gap-5" data-testid={`achievement-item-${a.id}`}>
              <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-navy flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-ochre">{a.category}</span>
                  <span className="font-display text-lg font-bold text-brand-navy">{a.year}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-brand-navy">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
