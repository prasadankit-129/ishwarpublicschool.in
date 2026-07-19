import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";

function CrudField({ field, value, onChange, resource }) {
  const inputProps = {
    value: value || "",
    onChange: (e) => onChange(field.key, e.target.value),
    className: "w-full px-3 py-2 rounded-lg border border-border text-sm",
    "data-testid": `input-${resource}-${field.key}`,
  };
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-navy mb-1.5">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea rows={3} {...inputProps} />
      ) : (
        <input type={field.type || "text"} {...inputProps} />
      )}
    </div>
  );
}

function CrudForm({ fields, resource, onCreated }) {
  const [form, setForm] = useState({});

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.rating) payload.rating = parseInt(payload.rating, 10);
      await api.post(`/admin/${resource}`, payload);
      toast.success("Created");
      setForm({});
      onCreated();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed");
    }
  };

  return (
    <form onSubmit={submit} className="p-6 bg-white rounded-2xl border border-border/60 space-y-3">
      <div className="flex items-center gap-2 text-brand-navy font-display font-bold text-lg mb-2">
        <Plus className="w-4 h-4" />Add New
      </div>
      {fields.map((f) => (
        <CrudField key={f.key} field={f} value={form[f.key]} onChange={setField} resource={resource} />
      ))}
      <button
        type="submit"
        className="w-full py-2.5 rounded-full bg-brand-ochre text-white font-semibold text-sm hover:bg-brand-ochre/90"
        data-testid={`btn-create-${resource}`}
      >
        Create
      </button>
    </form>
  );
}

function CrudItem({ item, onDelete, resource }) {
  return (
    <div className="p-4 bg-white rounded-2xl border border-border/60 flex items-start justify-between gap-4" data-testid={`item-${resource}-${item.id}`}>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-brand-navy">{item.title || item.name}</div>
        <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {item.content || item.description || item.image_url || item.event_date}
        </div>
      </div>
      <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800 flex-shrink-0" aria-label="Delete">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function AdminCrudTab({ resource, fields, publicList = false }) {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    const url = publicList ? `/${resource}` : `/admin/${resource}`;
    const { data } = await api.get(url);
    setItems(data);
  }, [resource, publicList]);

  useEffect(() => {
    load();
  }, [load]);

  const del = async (id) => {
    if (!window.confirm("Delete?")) return;
    await api.delete(`/admin/${resource}/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6" data-testid={`admin-crud-${resource}`}>
      <CrudForm fields={fields} resource={resource} onCreated={load} />
      <div className="lg:col-span-2 space-y-3">
        {items.map((it) => (
          <CrudItem key={it.id} item={it} onDelete={del} resource={resource} />
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground py-10">No items yet.</p>}
      </div>
    </div>
  );
}
