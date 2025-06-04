'use client'

import { useState } from "react"
import Link from "next/link"
import { BlogPost } from "@/lib/notion"
import { BlogPostImage } from "./blog-post-image"

interface BlogListProps {
  initialPosts: BlogPost[]
}

export function BlogList({ initialPosts }: BlogListProps) {
  const [posts] = useState<BlogPost[]>(initialPosts)

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blog posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="group flex flex-col h-full"
        >
          <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
            <BlogPostImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 mb-4">
              {post.description}
            </p>
            <time
              dateTime={post.createdAt}
              className="text-sm text-muted-foreground"
            >
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </Link>
      ))}
    </div>
  )
} 