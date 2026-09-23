import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { EventEditor } from "@/components/admin/event-editor";
export const Route = createFileRoute("/admin/events/new")({
  component: () => (
    <AdminLayout>
      <div className="mb-8">
        <p className="eyebrow">Events</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">Add upcoming event</h1>
        <p className="mt-2 text-muted-foreground">
          Add schedule details and a publicly hosted poster URL.
        </p>
      </div>
      <EventEditor />
    </AdminLayout>
  ),
});
