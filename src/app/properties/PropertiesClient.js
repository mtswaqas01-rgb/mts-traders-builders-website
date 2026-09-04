"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PROPERTY_TYPES } from "@/lib/business";
import PropertyCard from "@/components/PropertyCard";

export default function PropertiesClient() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [hideSold, setHideSold] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      setProperties(error ? [] : data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = properties.filter((p) => {
    if (type && p.type !== type) return false;
    if (hideSold && p.status === "sold") return false;
    return true;
  });

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Property Marketplace</p>
          <h1 className="font-serif text-4xl font-bold">Plots, Houses &amp; Commercial Properties</h1>
          <p className="text-white/70 mt-3 max-w-2xl">Verified properties for sale in Toba Tek Singh and surrounding areas.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-3 mb-10">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:border-gold"
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <label className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm cursor-pointer">
            <input type="checkbox" checked={hideSold} onChange={(e) => setHideSold(e.target.checked)} />
            Hide Sold
          </label>
          {(type || hideSold) && (
            <button
              onClick={() => { setType(""); setHideSold(false); }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-navy"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-muted text-sm py-10">Loading properties…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted text-sm py-10">
            {properties.length === 0 ? "Properties will appear here once added via the admin panel." : "No properties match the selected filters."}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
