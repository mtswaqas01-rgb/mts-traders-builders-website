import Link from "next/link";

const STATUS_LABEL = {
  completed: "Completed",
  running: "Under Construction",
  ready: "Ready",
  sold: "Sold",
};

const STATUS_CLASS = {
  completed: "bg-green-100 text-green-800",
  running: "bg-gold/20 text-navy",
  ready: "bg-blue-100 text-blue-800",
  sold: "bg-gray-200 text-gray-700",
};

function isRecent(dateStr) {
  if (!dateStr) return false;
  const days = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  return days <= 14;
}

export default function ProjectCard({ project }) {
  const photo = project.photos?.[0];
  const recent = isRecent(project.created_at);
  return (
    <Link href={`/projects/${project.id}`} className="group block rounded-xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-navy/5 overflow-hidden">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">No photo yet</div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_CLASS[project.status] || "bg-gray-200 text-gray-700"}`}>
          {STATUS_LABEL[project.status] || project.status}
        </span>
        {project.verified && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-navy text-gold">Verified</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs uppercase tracking-wide text-gold font-semibold">{project.category}</p>
          {recent && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-green-100 text-green-800">New</span>}
        </div>
        <h3 className="font-serif font-bold text-lg leading-snug mb-1">{project.title}</h3>
        <p className="text-sm text-muted">{project.location}{project.plot_size ? ` · ${project.plot_size}` : ""}</p>
      </div>
    </Link>
  );
}
