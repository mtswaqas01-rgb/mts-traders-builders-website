"use client";
import Link from "next/link";
import { useState } from "react";
import { BUSINESS } from "@/lib/business";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/projects", label: t.nav.projects },
    { href: "/properties", label: t.nav.properties },
    { href: "/collaborations", label: t.nav.collaborations },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-white font-serif font-bold text-lg sm:text-xl shrink-0">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-gold shrink-0">
            <path d="M12 2 2 9h3v11h6v-6h2v6h6V9h3z" fill="currentColor" />
          </svg>
          <span>MTS <span className="text-gold italic">Traders &amp; Builders</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/85 hover:text-gold text-sm font-medium transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-white/70 hover:text-gold text-sm font-semibold px-2"
            aria-label="Toggle language"
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
          <a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-gold text-navy text-sm font-semibold px-4 py-2 hover:bg-gold-light transition-colors">
            {t.nav.callNow}
          </a>
        </div>

        <button aria-label="Menu" className="lg:hidden text-white" onClick={() => setOpen((v) => !v)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6 18 18M6 18 18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden bg-navy border-t border-white/10 px-4 pb-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/85 hover:text-gold py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggleLang}
            className="text-left text-white/70 hover:text-gold py-2 text-sm font-semibold"
          >
            {lang === "en" ? "اردو میں دیکھیں" : "View in English"}
          </button>
          <a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold text-navy text-sm font-semibold px-4 py-2.5">
            {t.nav.callNow}
          </a>
        </nav>
      )}
    </header>
  );
}
