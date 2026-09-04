import ProjectsClient from "./ProjectsClient";

const title = "Our Projects | Residential & Commercial Construction";
const description = "Browse MTS Traders & Builders' completed and ongoing residential, commercial, and specialized construction projects in Toba Tek Singh and surrounding areas.";

export const metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
