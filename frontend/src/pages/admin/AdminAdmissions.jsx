import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/api";

const STATUS_OPTIONS = ["new", "contacted", "converted", "closed"];

export default function AdminAdmissions() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    const { data } = await api.get("/admin/admissions");
    setItems(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const del = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    await api.delete(`/admin/admissions/${id}`);
    toast.success("Deleted");
    load();
  };

  const setStatus = async (id, status) => {
    await api.patch(`/admin/admissions/${id}?status=${status}`);
    load();
  };

  return (
    <div className="bg-white rounded-2xl border border-border/60 overflow-hidden" data-testid="admin-admissions">
      <table className="w-full text-sm">
        <thead className="bg-brand-cream text-brand-navy">
          <tr>
            <th className="text-left p-3">Parent</th>
            <th className="text-left p-3">Child</th>
            <th className="text-left p-3">Phone</th>
            <th className="text-left p-3">Class</th>
            <th className="text-left p-3">Branch</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Date</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a.id} className="border-t border-border/60" data-testid={`admission-row-${a.id}`}>
              <td className="p-3 font-medium">{a.parent_name}</td>
              <td className="p-3">{a.child_name}</td>
              <td className="p-3">{a.phone}</td>
              <td className="p-3">{a.class_interested}</td>
              <td className="p-3 capitalize">{a.branch}</td>
              <td className="p-3">
                <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} className="px-2 py-1 rounded border text-xs">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="p-3 text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString("en-IN")}</td>
              <td className="p-3">
                <button onClick={() => del(a.id)} className="text-red-600 hover:text-red-800" aria-label="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan="8" className="p-10 text-center text-muted-foreground">No admissions yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
