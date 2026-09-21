import { blogs, type BlogPost } from "@/data/site-data";
import type { FirebaseBlog } from "./firebase-firestore";
import arjunImage from "@/assets/team-arjun.jpg";
import ananyaImage from "@/assets/team-ananya.jpg";
import rohanImage from "@/assets/team-rohan.jpg";
import meeraImage from "@/assets/team-meera.jpg";
const authorImage = (name: string) =>
  name.toLowerCase().includes("arjun")
    ? arjunImage
    : name.toLowerCase().includes("ananya")
      ? ananyaImage
      : name.toLowerCase().includes("rohan")
        ? rohanImage
        : name.toLowerCase().includes("meera")
          ? meeraImage
          : meeraImage;
export function firebaseBlogToPublic(blog: FirebaseBlog): BlogPost {
  const published = blog.publishedAt ?? new Date();
  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: (blog.category || "Innovation") as BlogPost["category"],
    image: blog.coverImageUrl || meeraImage,
    publishedAt: published.toISOString().slice(0, 10),
    readTime: `${Math.max(1, Math.ceil(blog.content.replace(/<[^>]+>/g, " ").split(/\s+/).length / 180))} min read`,
    author: { name: blog.author, role: "E-Cell SVPEC", image: authorImage(blog.author) },
    sections: [{ heading: "", paragraphs: [blog.content] }],
  };
}
export function publicFallbackBlogs() {
  return blogs;
}
