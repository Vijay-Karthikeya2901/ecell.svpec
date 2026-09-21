import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home-sections";
import { SiteShell } from "@/components/site/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "E-Cell SVPEC | Creating Job Creators" },
    { name: "description", content: "The Entrepreneurship Cell of Sanketika Vidya Parishad Engineering College, Visakhapatnam." },
    { property: "og:title", content: "E-Cell SVPEC | Creating Job Creators" },
    { property: "og:description", content: "Building an entrepreneurial ecosystem that transforms ideas into innovation, businesses and impact." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return <SiteShell><HomePage /></SiteShell>;
}
