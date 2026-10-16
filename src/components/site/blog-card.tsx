import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { formatBlogDate, type BlogPost } from "@/data/site-data";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  /** Larger, two-column layout used for the lead article. */
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group h-full overflow-hidden rounded-lg border border-border/80 bg-card shadow-xs transition-shadow hover:shadow-md"
    >
      <Link
        to="/blogs/$slug"
        params={{ slug: post.slug }}
        className={cn(
          "h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          featured ? "grid lg:grid-cols-2" : "flex flex-col",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]",
          )}
        >
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="font-bold uppercase tracking-wider">{post.category}</span>
            <span aria-hidden="true" className="text-muted-foreground/60">·</span>
            <span className="flex items-center gap-1 font-mono text-muted-foreground">
              <Clock className="size-3" />
              {post.readTime}
            </span>
          </div>
          <h3
            className={cn(
              "mt-3 font-bold tracking-tight text-brand-navy",
              featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl",
            )}
          >
            {post.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm leading-6 text-muted-foreground",
              featured ? "md:text-base md:leading-7" : "line-clamp-3",
            )}
          >
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-5 mt-6">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={post.author.image}
                alt={post.author.name}
                loading="lazy"
                className="size-8 shrink-0 rounded-full object-cover border border-primary/20"
              />
              <div className="min-w-0">
                <strong className="block truncate text-xs font-bold text-brand-navy">
                  {post.author.name}
                </strong>
                <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                  <CalendarDays className="size-3" />
                  {formatBlogDate(post.publishedAt)}
                </span>
              </div>
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
