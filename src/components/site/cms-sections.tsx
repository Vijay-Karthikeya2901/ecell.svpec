import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Instagram, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { firebaseErrorMessage } from "@/lib/firebase";
import {
  getAllTeamMembers,
  getUpcomingEvents,
  type FirebaseEvent,
  type FirebaseTeamMember,
} from "@/lib/firebase-firestore";
import { Reveal, SectionHeading } from "./site-shell";

export function CmsEvents() {
  const [events, setEvents] = useState<FirebaseEvent[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    getUpcomingEvents()
      .then(setEvents)
      .catch((e) => setError(firebaseErrorMessage(e)));
  }, []);
  return (
    <section className="section-pad bg-secondary">
      <div className="site-container">
        <div className="flex items-end justify-between gap-5">
          <SectionHeading
            eyebrow="On the calendar"
            title="Upcoming Events"
            text="Meet builders, learn by doing and take your next idea forward."
          />
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/events">
              View All Events <ArrowRight />
            </Link>
          </Button>
        </div>
        {error && (
          <p className="mt-8 rounded-lg bg-background p-4 text-sm text-muted-foreground">
            Events are temporarily unavailable.
          </p>
        )}
        {events.length > 0 ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {events.map((event) => (
              <motion.article
                whileHover={{ y: -5 }}
                key={event.id}
                className="overflow-hidden border bg-card"
              >
                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-secondary">
                  <img
                    src={event.imageUrl || "/favicon.ico"}
                    alt={event.name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 text-xs font-bold text-primary">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      {event.dateTba ? "Date yet to be announced" : event.date} ·{" "}
                      {event.timeTba ? "Time yet to be announced" : event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {event.venue}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-brand-navy">{event.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>
                  {event.registrationUrl && (
                    <Button asChild className="mt-6 w-full">
                      <a href={event.registrationUrl} target="_blank" rel="noreferrer">
                        Register Now
                      </a>
                    </Button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-12 border bg-background p-10 text-center text-sm text-muted-foreground">
            Upcoming events will be announced here soon.
          </div>
        )}
      </div>
    </section>
  );
}

export function CmsFeaturedEvent() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <div className="border border-dashed border-primary/30 bg-secondary p-8 text-center md:p-14">
          <p className="eyebrow">Featured event</p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy">
            Your next flagship event will appear here
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Add an event from the admin dashboard to feature it across the site.
          </p>
          <Button asChild variant="outline" className="mt-7">
            <Link to="/events">
              Explore events <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CmsTeam() {
  const [members, setMembers] = useState<FirebaseTeamMember[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    getAllTeamMembers()
      .then(setMembers)
      .catch((e) => setError(firebaseErrorMessage(e)));
  }, []);
  return (
    <section className="section-pad bg-secondary">
      <div className="site-container">
        <SectionHeading
          eyebrow="The people behind it"
          title="Built By Students, Guided By Mentors"
          text="A multidisciplinary team working together across leadership, events, marketing, design and technology."
        />
        {error && (
          <p className="mt-8 rounded-lg bg-background p-4 text-sm text-muted-foreground">
            Team details are temporarily unavailable.
          </p>
        )}
        {members.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {members.map((member) => (
              <article key={member.id} className="group bg-card">
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-secondary">
                  <img
                    src={member.imageUrl || "/favicon.ico"}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="border border-t-0 p-4">
                  <h3 className="font-bold text-brand-navy">{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-primary">{member.role}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{member.group}</p>
                  <div className="mt-3 flex gap-2">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="size-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                    {member.instagramUrl && (
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} Instagram`}
                      >
                        <Instagram className="size-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 border bg-background p-10 text-center text-sm text-muted-foreground">
            Team profiles will appear here once they are added in the admin dashboard.
          </div>
        )}
        <Button asChild variant="outline" className="mt-8">
          <Link to="/team">
            Meet the entire team <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function CmsTestimonialsEmpty() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <Reveal>
          <SectionHeading eyebrow="Community voices" title="What Our Members Say" center />
          <div className="mt-12 border border-dashed bg-secondary p-10 text-center text-sm text-muted-foreground">
            Authentic testimonials from E-Cell members will appear here.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
