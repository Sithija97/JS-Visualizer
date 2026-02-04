import type { Metadata } from "next";
import Script from "next/script";
import { VisualizerExperience } from "./components/visualizer/VisualizerExperience";

export const metadata: Metadata = {
  title: "JS Event Loop Animation & Visualizer",
  description:
    "JS event loop animation and visualizer. Learn how the call stack, microtasks, and macrotasks execute with step-by-step simulations and real examples.",
  keywords: [
    "js event loop",
    "event loop animation",
    "javascript event loop",
    "event loop visualizer",
    "event loop visualiser",
    "call stack",
    "microtask queue",
    "macrotask queue",
    "promises",
    "setTimeout",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JS Event Loop Animation & Visualizer",
    description:
      "Interactive JS event loop animation with step-by-step simulations of the call stack, microtasks, and macrotasks.",
    url: "/",
  },
  twitter: {
    title: "JS Event Loop Animation & Visualizer",
    description:
      "Interactive JS event loop animation and visualizer with step-by-step simulations.",
  },
};

export default function Home() {
  const siteUrl = "https://js-visualizer-jade.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "JavaScript Event Loop Visualizer",
        url: siteUrl,
        description:
          "Interactive JavaScript event loop visualizer. Learn call stack, microtasks, and macrotasks with step-by-step simulations and real code examples.",
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        name: "JavaScript Event Loop Visualizer",
        url: siteUrl,
        description:
          "Interactive JavaScript event loop visualizer with step-by-step simulations for the call stack, microtasks, and macrotasks.",
        inLanguage: "en",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "JavaScript Event Loop Visualizer",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description:
          "Interactive, step-by-step visualization of the JavaScript event loop.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the JavaScript event loop?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The event loop coordinates the call stack, microtask queue, and macrotask queue so asynchronous JavaScript can run without blocking the main thread.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between microtasks and macrotasks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Microtasks (like resolved Promises) run right after the current call stack empties, while macrotasks (like setTimeout) run in later event loop ticks.",
            },
          },
          {
            "@type": "Question",
            name: "How does the call stack relate to the event loop?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The call stack holds synchronous work. When it clears, the event loop pulls tasks from queues to continue execution.",
            },
          },
          {
            "@type": "Question",
            name: "Is this event loop visualizer free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the visualizer is free and runs directly in your browser.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <VisualizerExperience />
    </>
  );
}
