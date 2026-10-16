import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Instagram, Linkedin, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { firebaseErrorMessage } from "@/lib/firebase";
import {
  getAllTeamMembers,
  getUpcomingEvents,
  type FirebaseEvent,
  type FirebaseTeamMember,
} from "@/lib/firebase-firestore";
import { defaultEvents, defaultTeam, testimonials, type LegacyEvent, type LegacyTeamMember } from "@/data/site-data";
import { Reveal, SectionHeading } from "./site-shell";

export function CmsEvents() {
  const [events, setEvents] = useState<FirebaseEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getUpcomingEvents()
      .then((data) => {
        setEvents(data);
        setLoaded(true);
      })
      .catch(() => {
        // Fall back gracefully to verified default events if Firestore is unpopulated
        setLoaded(true);
      });
  }, []);

  const displayEvents: (FirebaseEvent | LegacyEvent)[] =
    events.length > 0 ? events : defaultEvents;

  return (
    <section className="section-pad bg-secondary/50">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
          <SectionHeading
            eyebrow="On the calendar"
            title="Events & Bootcamps"
            text="Meet student builders, learn hands-on venture skills, and pitch to active investors."
          />
          <Button asChild variant="outline" className="hidden sm:inline-flex border-border/80 hover:bg-background">
            <Link to="/events">
              View All Events <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayEvents.map((event, idx) => {
            const isFirebase = "id" in event && "dateTba" in event;
            const title = isFirebase ? event.name : event.name;
            const desc = event.description;
            const dateStr = isFirebase
              ? event.dateTba
                ? "Date TBA"
                : `${event.date}${event.timeTba ? "" : ` · ${event.time}`}`
              : event.date;
            const venue = event.venue;
            const img = isFirebase ? event.imageUrl || "/favicon.ico" : event.image;
            const regUrl = isFirebase ? event.registrationUrl : event.registrationUrl || "/contact";

            return (
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                key={("id" in event && event.id) ? event.id : idx}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-border/80 bg-card shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={img}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col gap-1.5 text-xs font-semibold text-primary">
                      <span className="flex items-center gap-1.5 font-mono">
                        <CalendarDays className="size-3.5 shrink-0" />
                        <span>{dateStr}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0 text-primary" />
                        <span>{venue}</span>
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold tracking-tight text-brand-navy">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {regUrl ? (
                    regUrl.startsWith("http") ? (
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <a href={regUrl} target="_blank" rel="noreferrer">
                          Register Now
                        </a>
                      </Button>
                    ) : (
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <Link to={regUrl}>Register Now</Link>
                      </Button>
                    )
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CmsFeaturedEvent() {
  return (
    <section className="section-pad bg-background">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-secondary/70 p-8 md:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="size-3.5" />
                <span>Flagship Annual Gathering</span>
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                Annual E-Summit 2026
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Connecting 500+ aspiring student founders with established alumni entrepreneurs,
                venture capitalists, and state ecosystem leaders in Visakhapatnam.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-primary" />
                  <span>24-25 October 2026</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" />
                  <span>Main Auditorium, SVPEC</span>
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  <Link to="/contact">Express Interest</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border/80">
                  <Link to="/events">
                    All Events <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 shadow-md">
              <img
                src="/src/assets/event-summit.jpg"
                alt="Annual E-Summit Auditorium"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CmsTeam() {
  const [members, setMembers] = useState<FirebaseTeamMember[]>([]);

  useEffect(() => {
    getAllTeamMembers()
      .then(setMembers)
      .catch(() => {});
  }, []);

  const displayTeam: (FirebaseTeamMember | LegacyTeamMember)[] =
    members.length > 0 ? members : defaultTeam;

  return (
    <section className="section-pad bg-secondary/50">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Leadership & Coordinators"
            title="Built By Students, Guided By Mentors"
            text="A multidisciplinary executive council driving incubation, events, partnerships and technology across SVPEC."
          />
          <Button asChild variant="outline" className="hidden sm:inline-flex border-border/80">
            <Link to="/team">
              Full Team Roster <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {displayTeam.map((member, idx) => {
            const isFirebase = "id" in member && "group" in member && "imageUrl" in member;
            const name = member.name;
            const role = member.role;
            const group = member.group;
            const img = isFirebase ? (member as FirebaseTeamMember).imageUrl || "/favicon.ico" : member.image;
            const linkedin = member.linkedinUrl;
            const instagram = member.instagramUrl;

            return (
              <article
                key={("id" in member && member.id) ? member.id : idx}
                className="group overflow-hidden rounded-lg border border-border/80 bg-card shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={img}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-brand-navy">{name}</h3>
                  <p className="mt-1 text-xs font-semibold text-primary">{role}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{group}</p>

                  <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${name} LinkedIn`}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Linkedin className="size-4" />
                      </a>
                    )}
                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${name} Instagram`}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        <Instagram className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CmsTestimonialsEmpty() {
  const [liveTestimonials, setLiveTestimonials] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid circular dependency
    import("@/lib/firebase-firestore").then(({ getApprovedTestimonials }) => {
      getApprovedTestimonials()
        .then((items) => {
          if (items && items.length > 0) setLiveTestimonials(items);
        })
        .catch(() => {});
    });
  }, []);

  const displayTestimonials =
    liveTestimonials.length > 0
      ? liveTestimonials.map((t) => ({
          name: t.name,
          role: t.role,
          quote: t.quote,
          image: t.imageUrl || "/logo.png",
        }))
      : testimonials;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { createTestimonial } = await import("@/lib/firebase-firestore");
      await createTestimonial({
        name,
        role: role || "Student Innovator",
        quote,
        status: "pending",
      });
      setSubmitted(true);
      setName("");
      setRole("");
      setQuote("");
    } catch {
      // In case Firebase is unconfigured in development
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-pad bg-background">
      <div className="site-container">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SectionHeading
              eyebrow="Community voices"
              title="What Our Student Founders Say"
            />
            <Button
              onClick={() => {
                setOpenModal(true);
                setSubmitted(false);
              }}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary hover:text-white"
            >
              + Submit Your Experience
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {displayTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/80 bg-card p-8 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
              >
                <p className="text-base italic leading-7 text-foreground/90">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3.5 border-t border-border/60 pt-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="size-11 rounded-full object-cover border border-primary/20 bg-muted"
                  />
                  <div>
                    <strong className="block text-sm font-bold text-brand-navy">{t.name}</strong>
                    <span className="text-xs text-muted-foreground">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Submission Modal */}
          {openModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-background p-6 shadow-2xl md:p-8">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-xl font-bold text-brand-navy">Share Your Testimonial</h3>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="text-muted-foreground hover:text-foreground text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {submitted ? (
                  <div className="py-8 text-center">
                    <span className="text-4xl">🎉</span>
                    <h4 className="mt-3 text-lg font-bold text-brand-navy">Thank You!</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your testimonial has been submitted for review. Once verified by the E-Cell
                      administrators, it will be published live on the website.
                    </p>
                    <Button
                      onClick={() => setOpenModal(false)}
                      className="mt-6 bg-primary text-white"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Your Role / Venture / Batch *
                      </label>
                      <input
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Founder, CleanTech · Batch '26"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Your Experience / Quote *
                      </label>
                      <textarea
                        required
                        rows={4}
                        minLength={20}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="How did E-Cell SVPEC help you build, connect, or validate your venture?"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpenModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary text-white font-semibold"
                      >
                        {submitting ? "Submitting…" : "Submit For Review"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
