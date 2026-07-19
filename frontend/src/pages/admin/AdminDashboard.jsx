import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  LogOut,
  Users,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Trophy,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import AdminOverview from "./AdminOverview";
import AdminAdmissions from "./AdminAdmissions";
import AdminCrudTab from "./AdminCrudTab";
import {
  TABS,
  NEWS_FIELDS,
  EVENT_FIELDS,
  GALLERY_FIELDS,
  TESTIMONIAL_FIELDS,
  ACHIEVEMENT_FIELDS,
} from "./adminConstants";

const TAB_ICONS = {
  overview: LayoutDashboard,
  admissions: Users,
  news: Newspaper,
  events: Calendar,
  gallery: ImageIcon,
  testimonials: MessageSquare,
  achievements: Trophy,
};

function Sidebar({ tab, setTab, user, onLogout }) {
  return (
    <aside className="w-64 bg-brand-navy text-white flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-brand-navy" />
          </div>
          <div>
            <div className="font-display font-bold">Ishwar Admin</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Management</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {TABS.map((t) => {
          const Icon = TAB_ICONS[t.key];
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-brand-ochre text-white" : "text-white/70 hover:bg-white/5"
              }`}
              data-testid={`admin-tab-${t.key}`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/60 mb-2">{user?.email}</div>
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5" data-testid="admin-logout-btn">
          <LogOut className="w-4 h-4" />Logout
        </button>
      </div>
    </aside>
  );
}

function TabContent({ tab }) {
  switch (tab) {
    case "admissions":
      return <AdminAdmissions />;
    case "news":
      return <AdminCrudTab resource="news" fields={NEWS_FIELDS} />;
    case "events":
      return <AdminCrudTab resource="events" fields={EVENT_FIELDS} />;
    case "gallery":
      return <AdminCrudTab resource="gallery" fields={GALLERY_FIELDS} publicList />;
    case "testimonials":
      return <AdminCrudTab resource="testimonials" fields={TESTIMONIAL_FIELDS} />;
    case "achievements":
      return <AdminCrudTab resource="achievements" fields={ACHIEVEMENT_FIELDS} publicList />;
    default:
      return null;
  }
}

export default function AdminDashboard() {
  const nav = useNavigate();
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({});

  const loadStats = useCallback(async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (e) {
      if (e.response?.status === 401) {
        nav("/admin/login");
      }
    }
  }, [nav]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    nav("/admin/login");
  };

  return (
    <div className="min-h-screen bg-brand-cream flex" data-testid="admin-dashboard">
      <Sidebar tab={tab} setTab={setTab} user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-brand-navy capitalize">{tab}</h1>
          <div className="flex items-center gap-4 md:hidden">
            <select value={tab} onChange={(e) => setTab(e.target.value)} className="px-3 py-2 rounded-lg border">
              {TABS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
            <button onClick={handleLogout} className="text-sm text-red-600" aria-label="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {tab === "overview" ? <AdminOverview stats={stats} /> : <TabContent tab={tab} />}
        </main>
      </div>
    </div>
  );
}
