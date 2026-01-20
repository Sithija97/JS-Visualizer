import Script from "next/script";
import { VisualizerExperience } from "./components/visualizer/VisualizerExperience";

export default function Home() {
  const siteUrl = "https://js-visualizer-jade.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JavaScript Event Loop Visualizer",
    url: siteUrl,
    description:
      "Event loop visualizer for JavaScript. Learn how the call stack, microtasks, and macrotasks work with an interactive, step-by-step simulation.",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JavaScript Event Loop Visualizer",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "Interactive, step-by-step visualization of the JavaScript event loop.",
  };

  return (
    <>
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appStructuredData) }}
      />
      <VisualizerExperience />
    </>
  );
}
