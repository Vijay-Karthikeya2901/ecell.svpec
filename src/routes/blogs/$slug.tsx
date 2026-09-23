import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { BlogCard } from "@/components/site/blog-card";
import { CTA } from "@/components/site/home-sections";
import { Reveal, SectionHeading, SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import {
  blogs,
  formatBlogDate,
  getBlogBySlug as getFallback,
  getRelatedBlogs,
  type BlogPost,
} from "@/data/site-data";
import { getBlogBySlug } from "@/lib/firebase-firestore";
import { firebaseBlogToPublic } from "@/lib/blog-adapter";

export const Route = createFileRoute("/blogs/$slug")({ component: BlogPostPage });
function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(() => getFallback(slug) ?? null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBlogBySlug(slug)
      .then((item) => setPost(item ? firebaseBlogToPublic(item) : null))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [slug]);
  if (loading && !post)
    return (
      <SiteShell>
        <section className="section-pad">
          <div className="site-container text-center text-muted-foreground">Loading article…</div>
        </section>
      </SiteShell>
    );
  if (!post)
    return (
      <SiteShell>
        <section className="section-pad">
          <div className="site-container max-w-2xl text-center">
            <p className="eyebrow">404</p>
            <h1 className="mt-4 text-4xl font-black text-brand-navy">Article unavailable</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              This article does not exist or is not currently published.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/blogs">
                <ArrowLeft /> Back to all blogs
              </Link>
            </Button>
          </div>
        </section>
      </SiteShell>
    );
  const related = getRelatedBlogs(post, 3);
  return (
    <SiteShell>
      <section className="border-b bg-secondary py-12 md:py-20">
        <div className="site-container">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-brand-navy"
          >
            <ArrowLeft className="size-4" /> All blogs
          </Link>
          <div className="mt-8 max-w-3xl">
            <span className="rounded-full border border-primary/15 bg-background px-3 py-1 text-xs font-bold text-primary">
              {post.category}
            </span>
            <h1 className="mt-5 text-4xl font-black text-brand-navy sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <img src={post.author.image} alt="" className="size-11 rounded-full object-cover" />
                <div>
                  <strong className="block text-sm text-brand-navy">{post.author.name}</strong>
                  <span className="text-xs text-muted-foreground">{post.author.role}</span>
                </div>
              </div>
              <div className="flex gap-4 text-xs font-bold text-primary">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5" />
                  {formatBlogDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <article className="section-pad">
        <div className="site-container">
          <Reveal>
            <div className="max-h-[720px] overflow-hidden border bg-secondary">
              <img
                src={post.image}
                alt={post.title}
                className="mx-auto max-h-[720px] w-full object-contain"
              />
            </div>
          </Reveal>
          <div
            className="prose prose-lg mx-auto mt-12 max-w-3xl prose-headings:text-brand-navy prose-a:text-primary"
            dangerouslySetInnerHTML={{
              __html: post.sections
                .map(
                  (section) =>
                    `${section.heading ? `<h2>${section.heading}</h2>` : ""}${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}`,
                )
                .join(""),
            }}
          />
        </div>
      </article>
      {related.length > 0 && (
        <section className="section-pad border-t bg-secondary">
          <div className="site-container">
            <SectionHeading
              eyebrow="Keep reading"
              title="More From The Blog"
              text="More stories and practical lessons from our community."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Reveal key={item.slug}>
                  <BlogCard post={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
      <CTA />
    </SiteShell>
  );
}
