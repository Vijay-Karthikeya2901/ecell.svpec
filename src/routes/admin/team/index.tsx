import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  deleteTeamMember,
  getAllTeamMembers,
  type FirebaseTeamMember,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";
export const Route = createFileRoute("/admin/team/")({ component: AdminTeam });
function AdminTeam() {
  const [members, setMembers] = useState<FirebaseTeamMember[]>([]);
  const [message, setMessage] = useState("");
  const refresh = () =>
    getAllTeamMembers()
      .then(setMembers)
      .catch((e) => setMessage(firebaseErrorMessage(e)));
  useEffect(() => {
    void refresh();
  }, []);
  async function remove(id: string) {
    if (!window.confirm("Remove this team member?")) return;
    try {
      await deleteTeamMember(id);
      setMessage("Team member removed.");
      await refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    }
  }
  return (
    <AdminLayout>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">People</p>
          <h1 className="mt-2 text-3xl font-black text-brand-navy">Team members</h1>
          <p className="mt-2 text-muted-foreground">Add members and assign their E-Cell roles.</p>
        </div>
        <Link
          to="/admin/team/new"
          className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          + Add member
        </Link>
      </div>
      {message && (
        <p className="mt-6 rounded-lg bg-secondary p-4 text-sm text-brand-navy">{message}</p>
      )}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <article key={member.id} className="overflow-hidden rounded-xl border bg-background">
            <div className="aspect-[4/5] bg-secondary">
              <img
                src={member.imageUrl || "/favicon.ico"}
                alt={member.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-brand-navy">{member.name}</h2>
              <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.group}</p>
              <div className="mt-4 flex gap-3 text-sm">
                <Link
                  to="/admin/team/edit/$id"
                  params={{ id: member.id }}
                  className="font-bold text-primary"
                >
                  Edit
                </Link>
                <button onClick={() => void remove(member.id)} className="font-bold text-red-600">
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
        {members.length === 0 && (
          <div className="rounded-xl border bg-background p-8 text-center text-sm text-muted-foreground sm:col-span-2 lg:col-span-4">
            No team members yet. Add the first member from this dashboard.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
