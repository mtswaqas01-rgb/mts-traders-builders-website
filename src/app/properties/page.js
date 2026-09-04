import PropertiesClient from "./PropertiesClient";

const title = "Property Marketplace | Plots, Houses & Commercial";
const description = "Browse verified plots, houses, and commercial properties for sale in Toba Tek Singh — MTS Traders & Builders Property Marketplace.";

export const metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function PropertiesPage() {
  return <PropertiesClient />;
}
