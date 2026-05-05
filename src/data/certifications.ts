export interface Certification {
  id: number;
  title: string;
  issuer: string;
  icon: string;
  color: string;
  link: string | null;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    icon: "📊",
    color: "#8b5cf6",
    link: null,
  },
  {
    id: 2,
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata",
    icon: "🛡️",
    color: "#06b6d4",
    link: null,
  },
  {
    id: 3,
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata",
    icon: "📈",
    color: "#e2e8f0",
    link: null,
  },
  {
    id: 4,
    title: "Business Analytics",
    issuer: "Microsoft",
    icon: "💼",
    color: "#ec4899",
    link: null,
  },
  {
    id: 5,
    title: "Customer Experience (CX) for Business Success",
    issuer: "HP Life",
    icon: "⭐",
    color: "#f97316",
    link: null,
  },
  {
    id: 6,
    title: "Google Analytics",
    issuer: "Google Skillshop",
    icon: "📉",
    color: "#22c55e",
    link: null,
  },
];
