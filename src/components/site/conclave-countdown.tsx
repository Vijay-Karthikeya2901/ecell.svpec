import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Trophy, Users, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getCountdownSettings, type CountdownSettings } from "@/lib/firebase-firestore";

const defaultSettings: CountdownSettings = {
  enabled: true,
  badgeText: "Flagship Annual Conclave",
  eventName: "E-SUMMIT",
  eventEdition: "2026",
  subtitle:
    "The grand confluence of campus visionaries, seed investors, and startup pioneers at Sanketika Vidya Parishad Engineering College. Two days of intense keynotes, pitch battles, and networking.",
  targetDate: "2026-10-24T09:30:00",
  dateDisplay: "24 - 25 October 2026",
  venue: "Main Auditorium, SVPEC",
  prizePool: "₹1,50,000+ Prizes",
  attendees: "500+ Attendees",
  registrationUrl: "/contact",
};

export function ConclaveCountdown() {
  const [settings, setSettings] = useState<CountdownSettings>(defaultSettings);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    getCountdownSettings()
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const targetTimestamp = new Date(settings.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTimestamp - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [settings.targetDate]);

  if (!settings.enabled) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#121044] via-[#201D70] to-[#0A0826] p-8 text-white shadow-2xl md:p-12 lg:p-14">
      {/* Ambient background glow */}
      <div className="absolute -right-20 -top-20 size-80 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-[#00D2FF]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#38bdf8] backdrop-blur-md">
            <span className="size-2 rounded-full bg-[#00D2FF] animate-pulse" />
            <span>{settings.badgeText}</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl text-white">
            {settings.eventName}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-blue-300">
              {settings.eventEdition}
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-blue-100/90 sm:text-lg sm:leading-8">
            {settings.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-blue-200">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
              <CalendarDays className="size-4 text-[#38bdf8]" />
              <span>{settings.dateDisplay}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">
              <MapPin className="size-4 text-[#38bdf8]" />
              <span>{settings.venue}</span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {settings.registrationUrl.startsWith("http") ? (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-[#00D2FF] text-white font-bold hover:shadow-[0_0_25px_rgba(8,102,223,0.7)] transition-all"
              >
                <a href={settings.registrationUrl} target="_blank" rel="noreferrer">
                  Register For Pass <ArrowRight className="ml-1.5 size-4" />
                </a>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-[#00D2FF] text-white font-bold hover:shadow-[0_0_25px_rgba(8,102,223,0.7)] transition-all"
              >
                <Link to={settings.registrationUrl}>
                  Register For Pass <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            )}

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/events">Schedule Details</Link>
            </Button>
          </div>
        </div>

        {/* Live Countdown Grid */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8]">
            Conclave Starts In
          </p>

          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 w-full text-center">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.minutes },
              { label: "SECS", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-black/30 p-3 sm:p-4 shadow-inner"
              >
                <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-white tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[9px] sm:text-[10px] font-bold tracking-wider text-blue-300">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4 w-full text-xs text-blue-200">
            <div className="flex items-center gap-1.5">
              <Trophy className="size-4 text-[#38bdf8]" />
              <span>{settings.prizePool}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-4 text-[#38bdf8]" />
              <span>{settings.attendees}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
