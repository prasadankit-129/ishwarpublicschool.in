export default function AdminOverview({ stats }) {
  const cards = [
    { l: "New Admissions", v: stats.admissions_new || 0, k: "admissions_new" },
    { l: "Total Admissions", v: stats.admissions || 0, k: "admissions" },
    { l: "News Items", v: stats.news || 0, k: "news" },
    { l: "Events", v: stats.events || 0, k: "events" },
    { l: "Gallery Photos", v: stats.gallery || 0, k: "gallery" },
    { l: "Testimonials", v: stats.testimonials || 0, k: "testimonials" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-5" data-testid="admin-overview">
      {cards.map((c) => (
        <div key={c.k} className="p-6 bg-white rounded-2xl border border-border/60">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</div>
          <div className="font-display text-4xl font-bold text-brand-navy mt-2">{c.v}</div>
        </div>
      ))}
    </div>
  );
}
