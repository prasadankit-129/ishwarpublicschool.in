export default function PageHeader({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-brand-navy text-white">
      {image && (
        <>
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${image})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 to-brand-navy" />
        </>
      )}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && <div className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-3" data-testid="page-eyebrow">{eyebrow}</div>}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]" data-testid="page-title">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-white/80 text-base md:text-lg leading-relaxed" data-testid="page-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
