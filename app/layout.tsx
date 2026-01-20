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
  title: {
    default: "JavaScript Event Loop Visualizer",
    template: "%s | JavaScript Event Loop Visualizer",
  },
  description:
    "Event loop visualizer for JavaScript. Learn how the call stack, microtasks, and macrotasks work with an interactive, step-by-step simulation.",
  keywords: [
    "event loop visualizer",
    "event loop visualiser",
    "JavaScript event loop",
    "event loop simulation",
    "microtask queue",
    "macrotask queue",
    "call stack",
    "promises",
    "async JavaScript",
    "JavaScript",
  ],
  authors: [{ name: "Event Loop Visualizer" }],
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
      "Interactive, step-by-step visualization of the JavaScript event loop.",
    url: "/",
    siteName: "JavaScript Event Loop Visualizer",
    type: "website",
    images: [
      {
        url: "/js.png",
        width: 512,
        height: 512,
        alt: "JavaScript Event Loop Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Event Loop Visualizer",
    description:
      "Interactive, step-by-step visualization of the JavaScript event loop.",
    images: ["/js.png"],
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
