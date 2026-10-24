import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  blogFilters,
  type BlogFilter,
  type BlogPost,
} from "@/data/site-data";
import { cn } from "@/lib/utils";
import { getPublishedBlogs } from "@/lib/firebase-firestore";
import { firebaseBlogToPublic } from "@/lib/blog-adapter";
import { BlogCard } from "./blog-card";

export function BlogsListing() {

  const [active, setActive] = useState<BlogFilter>("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    getPublishedBlogs()
      .then((items) => {
        console.log("[Blogs Debug] Firestore returned:", items.length);
        console.log(
          "[Blogs Debug] Blog titles:",
          items.map((blog) => ({
            title: blog.title,
            status: blog.status,
            publishedAt: blog.publishedAt,
          }))
        );

        if (cancelled) return;

        setPosts(items.map(firebaseBlogToPublic));
        setNotice("");
      })
      .catch((error) => {
        console.error("Failed to load blogs from Firebase:", error);

        if (!cancelled) {
          setPosts([]);
          setNotice("Unable to load blogs. Please try again later.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);


  const filtered = active === "All" ? posts : posts.filter((post) => post.category === active);
  const [featured, ...rest] = filtered;

  return (
    <section className="section-pad bg-background">
      <div className="site-container">
        {notice && (
          <p className="mb-6 rounded-md border border-border/80 bg-secondary/60 p-4 text-xs text-muted-foreground">
            {notice}
          </p>
        )}

        <div
          role="group"
          aria-label="Filter articles by category"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {blogFilters.map((filter) => {
            const count =
              filter === "All" ? posts.length : posts.filter((p) => p.category === filter).length;
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border/80 bg-card text-muted-foreground hover:border-primary/50 hover:text-primary",
                )}
              >
                {filter}
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground/80",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {featured ? (
          <div key={active} className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCard post={featured} featured />
            </motion.div>
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * (i + 1) }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-10 rounded-lg border border-border/80 bg-secondary/40 p-10 text-center text-sm text-muted-foreground">
            No articles in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
