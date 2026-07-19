import PageHeader from "@/components/PageHeader";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SCHOOL } from "@/lib/api";

export default function Contact() {
  return (
    <div data-testid="contact-page">
      <PageHeader eyebrow="Contact" title="Come visit. Or just say hello." subtitle="We'd love to hear from you. Reach any of our campuses or drop us a note online." />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {SCHOOL.branches.map((b) => (
            <div key={b.key} className="p-8 rounded-3xl border border-border/60 hover:border-brand-ochre transition-colors bg-white" data-testid={`contact-branch-${b.key}`}>
              <div className="text-xs uppercase tracking-widest font-semibold text-brand-ochre">{b.subtitle}</div>
              <h3 className="font-display text-3xl font-bold text-brand-navy mt-2">{b.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Established {b.established} · {b.classes}</p>
              <div className="mt-6 space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-brand-ochre flex-shrink-0" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-ochre" />
                  <a href={`tel:${SCHOOL.phoneRaw}`} className="hover:text-brand-ochre">{SCHOOL.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-ochre" />
                  <a href="mailto:admin@ishwarpublicschool.com" className="hover:text-brand-ochre">admin@ishwarpublicschool.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-ochre" />
                  <span>Mon – Sat · 8:00 AM to 3:00 PM</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/60 flex gap-3">
                <a href={SCHOOL.mapUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2.5 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-brand-ochre transition-colors" data-testid={`btn-directions-${b.key}`}>Get Directions</a>
                <a href={SCHOOL.whatsapp} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2.5 rounded-full border border-brand-navy text-brand-navy text-sm font-semibold hover:bg-brand-cream transition-colors inline-flex items-center justify-center gap-2" data-testid={`btn-whatsapp-${b.key}`}>
                  <MessageCircle className="w-4 h-4" />WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-border shadow-sm">
            <iframe
              title="Ishwar Public School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.6!2d81.647!3d21.259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28e0d53ccc7153%3A0xf741e9911fcf4696!2sIshwar%20Public%20School!5e0!3m2!1sen!2sin!4v1706000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="google-map-embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
