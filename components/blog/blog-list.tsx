import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { getBlogPosts } from "@/lib/notion"

export async function BlogList() {
  const posts = await getBlogPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blog posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        // Calculate read time (assuming average reading speed of 200 words per minute)
        const wordCount = post.content.split(/\s+/).length
        const readTime = Math.ceil(wordCount / 200)

        return (
          <Link 
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="h-full rounded-lg border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              {post.coverImage && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readTime} min read
                  </span>
                </div>
                <h3 className="font-medium text-lg mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#D9A8A0]">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 