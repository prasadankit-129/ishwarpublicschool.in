import { Target, Eye, HeartHandshake, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { ASSETS } from "@/data/siteData";

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHeader
        eyebrow="Who We Are"
        title="A quiet, steady commitment to excellence in education."
        subtitle="Founded in 2002 in Birgaon, Ishwar Public School has grown into a trusted two-campus institution serving families across Raipur."
        image={ASSETS.sports}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-3">Our Story</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight">Two decades of shaping tomorrow, one child at a time.</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>Ishwar Public School began in 2002 as a small English-medium school in Birgaon with a clear purpose — to offer high-quality, values-based education to the growing families of the Dharshiwa block. What started as a single campus has grown into two thriving branches serving hundreds of students today.</p>
              <p>In 2013, responding to demand from parents in Dhaneli village, we opened our second campus with primary and upper-primary classes. Both branches share a common ethos: warm classrooms, dedicated teachers, and a firm belief that every child has something remarkable to offer.</p>
              <p>Today, with 34+ teachers across two campuses, we continue to walk beside families through the journey of childhood — nurturing not just students, but future citizens.</p>
            </div>
          </div>
          <img src={ASSETS.scienceLab} alt="Students at school" className="w-full rounded-3xl shadow-lg aspect-[4/5] object-cover animate-float-soft" />
        </div>
      </section>

      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-2">Guiding Principles</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">Mission, Vision & Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Our Mission", text: "To provide accessible, high-quality English-medium education that builds strong academic foundations and lasting values." },
              { icon: Eye, title: "Our Vision", text: "To be the school of choice in our region — known for compassionate teaching, curious learners, and confident graduates." },
              { icon: HeartHandshake, title: "Our Values", text: "Integrity, curiosity, respect, discipline and joy in learning. These aren't posters on our walls — they live in our classrooms." },
            ].map((v) => (
              <div key={v.title} className="p-8 rounded-3xl bg-white border border-border/60">
                <div className="w-14 h-14 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy">{v.title}</h3>
                <p className="mt-3 text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-2">By the Numbers</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">A community that has grown together</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: "22+", l: "Years since founding" },
              { n: "34+", l: "Dedicated teachers" },
              { n: "23", l: "Well-equipped classrooms" },
              { n: "2", l: "Campuses across Raipur" },
            ].map((s) => (
              <div key={s.l} className="text-center p-6 rounded-2xl border border-border/60 hover:border-brand-ochre transition-colors">
                <div className="font-display text-4xl md:text-5xl font-bold text-brand-ochre">{s.n}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
