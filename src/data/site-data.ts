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
import arjunImage from "@/assets/team-arjun.jpg";
import ananyaImage from "@/assets/team-ananya.jpg";
import meeraImage from "@/assets/team-meera.jpg";
import rohanImage from "@/assets/team-rohan.jpg";

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
  id?: string;
  image: string;
  name: string;
  date: string;
  time?: string;
  venue: string;
  description: string;
  registrationUrl?: string;
};

export const defaultEvents: LegacyEvent[] = [
  {
    id: "default-summit",
    image: summitImage,
    name: "Annual E-Summit",
    date: "24-25 October 2026",
    time: "09:30 AM IST",
    venue: "Main Auditorium, SVPEC",
    description:
      "Flagship annual entrepreneurship conference featuring venture keynotes, student startup showcases, and networking sessions with Andhra Pradesh founder network.",
    registrationUrl: "/contact",
  },
  {
    id: "default-pitch",
    image: pitchImage,
    name: "Startup Pitch Arena",
    date: "12 November 2026",
    time: "02:00 PM IST",
    venue: "Seminar Hall 1, SVPEC",
    description:
      "High-stakes venture pitch arena where student innovators present validated prototypes before alumni angel investors and startup mentors.",
    registrationUrl: "/contact",
  },
  {
    id: "default-workshop",
    image: workshopImage,
    name: "Venture Building & Prototype Bootcamp",
    date: "05 December 2026",
    time: "10:00 AM IST",
    venue: "Innovation Hub, SVPEC",
    description:
      "Hands-on founder masterclass covering customer discovery, lean MVP roadmapping, unit economics, and seed pitch deck fundamentals.",
    registrationUrl: "/contact",
  },
];

export const events: LegacyEvent[] = defaultEvents;

export type LegacyTeamMember = {
  id?: string;
  image: string;
  name: string;
  role: string;
  group: string;
  linkedinUrl?: string;
  instagramUrl?: string;
};

export const defaultTeam: LegacyTeamMember[] = [
  {
    id: "default-arjun",
    image: arjunImage,
    name: "Arjun Mehta",
    role: "President & Lead Coordinator",
    group: "Executive Leadership",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
  },
  {
    id: "default-ananya",
    image: ananyaImage,
    name: "Ananya Sharma",
    role: "Head of Initiatives & Incubation",
    group: "Venture Development",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
  },
  {
    id: "default-meera",
    image: meeraImage,
    name: "Meera Patel",
    role: "Head of Corporate Relations",
    group: "Partnerships & Sponsorships",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
  },
  {
    id: "default-rohan",
    image: rohanImage,
    name: "Rohan Verma",
    role: "Head of Technology & Operations",
    group: "Platforms & Systems",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
  },
];

export const team: LegacyTeamMember[] = defaultTeam;

export const gallery = [
  { image: summitImage, title: "E-Summit Keynotes", category: "E-Summit", className: "md:row-span-2" },
  { image: workshopImage, title: "Founder Workshop", category: "Workshops", className: "" },
  { image: pitchImage, title: "Pitch Arena", category: "Competitions", className: "" },
  { image: workshopImage, title: "Collaborative Ideation", category: "Community", className: "" },
  { image: summitImage, title: "Ideas on Stage", category: "Events", className: "md:col-span-2" },
];

export type LegacyTestimonial = { quote: string; name: string; role: string; image: string };
export const testimonials: LegacyTestimonial[] = [
  {
    quote: "E-Cell SVPEC transformed how I approach engineering problems. It gave our team the structure and confidence to launch our first IoT prototype.",
    name: "Kavya Reddy",
    role: "Student Founder, Batch '25",
    image: ananyaImage,
  },
  {
    quote: "The mentorship network and pitch workshops connected us with alumni founders who provided invaluable feedback before our state-level demo day.",
    name: "Sai Kiran",
    role: "Incubation Cohort Lead",
    image: arjunImage,
  },
];

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

export const defaultBlogs: BlogPost[] = [
  {
    slug: "building-from-campus-to-first-customer",
    title: "Building From Campus: Taking Your First Student Venture to Market",
    excerpt:
      "Practical lessons on customer discovery, validating assumptions with peers, and building an MVP while balancing engineering coursework.",
    category: "Startups",
    image: pitchImage,
    publishedAt: "2026-10-10",
    readTime: "5 min read",
    author: {
      name: "Arjun Mehta",
      role: "President, E-Cell SVPEC",
      image: arjunImage,
    },
    sections: [
      {
        heading: "The Power of Campus Prototyping",
        paragraphs: [
          "Colleges are unmatched sandbox environments for testing early products. You have access to hundreds of potential early users, knowledgeable faculty mentors, and labs without the prohibitive overhead of a commercial lease.",
          "At SVPEC, we encourage student founders to identify problems within their immediate technical domain—whether smart campus mobility, automated scheduling, or green energy solutions.",
        ],
      },
      {
        heading: "From Problem Statement to Functional Prototype",
        paragraphs: [
          "The biggest hurdle isn't coding; it's defining the problem with surgical clarity. Before writing production code, spend time conducting structured discovery interviews with your peers and potential buyers.",
          "Our incubation cohort emphasizes shipping an imperfect solution within three weeks rather than spending months polishing an unvalidated concept.",
        ],
      },
    ],
  },
  {
    slug: "navigating-e-summit-2026-guide",
    title: "Navigating E-Summit 2026: What Builders Can Expect",
    excerpt:
      "A complete walkthrough of our flagship annual gathering, key stages, investor panels, and the startup expo arena.",
    category: "Events",
    image: summitImage,
    publishedAt: "2026-10-04",
    readTime: "4 min read",
    author: {
      name: "Ananya Sharma",
      role: "Head of Initiatives, E-Cell SVPEC",
      image: ananyaImage,
    },
    sections: [
      {
        heading: "A Stage Built for Student Ambition",
        paragraphs: [
          "Annual E-Summit brings together aspiring entrepreneurs, angel syndicates, and industry veterans to celebrate campus innovation.",
          "With dedicated tracks for deep-tech, consumer software, and social enterprises, the summit provides practical masterclasses alongside high-energy pitch battles.",
        ],
      },
    ],
  },
  {
    slug: "why-mentorship-matters-early-stage",
    title: "The Mentorship Multiplier: Why Early Guidance Shapes Venture Longevity",
    excerpt:
      "How structured guidance from seasoned operators helps student teams avoid costly technical and strategic pitfalls.",
    category: "Mentorship",
    image: workshopImage,
    publishedAt: "2026-09-28",
    readTime: "6 min read",
    author: {
      name: "Meera Patel",
      role: "Head of Corporate Relations",
      image: meeraImage,
    },
    sections: [
      {
        heading: "Beyond Generic Advice",
        paragraphs: [
          "High-impact mentorship isn't about high-level motivational speeches; it's about tactical advice on contracts, customer acquisition channels, and technical architecture.",
          "Connecting student founders with alumni who have walked the same path demystifies the entrepreneurial process and builds institutional confidence.",
        ],
      },
    ],
  },
];

export const blogs: BlogPost[] = defaultBlogs;

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
