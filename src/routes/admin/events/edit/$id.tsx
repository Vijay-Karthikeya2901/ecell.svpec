import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { EventEditor } from "@/components/admin/event-editor";
export const Route = createFileRoute("/admin/events/edit/$id")({ component: EditEvent });
function EditEvent() {
  const { id } = Route.useParams();
  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="eyebrow">Events</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">Edit event</h1>
        <p className="mt-2 text-muted-foreground">
          Update schedule, venue, registration, or the poster URL.
        </p>
      </div>
      <EventEditor id={id} />
    </AdminLayout>
  );
}
