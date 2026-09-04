"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    setQuotes(error ? [] : data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this quote request?")) return;
    await supabase.from("quote_requests").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">Quote Requests</h2>

      {loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : quotes.length === 0 ? (
        <p className="text-muted text-sm">No quote requests yet.</p>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q.id} className="rounded-xl border border-border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-serif font-bold text-lg">{q.name}</p>
                  <p className="text-sm text-navy font-medium">{q.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  {q.created_at && (
                    <p className="text-xs text-muted">{new Date(q.created_at).toLocaleString("en-PK")}</p>
                  )}
                  <a
                    href={`https://wa.me/${(q.phone || "").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold rounded-full bg-green-600 text-white px-3 py-1.5 hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                  <button onClick={() => handleDelete(q.id)} className="text-xs font-semibold text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm text-muted">
                <p><span className="font-semibold text-text">Location:</span> {q.location || "-"}</p>
                <p><span className="font-semibold text-text">Plot Size:</span> {q.plot_size || "-"}</p>
                <p><span className="font-semibold text-text">Service:</span> {q.service_type || "-"}</p>
                <p><span className="font-semibold text-text">Budget:</span> {q.budget || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
