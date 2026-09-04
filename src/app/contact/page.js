import { BUSINESS, waLink, defaultWaMessage } from "@/lib/business";
import QuoteForm from "@/components/QuoteForm";

const title = "Contact Us | Get a Free Quote";
const description = `Get in touch with ${BUSINESS.name} in Toba Tek Singh — call, WhatsApp, or send us your project details for a free quote.`;

export const metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(BUSINESS.address);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Get In Touch</p>
          <h1 className="font-serif text-4xl font-bold">Contact Us</h1>
          <p className="text-white/70 mt-3 max-w-2xl">Have a project in mind? Reach out and let&apos;s discuss how we can help.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="font-serif font-bold text-lg mb-4">Contact Information</h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <p className="text-muted uppercase tracking-wide text-xs font-semibold mb-1">Address</p>
                  <p className="text-text">{BUSINESS.address}</p>
                </li>
                <li>
                  <p className="text-muted uppercase tracking-wide text-xs font-semibold mb-1">Phone</p>
                  <a href={`tel:${BUSINESS.phoneIntl}`} className="text-navy font-medium hover:text-gold">{BUSINESS.phone}</a>
                </li>
                <li>
                  <p className="text-muted uppercase tracking-wide text-xs font-semibold mb-1">Email</p>
                  <a href={`mailto:${BUSINESS.email}`} className="text-navy font-medium hover:text-gold break-all">{BUSINESS.email}</a>
                </li>
                <li>
                  <p className="text-muted uppercase tracking-wide text-xs font-semibold mb-1">Business Hours</p>
                  <p className="text-text">{BUSINESS.hours}</p>
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={waLink(defaultWaMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-600 text-white font-semibold text-sm px-5 py-3 hover:bg-green-700 transition-colors"
                >
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${BUSINESS.phoneIntl}`}
                  className="inline-flex items-center justify-center rounded-full border border-navy text-navy font-semibold text-sm px-5 py-3 hover:bg-navy hover:text-white transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border h-64">
              <iframe
                title="MTS Traders & Builders Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-bg p-6 sm:p-8">
              <h2 className="font-serif font-bold text-xl mb-1">Send Us a Message</h2>
              <p className="text-sm text-muted mb-6">Fill in your project details and we&apos;ll get back to you shortly.</p>
              <QuoteForm dark={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
