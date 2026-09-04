import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BUSINESS, waLink } from "@/lib/business";
import QuoteForm from "@/components/QuoteForm";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ShareButton from "@/components/ShareButton";

const STATUS_LABEL = {
  completed: "Completed",
  running: "Under Construction",
  ready: "Ready",
  sold: "Sold",
};

async function getProject(id) {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project Not Found" };
  const title = `${project.title} | MTS Traders & Builders`;
  const description = project.description?.slice(0, 160) || `${project.title} — a construction project by ${BUSINESS.name} in ${project.location || "Toba Tek Singh"}.`;
  return {
    title,
    description,
    openGraph: { title, description, images: project.photos?.[0] ? [project.photos[0]] : undefined },
    twitter: { title, description },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const photos = project.photos?.length ? project.photos : [];
  const message = `Hi, I'm interested in a project similar to "${project.title}". Please share more details.`;

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <Link href="/projects" className="text-gold text-sm font-semibold hover:underline">← Back to Projects</Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold/20 text-gold">{STATUS_LABEL[project.status] || project.status}</span>
            {project.verified && <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">Verified</span>}
            <span className="text-xs uppercase tracking-wide text-white/60">{project.category}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-3">{project.title}</h1>
          <p className="text-white/70 mt-2">{project.location}{project.plot_size ? ` · ${project.plot_size}` : ""}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        {/* Photo gallery */}
        {photos.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {photos.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={`${project.title} photo ${i + 1}`} className="w-full h-64 object-cover rounded-xl border border-border" />
            ))}
          </div>
        ) : (
          <div className="w-full h-64 rounded-xl border border-border bg-navy/5 flex items-center justify-center text-muted text-sm mb-10">
            No photos added yet
          </div>
        )}

        {project.before_photo && project.after_photo && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-bold mb-3">Before &amp; After</h2>
            <BeforeAfterSlider beforeSrc={project.before_photo} afterSrc={project.after_photo} alt={project.title} />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-3">Project Overview</h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">{project.description || "Details for this project will be added soon."}</p>

            {project.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-navy font-semibold text-sm hover:text-gold"
              >
                📍 Get Directions to This Area
              </a>
            )}
          </div>

          <div className="rounded-xl border border-border bg-bg p-6 h-fit space-y-3">
            <h3 className="font-serif font-bold text-lg mb-1">Interested in a Project Like This?</h3>
            <p className="text-sm text-muted mb-1">Contact us for a free consultation and quote.</p>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center rounded-full bg-green-600 text-white font-semibold text-sm px-5 py-3 hover:bg-green-700 transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${BUSINESS.phoneIntl}`}
              className="w-full inline-flex items-center justify-center rounded-full border border-navy text-navy font-semibold text-sm px-5 py-3 hover:bg-navy hover:text-white transition-colors"
            >
              Call {BUSINESS.phone}
            </a>
            <ShareButton
              title={project.title}
              text={`${project.title} — a project by ${BUSINESS.name}`}
              className="w-full inline-flex items-center justify-center rounded-full border border-border text-text font-semibold text-sm px-5 py-3 hover:bg-white transition-colors"
            />
          </div>
        </div>
      </section>

      <section id="quote" className="bg-navy-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Get a Free Quote</h2>
            <p className="text-white/60 text-sm mt-2">Tell us about your project — we&apos;ll get back to you shortly.</p>
          </div>
          <QuoteForm dark />
        </div>
      </section>
    </>
  );
}
