"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PROPERTY_TYPES } from "@/lib/business";

const STATUSES = ["available", "sold"];
const EMPTY = { title: "", type: PROPERTY_TYPES[0], location: "", size: "", price: "", status: STATUSES[0], description: "", photos: "" };

function formatPKR(n) {
  if (!n) return "Price on request";
  if (n >= 10000000) return (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Crore";
  if (n >= 100000) return (n / 100000).toFixed(2).replace(/\.00$/, "") + " Lac";
  return Number(n).toLocaleString("en-PK");
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    setProperties(error ? [] : data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setForm(EMPTY);
    setError("");
    setEditing({});
  }

  function openEdit(p) {
    setForm({
      title: p.title || "",
      type: p.type || PROPERTY_TYPES[0],
      location: p.location || "",
      size: p.size || "",
      price: p.price || "",
      status: p.status || STATUSES[0],
      description: p.description || "",
      photos: (p.photos || []).join(", "),
    });
    setError("");
    setEditing(p);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : null,
      photos: form.photos.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const { error } = editing?.id
      ? await supabase.from("properties").update(payload).eq("id", editing.id)
      : await supabase.from("properties").insert([payload]);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    await supabase.from("properties").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold">Properties</h2>
        <button onClick={openNew} className="text-sm font-semibold rounded-full bg-gold text-navy px-5 py-2.5 hover:bg-gold-light transition-colors">
          + Add Property
        </button>
      </div>

      {editing !== null && (
        <form onSubmit={handleSave} className="rounded-xl border border-border bg-white p-6 mb-8 grid sm:grid-cols-2 gap-4">
          <h3 className="sm:col-span-2 font-serif font-bold text-lg">{editing?.id ? "Edit Property" : "New Property"}</h3>
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-border px-4 py-2.5 text-sm" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-lg border border-border px-4 py-2.5 text-sm">
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg border border-border px-4 py-2.5 text-sm" />
          <input placeholder="Size (e.g. 5 Marla)" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="rounded-lg border border-border px-4 py-2.5 text-sm" />
          <input type="number" placeholder="Price (PKR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-border px-4 py-2.5 text-sm" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border border-border px-4 py-2.5 text-sm">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="sm:col-span-2 rounded-lg border border-border px-4 py-2.5 text-sm min-h-24" />
          <textarea placeholder="Photo URLs, comma-separated" value={form.photos} onChange={(e) => setForm({ ...form, photos: e.target.value })} className="sm:col-span-2 rounded-lg border border-border px-4 py-2.5 text-sm min-h-16" />
          {error && <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={saving} className="rounded-full bg-navy text-white font-semibold text-sm px-6 py-2.5 hover:bg-navy-light transition-colors disabled:opacity-60">
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-border text-sm px-6 py-2.5 hover:bg-bg">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : properties.length === 0 ? (
        <p className="text-muted text-sm">No properties yet. Click &ldquo;Add Property&rdquo; to create one.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-border">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.type}</td>
                  <td className="px-4 py-3">PKR {formatPKR(p.price)}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(p)} className="text-navy font-semibold hover:text-gold mr-4">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 font-semibold hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
