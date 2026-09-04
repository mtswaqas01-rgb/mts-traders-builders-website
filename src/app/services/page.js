import { SERVICES, MATERIAL_CATEGORIES, TRUSTED_BRANDS, CONSTRUCTION_PROCESS } from "@/lib/business";
import CostCalculator from "@/components/CostCalculator";

const title = "Construction Services in Toba Tek Singh";
const description = "Grey structure construction, turnkey construction, architectural design, interior finishing, renovation, concrete products and more — MTS Traders & Builders.";

export const metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Complete Construction Solutions</p>
          <h1 className="font-serif text-4xl font-bold">Our Services</h1>
          <p className="text-white/70 mt-3 max-w-2xl">Under one roof — from foundation to finishing, with a strong focus on quality, durability, and customer satisfaction.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.slug} id={s.slug} className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif font-bold text-xl mb-2">{s.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials & Quality */}
      <section className="bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Materials &amp; Quality</p>
            <h2 className="font-serif text-3xl font-bold">Only Premium-Quality Materials</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {MATERIAL_CATEGORIES.map((m) => (
              <span key={m} className="text-sm font-medium px-4 py-2 rounded-full bg-bg border border-border">{m}</span>
            ))}
          </div>
          <p className="text-center text-sm text-muted uppercase tracking-wide font-semibold mb-4">Trusted Brands</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TRUSTED_BRANDS.map((b) => (
              <span key={b} className="text-sm font-semibold px-4 py-2 rounded-full bg-navy text-gold">{b}</span>
            ))}
          </div>
          <p className="text-center text-sm text-muted mt-10">
            Quality Process: <span className="font-medium text-text">Material Testing → On-Site Inspection → Quality Approval → Perfect Delivery</span>
          </p>
        </div>
      </section>

      {/* Construction process */}
      <section className="bg-bg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">How We Work</p>
            <h2 className="font-serif text-3xl font-bold">Our Construction Process</h2>
          </div>
          <ol className="space-y-4">
            {CONSTRUCTION_PROCESS.map((step) => (
              <li key={step.step} className="flex gap-4 items-start bg-white border border-border rounded-xl p-5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-sm">{step.step}</span>
                <div>
                  <h3 className="font-serif font-bold text-base">{step.title}</h3>
                  <p className="text-sm text-muted mt-1">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cost calculator */}
      <section className="bg-white border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Plan Your Budget</p>
            <h2 className="font-serif text-3xl font-bold">Estimate Your Construction Cost</h2>
          </div>
          <CostCalculator />
        </div>
      </section>
    </>
  );
}
