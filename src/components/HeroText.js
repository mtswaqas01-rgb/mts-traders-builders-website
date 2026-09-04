"use client";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroText() {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-4">
        {t.hero.tag(BUSINESS.established, BUSINESS.stats.completedProjects)}
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
        {t.hero.title}
      </h1>
      <p className="mt-5 text-white/75 max-w-2xl text-lg">
        {t.hero.subtitle}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#quote" className="inline-flex items-center justify-center rounded-full bg-gold text-navy font-semibold px-6 py-3 hover:bg-gold-light transition-colors">
          {t.hero.quoteCta}
        </a>
        <Link href="/projects" className="inline-flex items-center justify-center rounded-full border border-white/30 text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors">
          {t.hero.projectsCta}
        </Link>
      </div>
    </>
  );
}
