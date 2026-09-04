import { BUSINESS, waLink } from "@/lib/business";
import QuoteForm from "@/components/QuoteForm";

const title = "New Projects & Collaborations | Joint Venture Construction";
const description = "Own a plot in Toba Tek Singh? Partner with MTS Traders & Builders for joint-venture construction, land development, and profit-sharing collaboration.";

export const metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

const BENEFITS = [
  { title: "Zero Construction Hassle", description: "We handle design, materials, labor, and site supervision from start to finish." },
  { title: "Transparent Profit Sharing", description: "Clear, fair agreements with no hidden terms — everything documented upfront." },
  { title: "Trusted Track Record", description: "93+ completed projects with a strong reputation across Toba Tek Singh." },
  { title: "Premium Quality Standards", description: "Only premium-quality materials and trusted brands used on every project." },
  { title: "On-Time Delivery", description: "We respect timelines and deliver projects as promised." },
  { title: "End-to-End Support", description: "From planning and approvals to marketing and handover — we manage it all." },
];

const STEPS = [
  { step: 1, title: "Share Your Land Details", description: "Tell us about your plot's location, size, and your vision for the project." },
  { step: 2, title: "Site Visit & Feasibility", description: "Our team visits the site and prepares a feasibility and design proposal." },
  { step: 3, title: "Agreement & Planning", description: "We finalize a transparent joint-venture or contract agreement together." },
  { step: 4, title: "Construction Begins", description: "MTS Traders & Builders manages the entire construction process end-to-end." },
  { step: 5, title: "Handover & Profit Sharing", description: "Project is completed, handed over, and profits are shared as agreed." },
];

export default function CollaborationsPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Partner With Us</p>
          <h1 className="font-serif text-4xl font-bold">New Projects &amp; Collaborations</h1>
          <p className="text-white/70 mt-3 max-w-2xl">
            Own a plot of land? Partner with {BUSINESS.name} for joint-venture construction — we build, you profit, together.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Why Partner With MTS</p>
          <h2 className="font-serif text-3xl font-bold">Benefits of Collaboration</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-white p-6">
              <h3 className="font-serif font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">How It Works</p>
            <h2 className="font-serif text-3xl font-bold">Our Collaboration Process</h2>
          </div>
          <ol className="space-y-4">
            {STEPS.map((s) => (
              <li key={s.step} className="flex gap-4 items-start bg-white border border-border rounded-xl p-5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-sm">{s.step}</span>
                <div>
                  <h3 className="font-serif font-bold text-base">{s.title}</h3>
                  <p className="text-sm text-muted mt-1">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form */}
      <section className="bg-navy-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Propose Your Land for Collaboration</h2>
            <p className="text-white/60 text-sm mt-2">Share your plot details below and our team will get in touch to discuss the opportunity.</p>
          </div>
          <QuoteForm dark />
          <p className="text-center text-white/50 text-xs mt-6">
            Prefer to talk directly?{" "}
            <a href={waLink("Hi, I own a plot of land and I'm interested in a construction collaboration/joint-venture with MTS Traders & Builders.")} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Message us on WhatsApp
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
