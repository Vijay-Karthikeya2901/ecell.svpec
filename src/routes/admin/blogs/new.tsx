import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { BlogEditor } from "@/components/admin/blog-editor";
export const Route = createFileRoute("/admin/blogs/new")({
  component: () => (
    <AdminLayout>
      <div className="mb-8">
        <p className="eyebrow">New story</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">Write a blog</h1>
        <p className="mt-2 text-muted-foreground">
          Save a draft while you work, then publish when it is ready.
        </p>
      </div>
      <BlogEditor />
    </AdminLayout>
  ),
});
