// This is a Server Component
export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion"
import { BlogPostImage } from "@/components/blog/blog-post-image"
import { formatDate } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    keywords: post.keywords?.join(', '),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ['Ethnics by Aravalli'],
      images: [
        {
          url: post.ogImage || post.coverImage,
          width: 1200,
          height: 630,
          alt: post.metaTitle || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      images: [post.ogImage || post.coverImage],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug)
  if (!post) {
    notFound()
  }

  // Debug: log the extracted arrays
  console.log('Page DEBUG - contentTitles:', post.contentTitles);
  console.log('Page DEBUG - contentBlocks:', post.contentBlocks);

  // Get all posts for related posts
  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3) // Get 3 related posts

  // Calculate read time (assuming average reading speed of 200 words per minute)
  const totalContent = [...post.contentTitles, ...post.contentBlocks].join(' ')
  const wordCount = totalContent.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription || post.description,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "image": post.ogImage || post.coverImage,
    "author": {
      "@type": "Organization",
      "name": "Ethnics by Aravalli"
    },
    "keywords": post.keywords?.join(', '),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ethnicsbyaravalli.com/blog/${post.slug}`
    }
  };

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
            <time dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
            {post.updatedAt !== post.createdAt && (
              <>
                <span>•</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
          <div className="prose max-w-none dark:prose-invert">
            {post.contentTitles.map((title, index) => {
              const block = post.contentBlocks[index];
              const image = post.contentImages[index];
              if (!title || !block) return null;
              return (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div
                      className="prose prose-lg dark:prose-invert"
                      dangerouslySetInnerHTML={{
                        __html: block.replace(/\n/g, '<br/>')
                      }}
                    />
                    {image && (
                      <div className="rounded-lg overflow-hidden aspect-[4/3] bg-muted">
                        <BlogPostImage src={image} alt={title} className="w-full h-full" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
                    {formatDate(rp.createdAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
} 