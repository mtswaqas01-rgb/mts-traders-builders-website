import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { BUSINESS } from "@/lib/business";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SITE_URL, KEYWORDS } from "@/lib/site";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const description = "MTS Traders & Builders — trusted construction company in Toba Tek Singh, Pakistan. Grey structure, turnkey construction, architectural design, renovation and more.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} | Construction Company in Toba Tek Singh`,
    template: `%s | ${BUSINESS.name}`,
  },
  description,
  keywords: KEYWORDS,
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} | Construction Company in Toba Tek Singh`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | Construction Company in Toba Tek Singh`,
    description,
  },
};

export const viewport = {
  themeColor: "#0B0F1A",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: BUSINESS.name,
  description,
  url: SITE_URL,
  telephone: BUSINESS.phoneIntl,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address,
    addressLocality: "Toba Tek Singh",
    addressCountry: "PK",
  },
  openingHours: "Mo-Sa 09:00-18:00",
  founder: BUSINESS.founder,
  foundingDate: String(BUSINESS.established),
  sameAs: Object.values(BUSINESS.social).filter((s) => s && s !== "#"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </LanguageProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
