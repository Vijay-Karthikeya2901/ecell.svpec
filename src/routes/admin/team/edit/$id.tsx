import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { TeamEditor } from "@/components/admin/team-editor";
export const Route = createFileRoute("/admin/team/edit/$id")({ component: EditTeamMember });
function EditTeamMember() {
  const { id } = Route.useParams();
  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="eyebrow">Team</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">Edit team member</h1>
        <p className="mt-2 text-muted-foreground">
          Update the role, group, links, or profile photo URL.
        </p>
      </div>
      <TeamEditor id={id} />
    </AdminLayout>
  );
}
