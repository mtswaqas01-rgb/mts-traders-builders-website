"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/business";
import ProjectCard from "@/components/ProjectCard";

const STATUS_LABEL = {
  completed: "Completed",
  running: "Under Construction",
  ready: "Ready",
  sold: "Sold",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects(error ? [] : data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = projects.filter((p) => {
    if (category && p.category !== category) return false;
    if (status && p.status !== status) return false;
    return true;
  });

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Our Work</p>
          <h1 className="font-serif text-4xl font-bold">Our Projects</h1>
          <p className="text-white/70 mt-3 max-w-2xl">Explore our completed and ongoing residential, commercial, and specialized construction projects.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:border-gold"
          >
            <option value="">All Categories</option>
            {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:border-gold"
          >
            <option value="">All Statuses</option>
            {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
          {(category || status) && (
            <button
              onClick={() => { setCategory(""); setStatus(""); }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-navy"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-muted text-sm py-10">Loading projects…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted text-sm py-10">
            {projects.length === 0 ? "Projects will appear here once added via the admin panel." : "No projects match the selected filters."}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
