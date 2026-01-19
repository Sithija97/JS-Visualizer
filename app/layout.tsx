import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JavaScript Event Loop Visualizer | Interactive Learning Tool",
  description:
    "Learn how JavaScript handles async operations with this interactive event loop visualizer. Understand microtasks, macrotasks, and the call stack through step-by-step visualization.",
  keywords: [
    "JavaScript",
    "Event Loop",
    "Async",
    "Promises",
    "Microtasks",
    "Macrotasks",
    "Visualization",
  ],
  authors: [{ name: "Event Loop Visualizer" }],
  openGraph: {
    title: "UnderTheHood - JavaScript Event Loop Visualizer",
    description:
      "Interactive step-by-step visualization of JavaScript's event loop",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${process.env.ENV === "development" ? "debug-screens" : ""} ${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-page-bg)] text-[var(--color-text-primary)]`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
