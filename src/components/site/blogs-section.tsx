import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  blogFilters,
  blogs as fallbackBlogs,
  type BlogFilter,
  type BlogPost,
} from "@/data/site-data";
import { cn } from "@/lib/utils";
import { getPublishedBlogs } from "@/lib/firebase-firestore";
import { firebaseBlogToPublic } from "@/lib/blog-adapter";
import { BlogCard } from "./blog-card";

export function BlogsListing() {
  const [active, setActive] = useState<BlogFilter>("All");
  const [posts, setPosts] = useState<BlogPost[]>(fallbackBlogs);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    getPublishedBlogs()
      .then((items) => {
        if (items.length) setPosts(items.map(firebaseBlogToPublic));
      })
      .catch(() => setNotice("Showing our latest stories while the blog service is unavailable."));
  }, []);
  const filtered = active === "All" ? posts : posts.filter((post) => post.category === active);
  const [featured, ...rest] = filtered;

  return (
    <section className="pt-12 md:pt-16">
      <div className="site-container">
        {notice && (
          <p className="mb-6 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">{notice}</p>
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
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {filter}
                <span
                  className={cn(
                    "text-xs font-bold",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground/70",
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BlogCard post={featured} featured />
            </motion.div>
            {rest.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-10 border bg-secondary p-8 text-center text-sm text-muted-foreground">
            No articles in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
