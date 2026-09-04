"use client";
import { useState } from "react";
import { waLink } from "@/lib/business";

const CONSTRUCTION_TYPES = [
  { key: "grey", label: "Grey Structure Only", rate: 2200 },
  { key: "turnkey", label: "Turnkey (Full Finishing)", rate: 3800 },
];

const QUALITY_TIERS = [
  { key: "standard", label: "Standard", multiplier: 1 },
  { key: "premium", label: "Premium", multiplier: 1.25 },
  { key: "luxury", label: "Luxury", multiplier: 1.55 },
];

function formatPKR(n) {
  if (n >= 10000000) return (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Crore";
  if (n >= 100000) return (n / 100000).toFixed(2).replace(/\.00$/, "") + " Lac";
  return Math.round(n).toLocaleString("en-PK");
}

export default function CostCalculator() {
  const [area, setArea] = useState("");
  const [type, setType] = useState(CONSTRUCTION_TYPES[0].key);
  const [tier, setTier] = useState(QUALITY_TIERS[0].key);

  const areaNum = Number(area) || 0;
  const typeInfo = CONSTRUCTION_TYPES.find((t) => t.key === type);
  const tierInfo = QUALITY_TIERS.find((t) => t.key === tier);
  const baseRate = typeInfo.rate * tierInfo.multiplier;
  const low = areaNum * baseRate * 0.9;
  const high = areaNum * baseRate * 1.1;

  const message = `Hi, I used the cost calculator on your website. Covered Area: ${areaNum || "-"} sq ft, Construction: ${typeInfo.label}, Quality: ${tierInfo.label}. I'd like an accurate quote.`;

  return (
    <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
      <h3 className="font-serif font-bold text-xl mb-1">Construction Cost Calculator</h3>
      <p className="text-sm text-muted mb-6">Get a rough estimate for your project. Contact us for an accurate, detailed quote.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Covered Area (sq ft)</label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 1500"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Construction Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-gold">
            {CONSTRUCTION_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Quality Tier</label>
          <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-gold">
            {QUALITY_TIERS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {areaNum > 0 && (
        <div className="rounded-lg bg-bg border border-border px-5 py-4 mb-6">
          <p className="text-xs text-muted uppercase tracking-wide font-semibold mb-1">Estimated Cost Range</p>
          <p className="font-serif text-2xl font-bold text-navy">PKR {formatPKR(low)} – {formatPKR(high)}</p>
        </div>
      )}

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-gold text-navy font-semibold text-sm px-6 py-3 hover:bg-gold-light transition-colors"
      >
        Get an Accurate Quote
      </a>
      <p className="text-xs text-muted mt-3">This is a rough estimate only. Actual cost depends on design, site conditions, and material choices.</p>
    </div>
  );
}
