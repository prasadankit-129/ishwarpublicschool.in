import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-10 md:p-16 text-white">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-ochre/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-gold/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold">Ready to join the Ishwar family?</h2>
              <p className="mt-4 text-white/80">Admissions are now open for the 2026-27 academic session. Limited seats available at both campuses.</p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-ochre hover:bg-brand-gold hover:text-brand-navy font-semibold rounded-full shadow-lg transition-all" data-testid="cta-apply">
                Start Application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
