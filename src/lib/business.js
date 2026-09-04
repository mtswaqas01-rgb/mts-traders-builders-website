export const BUSINESS = {
  name: "MTS Traders & Builders",
  tagline: "Building Trust, Creating Excellence",
  established: 2019,
  founder: "Muhammad Waqas Maqbool",
  founderTitle: "Founder & CEO",
  phone: "0333-0251251",
  phoneIntl: "+923330251251",
  email: "m.waqasmaqbool@hotmail.com",
  address: "2 Kilo Meter Toba Rajana Road, Toba Tek Singh",
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM (Sunday Closed)",
  stats: {
    completedProjects: "93+",
    residential: "70+",
    commercial: "15+",
    greyStructure: "8+",
    onTimeDelivery: "100%",
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    whatsapp: "https://wa.me/923330251251",
  },
};

export function waLink(message) {
  return `https://wa.me/${BUSINESS.phoneIntl.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function defaultWaMessage() {
  return `Hi, I'm interested in learning more about ${BUSINESS.name}'s services.`;
}

export const SERVICES = [
  {
    slug: "grey-structure-construction",
    title: "Grey Structure Construction",
    description: "Strong foundations, RCC framework, brick masonry, roofing, plaster, and complete structural work using premium-quality materials.",
  },
  {
    slug: "turnkey-construction",
    title: "Turnkey Construction",
    description: "From planning and design to finishing and handover, we manage every stage of your construction project.",
  },
  {
    slug: "architectural-design",
    title: "Architectural Design & Planning",
    description: "Modern, functional, and customized architectural designs with detailed floor plans and 3D elevations.",
  },
  {
    slug: "interior-design-finishing",
    title: "Interior Design & Finishing",
    description: "Premium interior solutions including false ceilings, flooring, paint, wardrobes, bathrooms, and decorative finishes.",
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    description: "Upgrade and renovate residential and commercial buildings with modern designs and improved functionality.",
  },
  {
    slug: "concrete-products",
    title: "Concrete Products",
    description: "Manufacturing and supply of high-quality concrete boundary walls, roof slabs, pipes, pavers and other precast products.",
  },
  {
    slug: "electrical-plumbing",
    title: "Electrical & Plumbing Works",
    description: "Professional electrical wiring, plumbing systems, drainage, water supply, and complete MEP solutions.",
  },
  {
    slug: "exterior-development",
    title: "Exterior Development",
    description: "Boundary walls, gates, driveways, landscaping, car porches, and outdoor finishing.",
  },
];

export const WHY_CHOOSE_US = [
  "93+ Successfully Completed Projects",
  "Experienced & Professional Team",
  "Premium Quality Materials",
  "On-Time Project Delivery",
  "Transparent Agreements",
  "Quality Assurance",
  "Competitive Pricing",
  "Complete Construction Solutions",
  "Customer Satisfaction",
];

export const CONSTRUCTION_PROCESS = [
  { step: 1, title: "Consultation & Requirement Analysis", description: "We understand your vision, budget, and requirements in detail." },
  { step: 2, title: "Design & Planning", description: "Architectural design, 2D maps, and 3D visualization of your project." },
  { step: 3, title: "Estimation & Agreement", description: "Transparent cost estimation and a clear, fair agreement." },
  { step: 4, title: "Site Preparation", description: "Land clearing, leveling, and preparation for construction." },
  { step: 5, title: "Grey Structure Construction", description: "Foundation, RCC framework, brick masonry, and roofing." },
  { step: 6, title: "Finishing Works", description: "Flooring, paint, electrical, plumbing, and interior finishing." },
  { step: 7, title: "Quality Check & Site Supervision", description: "Thorough inspection at every stage by our engineers." },
  { step: 8, title: "Final Inspection & Handover", description: "Final walkthrough and handover of your completed project." },
];

export const MATERIAL_CATEGORIES = [
  "Cement", "Steel Bars", "Bricks & Blocks", "Sand", "Crush & Aggregates",
  "Concrete", "Electrical Materials", "Plumbing Materials", "Paints & Finishes",
];

export const TRUSTED_BRANDS = [
  "DG Khan Cement", "Bestway Cement", "Lucky Cement", "Maple Leaf Cement",
  "Falcon Steel", "Master Paints", "Nippon Paint", "Dulux",
];

export const CLIENT_COMMITMENTS = [
  { title: "Exceptional Quality", description: "We use premium materials and follow international construction standards." },
  { title: "On-Time Project Delivery", description: "We value your time and complete projects as promised." },
  { title: "Transparent Communication", description: "Clear agreements, honest pricing, and no hidden costs." },
  { title: "Fair & Competitive Pricing", description: "Quality construction at a price that respects your budget." },
  { title: "Safety & Reliability", description: "Strict safety protocols on every site, every day." },
  { title: "Customer Satisfaction", description: "Your satisfaction is the true measure of our success." },
];

export const CORE_VALUES = ["Integrity", "Quality", "Commitment", "Customer Satisfaction", "Innovation", "Safety"];

export const PROJECT_CATEGORIES = ["Residential", "Commercial", "Religious", "Educational", "Healthcare", "Office", "Industrial"];
export const PROJECT_STATUSES = ["completed", "running", "ready", "sold"];
export const PROPERTY_TYPES = ["Plot", "House", "Commercial"];

export const FAQS = [
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Toba Tek Singh and surrounding areas, taking on residential, commercial, and specialized construction projects across the region.",
  },
  {
    question: "How much does construction cost per square foot?",
    answer: "Costs vary based on the quality tier, design complexity, and materials chosen. Use our cost calculator below for a rough estimate, or contact us for a detailed, accurate quote.",
  },
  {
    question: "Do you provide turnkey (start-to-finish) construction?",
    answer: "Yes. Our Turnkey Construction service covers everything from planning and design to grey structure, finishing, and final handover — you don't need to manage multiple contractors.",
  },
  {
    question: "Can I collaborate with MTS if I own land but don't want to build myself?",
    answer: "Yes — visit our New Projects & Collaborations page to propose a joint-venture partnership where we construct and share profits with landowners.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on project size and scope. A standard residential home typically takes a few months for grey structure and a few more for finishing. We'll give you a clear timeline during consultation.",
  },
  {
    question: "Do you offer a free consultation and quote?",
    answer: "Yes, absolutely. Fill out the \"Get a Free Quote\" form on any page or message us on WhatsApp, and our team will get back to you shortly.",
  },
];
