import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AchievementsSection({ items }) {
  return (
    <section className="py-20 md:py-28 bg-brand-navy text-white" data-testid="achievements-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">Milestones</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Achievements worth celebrating</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((a) => (
            <div key={a.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" data-testid={`achievement-${a.id}`}>
              <div className="font-display text-3xl font-bold text-brand-gold">{a.year}</div>
              <h4 className="mt-3 font-semibold">{a.title}</h4>
              <p className="mt-2 text-sm text-white/70">{a.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/achievements" className="inline-flex items-center gap-2 text-brand-gold hover:gap-3 transition-all text-sm font-semibold">
            See all achievements <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
