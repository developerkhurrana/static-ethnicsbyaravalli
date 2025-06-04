"use client";
import Link from "next/link";
import { BlogPostImage } from "./blog-post-image";
import { BlogPost } from "@/lib/notion";

export function BentoBlogGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return <div>No blog posts found.</div>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[320px] w-full">
      {posts.map((post, i) => {
        // Make the first post much wider and taller
        const isFeatured = i === 0;
        const colSpan = isFeatured ? "lg:col-span-4 sm:col-span-2" : "lg:col-span-2 sm:col-span-1";
        const rowSpan = isFeatured ? "row-span-2" : "row-span-1";
        return (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white dark:bg-zinc-900 shadow transition-all hover:shadow-lg ${colSpan} ${rowSpan}`}
          >
            <div className="relative w-full h-2/3 min-h-[180px]">
              <BlogPostImage src={post.coverImage} alt={post.title} className="w-full h-full" />
            </div>
            <div className="flex-1 flex flex-col p-4">
              <h2 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-2">{post.description}</p>
              <span className="text-xs text-muted-foreground mt-auto">
                {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 