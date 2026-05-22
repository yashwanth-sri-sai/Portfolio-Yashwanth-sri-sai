export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export const experiences: ExperienceEntry[] = [];
