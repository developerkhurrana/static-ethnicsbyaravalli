import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion"
import { BlogPostImage } from "@/components/blog/blog-post-image"


interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Ethnics by Aravalli',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: true,
      }
    }
  }

  // Create a canonical URL
  const canonicalUrl = `https://ethnicsbyaravalli.com/blog/${post.slug}`

  return {
    title: `${post.title} | Ethnics by Aravalli Blog - Premium Ethnic Wear Manufacturer`,
    description: post.description,
    keywords: [
      'ethnic wear',
      'Indian fashion',
      'traditional clothing',
      'Jaipur manufacturer',
      'wholesale ethnic wear',
      'boutique supplier',
      'handcrafted fashion',
      'artisanal clothing',
      post.title.toLowerCase(),
      ...post.title.toLowerCase().split(' ').filter(word => word.length > 3)
    ].join(', '),
    authors: [{ name: 'Ethnics by Aravalli' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: canonicalUrl,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1968,
          height: 1312,
          alt: post.title,
        },
      ] : [],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      siteName: 'Ethnics by Aravalli',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
      creator: '@ethnicsbyaravalli',
      site: '@ethnicsbyaravalli',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification', // Add your Google Search Console verification code
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  // Get all posts for related posts
  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3) // Get 3 related posts

  // Calculate read time (assuming average reading speed of 200 words per minute)
  const wordCount = (post.content || '').split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Blog Content */}
        <article className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden mb-6 aspect-video bg-muted">
            <BlogPostImage src={post.coverImage} alt={post.title} className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span>{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
          <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </article>
        {/* Related Posts */}
        <aside className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
          <div className="space-y-6">
            {relatedPosts.map(rp => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-4 group">
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <BlogPostImage src={rp.coverImage} alt={rp.title} className="w-full h-full" />
                </div>
                <div>
                  <h3 className="font-medium text-base group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(rp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
} 

 