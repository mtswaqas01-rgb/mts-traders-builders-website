import Link from "next/link";

function formatPKR(n) {
  if (!n) return "Price on request";
  if (n >= 10000000) return (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Crore";
  if (n >= 100000) return (n / 100000).toFixed(2).replace(/\.00$/, "") + " Lac";
  return Number(n).toLocaleString("en-PK");
}

function isRecent(dateStr) {
  if (!dateStr) return false;
  const days = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  return days <= 14;
}

export default function PropertyCard({ property }) {
  const photo = property.photos?.[0];
  const sold = property.status === "sold";
  const recent = isRecent(property.created_at);
  return (
    <Link href={`/properties/${property.id}`} className="group block rounded-xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-navy/5 overflow-hidden">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">No photo yet</div>
        )}
        {sold && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-600 text-white">Sold</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs uppercase tracking-wide text-gold font-semibold">{property.type}</p>
          {recent && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-green-100 text-green-800">New</span>}
        </div>
        <h3 className="font-serif font-bold text-lg leading-snug mb-1">{property.title}</h3>
        <p className="text-sm text-muted mb-2">{property.location}{property.size ? ` · ${property.size}` : ""}</p>
        <p className="font-semibold text-navy">PKR {formatPKR(property.price)}</p>
      </div>
    </Link>
  );
}
