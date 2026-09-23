import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createEvent, getEventById, updateEvent, type EventInput } from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";

type Props = { id?: string };
const empty: EventInput = {
  name: "",
  description: "",
  date: "",
  time: "",
  dateTba: false,
  timeTba: false,
  venue: "",
  imageUrl: "",
  registrationUrl: "",
};
export function EventEditor({ id }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<EventInput>(empty);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then((event) => {
        if (!event) {
          setError("This event no longer exists.");
          return;
        }
        setForm({
          name: event.name,
          description: event.description,
          date: event.date,
          time: event.time,
          dateTba: event.dateTba,
          timeTba: event.timeTba,
          venue: event.venue,
          imageUrl: event.imageUrl,
          registrationUrl: event.registrationUrl,
        });
      })
      .catch((e) => setError(firebaseErrorMessage(e)))
      .finally(() => setLoading(false));
  }, [id]);
  const set = (key: keyof EventInput, value: string | boolean) =>
    setForm((old) => ({ ...old, [key]: value }));
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      (!form.dateTba && !form.date) ||
      (!form.timeTba && !form.time) ||
      !form.venue.trim()
    ) {
      setError(
        "Event name, description, venue, and either a date/time or TBA selection are required.",
      );
      setSaving(false);
      return;
    }
    try {
      if (id) await updateEvent(id, form);
      else await createEvent(form);
      await navigate({ to: "/admin/events" });
    } catch (e) {
      setError(firebaseErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }
  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading event…</p>;
  return (
    <form onSubmit={(e) => void submit(e)} className="grid gap-7 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-background p-5 md:p-7">
        <div className="grid gap-5">
          <label className="form-label">
            Event name
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="Startup workshop"
            />
          </label>
          <label className="form-label">
            Description
            <textarea
              required
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={5}
              className="mt-2 rounded-md border p-3 font-normal"
              placeholder="What attendees will learn or experience"
            />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="form-label">
              Date <span className="font-normal text-muted-foreground">(optional)</span>
              <input
                disabled={form.dateTba}
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="mt-2 h-11 rounded-md border px-3 font-normal"
              />
              <span className="mt-2 flex items-center gap-2 text-xs font-normal text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.dateTba}
                  onChange={(e) => {
                    set("dateTba", e.target.checked);
                    if (e.target.checked) set("date", "");
                  }}
                />
                Yet to be announced
              </span>
            </label>
            <label className="form-label">
              Time <span className="font-normal text-muted-foreground">(optional)</span>
              <input
                disabled={form.timeTba}
                type="time"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
                className="mt-2 h-11 rounded-md border px-3 font-normal"
              />
              <span className="mt-2 flex items-center gap-2 text-xs font-normal text-muted-foreground">
                <input
                  type="checkbox"
                  checked={form.timeTba}
                  onChange={(e) => {
                    set("timeTba", e.target.checked);
                    if (e.target.checked) set("time", "");
                  }}
                />
                Yet to be announced
              </span>
            </label>
          </div>
          <label className="form-label">
            Venue
            <input
              required
              value={form.venue}
              onChange={(e) => set("venue", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="Innovation Lab"
            />
          </label>
          <label className="form-label">
            Registration URL
            <input
              type="url"
              value={form.registrationUrl}
              onChange={(e) => set("registrationUrl", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="https://forms.google.com/..."
            />
          </label>
        </div>
      </div>
      <aside className="grid content-start gap-5">
        <div className="rounded-xl border bg-background p-5">
          <h2 className="font-bold text-brand-navy">Poster / image URL</h2>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            className="mt-4 h-11 w-full rounded-md border px-3 font-normal"
            placeholder="https://images.example.com/event.jpg"
          />
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Paste a publicly accessible poster or event photo URL.
          </p>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Event preview"
              className="mt-4 aspect-video w-full rounded-md object-contain bg-secondary"
            />
          )}
        </div>
        <button
          disabled={saving}
          className="h-11 rounded-md bg-primary font-bold text-primary-foreground"
        >
          {saving ? "Saving…" : id ? "Save changes" : "Add event"}
        </button>
      </aside>
      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700 lg:col-span-2">{error}</p>
      )}
    </form>
  );
}
