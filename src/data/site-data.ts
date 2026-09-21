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
import rohanImage from "@/assets/team-rohan.jpg";
import meeraImage from "@/assets/team-meera.jpg";

export const initiatives = [
  { icon: GraduationCap, title: "Entrepreneurship Development", description: "Build the mindset, skills and confidence to turn problems into purposeful ventures." },
  { icon: Rocket, title: "Startup Support", description: "Move from first sketch to a validated idea with structured support and peer feedback." },
  { icon: BrainCircuit, title: "Workshops & Bootcamps", description: "Learn practical tools from product thinking and finance to pitching and growth." },
  { icon: BadgeDollarSign, title: "Business Competitions", description: "Test ideas, sharpen strategy and pitch in high-energy student challenges." },
  { icon: BriefcaseBusiness, title: "Mentorship", description: "Connect with founders, faculty and industry leaders who help you move forward." },
  { icon: Lightbulb, title: "Innovation & Ideation", description: "Find meaningful opportunities and build creative solutions through collaboration." },
];

export const events = [
  { image: summitImage, name: "Idea to Impact", date: "12 October 2026", venue: "Main Auditorium", description: "A hands-on startup discovery session designed to turn campus problems into testable ideas." },
  { image: workshopImage, name: "Founder’s Toolkit", date: "24 October 2026", venue: "Innovation Lab", description: "A practical workshop covering validation, business models, storytelling and first customers." },
  { image: pitchImage, name: "Pitch Arena", date: "08 November 2026", venue: "Seminar Hall", description: "Present your boldest idea to mentors and compete for incubation guidance and recognition." },
];

export const team = [
  { image: arjunImage, name: "Arjun Varma", role: "President", group: "Leadership" },
  { image: ananyaImage, name: "Ananya Rao", role: "Vice President", group: "Leadership" },
  { image: rohanImage, name: "Rohan Kumar", role: "Events Lead", group: "Events Team" },
  { image: meeraImage, name: "Meera Reddy", role: "Design Lead", group: "Design Team" },
];

export const gallery = [
  { image: summitImage, title: "E-Summit", category: "E-Summit", className: "md:row-span-2" },
  { image: workshopImage, title: "Founder Workshop", category: "Workshops", className: "" },
  { image: pitchImage, title: "Pitch Arena", category: "Competitions", className: "" },
  { image: workshopImage, title: "Building Together", category: "Community", className: "" },
  { image: summitImage, title: "Ideas on Stage", category: "Events", className: "md:col-span-2" },
];

export const testimonials = [
  { quote: "E-Cell helped me stop waiting for the perfect idea and start solving a real problem.", name: "Kavya S.", role: "Student Innovator", image: meeraImage },
  { quote: "The mentors challenged our assumptions and gave our team a much clearer path forward.", name: "Nikhil R.", role: "Student Founder", image: arjunImage },
  { quote: "This is where curious students find collaborators, confidence and the courage to build.", name: "Priya M.", role: "E-Cell Alumni", image: ananyaImage },
];

/* -------------------------------------------------------------------------- */
/*  Blogs                                                                     */
/* -------------------------------------------------------------------------- */

export const blogCategories = ["Startups", "Innovation", "Events", "Mentorship", "Community"] as const;

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

const blogAuthors = {
  arjun: { name: "Arjun Varma", role: "President, E-Cell", image: arjunImage },
  ananya: { name: "Ananya Rao", role: "Vice President, E-Cell", image: ananyaImage },
  rohan: { name: "Rohan Kumar", role: "Events Lead, E-Cell", image: rohanImage },
  meera: { name: "Meera Reddy", role: "Design Lead, E-Cell", image: meeraImage },
};

