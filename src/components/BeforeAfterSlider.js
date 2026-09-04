"use client";
import { useRef, useState } from "react";

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt = "Before and after" }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  function updateFromClientX(clientX) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  function handlePointerDown(e) {
    dragging.current = true;
    updateFromClientX(e.clientX);
  }
  function handlePointerMove(e) {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  }
  function stopDragging() {
    dragging.current = false;
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-border select-none cursor-ew-resize"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterSrc} alt={`${alt} — after`} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={beforeSrc}
        alt={`${alt} — before`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />
      <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: `${pos}%` }} />
      <div
        className="absolute top-1/2 w-9 h-9 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-2 border-gold flex items-center justify-center text-navy text-xs font-bold pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        ⟷
      </div>
      <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/80 text-white pointer-events-none">Before</span>
      <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/80 text-white pointer-events-none">After</span>
    </div>
  );
}
