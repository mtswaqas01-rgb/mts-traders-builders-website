"use client";
import { useState } from "react";

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="rounded-xl border border-border bg-white overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-serif font-semibold text-base">{item.question}</span>
              <span className={`shrink-0 text-gold text-xl leading-none transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-muted leading-relaxed">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
