"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "en", toggleLang: () => {} });

export const TRANSLATIONS = {
  en: {
    nav: { home: "Home", services: "Services", projects: "Projects", properties: "Properties", collaborations: "New Projects", about: "About", contact: "Contact", callNow: "Call Now" },
    hero: {
      tag: (est, projects) => `Est. ${est} · ${projects} Projects Completed`,
      title: "Building Trust, Creating Excellence",
      subtitle: "Complete construction solutions under one roof — from grey structure to finishing, we build with quality, integrity, and on-time delivery.",
      quoteCta: "Get a Free Quote",
      projectsCta: "View Our Projects",
    },
  },
  ur: {
    nav: { home: "ہوم", services: "سروسز", projects: "پراجیکٹس", properties: "پراپرٹیز", collaborations: "نئے پراجیکٹس", about: "ہمارے بارے میں", contact: "رابطہ", callNow: "کال کریں" },
    hero: {
      tag: (est, projects) => `قائم ${est} · ${projects} مکمل شدہ پراجیکٹس`,
      title: "اعتماد کی تعمیر، بہترین کی تخلیق",
      subtitle: "ایک ہی چھت تلے مکمل تعمیراتی حل — گرے سٹرکچر سے لے کر فنشنگ تک، معیار، دیانتداری اور بروقت تکمیل کے ساتھ۔",
      quoteCta: "مفت قیمت حاصل کریں",
      projectsCta: "ہمارے پراجیکٹس دیکھیں",
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mts-lang");
      if (saved === "ur" || saved === "en") setLang(saved);
    } catch {
      // localStorage unavailable — keep default
    }
  }, []);

  function toggleLang() {
    setLang((prev) => {
      const next = prev === "en" ? "ur" : "en";
      try {
        localStorage.setItem("mts-lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
