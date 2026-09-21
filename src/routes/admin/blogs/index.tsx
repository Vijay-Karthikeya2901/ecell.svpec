import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  deleteBlog,
  getAllBlogs,
  publishBlog,
  unpublishBlog,
  type FirebaseBlog,
} from "@/lib/firebase-firestore";
import { firebaseErrorMessage } from "@/lib/firebase";
export const Route = createFileRoute("/admin/blogs/")({ component: AdminBlogs });
const date = (value: Date | null) =>
  value
    ? value.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";
function AdminBlogs() {
  const [blogs, setBlogs] = useState<FirebaseBlog[]>([]);
  const [message, setMessage] = useState("");
  const refresh = () =>
    getAllBlogs()
      .then(setBlogs)
      .catch((e) => setMessage(firebaseErrorMessage(e)));
  useEffect(() => {
    void refresh();
  }, []);
  async function action(fn: () => Promise<void>, text: string) {
    setMessage("");
    try {
      await fn();
      setMessage(text);
      await refresh();
    } catch (e) {
      setMessage(firebaseErrorMessage(e));
    }
  }
  return (
    <AdminLayout>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Publishing</p>
          <h1 className="mt-2 text-3xl font-black text-brand-navy">All blogs</h1>
          <p className="mt-2 text-muted-foreground">
            Draft, publish, update, or remove your stories.
          </p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          + New blog
        </Link>
      </div>
      {message && (
        <p className="mt-6 rounded-lg bg-secondary p-4 text-sm text-brand-navy">{message}</p>
      )}
      <div className="mt-8 overflow-x-auto rounded-xl border bg-background">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Title", "Category", "Author", "Status", "Created", "Published", "Actions"].map(
                (head) => (
                  <th key={head} className="px-5 py-4">
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b last:border-0">
                <td className="max-w-[260px] px-5 py-4 font-bold text-brand-navy">{blog.title}</td>
                <td className="px-5 py-4">{blog.category}</td>
                <td className="px-5 py-4">{blog.author}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {date(blog.createdAt?.toDate?.() ?? null)}
                </td>
                <td className="px-5 py-4 text-muted-foreground">{date(blog.publishedAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/admin/blogs/edit/$id"
                      params={{ id: blog.id }}
                      className="font-bold text-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        action(
                          blog.status === "published"
                            ? () => unpublishBlog(blog.id)
                            : () => publishBlog(blog.id),
                          blog.status === "published" ? "Blog unpublished." : "Blog published.",
                        )
                      }
                      className="font-bold text-brand-navy"
                    >
                      {blog.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this blog permanently?"))
                          void action(() => deleteBlog(blog.id), "Blog deleted.");
                      }}
                      className="font-bold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <p className="p-8 text-center text-muted-foreground">No blogs found.</p>
        )}
      </div>
    </AdminLayout>
  );
}
