"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { BUSINESS } from "@/lib/business";

const SERVICE_OPTIONS = [
  "Grey Structure",
  "Turnkey Construction",
  "Renovation",
  "Architectural Design",
  "Interior Design",
  "Concrete Products",
  "Electrical & Plumbing",
  "Exterior Development",
];

export default function QuoteForm({ dark = true }) {
  const [form, setForm] = useState({ name: "", phone: "", location: "", plot_size: "", service_type: "", budget: "" });
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase.from("quote_requests").insert([form]);
    if (error) {
      setStatus("error");
      return;
    }

    const message = `Hi, I'd like a free quote.\nName: ${form.name}\nPhone: ${form.phone}\nLocation: ${form.location || "-"}\nPlot Size: ${form.plot_size || "-"}\nService: ${form.service_type || "-"}\nBudget: ${form.budget || "-"}`;
    window.open(`https://wa.me/${BUSINESS.phoneIntl.replace("+", "")}?text=${encodeURIComponent(message)}`, "_blank");

    setStatus("success");
    setForm({ name: "", phone: "", location: "", plot_size: "", service_type: "", budget: "" });
  }

  const inputClass = dark
    ? "w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:border-gold"
    : "w-full rounded-lg bg-white border border-border text-text px-4 py-3 text-sm focus:outline-none focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
      <input className={inputClass} placeholder="Full Name *" value={form.name} onChange={(e) => update("name", e.target.value)} required />
      <input className={inputClass} placeholder="Phone Number *" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
      <input className={inputClass} placeholder="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
      <input className={inputClass} placeholder="Plot Size (e.g. 10 Marla)" value={form.plot_size} onChange={(e) => update("plot_size", e.target.value)} />
      <select className={inputClass} value={form.service_type} onChange={(e) => update("service_type", e.target.value)}>
        <option value="">Service Type</option>
        {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <input className={inputClass} placeholder="Estimated Budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 mt-1 inline-flex items-center justify-center rounded-full bg-gold text-navy font-semibold text-sm px-6 py-3 hover:bg-gold-light transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get a Free Quote"}
      </button>

      {status === "success" && (
        <p className="sm:col-span-2 text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2">
          Thank you! Your request has been received — we'll contact you soon. WhatsApp should have opened with your details.
        </p>
      )}
      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
          Please fill in your name and phone number, then try again.
        </p>
      )}
    </form>
  );
}
