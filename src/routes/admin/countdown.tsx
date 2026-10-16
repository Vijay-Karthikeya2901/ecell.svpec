import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Timer, Save, CheckCircle2, Eye, CalendarDays, MapPin, Trophy, Users, ArrowRight } from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  getCountdownSettings,
  saveCountdownSettings,
  type CountdownSettings,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/countdown")({
  component: AdminCountdownPage,
});

const defaultSettings: CountdownSettings = {
  enabled: true,
  badgeText: "Flagship Annual Conclave",
  eventName: "E-SUMMIT",
  eventEdition: "2026",
  subtitle:
    "The grand confluence of campus visionaries, seed investors, and startup pioneers at Sanketika Vidya Parishad Engineering College.",
  targetDate: "2026-10-24T09:30:00",
  dateDisplay: "24 - 25 October 2026",
  venue: "Main Auditorium, SVPEC",
  prizePool: "₹1,50,000+ Prizes",
  attendees: "500+ Attendees",
  registrationUrl: "/contact",
};

function AdminCountdownPage() {
  const [form, setForm] = useState<CountdownSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCountdownSettings()
      .then((data) => {
        if (data) setForm(data);
      })
      .catch((e) => setMessage(firebaseErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await saveCountdownSettings(form);
      setMessage("Countdown timer settings successfully saved and updated on the homepage!");
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Homepage Control</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-navy">
            Flagship Event Countdown Timer
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure the countdown timer featured prominently on the E-Cell homepage.
          </p>
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-lg border border-primary/20 bg-secondary/80 p-4 text-xs font-semibold text-brand-navy flex items-center gap-2">
          <CheckCircle2 className="size-4 text-green-600" />
          <span>{message}</span>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border/80 bg-card p-6 md:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <strong className="block text-sm font-bold text-brand-navy">Display on Homepage</strong>
              <span className="text-xs text-muted-foreground">Toggle this timer block on or off</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Event Name *
              </label>
              <input
                required
                value={form.eventName}
                onChange={(e) => setForm({ ...form, eventName: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                placeholder="e.g. E-SUMMIT"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Edition / Year *
              </label>
              <input
                required
                value={form.eventEdition}
                onChange={(e) => setForm({ ...form, eventEdition: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                placeholder="e.g. 2026"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Top Badge Text *
            </label>
            <input
              required
              value={form.badgeText}
              onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Flagship Annual Conclave"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Event Subtitle / Narrative *
            </label>
            <textarea
              required
              rows={3}
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Target Date & Time (for Countdown) *
              </label>
              <input
                required
                type="datetime-local"
                value={form.targetDate.slice(0, 16)}
                onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Date Display Text *
              </label>
              <input
                required
                value={form.dateDisplay}
                onChange={(e) => setForm({ ...form, dateDisplay: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. 24 - 25 October 2026"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Venue Location *
            </label>
            <input
              required
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Main Auditorium, SVPEC"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Prize Pool Tag
              </label>
              <input
                value={form.prizePool}
                onChange={(e) => setForm({ ...form, prizePool: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. ₹1,50,000+ Prizes"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Attendee Count Tag
              </label>
              <input
                value={form.attendees}
                onChange={(e) => setForm({ ...form, attendees: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. 500+ Attendees"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Registration Pass URL
            </label>
            <input
              value={form.registrationUrl}
              onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
              placeholder="e.g. /contact or https://unstop.com/..."
            />
          </div>

          <div className="pt-4 border-t">
            <Button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-xs"
            >
              <Save className="mr-1.5 size-4" />
              {saving ? "Saving to Firestore…" : "Save Countdown Settings"}
            </Button>
          </div>
        </form>

        {/* Live Preview Panel */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
            <Eye className="size-4 text-primary" />
            <span>Live Website Preview</span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#121044] via-[#201D70] to-[#0A0826] p-6 text-white shadow-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
              <span>{form.badgeText || "Badge"}</span>
            </div>

            <h3 className="mt-3 text-2xl font-black text-white">
              {form.eventName}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-blue-300">
                {form.eventEdition}
              </span>
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-blue-100/90 line-clamp-3">
              {form.subtitle}
            </p>

            <div className="mt-4 flex flex-col gap-1 text-[11px] text-blue-200">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-[#38bdf8]" />
                <span>{form.dateDisplay}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[#38bdf8]" />
                <span>{form.venue}</span>
              </span>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2 text-center">
              {["DAYS", "HOURS", "MINS", "SECS"].map((label) => (
                <div key={label} className="rounded-md border border-white/10 bg-black/40 p-2">
                  <span className="font-mono text-base font-black text-white">00</span>
                  <span className="block text-[8px] text-blue-300">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-[11px] text-blue-200 border-t border-white/10 pt-3">
              <span className="flex items-center gap-1">
                <Trophy className="size-3 text-[#38bdf8]" />
                <span>{form.prizePool}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3 text-[#38bdf8]" />
                <span>{form.attendees}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
