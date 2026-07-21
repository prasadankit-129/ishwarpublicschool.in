import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronRight, MapPin, Users } from "lucide-react";
import { SCHOOL } from "@/data/siteData";

export default function BranchesSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-cream grain-texture" data-testid="branches-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-brand-ochre mb-2">Our Campuses</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy max-w-xl">Two homes of learning across Raipur</h2>
          </div>
          <Link to="/contact" className="text-sm font-semibold text-brand-navy inline-flex items-center gap-1 hover:text-brand-ochre">
            View directions <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {SCHOOL.branches.map((b, i) => (
            <div key={b.key} className="group relative overflow-hidden rounded-3xl bg-white p-8 md:p-10 shadow-sm hover:shadow-xl transition-all border border-border/50" data-testid={`branch-${b.key}`}>
              <div className="absolute top-6 right-6 text-6xl md:text-8xl font-display font-bold text-brand-navy/5 group-hover:text-brand-ochre/10 transition-colors">0{i + 1}</div>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-navy text-white text-[10px] uppercase tracking-widest font-semibold">{b.subtitle}</div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-4">{b.name}</h3>
              <p className="text-muted-foreground text-sm mt-2">Established {b.established} · {b.classes}</p>
              <div className="mt-6 space-y-2.5 text-sm">
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-brand-ochre mt-0.5 flex-shrink-0" /><span>{b.address}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-brand-ochre" /><span>{b.teachers} teachers · {b.classrooms} classrooms</span></div>
                <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-brand-ochre" /><span>{b.medium} medium · {b.board}</span></div>
              </div>
              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Head Teacher</div>
                  <div className="font-semibold text-brand-navy">{b.headTeacher}</div>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ochre hover:gap-2 transition-all">
                  Visit us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
