import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, GraduationCap, Phone } from "lucide-react";
import { SCHOOL } from "@/lib/api";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/faculty", label: "Faculty" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/news", label: "News" },
  { to: "/achievements", label: "Achievements" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60" data-testid="site-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center shadow-sm group-hover:rotate-3 transition-transform">
              <GraduationCap className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-brand-navy">{SCHOOL.name}</div>
              <div className="text-[11px] text-muted-foreground tracking-wide uppercase">Raipur · Since {SCHOOL.established}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive ? "bg-brand-navy text-white" : "text-brand-navy hover:bg-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href={`tel:${SCHOOL.phoneRaw}`} className="flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-ochre transition-colors" data-testid="nav-phone">
              <Phone className="w-4 h-4" />
              {SCHOOL.phone}
            </a>
            <Link
              to="/admissions"
              data-testid="nav-cta-admissions"
              className="px-5 py-2.5 rounded-full bg-brand-ochre text-white font-semibold text-sm hover:bg-brand-ochre/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Apply Now
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 space-y-1" data-testid="nav-mobile-menu">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? "bg-brand-navy text-white" : "text-brand-navy hover:bg-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/admissions" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg bg-brand-ochre text-white font-semibold text-center">
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
