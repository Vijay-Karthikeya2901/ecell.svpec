import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { TeamEditor } from "@/components/admin/team-editor";
export const Route = createFileRoute("/admin/team/new")({
  component: () => (
    <AdminLayout>
      <div className="mb-8">
        <p className="eyebrow">Team</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">Add team member</h1>
        <p className="mt-2 text-muted-foreground">
          Add a member, assign a role, and paste a profile photo URL.
        </p>
      </div>
      <TeamEditor />
    </AdminLayout>
  ),
});
