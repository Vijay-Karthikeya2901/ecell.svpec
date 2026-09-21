import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { getAllBlogs, type FirebaseBlog } from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });
const date = (value: Date | null) =>
  value
    ? value.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";
function AdminDashboard() {
  const [blogs, setBlogs] = useState<FirebaseBlog[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .catch((e) => setError(firebaseErrorMessage(e)));
  }, []);
  const published = blogs.filter((b) => b.status === "published").length;
  return (
    <AdminLayout>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-2 text-3xl font-black text-brand-navy">Good to see you.</h1>
          <p className="mt-2 text-muted-foreground">
            Manage the E-Cell publishing workflow from one place.
          </p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          + New blog
        </Link>
      </div>
      {error && <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Total blogs", blogs.length],
          ["Published", published],
          ["Drafts", blogs.length - published],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border bg-background p-6">
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            <p className="mt-3 text-4xl font-black text-brand-navy">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border bg-background">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-bold text-brand-navy">Recent blogs</h2>
          <Link to="/admin/blogs" className="text-sm font-bold text-primary">
            View all
          </Link>
        </div>
        {blogs.slice(0, 5).map((blog) => (
          <div
            key={blog.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b p-5 last:border-0"
          >
            <div>
              <Link
                to="/admin/blogs/edit/$id"
                params={{ id: blog.id }}
                className="font-bold text-brand-navy hover:text-primary"
              >
                {blog.title}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                {blog.category} · Created {date(blog.createdAt?.toDate?.() ?? null)}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
            >
              {blog.status}
            </span>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="p-8 text-sm text-muted-foreground">
            No blogs yet. Create your first draft.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
