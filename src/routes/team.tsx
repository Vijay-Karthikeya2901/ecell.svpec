import { createFileRoute } from "@tanstack/react-router";
import { CTA } from "@/components/site/home-sections";
import { CmsTeam } from "@/components/site/cms-sections";
import { ContentPage } from "@/components/site/page";
export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team | E-Cell SVPEC" },
      { name: "description", content: "Meet the student leaders behind E-Cell SVPEC." },
      { property: "og:title", content: "E-Cell SVPEC Team" },
      {
        property: "og:description",
        content: "Meet the team building the entrepreneurial community at SVPEC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ContentPage
      eyebrow="Our team"
      title="The Energy Behind E-Cell"
      description="Students and mentors united by a belief that meaningful ideas deserve momentum."
    >
      <CmsTeam />
      <CTA />
    </ContentPage>
  ),
});
