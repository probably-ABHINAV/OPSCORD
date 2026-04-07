import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpsCord — AI-Powered DevOps Incident Intelligence",
  description:
    "OpsCord ingests events from CircleCI, GitHub, Kubernetes & Datadog, then uses AI causality scoring to tell you exactly what broke and why.",
  keywords: [
    "DevOps",
    "Incident Management",
    "AI",
    "Root Cause Analysis",
    "Kubernetes",
    "Monitoring",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
