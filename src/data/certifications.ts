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
    link: "https://drive.google.com/file/d/1l01CQ7WJSu-XtztpuxR-sr6WHtfibdkJ/view?usp=drive_link",
  },
  {
    id: 2,
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata",
    icon: "🛡️",
    color: "#06b6d4",
    link: "https://drive.google.com/file/d/1l0nxgGvdhmnJsqUYsRS2YRrWaBj2zZcH/view?usp=drive_link",
  },
  {
    id: 3,
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata",
    icon: "📈",
    color: "#e2e8f0",
    link: "https://drive.google.com/file/d/1l1eeEvNdskMFzS02nw5JnRxCBzU3Lu4N/view?usp=drive_link",
  },
  {
    id: 4,
    title: "Business Analytics",
    issuer: "Microsoft",
    icon: "💼",
    color: "#ec4899",
    link: "https://drive.google.com/file/d/1CTdaC2YDz65eQzT-C1lKpjX__LCWq3_2/view?usp=drive_link",
  },
  {
    id: 5,
    title: "Customer Experience (CX) for Business Success",
    issuer: "HP Life",
    icon: "⭐",
    color: "#f97316",
    link: "https://drive.google.com/file/d/1O6FEPXGFo1tnMRwlsyLiM_XWazxsWDTt/view?usp=drive_link",
  },
  {
    id: 6,
    title: "Google Analytics",
    issuer: "Google Skillshop",
    icon: "📉",
    color: "#22c55e",
    link: "https://drive.google.com/file/d/1kfmDOmymZitkEbLnc12_iKTKMc420I67/view?usp=drive_link",
  },
];
