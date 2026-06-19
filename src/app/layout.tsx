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

import GlobalBackground from "@/components/GlobalBackground";
import SplashCursor from "@/components/SplashCursor";
import Intro from "@/components/intro/Intro";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} overflow-x-clip max-w-full`} suppressHydrationWarning>
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
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#A855F7"
        />
        {children}
      </body>
    </html>
  );
}
