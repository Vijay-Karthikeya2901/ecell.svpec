import DOMPurify from "isomorphic-dompurify";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { BlogCard } from "@/components/site/blog-card";
import { CTA } from "@/components/site/home-sections";
import { Reveal, SectionHeading, SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import {
  formatBlogDate,
  getBlogBySlug as getFallback,
  type BlogPost,
} from "@/data/site-data";
import { getBlogBySlug } from "@/lib/firebase-firestore";
import { firebaseBlogToPublic } from "@/lib/blog-adapter";

export const Route = createFileRoute("/blogs/$slug")({ component: BlogPostPage });

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(() => getFallback(slug) ?? null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<BlogPost[]>([]);


useEffect(() => {
  let cancelled = false;

  setLoading(true);
  setRelated([]);

  getBlogBySlug(slug)
    .then(async (item) => {
      if (cancelled) return;

      const currentPost = item ? firebaseBlogToPublic(item) : null;
      setPost(currentPost);

      if (!currentPost) return;

      const { getPublishedBlogs } = await import("@/lib/firebase-firestore");

      const publishedBlogs = await getPublishedBlogs();

      if (cancelled) return;

      setRelated(
        publishedBlogs
          .filter((blog) => blog.slug !== currentPost.slug)
          .slice(0, 3)
          .map(firebaseBlogToPublic)
      );
    })
    .catch((error) => {
      console.error("Failed to load blog or related blogs:", error);
      if (!cancelled) setRelated([]);
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });

  return () => {
    cancelled = true;
  };
}, [slug]);


  if (loading && !post)
    return (
      <SiteShell>
        <section className="section-pad">
          <div className="site-container text-center text-sm font-medium text-muted-foreground">
            Loading article…
          </div>
        </section>
      </SiteShell>
    );

  if (!post)
    return (
      <SiteShell>
        <section className="section-pad">
          <div className="site-container max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">404</p>
            <h1 className="mt-3 text-3xl font-black text-brand-navy">Article unavailable</h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              This article does not exist or has been moved.
            </p>
            <Button asChild size="default" className="mt-6 bg-primary text-primary-foreground">
              <Link to="/blogs">
                <ArrowLeft className="mr-1.5 size-4" /> Back to all articles
              </Link>
            </Button>
          </div>
        </section>
      </SiteShell>
    );



  return (
    <SiteShell>
      <section className="border-b border-border/80 bg-secondary/50 py-12 md:py-16">
        <div className="site-container">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-brand-navy transition-colors"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <span className="font-bold uppercase tracking-wider">{post.category}</span>
              <span aria-hidden="true" className="text-muted-foreground/60">·</span>
              <span className="flex items-center gap-1 font-mono text-muted-foreground">
                <Clock className="size-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/60 pt-6">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="size-10 rounded-full object-cover border border-primary/20"
                />
                <div>
                  <strong className="block text-sm font-bold text-brand-navy">
                    {post.author.name}
                  </strong>
                  <span className="text-xs text-muted-foreground">{post.author.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <CalendarDays className="size-3.5 text-primary" />
                <span>{formatBlogDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="section-pad">
        <div className="site-container max-w-4xl">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/80 bg-muted shadow-sm">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-12 space-y-8 text-foreground/90 leading-8">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-black tracking-tight text-brand-navy pt-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <div
                    key={pIdx}
                    className="blog-content text-base leading-7 sm:text-lg sm:leading-8 [&_p]:mb-4 [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_strong]:font-bold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(para, {
                        ADD_ATTR: ["style", "color"],
                        ADD_TAGS: ["font"],
                      }),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad border-t border-border/80 bg-secondary/50">
          <div className="site-container">
            <SectionHeading
              eyebrow="Keep reading"
              title="More Founder Insights"
              text="Practical lessons, ecosystem updates and student founder stories."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
