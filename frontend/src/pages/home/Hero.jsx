import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { SCHOOL } from "@/lib/api";

const STATS = [
  { key: "years", label: "Years of Legacy", val: "22+" },
  { key: "classes", label: "Classes Offered", val: "1–12" },
  { key: "faculty", label: "Faculty Members", val: "34+" },
  { key: "campuses", label: "Active Campuses", val: "2" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: imageUrl("images/image1.jpg") }}
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs uppercase tracking-widest mb-6" data-testid="hero-badge">
          <Sparkles className="w-3 h-3 text-brand-gold" />
          Nurturing Excellence Since 2002
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold max-w-4xl leading-[1.05]" data-testid="hero-title">
          Where every child <em className="text-brand-gold not-italic">dreams boldly</em> and grows gracefully.
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed" data-testid="hero-subtitle">
          {SCHOOL.name}, Raipur — a co-educational English-medium school with two thriving campuses at Birgaon and Dhaneli. Rooted in values. Reaching for excellence.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/admissions" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-ochre hover:bg-brand-ochre/90 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" data-testid="hero-apply-btn">
            Apply for Admission
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 font-semibold transition-all" data-testid="hero-explore-btn">
            Explore the School
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
          {STATS.map((s) => (
            <div key={s.key} className="border-l-2 border-brand-gold pl-4">
              <div className="font-display text-3xl md:text-4xl font-bold text-brand-gold">{s.val}</div>
              <div className="text-xs uppercase tracking-wider text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
