"use client";
import { useState } from "react";

export default function ShareButton({ title, text, className }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled share — no action needed
      }
      return;
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className={className || "inline-flex items-center justify-center rounded-full border border-navy text-navy font-semibold text-sm px-5 py-3 hover:bg-navy hover:text-white transition-colors"}
    >
      {copied ? "Link Copied!" : "Share"}
    </button>
  );
}
