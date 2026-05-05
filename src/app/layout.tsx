import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  );
}
