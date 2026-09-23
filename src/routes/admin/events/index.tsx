import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { deleteEvent, getUpcomingEvents, type FirebaseEvent } from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";
export const Route = createFileRoute("/admin/events/")({ component: AdminEvents });
function AdminEvents() {
  const [events, setEvents] = useState<FirebaseEvent[]>([]);
  const [message, setMessage] = useState("");
  const refresh = () =>
    getUpcomingEvents()
      .then(setEvents)
      .catch((e) => setMessage(firebaseErrorMessage(e)));
  useEffect(() => {
    void refresh();
  }, []);
  async function remove(id: string) {
    if (!window.confirm("Remove this event?")) return;
    try {
      await deleteEvent(id);
      setMessage("Event removed.");
      await refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    }
  }
  return (
    <AdminLayout>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Programming</p>
          <h1 className="mt-2 text-3xl font-black text-brand-navy">Upcoming events</h1>
          <p className="mt-2 text-muted-foreground">
            Publish the next workshop, competition, or campus event.
          </p>
        </div>
        <Link
          to="/admin/events/new"
          className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          + Add event
        </Link>
      </div>
      {message && (
        <p className="mt-6 rounded-lg bg-secondary p-4 text-sm text-brand-navy">{message}</p>
      )}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article key={event.id} className="overflow-hidden rounded-xl border bg-background">
            <div className="aspect-video bg-secondary">
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-brand-navy">{event.name}</h2>
              <div className="mt-3 grid gap-1 text-xs font-semibold text-primary">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-3.5" />
                  {event.dateTba ? "Date TBA" : event.date} at{" "}
                  {event.timeTba ? "Time TBA" : event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-3.5" />
                  {event.venue}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {event.description}
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                <Link
                  to="/admin/events/edit/$id"
                  params={{ id: event.id }}
                  className="font-bold text-primary"
                >
                  Edit
                </Link>
                <button onClick={() => void remove(event.id)} className="font-bold text-red-600">
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
        {events.length === 0 && (
          <div className="rounded-xl border bg-background p-8 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
            No upcoming events yet. Add the first event from this dashboard.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
