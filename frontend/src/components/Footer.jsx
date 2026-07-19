import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Facebook, Instagram, GraduationCap } from "lucide-react";
import { SCHOOL } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-20" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-brand-navy" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">{SCHOOL.name}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Since {SCHOOL.established}</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {SCHOOL.tagline} A trusted English-medium co-educational institution serving Raipur through two thriving campuses.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={SCHOOL.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-ochre flex items-center justify-center transition-colors" data-testid="footer-facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={SCHOOL.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-ochre flex items-center justify-center transition-colors" data-testid="footer-instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-4 text-brand-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link to="/about" className="hover:text-brand-gold">About Us</Link></li>
            <li><Link to="/academics" className="hover:text-brand-gold">Academics</Link></li>
            <li><Link to="/faculty" className="hover:text-brand-gold">Faculty</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-gold">Gallery</Link></li>
            <li><Link to="/achievements" className="hover:text-brand-gold">Achievements</Link></li>
            <li><Link to="/admissions" className="hover:text-brand-gold">Admissions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-4 text-brand-gold">Our Branches</h4>
          {SCHOOL.branches.map((b) => (
            <div key={b.key} className="mb-4 text-sm text-white/75">
              <div className="font-semibold text-white">{b.name}</div>
              <div className="text-xs mt-1 flex items-start gap-2">
                <MapPin className="w-3 h-3 mt-1 flex-shrink-0 text-brand-gold" />
                <span>{b.address}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-4 text-brand-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-gold" /><a href={`tel:${SCHOOL.phoneRaw}`} className="hover:text-brand-gold">{SCHOOL.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-gold" /><a href="mailto:admin@ishwarpublicschool.com" className="hover:text-brand-gold">admin@ishwarpublicschool.com</a></li>
            <li><a href={SCHOOL.mapUrl} target="_blank" rel="noreferrer" className="hover:text-brand-gold underline underline-offset-2">View on Google Maps</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Ishwar Public School, Raipur. All rights reserved.</span>
          <Link to="/admin/login" className="hover:text-brand-gold" data-testid="footer-admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
