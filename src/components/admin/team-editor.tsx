import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  createTeamMember,
  getTeamMemberById,
  updateTeamMember,
  type TeamInput,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";

type Props = { id?: string };
const empty: TeamInput = {
  name: "",
  role: "",
  group: "",
  imageUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
};
export function TeamEditor({ id }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<TeamInput>(empty);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    getTeamMemberById(id)
      .then((member) => {
        if (!member) {
          setError("This team member no longer exists.");
          return;
        }
        setForm({
          name: member.name,
          role: member.role,
          group: member.group,
          imageUrl: member.imageUrl,
          linkedinUrl: member.linkedinUrl,
          instagramUrl: member.instagramUrl,
        });
      })
      .catch((e) => setError(firebaseErrorMessage(e)))
      .finally(() => setLoading(false));
  }, [id]);
  const set = (key: keyof TeamInput, value: string) => setForm((old) => ({ ...old, [key]: value }));
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    if (!form.name.trim() || !form.role.trim() || !form.group.trim()) {
      setError("Name, role, and team/group are required.");
      setSaving(false);
      return;
    }
    try {
      if (id) await updateTeamMember(id, form);
      else await createTeamMember(form);
      await navigate({ to: "/admin/team" });
    } catch (e) {
      setError(firebaseErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }
  if (loading)
    return <p className="py-20 text-center text-muted-foreground">Loading team member…</p>;
  return (
    <form onSubmit={(e) => void submit(e)} className="grid gap-7 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-background p-5 md:p-7">
        <div className="grid gap-5">
          <label className="form-label">
            Full name
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="Team member name"
            />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="form-label">
              Role
              <input
                required
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                className="mt-2 h-11 rounded-md border px-3 font-normal"
                placeholder="President"
              />
            </label>
            <label className="form-label">
              Team / group
              <input
                required
                value={form.group}
                onChange={(e) => set("group", e.target.value)}
                className="mt-2 h-11 rounded-md border px-3 font-normal"
                placeholder="Leadership"
              />
            </label>
          </div>
          <label className="form-label">
            LinkedIn URL
            <input
              type="url"
              value={form.linkedinUrl}
              onChange={(e) => set("linkedinUrl", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="https://linkedin.com/in/..."
            />
          </label>
          <label className="form-label">
            Instagram URL <span className="font-normal text-muted-foreground">(optional)</span>
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(e) => set("instagramUrl", e.target.value)}
              className="mt-2 h-11 rounded-md border px-3 font-normal"
              placeholder="https://instagram.com/..."
            />
          </label>
        </div>
      </div>
      <aside className="grid content-start gap-5">
        <div className="rounded-xl border bg-background p-5">
          <h2 className="font-bold text-brand-navy">Profile photo URL</h2>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            className="mt-4 h-11 w-full rounded-md border px-3 font-normal"
            placeholder="https://images.example.com/member.jpg"
          />
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Use a public image URL. Images are not uploaded to Firebase.
          </p>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Profile preview"
              className="mt-4 aspect-[4/5] w-full rounded-md object-contain bg-secondary"
            />
          )}
        </div>
        <button
          disabled={saving}
          className="h-11 rounded-md bg-primary font-bold text-primary-foreground"
        >
          {saving ? "Saving…" : id ? "Save changes" : "Add team member"}
        </button>
      </aside>
      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700 lg:col-span-2">{error}</p>
      )}
    </form>
  );
}
