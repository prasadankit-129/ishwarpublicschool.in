import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { api, SCHOOL } from "@/lib/api";

const CLASSES = ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

export default function Admissions() {
  const [form, setForm] = useState({ parent_name: "", child_name: "", phone: "", email: "", class_interested: "", branch: "birgaon", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.parent_name || !form.child_name || !form.phone || !form.class_interested) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.email) delete payload.email;
      await api.post("/admissions", payload);
      setDone(true);
      toast.success("Enquiry submitted! We'll get back to you shortly.");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admissions-page">
      <PageHeader eyebrow="Admissions" title="Begin your child's Ishwar journey." subtitle="Admissions are open for the 2026-27 session. Fill this quick enquiry and our admissions team will reach out with next steps." image="https://images.pexels.com/photos/3767411/pexels-photo-3767411.jpeg" />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {done ? (
              <div className="p-10 rounded-3xl border border-brand-ochre/40 bg-brand-cream text-center" data-testid="admission-success">
                <CheckCircle2 className="w-14 h-14 text-brand-ochre mx-auto" />
                <h3 className="font-display text-3xl font-bold text-brand-navy mt-4">Thank you!</h3>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">Your enquiry has been received. Our admissions team will contact you within 24-48 hours.</p>
                <button className="mt-6 px-6 py-2.5 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-brand-ochre transition-colors" onClick={() => { setDone(false); setForm({ parent_name: "", child_name: "", phone: "", email: "", class_interested: "", branch: "birgaon", message: "" }); }} data-testid="admission-new-btn">
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-8 md:p-10 rounded-3xl border border-border/60 bg-white space-y-5" data-testid="admission-form">
                <h3 className="font-display text-2xl font-bold text-brand-navy">Admission Enquiry Form</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Parent / Guardian Name *" value={form.parent_name} onChange={(v) => setForm({ ...form, parent_name: v })} testid="input-parent-name" />
                  <Field label="Child's Name *" value={form.child_name} onChange={(v) => setForm({ ...form, child_name: v })} testid="input-child-name" />
                  <Field label="Phone Number *" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} testid="input-phone" />
                  <Field label="Email (optional)" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} testid="input-email" />
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2">Class Interested *</label>
                    <select value={form.class_interested} onChange={(e) => setForm({ ...form, class_interested: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-ochre focus:outline-none bg-white" data-testid="input-class">
                      <option value="">Select a class</option>
                      {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2">Preferred Campus *</label>
                    <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-ochre focus:outline-none bg-white" data-testid="input-branch">
                      <option value="birgaon">Birgaon (Main) — Class 1 to 12</option>
                      <option value="dhaneli">Dhaneli — Class 1 to 8</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2">Anything you'd like us to know?</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-ochre focus:outline-none bg-white" data-testid="input-message" />
                </div>
                <button type="submit" disabled={loading} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-ochre hover:bg-brand-ochre/90 text-white font-semibold disabled:opacity-60" data-testid="admission-submit-btn">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-5">
            <div className="p-6 rounded-3xl bg-brand-navy text-white">
              <h4 className="font-display text-xl font-bold">Prefer to talk?</h4>
              <p className="mt-2 text-sm text-white/75">Call us directly and we'll walk you through the admission process.</p>
              <a href={`tel:${SCHOOL.phoneRaw}`} className="mt-4 block text-brand-gold font-semibold text-lg">{SCHOOL.phone}</a>
              <a href={SCHOOL.whatsapp} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 hover:text-brand-gold">Or message us on WhatsApp →</a>
            </div>
            <div className="p-6 rounded-3xl bg-brand-cream border border-brand-ochre/20">
              <h4 className="font-display text-lg font-bold text-brand-navy">What to expect</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-brand-ochre">1.</span>We receive your enquiry</li>
                <li className="flex gap-2"><span className="text-brand-ochre">2.</span>Our team calls you within 48 hours</li>
                <li className="flex gap-2"><span className="text-brand-ochre">3.</span>Schedule a campus visit</li>
                <li className="flex gap-2"><span className="text-brand-ochre">4.</span>Complete admission formalities</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", testid }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border focus:border-brand-ochre focus:outline-none bg-white" data-testid={testid} />
    </div>
  );
}
