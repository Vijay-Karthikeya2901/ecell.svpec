import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Phone,
  Quote,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { events, gallery, initiatives, team, testimonials } from "@/data/site-data";
import { Reveal, SectionHeading } from "./site-shell";
import { CmsEvents, CmsFeaturedEvent, CmsTeam, CmsTestimonialsEmpty } from "./cms-sections";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="site-container grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {["Entrepreneurship", "Innovation", "Leadership"].map((x) => (
              <span
                key={x}
                className="rounded-full border border-primary/15 bg-secondary px-3 py-1 text-xs font-bold text-primary"
              >
                {x}
              </span>
            ))}
          </div>
          <p className="mt-7 font-semibold text-primary">
            Sanketika Vidya Parishad Engineering College
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[1.02] text-brand-navy sm:text-6xl lg:text-7xl">
            Creating
            <br />
            <span className="text-primary">Job Creators.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Building an entrepreneurial ecosystem that transforms ideas into innovation, businesses
            and impact.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/about">
                Explore E-Cell <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/events">Upcoming Events</Link>
            </Button>
          </div>
        </Reveal>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-square w-full max-w-[560px]"
          aria-label="Connected ideas becoming ventures"
        >
          <div className="absolute inset-[8%] rounded-full border border-primary/15 bg-secondary" />
          <div className="absolute inset-[19%] rounded-full border border-dashed border-primary/25" />
          <div className="absolute left-1/2 top-1/2 h-[2px] w-[58%] -translate-x-1/2 -rotate-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-[2px] w-[62%] -translate-x-1/2 rotate-[62deg] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute left-[14%] top-[19%] grid size-20 place-items-center rounded-lg bg-background shadow-xl ring-1 ring-primary/10"
          >
            <LightbulbMark />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-[13%] right-[15%] grid size-24 place-items-center rounded-lg bg-primary text-primary-foreground shadow-2xl"
          >
            <RocketMark />
          </motion.div>
          <div className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-navy shadow-2xl">
            <span className="text-center text-2xl font-black text-primary-foreground">
              IDEA
              <br />
              <span className="text-xs font-semibold uppercase tracking-[.18em] text-primary-foreground/70">
                to impact
              </span>
            </span>
          </div>
          {[
            [78, 17],
            [15, 66],
            [78, 63],
            [48, 5],
          ].map(([l, t], i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
              className="absolute size-3 rounded-full bg-primary shadow-[0_0_0_7px_var(--node-ring)]"
              style={{ left: `${l}%`, top: `${t}%` }}
            />
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
    </section>
  );
}
function LightbulbMark() {
  return (
    <div className="text-center text-primary">
      <span className="block text-4xl">✦</span>
      <span className="text-[10px] font-extrabold uppercase">Imagine</span>
    </div>
  );
}
function RocketMark() {
  return (
    <div className="text-center">
      <span className="block text-4xl">↗</span>
      <span className="text-[10px] font-extrabold uppercase">Build</span>
    </div>
  );
}

export function About() {
  return (
    <section className="section-pad bg-background">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="About E-Cell"
            title="Where Ideas Become Impact"
            text="E-Cell is the entrepreneurial heartbeat of SVPEC — a place for curious students to experiment, collaborate and build solutions that matter."
          />
          <p className="mt-5 leading-7 text-muted-foreground">
            We bring together learning, mentorship and real-world exposure to help students develop
            the confidence to lead, innovate and create opportunity.
          </p>
          <Button asChild variant="link" className="mt-5 px-0">
            <Link to="/about">
              Discover our purpose <ArrowRight />
            </Link>
          </Button>
        </Reveal>
        <Reveal className="grid gap-4 sm:grid-cols-2">
          {[
            {
              t: "Vision",
              d: "A campus where every student feels empowered to turn insight into impact.",
            },
            {
              t: "Mission",
              d: "Enable entrepreneurial thinking through action, access and community.",
            },
            {
              t: "Innovation",
              d: "Create space for ambitious ideas, fast learning and meaningful experiments.",
            },
            {
              t: "Student Growth",
              d: "Build leadership, resilience, communication and practical business skills.",
            },
          ].map((x, i) => (
            <div
              key={x.t}
              className={`border p-6 ${i === 1 || i === 2 ? "bg-secondary" : "bg-background"}`}
            >
              <span className="text-xs font-black text-primary">0{i + 1}</span>
              <h3 className="mt-8 text-xl font-bold text-brand-navy">{x.t}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="border-y bg-secondary">
      <div className="site-container grid grid-cols-2 divide-x divide-y border-x md:grid-cols-4 md:divide-y-0">
        {[
          ["500+", "Students Engaged"],
          ["25+", "Events"],
          ["15+", "Workshops"],
          ["10+", "Startup Initiatives"],
        ].map(([n, l]) => (
          <div key={l} className="p-8 text-center md:p-12">
            <strong className="text-4xl font-black text-primary lg:text-5xl">{n}</strong>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Initiatives() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <SectionHeading
          eyebrow="Initiatives"
          title="What We Do"
          text="Practical pathways for students at every stage of the entrepreneurial journey."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((x, i) => (
            <Reveal key={x.title}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group h-full border bg-card p-7 transition-shadow hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-md bg-secondary text-primary">
                    <x.icon />
                  </span>
                  <ArrowRight className="size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-10 text-xl font-bold text-brand-navy">{x.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{x.description}</p>
                <span className="mt-8 block text-xs font-black text-primary">0{i + 1}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Events() {
  return <CmsEvents />;
}

export function FeaturedEvent() {
  return <CmsFeaturedEvent />;
}

export function Team() {
  return <CmsTeam />;
}
export function Community() {
  return (
    <section className="section-pad">
      <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="One connected community"
          title="Different Perspectives. Shared Momentum."
          text="Students meet the people, knowledge and opportunities that help ideas grow beyond the classroom."
        />
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            "Students",
            "Entrepreneurs",
            "Founders",
            "Mentors",
            "Alumni",
            "Industry Professionals",
          ].map((x, i) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={x}
              className={`flex min-h-28 flex-col justify-between border p-5 ${i === 4 ? "bg-primary text-primary-foreground" : "bg-secondary text-brand-navy"}`}
            >
              <Network className="size-5" />
              <strong className="text-sm">{x}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section-pad bg-secondary">
      <div className="site-container">
        <SectionHeading
          eyebrow="Inside E-Cell"
          title="Ideas In Motion"
          text="Moments of learning, collaboration and courage from across our community."
        />
        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <figure key={i} className={`group relative overflow-hidden ${g.className}`}>
              <img
                src={g.image}
                alt={g.title}
                loading="lazy"
                width={1408}
                height={912}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 to-transparent p-5 pt-12 text-primary-foreground">
                <span className="text-xs font-semibold opacity-75">{g.category}</span>
                <strong className="block text-lg">{g.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return <CmsTestimonialsEmpty />;
}
export function Partners() {
  return (
    <section className="border-y bg-secondary py-14">
      <div className="site-container">
        <p className="text-center text-sm font-bold uppercase tracking-[.16em] text-muted-foreground">
          Our Ecosystem
        </p>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {["INCUBATE", "VENTURELAB", "FOUNDER+", "NEXTGEN", "BUILD.CO", "CATALYST"].map((x) => (
            <div
              key={x}
              className="grid h-24 place-items-center bg-background text-sm font-black text-brand-navy/55"
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <div className="bg-brand-gradient px-7 py-16 text-center text-primary-foreground md:py-20">
          <h2 className="text-4xl font-black sm:text-5xl">Have an Idea? Build It.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/75">
            Join a community of innovators, entrepreneurs and future job creators.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">
                Join E-Cell <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="section-pad bg-secondary">
      <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s Build Something Meaningful"
            text="Have an idea, partnership opportunity or question? Start the conversation."
          />
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-primary" />
              E-Cell, Sanketika Vidya Parishad Engineering College
              <br />
              Visakhapatnam, Andhra Pradesh
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-5 text-primary" />
              ecell@svpec.edu.in
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-5 text-primary" />
              +91 00000 00000
            </p>
          </div>
        </div>
        <form
          className="border bg-background p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              Name
              <Input required placeholder="Your name" />
            </label>
            <label className="form-label">
              Email
              <Input required type="email" placeholder="you@example.com" />
            </label>
            <label className="form-label sm:col-span-2">
              Phone
              <Input
                required
                inputMode="tel"
                pattern="[0-9 +()-]{8,}"
                placeholder="Your phone number"
              />
            </label>
            <label className="form-label sm:col-span-2">
              Message
              <Textarea
                required
                minLength={10}
                rows={5}
                placeholder="Tell us what you have in mind"
              />
            </label>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
            Send Message <ArrowRight />
          </Button>
          {sent && (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="size-4" />
              Thanks — your message is ready to be connected to the future backend.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Initiatives />
      <CmsEvents />
      <CmsFeaturedEvent />
      <Community />
      <CmsTeam />
      <Gallery />
      <CmsTestimonialsEmpty />
      <Partners />
      <CTA />
      <Contact />
    </>
  );
}
