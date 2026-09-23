import {
  BadgeDollarSign,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  Rocket,
} from "lucide-react";
import summitImage from "@/assets/event-summit.jpg";
import workshopImage from "@/assets/event-workshop.jpg";
import pitchImage from "@/assets/event-pitch.jpg";

export const initiatives = [
  {
    icon: GraduationCap,
    title: "Entrepreneurship Development",
    description:
      "Build the mindset, skills and confidence to turn problems into purposeful ventures.",
  },
  {
    icon: Rocket,
    title: "Startup Support",
    description:
      "Move from first sketch to a validated idea with structured support and peer feedback.",
  },
  {
    icon: BrainCircuit,
    title: "Workshops & Bootcamps",
    description: "Learn practical tools from product thinking and finance to pitching and growth.",
  },
  {
    icon: BadgeDollarSign,
    title: "Business Competitions",
    description: "Test ideas, sharpen strategy and pitch in high-energy student challenges.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Mentorship",
    description: "Connect with founders, faculty and industry leaders who help you move forward.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Ideation",
    description:
      "Find meaningful opportunities and build creative solutions through collaboration.",
  },
];

export type LegacyEvent = {
  image: string;
  name: string;
  date: string;
  venue: string;
  description: string;
};
export const events: LegacyEvent[] = [];

export type LegacyTeamMember = { image: string; name: string; role: string; group: string };
export const team: LegacyTeamMember[] = [];

export const gallery = [
  { image: summitImage, title: "E-Summit", category: "E-Summit", className: "md:row-span-2" },
  { image: workshopImage, title: "Founder Workshop", category: "Workshops", className: "" },
  { image: pitchImage, title: "Pitch Arena", category: "Competitions", className: "" },
  { image: workshopImage, title: "Building Together", category: "Community", className: "" },
  { image: summitImage, title: "Ideas on Stage", category: "Events", className: "md:col-span-2" },
];

export type LegacyTestimonial = { quote: string; name: string; role: string; image: string };
export const testimonials: LegacyTestimonial[] = [];

/* -------------------------------------------------------------------------- */
/*  Blogs                                                                     */
/* -------------------------------------------------------------------------- */

export const blogCategories = [
  "Startups",
  "Innovation",
  "Events",
  "Mentorship",
  "Community",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  image: string;
  /** ISO date (YYYY-MM-DD). Keep the list below sorted newest first. */
  publishedAt: string;
  readTime: string;
  author: { name: string; role: string; image: string };
  sections: BlogSection[];
};

export const blogs: BlogPost[] = [];

export type BlogFilter = "All" | BlogCategory;

export const blogFilters: BlogFilter[] = ["All", ...blogCategories];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((post) => post.slug === slug);
}

/** Same-category posts first, then the rest, excluding the current post. */
export function getRelatedBlogs(post: BlogPost, limit = 3): BlogPost[] {
  const others = blogs.filter((item) => item.slug !== post.slug);
  const sameCategory = others.filter((item) => item.category === post.category);
  const remaining = others.filter((item) => item.category !== post.category);
  return [...sameCategory, ...remaining].slice(0, limit);
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
