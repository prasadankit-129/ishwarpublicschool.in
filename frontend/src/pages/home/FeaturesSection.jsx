import { Award, BookOpen, GraduationCap, Star, Users } from "lucide-react";
import { ASSETS } from "@/data/siteData";

const FEATURES = [
  { key: "curriculum", icon: BookOpen, title: "Modern Curriculum", desc: "State board-aligned with English medium instruction and smart classrooms." },
  { key: "faculty", icon: Users, title: "Dedicated Faculty", desc: "34+ trained teachers focused on individual student growth." },
  { key: "values", icon: Award, title: "Values First", desc: "Character, discipline and community woven into every day." },
  { key: "campuses", icon: GraduationCap, title: "Two Campuses", desc: "Serving Birgaon & Dhaneli neighbourhoods since 2002." },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-brand-ochre mb-2">Why Ishwar</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy mb-6">Learning that shapes character, not just careers.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              For over two decades we have believed that education is more than examinations. Our classrooms nurture curiosity, our playgrounds build resilience, and our faculty walks beside every child — not ahead of them.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.key} className="group p-5 rounded-2xl border border-border/60 hover:border-brand-ochre hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-brand-cream flex items-center justify-center mb-3 group-hover:bg-brand-ochre group-hover:text-white transition-colors">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-brand-navy text-base">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={ASSETS.celebration} alt="Students in classroom" className="w-full rounded-3xl shadow-xl object-cover aspect-[4/5] animate-float-soft" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-1 mb-2 text-brand-gold">
                {STAR_KEYS.map((k) => <Star key={k} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-brand-navy font-medium">"A place where my child learns to think, not just to answer."</p>
              <p className="text-xs text-muted-foreground mt-2">— A Proud Parent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
