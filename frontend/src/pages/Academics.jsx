import PageHeader from "@/components/PageHeader";
import { BookOpen, Beaker, Palette, Music, Trophy, Laptop } from "lucide-react";
import { ASSETS, SCHOOL } from "@/data/siteData";

const stages = [
  { level: "Pre-Primary", classes: "Nursery, LKG, UKG", desc: "A playful, sensory-rich foundation focused on language, motor skills, and social development." },
  { level: "Primary", classes: "Class 1 – 5", desc: "Strong grounding in English, Hindi, Mathematics, Science, EVS and Computer basics." },
  { level: "Upper Primary", classes: "Class 6 – 8", desc: "Structured subject learning, project-based work, and introduction to labs and libraries." },
  { level: "Secondary & Higher Secondary", classes: "Class 9 – 12", desc: "State Board curriculum with academic streams and career-readiness guidance. (Birgaon campus)" },
];

const facilities = [
  { icon: BookOpen, title: "Library", desc: "A quiet corner filled with story, science and reference books." },
  { icon: Beaker, title: "Science Labs", desc: "Hands-on experimentation for physics, chemistry and biology." },
  { icon: Laptop, title: "Computer Lab", desc: "Modern computing infrastructure for digital literacy from an early age." },
  { icon: Palette, title: "Art & Craft", desc: "A dedicated space for creativity, painting and expression." },
  { icon: Music, title: "Music & Dance", desc: "Regular exposure to Indian classical music, folk dance and cultural forms." },
  { icon: Trophy, title: "Sports & Playground", desc: "Outdoor games, athletics, kabaddi, kho-kho and annual sports meets." },
];

export default function Academics() {
  return (
    <div data-testid="academics-page">
      <PageHeader
        eyebrow="Academics"
        title="A curriculum that grows with your child."
        subtitle="From nursery playgroups to Class 12 board preparation — thoughtfully structured, values-anchored, and delivered by teachers who love what they do."
        image={ASSETS.academics}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-2">Learning Stages</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">From first words to final exams</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {stages.map((s, i) => (
              <div key={s.level} className="p-8 rounded-3xl border border-border/60 hover:border-brand-ochre hover:shadow-md transition-all bg-white" data-testid={`stage-${i}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold text-brand-navy">{s.level}</h3>
                  <span className="text-xs font-semibold text-brand-ochre uppercase tracking-widest">{s.classes}</span>
                </div>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-2">Beyond Textbooks</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">Facilities that support the whole child</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white border border-border/60 hover:border-brand-ochre hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-brand-navy text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-navy text-white p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Details at a glance</h2>
              <p className="mt-4 text-white/75">Everything you need to know about our academic setup, medium, and affiliation.</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { l: "Medium", v: "English" },
                { l: "Board", v: "State Board (CG)" },
                { l: "Type", v: "Co-educational" },
                { l: "Session Starts", v: "April" },
                { l: "Birgaon", v: `Class 1–12 (Est. ${SCHOOL.branches[0].established})` },
                { l: "Dhaneli", v: `Class 1–8 (Est. ${SCHOOL.branches[1].established})` },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-brand-gold pl-4">
                  <div className="text-[11px] uppercase tracking-wider text-white/60">{s.l}</div>
                  <div className="font-semibold mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
