import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { BUSINESS, SERVICES, WHY_CHOOSE_US, FAQS } from "@/lib/business";
import ProjectCard from "@/components/ProjectCard";
import QuoteForm from "@/components/QuoteForm";
import FAQAccordion from "@/components/FAQAccordion";
import HeroText from "@/components/HeroText";

async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);
  if (error) return [];
  return data || [];
}

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <HeroText />

          {/* Quick stats bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8">
            {[
              [BUSINESS.stats.completedProjects, "Projects Completed"],
              [BUSINESS.stats.residential, "Residential"],
              [BUSINESS.stats.commercial, "Commercial"],
              [BUSINESS.stats.onTimeDelivery, "On-Time Delivery"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-serif text-3xl font-bold text-gold">{value}</p>
                <p className="text-xs text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get a Free Quote form */}
      <section id="quote" className="bg-navy-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Get a Free Quote</h2>
            <p className="text-white/60 text-sm mt-2">Tell us about your project — we&apos;ll get back to you shortly.</p>
          </div>
          <QuoteForm dark />
        </div>
      </section>

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">What We Offer</p>
          <h2 className="font-serif text-3xl font-bold">Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.slice(0, 8).map((s) => (
            <div key={s.slug} className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-serif font-bold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="text-navy font-semibold text-sm hover:text-gold">View All Services →</Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Our Work</p>
            <h2 className="font-serif text-3xl font-bold">Featured Projects</h2>
          </div>
          {projects.length === 0 ? (
            <p className="text-center text-muted text-sm">Projects will appear here once added via the admin panel.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/projects" className="text-navy font-semibold text-sm hover:text-gold">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* Why choose us snapshot */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Why Choose Us</p>
          <h2 className="font-serif text-3xl font-bold">From Foundation to Finishing</h2>
        </div>
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE_US.slice(0, 8).map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-white border border-border p-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Client Feedback</p>
          <h2 className="font-serif text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/60 text-sm max-w-md mx-auto">Client testimonials will be added here soon.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Got Questions?</p>
            <h2 className="font-serif text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>
    </>
  );
}