// Placeholder articles — replace with real E-Cell content. Newest first.
export const blogs: BlogPost[] = [
  {
    slug: "validate-a-startup-idea-in-seven-days",
    title: "How to Validate a Startup Idea in Seven Days",
    excerpt:
      "You do not need a prototype or a pitch deck to learn whether a problem is worth solving. You need seven days and a handful of honest conversations.",
    category: "Startups",
    image: workshopImage,
    publishedAt: "2026-09-14",
    readTime: "6 min read",
    author: blogAuthors.arjun,
    sections: [
      {
        heading: "Start with the problem, not the product",
        paragraphs: [
          "Most student ideas begin with a solution looking for a customer. Flip it. Write down the problem in one sentence, name the person who has it, and describe how they cope today.",
          "If you cannot describe the current workaround, you probably do not understand the problem well enough yet.",
        ],
      },
      {
        heading: "Talk to ten people before you build anything",
        paragraphs: [
          "Spend the first four days on conversations. Ask about the last time the problem happened, what it cost them and what they tried. Avoid pitching — the goal is to listen.",
          "Patterns matter more than compliments. When three or four people describe the same frustration unprompted, you have found something real.",
        ],
      },
      {
        heading: "Run one small, honest test",
        paragraphs: [
          "Use the last days to test a single assumption: a simple landing page, a manual service delivered over chat, or a paid pilot with one customer.",
          "At the end of the week, decide with evidence: continue, change direction or let the idea go. All three are wins because you learned quickly and cheaply.",
        ],
      },
    ],
  },
  {
    slug: "five-lessons-from-pitch-arena",
    title: "Five Lessons from Pitch Arena",
    excerpt:
      "Teams walked in with big ideas and walked out with sharper stories. Here is what separated the memorable pitches from the forgettable ones.",
    category: "Events",
    image: pitchImage,
    publishedAt: "2026-09-02",
    readTime: "5 min read",
    author: blogAuthors.rohan,
    sections: [
      {
        heading: "Lead with the problem",
        paragraphs: [
          "The strongest pitches opened with a specific person and a specific pain. Judges leaned in when they could picture the customer, and glazed over when the first slide was a technology diagram.",
        ],
      },
      {
        heading: "Show traction, however small",
        paragraphs: [
          "Ten survey responses, three pilot users or a waiting list of fifty classmates all beat a confident claim about market size. Evidence of any kind builds trust.",
          "Teams that had already spoken to customers could answer follow-up questions calmly, and that calm was persuasive.",
        ],
      },
      {
        heading: "Practise the ask",
        paragraphs: [
          "Many teams forgot to say what they needed. Be clear whether you want mentorship, an introduction, feedback or funding — and rehearse that final thirty seconds as carefully as the opening.",
        ],
      },
    ],
  },
  {
    slug: "why-every-engineer-should-think-like-a-founder",
    title: "Why Every Engineer Should Think Like a Founder",
    excerpt:
      "Founder thinking is not only for people who start companies. It is a way of noticing problems, taking ownership and shipping useful things.",
    category: "Innovation",
    image: summitImage,
    publishedAt: "2026-08-22",
    readTime: "5 min read",
    author: blogAuthors.ananya,
    sections: [
      {
        heading: "Ownership changes how you learn",
        paragraphs: [
          "When you treat a class project as something you would have to sell, maintain and support, you ask better questions. Who is this for? What happens when it breaks? What would make someone pay for it?",
        ],
      },
      {
        heading: "Technical skill plus commercial curiosity",
        paragraphs: [
          "Engineers who understand customers, costs and constraints make better design decisions. They know which features matter and which are just interesting to build.",
          "You do not need a business degree to start. Read a few founder stories, follow a real product from idea to launch and talk to someone who has sold something.",
        ],
      },
      {
        heading: "Small experiments, every semester",
        paragraphs: [
          "Pick one problem on campus each term and try to improve it. Some experiments will fail quietly; a few will grow into ventures. Either way, you will graduate with judgement that classrooms rarely teach.",
        ],
      },
    ],
  },
  {
    slug: "finding-a-mentor-who-moves-you-forward",
    title: "Finding a Mentor Who Actually Moves You Forward",
    excerpt:
      "A good mentor is less about a famous name and more about the quality of the conversation. Here is how to find one and make the relationship work.",
    category: "Mentorship",
    image: workshopImage,
    publishedAt: "2026-08-09",
    readTime: "4 min read",
    author: blogAuthors.arjun,
    sections: [
      {
        heading: "Be specific about what you need",
        paragraphs: [
          "“Will you be my mentor?” is a hard question to answer. “Could I get your view on how to price our first pilot?” is easy. Start with a concrete request and let the relationship grow from there.",
        ],
      },
      {
        heading: "Respect their time, and show progress",
        paragraphs: [
          "Send a short note before each meeting, arrive with two or three focused questions and follow up with what you did with their advice. Mentors stay engaged when they see their input turn into action.",
        ],
      },
      {
        heading: "Look beyond the obvious places",
        paragraphs: [
          "Faculty, alumni, local founders and senior students all have lessons worth learning. The best mentor for this stage of your journey may be someone only a few steps ahead of you.",
        ],
      },
    ],
  },
  {
    slug: "building-a-student-startup-community",
    title: "Building a Student Startup Community from Scratch",
    excerpt:
      "Communities do not appear because a club exists. They grow when people feel welcome, useful and part of something worth showing up for.",
    category: "Community",
    image: summitImage,
    publishedAt: "2026-07-27",
    readTime: "5 min read",
    author: blogAuthors.meera,
    sections: [
      {
        heading: "Make the first step small",
        paragraphs: [
          "Not every student is ready to pitch a startup. Casual meetups, open idea sessions and show-and-tell evenings give newcomers an easy way in and let curiosity do the rest.",
        ],
      },
      {
        heading: "Celebrate progress, not just wins",
        paragraphs: [
          "Share what teams are learning, including experiments that did not work. When people see honest progress, they feel safer trying something of their own.",
        ],
      },
      {
        heading: "Connect people across disciplines",
        paragraphs: [
          "The best teams mix engineers, designers, storytellers and organisers. Introduce people who would not otherwise meet and give them a small problem to solve together.",
        ],
      },
    ],
  },
  {
    slug: "finding-your-first-customers-on-campus",
    title: "Finding Your First Customers on Campus",
    excerpt:
      "Campus is a friendly testing ground: a large group of people with real needs, close at hand. Here is how to use it well.",
    category: "Startups",
    image: pitchImage,
    publishedAt: "2026-07-11",
    readTime: "4 min read",
    author: blogAuthors.rohan,
    sections: [
      {
        heading: "Solve a problem you can see",
        paragraphs: [
          "Look at what students, faculty and campus services struggle with every week — food, notes, transport, event coordination. Problems you can observe are easier to test than ones you have to imagine.",
        ],
      },
      {
        heading: "Ask for a commitment, not an opinion",
        paragraphs: [
          "“That sounds cool” is not validation. A sign-up, a small payment or an agreement to try a pilot is. Ask people to commit to something and see who follows through.",
        ],
      },
      {
        heading: "Treat feedback as a product",
        paragraphs: [
          "Keep a simple log of what customers say and what you changed as a result. Within a few weeks you will have a clear picture of what to build next — and a story worth telling at your next pitch.",
        ],
      },
    ],
  },
];

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
