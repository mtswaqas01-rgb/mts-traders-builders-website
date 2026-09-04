import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BUSINESS, waLink } from "@/lib/business";
import ShareButton from "@/components/ShareButton";

function formatPKR(n) {
  if (!n) return "Price on request";
  if (n >= 10000000) return (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Crore";
  if (n >= 100000) return (n / 100000).toFixed(2).replace(/\.00$/, "") + " Lac";
  return Number(n).toLocaleString("en-PK");
}

async function getProperty(id) {
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) return { title: "Property Not Found" };
  const title = `${property.title} | Property Marketplace`;
  const description = property.description?.slice(0, 160) || `${property.title} — ${property.type} for sale in ${property.location || "Toba Tek Singh"} by ${BUSINESS.name}.`;
  return {
    title,
    description,
    openGraph: { title, description, images: property.photos?.[0] ? [property.photos[0]] : undefined },
    twitter: { title, description },
  };
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  const photos = property.photos?.length ? property.photos : [];
  const sold = property.status === "sold";
  const message = `Hi, I'm interested in "${property.title}" (${property.type}, ${property.location || "-"}). Is it still available?`;

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <Link href="/properties" className="text-gold text-sm font-semibold hover:underline">← Back to Properties</Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold/20 text-gold">{property.type}</span>
            {sold && <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600 text-white">Sold</span>}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-3">{property.title}</h1>
          <p className="text-white/70 mt-2">{property.location}{property.size ? ` · ${property.size}` : ""}</p>
          <p className="font-serif text-2xl font-bold text-gold mt-3">PKR {formatPKR(property.price)}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        {photos.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {photos.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={`${property.title} photo ${i + 1}`} className="w-full h-64 object-cover rounded-xl border border-border" />
            ))}
          </div>
        ) : (
          <div className="w-full h-64 rounded-xl border border-border bg-navy/5 flex items-center justify-center text-muted text-sm mb-10">
            No photos added yet
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-3">Property Details</h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">{property.description || "Details for this property will be added soon."}</p>

            {property.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-navy font-semibold text-sm hover:text-gold"
              >
                📍 View Location on Map
              </a>
            )}
          </div>

          <div className="rounded-xl border border-border bg-bg p-6 h-fit space-y-3">
            <h3 className="font-serif font-bold text-lg mb-1">{sold ? "This Property Has Been Sold" : "Interested in This Property?"}</h3>
            {!sold && (
              <>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-full bg-green-600 text-white font-semibold text-sm px-5 py-3 hover:bg-green-700 transition-colors"
                >
                  WhatsApp Inquiry
                </a>
                <a
                  href={`tel:${BUSINESS.phoneIntl}`}
                  className="w-full inline-flex items-center justify-center rounded-full border border-navy text-navy font-semibold text-sm px-5 py-3 hover:bg-navy hover:text-white transition-colors"
                >
                  Call {BUSINESS.phone}
                </a>
              </>
            )}
            <ShareButton
              title={property.title}
              text={`${property.title} — ${property.type} for sale in ${property.location || "Toba Tek Singh"}`}
              className="w-full inline-flex items-center justify-center rounded-full border border-border text-text font-semibold text-sm px-5 py-3 hover:bg-white transition-colors"
            />
          </div>
        </div>
      </section>
    </>
  );
}
