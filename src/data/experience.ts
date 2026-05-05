export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: 1,
    role: "Project Developer",
    company: "LUCID",
    period: "2024 — Present",
    description:
      "Spearheading AI and backend engineering projects focused on real-time threat detection and automation systems.",
    highlights: [
      "Designed and deployed a CNN-based DDoS detection system achieving high accuracy in real-time threat classification",
      "Built and deployed REST APIs for model serving and integration with monitoring infrastructure",
      "Developed automation pipelines for data preprocessing, model training, and deployment workflows",
      "Collaborated with cross-functional teams to deliver scalable, production-ready solutions",
    ],
    tech: ["Python", "TensorFlow", "FastAPI", "Docker", "AWS"],
  },
];
