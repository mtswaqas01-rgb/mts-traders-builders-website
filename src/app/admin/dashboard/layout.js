"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const NAV = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/projects", label: "Projects" },
  { href: "/admin/dashboard/properties", label: "Properties" },
  { href: "/admin/dashboard/quotes", label: "Quote Requests" },
];

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin");
      } else {
        setReady(true);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin");
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin");
  }

  if (!ready) return null;

  return (
    <div className="min-h-[80vh] bg-bg">
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold rounded-full border border-white/30 px-4 py-2 hover:bg-white/10 transition-colors"
          >
            Log Out
          </button>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex gap-2 overflow-x-auto pb-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                pathname === item.href ? "bg-gold text-navy" : "text-white/70 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
