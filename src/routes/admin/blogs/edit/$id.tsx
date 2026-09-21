import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { BlogEditor } from "@/components/admin/blog-editor";
export const Route = createFileRoute("/admin/blogs/edit/$id")({ component: EditBlogPage });

function EditBlogPage() {
  const { id } = Route.useParams();
  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="eyebrow">Edit story</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">Update blog</h1>
        <p className="mt-2 text-muted-foreground">Changes are private until you publish them.</p>
      </div>
      <BlogEditor id={id} />
    </AdminLayout>
  );
}
