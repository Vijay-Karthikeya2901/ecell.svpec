import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/home-sections";
import { CmsEvents, CmsFeaturedEvent } from "@/components/site/cms-sections";
import { ContentPage } from "@/components/site/page";
export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events | E-Cell SVPEC" },
      { name: "description", content: "Upcoming entrepreneurship events and workshops at SVPEC." },
      { property: "og:title", content: "E-Cell SVPEC Events" },
      { property: "og:description", content: "Learn, connect and build at our upcoming events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ContentPage
      eyebrow="Events"
      title="Learn. Meet. Make It Happen."
      description="High-energy experiences that bring ambitious students and experienced builders together."
    >
      <CmsEvents />
      <CmsFeaturedEvent />
      <Gallery />
    </ContentPage>
  ),
});
