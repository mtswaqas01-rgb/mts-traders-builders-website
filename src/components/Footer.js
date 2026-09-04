import Link from "next/link";
import { BUSINESS } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path d="M12 2 2 9h3v11h6v-6h2v6h6V9h3z" fill="currentColor" />
            </svg>
            MTS Traders &amp; Builders
          </div>
          <p className="text-sm max-w-[26ch]">{BUSINESS.tagline} — established {BUSINESS.established}.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Navigate</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-gold">Services</Link></li>
            <li><Link href="/projects" className="hover:text-gold">Our Projects</Link></li>
            <li><Link href="/properties" className="hover:text-gold">Property Marketplace</Link></li>
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><a href="/company-profile.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Download Company Profile</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{BUSINESS.address}</li>
            <li><a href={`tel:${BUSINESS.phone.replace(/-/g, "")}`} className="hover:text-gold">{BUSINESS.phone}</a></li>
            <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-gold">{BUSINESS.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Hours</h4>
          <p className="text-sm">{BUSINESS.hours}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
          <span>&copy; {new Date().getFullYear()} MTS Traders &amp; Builders. All rights reserved.</span>
          <Link href="/admin" className="hover:text-gold">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
