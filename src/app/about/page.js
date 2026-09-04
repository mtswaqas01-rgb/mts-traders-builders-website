import { BUSINESS, WHY_CHOOSE_US, CLIENT_COMMITMENTS, CORE_VALUES } from "@/lib/business";

const title = "About Us | MTS Traders & Builders";
const description = `Learn about ${BUSINESS.name} — a trusted construction company in Toba Tek Singh with ${BUSINESS.stats.completedProjects} completed projects, founded in ${BUSINESS.established}.`;

export const metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">About Us</p>
          <h1 className="font-serif text-4xl font-bold">Building Trust, Creating Excellence</h1>
          <p className="text-white/70 mt-3 max-w-2xl">
            Since {BUSINESS.established}, {BUSINESS.name} has been delivering quality construction solutions across Toba Tek Singh and beyond.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-4 gap-6 mb-12 text-center">
          {[
            [BUSINESS.stats.completedProjects, "Projects Completed"],
            [BUSINESS.stats.residential, "Residential"],
            [BUSINESS.stats.commercial, "Commercial"],
            [BUSINESS.stats.onTimeDelivery, "On-Time Delivery"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-border bg-white p-5">
              <p className="font-serif text-3xl font-bold text-gold">{value}</p>
              <p className="text-xs text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
        <h2 className="font-serif text-2xl font-bold mb-3">Who We Are</h2>
        <p className="text-muted leading-relaxed">
          {BUSINESS.name} is a full-service construction company based in Toba Tek Singh, offering grey structure
          construction, turnkey construction, architectural design, interior finishing, renovation, and concrete
          products. Since {BUSINESS.established}, we have completed {BUSINESS.stats.completedProjects} residential
          and commercial projects, building a reputation for quality, transparency, and on-time delivery. Our team
          of experienced engineers, architects, and skilled workers is committed to turning every client&apos;s
          vision into a lasting reality.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="bg-bg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 grid sm:grid-cols-2 gap-8">
          <div className="rounded-xl border border-border bg-white p-7">
            <h3 className="font-serif text-xl font-bold mb-2 text-navy">Our Vision</h3>
            <p className="text-sm text-muted leading-relaxed">
              To be the most trusted construction company in the region, known for exceptional quality, integrity,
              and innovation in every project we undertake.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-7">
            <h3 className="font-serif text-xl font-bold mb-2 text-navy">Our Mission</h3>
            <p className="text-sm text-muted leading-relaxed">
              To deliver complete construction solutions under one roof — combining premium materials, skilled
              craftsmanship, and transparent communication to exceed our clients&apos; expectations on every project.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">What Drives Us</p>
          <h2 className="font-serif text-3xl font-bold">Our Core Values</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {CORE_VALUES.map((v) => (
            <span key={v} className="text-sm font-semibold px-5 py-2.5 rounded-full bg-navy text-gold">{v}</span>
          ))}
        </div>
      </section>

      {/* Client commitments */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Our Promise</p>
            <h2 className="font-serif text-3xl font-bold">Client Commitments</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_COMMITMENTS.map((c) => (
              <div key={c.title} className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h3 className="font-serif font-bold text-lg mb-2 text-gold">{c.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder message */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">A Word From Our Founder</p>
        <p className="font-serif text-xl sm:text-2xl leading-relaxed text-navy">
          &ldquo;Every project we take on carries our name and our word. Our goal has always been simple — build
          with honesty, deliver with quality, and treat every client&apos;s home or business as if it were our own.&rdquo;
        </p>
        <p className="mt-4 font-semibold">{BUSINESS.founder}</p>
        <p className="text-sm text-muted">{BUSINESS.founderTitle}</p>
      </section>

      {/* Why choose us full grid */}
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Why Choose Us</p>
            <h2 className="font-serif text-3xl font-bold">What Sets Us Apart</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg bg-white border border-border p-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
