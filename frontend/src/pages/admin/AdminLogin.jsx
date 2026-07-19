import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GraduationCap, Loader2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      nav("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy grain-texture flex items-center justify-center p-6" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-gold flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-brand-navy" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Admin Portal</h1>
          <p className="text-white/60 text-sm mt-2">Ishwar Public School Management</p>
        </div>
        <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-2xl space-y-5" data-testid="admin-login-form">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-ochre focus:outline-none" data-testid="admin-email-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-ochre focus:outline-none" data-testid="admin-password-input" />
          </div>
          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-navy hover:bg-brand-ochre transition-colors text-white font-semibold disabled:opacity-60" data-testid="admin-login-btn">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Sign In
          </button>
        </form>
        <p className="text-center text-white/40 text-xs mt-6">← <a href="/" className="hover:text-brand-gold">Back to site</a></p>
      </div>
    </div>
  );
}
