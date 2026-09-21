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
      whileHover={{ y: -5 }}
      className="group h-full overflow-hidden border bg-card transition-shadow hover:shadow-xl"
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
            "overflow-hidden",
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]",
          )}
        >
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            width={1408}
            height={912}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-primary">
            <span className="rounded-full border border-primary/15 bg-secondary px-3 py-1">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3.5" />
              {post.readTime}
            </span>
          </div>
          <h3
            className={cn(
              "mt-4 font-bold text-brand-navy",
              featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl",
            )}
          >
            {post.title}
          </h3>
          <p
            className={cn(
              "mt-3 text-sm leading-6 text-muted-foreground",
              featured ? "md:text-base md:leading-7" : "line-clamp-3",
            )}
          >
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={post.author.image}
                alt=""
                loading="lazy"
                width={768}
                height={896}
                className="size-9 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <strong className="block truncate text-sm text-brand-navy">{post.author.name}</strong>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="size-3" />
                  {formatBlogDate(post.publishedAt)}
                </span>
              </div>
            </div>
            <ArrowRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
