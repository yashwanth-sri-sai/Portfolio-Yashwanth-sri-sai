import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yashwanth Sri Sai — AI/LLM Engineer & Backend Developer",
  description:
    "Portfolio of Yashwanth Sri Sai — Building intelligent systems with LLMs, RAG pipelines, and scalable APIs. Expertise in LangChain, FAISS, FastAPI, and cloud deployment.",
  keywords: [
    "AI Engineer",
    "LLM Engineer",
    "Backend Developer",
    "LangChain",
    "RAG",
    "FAISS",
    "FastAPI",
    "Portfolio",
    "Yashwanth Sri Sai",
  ],
  authors: [{ name: "Yashwanth Sri Sai" }],
  openGraph: {
    title: "Yashwanth Sri Sai — AI/LLM Engineer & Backend Developer",
    description:
      "Building intelligent systems with LLMs, RAG, and scalable APIs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashwanth Sri Sai — AI/LLM Engineer & Backend Developer",
    description:
      "Building intelligent systems with LLMs, RAG, and scalable APIs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import GlobalBackground from "@/components/GlobalBackground";
import Intro from "@/components/intro/Intro";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip max-w-full font-sans" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('introSeen') === 'true') {
                  document.documentElement.classList.add('intro-seen');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="noise-overlay overflow-x-clip max-w-full relative bg-transparent">
        <Intro />
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}
