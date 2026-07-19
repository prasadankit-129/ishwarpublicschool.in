import PageHeader from "@/components/PageHeader";
import { User } from "lucide-react";

const leadership = [
  { name: "Anju Bala", role: "Head Teacher — Birgaon Campus", desc: "Leading the main branch with over two decades of experience in student mentorship and school administration." },
  { name: "Tejaswi Dewangan", role: "Head Teacher — Dhaneli Campus", desc: "Passionate about early-childhood pedagogy and building a nurturing environment for primary learners." },
];

const departments = [
  { name: "English & Languages", strength: 6 },
  { name: "Mathematics", strength: 5 },
  { name: "Science", strength: 5 },
  { name: "Social Studies & EVS", strength: 4 },
  { name: "Computer Science", strength: 2 },
  { name: "Arts, Music & Sports", strength: 4 },
  { name: "Pre-Primary Faculty", strength: 6 },
  { name: "Support & Administration", strength: 2 },
];

export default function Faculty() {
  return (
    <div data-testid="faculty-page">
      <PageHeader
        eyebrow="Our Faculty"
        title="Teachers who teach with heart."
        subtitle="A team of 34+ trained educators across two campuses — bringing knowledge, patience, and genuine care to every classroom."
        image="https://images.pexels.com/photos/8617714/pexels-photo-8617714.jpeg"
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-3">Leadership</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-10">Meet our Head Teachers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {leadership.map((l) => (
              <div key={l.name} className="p-8 rounded-3xl border border-border/60 hover:border-brand-ochre transition-colors flex gap-5 items-start" data-testid={`leader-${l.name.split(' ')[0]}`}>
                <div className="w-16 h-16 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-navy">{l.name}</h3>
                  <div className="text-sm text-brand-ochre font-semibold mt-1">{l.role}</div>
                  <p className="text-muted-foreground mt-3 text-sm">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-widest text-brand-ochre font-semibold mb-2">Departments</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy">Specialists in every subject</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">Our teaching team is organized into subject departments, each supporting a specific stage or discipline. Every teacher is regularly trained and mentored.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((d, i) => (
              <div key={d.name} className="p-6 rounded-2xl bg-white border border-border/60 hover:border-brand-ochre transition-colors" data-testid={`dept-${i}`}>
                <div className="font-display text-3xl font-bold text-brand-ochre">{d.strength}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Teachers</div>
                <div className="mt-4 font-semibold text-brand-navy">{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
