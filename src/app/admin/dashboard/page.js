"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState({ projects: null, properties: null, quotes: null });

  useEffect(() => {
    async function load() {
      const [p, pr, q] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("quote_requests").select("id", { count: "exact", head: true }),
      ]);
      setCounts({ projects: p.count ?? 0, properties: pr.count ?? 0, quotes: q.count ?? 0 });
    }
    load();
  }, []);

  const cards = [
    { label: "Projects", value: counts.projects, href: "/admin/dashboard/projects" },
    { label: "Properties", value: counts.properties, href: "/admin/dashboard/properties" },
    { label: "Quote Requests", value: counts.quotes, href: "/admin/dashboard/quotes" },
  ];

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">Overview</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow">
            <p className="text-sm text-muted mb-1">{c.label}</p>
            <p className="font-serif text-3xl font-bold text-navy">{c.value === null ? "…" : c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
