import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://js-visualizer-jade.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "JavaScript Event Loop Visualizer",
  title: {
    default: "JavaScript Event Loop Visualizer",
    template: "%s | JavaScript Event Loop Visualizer",
  },
  description:
    "Interactive JavaScript event loop visualizer. Learn call stack, microtasks, and macrotasks with step-by-step simulations and real code examples.",
  keywords: [
    "js event loop",
    "javascript event loop",
    "event loop visualizer",
    "event loop visualiser",
    "event loop tutorial",
    "event loop simulation",
    "microtask queue",
    "macrotask queue",
    "call stack",
    "promises",
    "async javascript",
    "setTimeout",
    "queueMicrotask",
    "requestAnimationFrame",
    "javascript concurrency",
  ],
  authors: [{ name: "Event Loop Visualizer" }],
  creator: "Event Loop Visualizer",
  publisher: "Event Loop Visualizer",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "JavaScript Event Loop Visualizer",
    description:
      "Interactive JavaScript event loop visualizer with step-by-step simulations for the call stack, microtasks, and macrotasks.",
    url: "/",
    siteName: "JavaScript Event Loop Visualizer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JavaScript Event Loop Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Event Loop Visualizer",
    description:
      "Interactive JavaScript event loop visualizer with step-by-step simulations.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/js.png",
    apple: "/js.png",
    shortcut: "/js.png",
  },
  manifest: "/manifest.webmanifest",
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
