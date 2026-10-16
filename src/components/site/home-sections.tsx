import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Zap,
  TrendingUp,
  Briefcase,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { gallery, initiatives } from "@/data/site-data";
import { Reveal, SectionHeading } from "./site-shell";
import { CmsEvents, CmsFeaturedEvent, CmsTeam, CmsTestimonialsEmpty } from "./cms-sections";
import { HeroCanvas } from "./hero-canvas";
import { MarqueeTicker } from "./marquee-ticker";
import { ConclaveCountdown } from "./conclave-countdown";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0826] via-[#110E3D] to-[#201D70] py-20 text-white lg:py-28">
      {/* Interactive Node/Constellation Canvas */}
      <HeroCanvas />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 size-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 size-96 rounded-full bg-[#00D2FF]/20 blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          {/* Live Notification Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] backdrop-blur-md shadow-sm">
            <span className="size-2 rounded-full bg-[#00D2FF] animate-ping" />
            <span>Admissions & E-Summit 2026 Live · Registrations Open</span>
          </div>

          <p className="mt-6 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#38bdf8]">
            Sanketika Vidya Parishad Engineering College · Visakhapatnam
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
            Building The Next Generation Of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#38bdf8] to-blue-200">
              Job Creators.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-blue-100/85">
            The epicenter of campus entrepreneurship in Andhra Pradesh. We empower ambitious student
            engineers to validate ideas, build functional prototypes, and launch scalable venture-backed
            startups.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-[#00D2FF] hover:from-[#0974ff] hover:to-[#38bdf8] text-white font-bold px-7 shadow-[0_0_25px_rgba(8,102,223,0.5)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] transition-all"
            >
              <Link to="/contact">
                Join The Cell <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-md font-semibold px-6"
            >
              <Link to="/events">Explore Events & Conclaves</Link>
            </Button>
          </div>

          {/* Micro metric pill strip */}
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/15 pt-6 text-xs text-blue-200 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-white">500+</span>
              <span>Active Builders</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-white">25+</span>
              <span>Bootcamps & Hackathons</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-white">₹15L+</span>
              <span>Seed & Grant Pool</span>
            </div>
          </div>
        </Reveal>

        {/* 3D Interactive Floating Mockup / Visual Matrix */}
        <div className="relative mx-auto w-full max-w-[500px] flex items-center justify-center">
          {/* Main Glass Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-square rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="size-3 rounded-full bg-[#00D2FF] animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
                  E-CELL INCUBATION RADAR
                </span>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white">
                LIVE
              </span>
            </div>

            {/* Central Animated Ecosystem Glyph */}
            <div className="my-auto flex flex-col items-center justify-center text-center py-6">
              <div className="relative size-32 rounded-full border border-[#00D2FF]/40 bg-gradient-to-br from-[#0866DF]/30 to-[#201D70]/60 flex items-center justify-center shadow-[0_0_35px_rgba(0,210,255,0.3)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-1 rounded-full border border-dashed border-[#38bdf8]/50"
                />
                <Zap className="size-12 text-[#00D2FF]" />
              </div>
              <h3 className="mt-4 text-xl font-black text-white">SVPEC Venture Hub</h3>
              <p className="mt-1 text-xs text-blue-200">Ideation · Prototyping · Scaling</p>
            </div>

            {/* Floating Live Badge 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 rounded-xl border border-white/20 bg-[#0B0A26]/90 p-3.5 backdrop-blur-xl shadow-xl flex items-center gap-3"
            >
              <div className="grid size-9 place-items-center rounded-lg bg-[#0866DF] text-white">
                <Trophy className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-[#38bdf8]">
                  Eureka! Pitch Fest
                </span>
                <span className="block text-xs font-extrabold text-white">
                  ₹1,50,000 Seed Pool
                </span>
              </div>
            </motion.div>

            {/* Floating Live Badge 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 rounded-xl border border-white/20 bg-[#0B0A26]/90 p-3.5 backdrop-blur-xl shadow-xl flex items-center gap-3"
            >
              <div className="grid size-9 place-items-center rounded-lg bg-[#00D2FF] text-[#0A0826]">
                <TrendingUp className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-300">
                  Active Ventures
                </span>
                <span className="block text-xs font-extrabold text-white">
                  12+ Incubation Teams
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { num: "500+", label: "Students Engaged", desc: "Active campus community members", icon: Users2 },
    { num: "25+", label: "Flagship Events", desc: "Summits, pitch arenas & expos", icon: CalendarDays },
    { num: "15+", label: "Intensive Bootcamps", desc: "Hands-on venture masterclasses", icon: Zap },
    { num: "10+", label: "Startup Initiatives", desc: "Structured pathways to market", icon: Briefcase },
  ];

  return (
    <section className="border-b border-border/80 bg-background py-16">
      <div className="site-container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-xl border border-border/80 bg-card p-7 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors pointer-events-none" />
              <div className="flex items-center justify-between">
                <s.icon className="size-5 text-primary" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  SVPEC METRIC
                </span>
              </div>
              <strong className="mt-4 block font-mono text-4xl sm:text-5xl font-black tracking-tight text-brand-navy tabular-nums">
                {s.num}
              </strong>
              <h4 className="mt-2 text-sm font-bold text-foreground">{s.label}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section-pad bg-secondary/30">
      <div className="site-container grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="The Mission"
            title="Where Ideas Turn Into Industry."
            text="E-Cell is the entrepreneurial driving force of Sanketika Vidya Parishad Engineering College. We bridge the gap between classroom theory and commercial venture execution."
          />
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            From conducting intensive idea-validation sprints to connecting founders with alumni
            investors, our student-led council delivers the real-world mentorship and confidence needed
            to build enduring companies.
          </p>
          <div className="mt-8">
            <Button asChild size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link to="/about">
                Learn About Our Heritage <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal className="grid gap-4 sm:grid-cols-2">
          {[
            {
              t: "Vision",
              d: "To establish SVPEC as the premier campus innovation powerhouse in Andhra Pradesh.",
            },
            {
              t: "Mission",
              d: "Empowering every curious engineer to build, launch, and lead real-world ventures.",
            },
            {
              t: "Innovation",
              d: "Fast feedback cycles, prototype labs, and cross-disciplinary founder teams.",
            },
            {
              t: "Leadership",
              d: "Hands-on experience organizing state-level conclaves, managing budgets and pitching.",
            },
          ].map((x, i) => (
            <div
              key={x.t}
              className="rounded-xl border border-border/80 bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
            >
              <span className="font-mono text-xs font-black text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold text-brand-navy">{x.t}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Initiatives() {
  return (
    <section className="section-pad bg-background">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Core Initiatives"
            title="Designed For Every Stage Of Building"
            text="Whether you are finding an initial co-founder or preparing for your first angel pitch, our flagship programs provide structured acceleration."
          />
          <Button asChild variant="outline" className="hidden sm:inline-flex border-border/80">
            <Link to="/initiatives">
              All 6 Programs <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((x, i) => (
            <Reveal key={x.title}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative h-full flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card p-7 shadow-xs transition-all hover:border-primary/50 hover:shadow-xl"
              >
                {/* Glowing top line indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-300" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <x.icon className="size-6" />
                    </span>
                    <span className="font-mono text-xs font-bold text-muted-foreground/60">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-brand-navy">
                    {x.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {x.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-bold text-primary">
                  <span>Explore Program</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
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
  return (
    <section className="section-pad bg-background">
      <div className="site-container">
        <ConclaveCountdown />
      </div>
    </section>
  );
}

export function Team() {
  return <CmsTeam />;
}

export function Community() {
  return (
    <section className="section-pad bg-secondary/30">
      <div className="site-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <SectionHeading
          eyebrow="One connected campus"
          title="Different Disciplines. Shared Velocity."
          text="At SVPEC, engineers, designers, business thinkers, and faculty mentors come together in an energetic sandbox to launch scalable solutions."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
            <span className="text-2xl">⚡</span>
            <h4 className="mt-3 font-bold text-brand-navy">Founder Incubator</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-5">
              Structured sprints for prototyping, MVP building, and customer validation.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
            <span className="text-2xl">🤝</span>
            <h4 className="mt-3 font-bold text-brand-navy">Angel & Mentor Conclave</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-5">
              Direct access to industry CXOs and alumni who have built multimillion-rupee companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section-pad bg-background">
      <div className="site-container">
        <div className="grid auto-rows-[240px] gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-xl border border-border/80 shadow-xs ${g.className}`}
            >
              <img
                src={g.image}
                alt={g.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-12 text-white">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00D2FF]">
                  {g.category}
                </span>
                <strong className="block text-base font-bold text-white mt-0.5">{g.title}</strong>
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
    <section className="border-y border-border/80 bg-secondary/40 py-14">
      <div className="site-container">
        <p className="text-center text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
          Ecosystem Connections & Innovation Alliances
        </p>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border/80 bg-border sm:grid-cols-3 lg:grid-cols-6">
          {[
            "SVPEC INCUBATION",
            "INNOVATION HUB",
            "STUDENT VENTURES",
            "FOUNDER NETWORK",
            "ANGEL JURY",
            "CAMPUS LABS",
          ].map((x) => (
            <div
              key={x}
              className="grid h-20 place-items-center bg-card p-4 text-center text-xs font-black tracking-wider text-brand-navy/70 transition-colors hover:text-primary"
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
    <section className="section-pad bg-background">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#201D70] via-[#15124D] to-[#0A0826] px-8 py-16 text-center text-white shadow-xl md:py-20">
          <div className="absolute inset-0 bg-radial from-[#00D2FF]/15 via-transparent to-transparent pointer-events-none" />
          <h2 className="relative text-3xl font-black tracking-tight sm:text-4xl md:text-5xl text-white">
            Have a Problem You Want To Solve?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-blue-100 sm:text-lg">
            Join a vibrant network of student founders, innovators, and mentors at
            Sanketika Vidya Parishad Engineering College.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-[#00D2FF] hover:from-[#0974ff] hover:to-[#38bdf8] text-white font-bold px-7 shadow-lg"
            >
              <Link to="/contact">
                Join E-Cell SVPEC <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 font-semibold"
            >
              <Link to="/initiatives">View Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("Student Founder");

  return (
    <section className="section-pad bg-secondary/50">
      <div className="site-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let’s Build Something Meaningful"
            text="Have a startup idea, partnership proposal, or question about our campus cohort? We would love to connect."
          />
          <div className="mt-8 space-y-5 text-sm text-muted-foreground">
            <div className="flex gap-3.5 items-start">
              <MapPin className="size-5 shrink-0 text-primary mt-0.5" />
              <div>
                <strong className="block text-brand-navy font-bold">Campus Headquarters</strong>
                <span>E-Cell, Sanketika Vidya Parishad Engineering College</span>
                <br />
                <span>PM Palem, Visakhapatnam, Andhra Pradesh 530041</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <Mail className="size-5 shrink-0 text-primary" />
              <div>
                <strong className="block text-brand-navy font-bold">Email Inquiries</strong>
                <a href="mailto:ecell@svpec.edu.in" className="hover:text-primary transition-colors">
                  ecell@svpec.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          className="rounded-xl border border-border/80 bg-card p-6 md:p-8 shadow-xs"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                I am reaching out as
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Student Founder", "Corporate Partner", "Mentor / Alumni"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-md border px-3 py-2 text-xs font-semibold transition-colors text-center ${
                      category === cat
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border/80 bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Full Name
              <Input required placeholder="e.g. Rahul Sharma" className="mt-1.5" />
            </label>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Email Address
              <Input required type="email" placeholder="you@example.com" className="mt-1.5" />
            </label>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block sm:col-span-2">
              Phone / WhatsApp
              <Input
                required
                inputMode="tel"
                placeholder="+91 98765 43210"
                className="mt-1.5"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block sm:col-span-2">
              Message or Venture Description
              <Textarea
                required
                minLength={10}
                rows={4}
                placeholder="Tell us about your venture idea, initiative interest, or how you would like to collaborate..."
                className="mt-1.5"
              />
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full sm:w-auto bg-gradient-to-r from-primary to-[#00D2FF] text-white font-bold shadow-md"
          >
            Submit Inquiry <ArrowRight className="ml-1.5 size-4" />
          </Button>

          {sent && (
            <div className="mt-4 flex items-center gap-2 rounded-md border border-green-200 bg-green-50/80 p-3.5 text-xs font-semibold text-green-800">
              <CheckCircle2 className="size-4 shrink-0 text-green-600" />
              <span>Thank you! Your inquiry has been received. The E-Cell SVPEC executive team will review and connect with you shortly.</span>
            </div>
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
      <MarqueeTicker />
      <Stats />
      <About />
      <Initiatives />
      <FeaturedEvent />
      <CmsEvents />
      <Community />
      <CmsTeam />
      <CmsTestimonialsEmpty />
      <Partners />
      <CTA />
      <Contact />
    </>
  );
}
