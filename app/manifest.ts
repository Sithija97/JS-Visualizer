import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JavaScript Event Loop Visualizer",
    short_name: "Event Loop",
    description:
      "Event loop visualizer for JavaScript. Learn how the call stack, microtasks, and macrotasks work with an interactive, step-by-step simulation.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f19",
    theme_color: "#0b0f19",
    icons: [
      {
        src: "/js.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
