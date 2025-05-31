import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog-data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog - Ethnics by Aravalli | Latest in Ethnic Fashion',
  description: 'Discover the latest insights, trends, and stories about ethnic fashion, sustainable practices, and traditional craftsmanship at Ethnics by Aravalli.',
  openGraph: {
    title: 'Blog - Ethnics by Aravalli | Latest in Ethnic Fashion',
    description: 'Discover the latest insights, trends, and stories about ethnic fashion, sustainable practices, and traditional craftsmanship at Ethnics by Aravalli.',
    type: 'website',
    url: 'https://ethnicsbyaravalli.com/blog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop',
        width: 1968,
        height: 1312,
        alt: 'Ethnics by Aravalli Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Ethnics by Aravalli | Latest in Ethnic Fashion',
    description: 'Discover the latest insights, trends, and stories about ethnic fashion, sustainable practices, and traditional craftsmanship at Ethnics by Aravalli.',
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop'],
  },
}

const BlogHeader = ({ image, title }: { image: string; title: string }) => (
  <div className="relative w-full h-48">
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover"
      priority
    />
  </div>
)

export default function BlogPage() {
  const posts = getAllBlogPosts()

  // Generate structured data for the blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Ethnics by Aravalli Blog",
    "description": "Latest insights, trends, and stories about ethnic fashion, sustainable practices, and traditional craftsmanship.",
    "url": "https://ethnicsbyaravalli.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Ethnics by Aravalli",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ethnicsbyaravalli.com/logo.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "image": post.image,
      "keywords": post.keywords.join(", ")
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-muted-foreground">
              Discover the latest insights, trends, and stories from Ethnics by Aravalli.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <div className="h-full rounded-lg border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      priority={i < 3}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-medium text-lg mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#D9A8A0]">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.metaDescription}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 