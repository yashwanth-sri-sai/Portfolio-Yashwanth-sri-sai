export interface Certification {
  id: number;
  title: string;
  issuer: string;
  year: string;
  category: string;
  image: string;
  verificationLink: string | null;
  skills: string[];
  color: string;
  hueRotate: string;
  hash: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    year: "2024",
    category: "Data Analytics",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1l01CQ7WJSu-XtztpuxR-sr6WHtfibdkJ/view?usp=drive_link",
    skills: ["Data Analytics", "Python", "Tableau", "SQL"],
    color: "#8b5cf6",
    hueRotate: "260deg",
    hash: "SHA256-DEL8F9A2B"
  },
  {
    id: 2,
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata",
    year: "2024",
    category: "Cybersecurity",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1l0nxgGvdhmnJsqUYsRS2YRrWaBj2zZcH/view?usp=drive_link",
    skills: ["Cyber Security", "Threat Analysis", "Network Security"],
    color: "#06b6d4",
    hueRotate: "180deg",
    hash: "SHA256-TATA9B8C7"
  },
  {
    id: 3,
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata",
    year: "2024",
    category: "Data Analytics",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1l1eeEvNdskMFzS02nw5JnRxCBzU3Lu4N/view?usp=drive_link",
    skills: ["Data Visualization", "Tableau", "Dashboard Design"],
    color: "#3b82f6",
    hueRotate: "210deg",
    hash: "SHA256-TATA4E3F2"
  },
  {
    id: 4,
    title: "Business Analytics",
    issuer: "Microsoft",
    year: "2024",
    category: "Data Analytics",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1CTdaC2YDz65eQzT-C1lKpjX__LCWq3_2/view?usp=drive_link",
    skills: ["Power BI", "Business Intelligence", "Excel", "Data Modeling"],
    color: "#ec4899",
    hueRotate: "310deg",
    hash: "SHA256-MSFT7D8E9"
  },
  {
    id: 5,
    title: "Customer Experience (CX) for Business Success",
    issuer: "HP Life",
    year: "2023",
    category: "Business Analytics",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1O6FEPXGFo1tnMRwlsyLiM_XWazxsWDTt/view?usp=drive_link",
    skills: ["Customer Experience", "Business Strategy", "CX Analytics"],
    color: "#f97316",
    hueRotate: "35deg",
    hash: "SHA256-HPLIFE6A5"
  },
  {
    id: 6,
    title: "Google Analytics",
    issuer: "Google Skillshop",
    year: "2024",
    category: "Data Analytics",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1kfmDOmymZitkEbLnc12_iKTKMc420I67/view?usp=drive_link",
    skills: ["Google Analytics", "GA4", "Web Traffic Analytics"],
    color: "#22c55e",
    hueRotate: "90deg",
    hash: "SHA256-GOOG8C7D6"
  },
  {
    id: 7,
    title: "Automating with AI/ML",
    issuer: "Google",
    year: "2025",
    category: "AI/ML",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1547QpQ-XEVwnBS6Sa5-HKDaYA7Z8xE1Z/view?usp=sharing",
    skills: ["AI/ML", "Automation", "Python", "API Integration"],
    color: "#0284c7",
    hueRotate: "200deg",
    hash: "SHA256-GOOG5F6E7"
  },
  {
    id: 8,
    title: "Fundamentals of Prompt Engineering with Claude",
    issuer: "Anthropic",
    year: "2025",
    category: "AI/ML",
    image: "/certifications/template.jpg",
    verificationLink: "https://drive.google.com/file/d/1_s9lBTkuLu3a5nRCOAAbrxRHD2j9iIet/view?usp=sharing",
    skills: ["Prompt Engineering", "Claude AI", "LLMs", "AI Reasoning"],
    color: "#d97706",
    hueRotate: "25deg",
    hash: "SHA256-ANTH8B9C2"
  }
];
