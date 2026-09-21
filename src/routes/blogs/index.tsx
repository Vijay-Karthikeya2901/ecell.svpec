import { createFileRoute } from "@tanstack/react-router";
import { BlogsListing } from "@/components/site/blogs-section";
import { CTA } from "@/components/site/home-sections";
import { ContentPage } from "@/components/site/page";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs | E-Cell SVPEC" },
      {
        name: "description",
        content: "Stories, ideas and practical lessons from the E-Cell SVPEC community.",
      },
      { property: "og:title", content: "E-Cell SVPEC Blogs" },
      {
        property: "og:description",
        content: "Read about startups, innovation, events and mentorship at SVPEC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ContentPage
      eyebrow="Blogs"
      title="Stories, Ideas & Lessons"
      description="Practical thinking on startups, innovation and building from campus — written by the people behind E-Cell."
    >
      <BlogsListing />
      <CTA />
    </ContentPage>
  ),
});
