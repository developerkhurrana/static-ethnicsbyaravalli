'use client'

import Link from "next/link"
import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion"
import { BlogPostImage } from "@/components/blog/blog-post-image"
import { formatDate } from '@/lib/utils'
import React from 'react'

// This is a Client Component
export const dynamic = 'force-dynamic'

interface PageParams {
  slug: string
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ['Ethnics by Aravalli'],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  }
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page({ params }: { params: PageParams }) {
  const [post, setPost] = React.useState<Awaited<ReturnType<typeof getBlogPostBySlug>>>(null)
  const [relatedPosts, setRelatedPosts] = React.useState<Awaited<ReturnType<typeof getBlogPosts>>>([])
  const [readTime, setReadTime] = React.useState(0)

  React.useEffect(() => {
    async function loadData() {
      const fetchedPost = await getBlogPostBySlug(params.slug)
      if (!fetchedPost) {
        notFound()
      }
      setPost(fetchedPost)

      const allPosts = await getBlogPosts()
      const related = allPosts
        .filter(p => p.id !== fetchedPost.id)
        .slice(0, 3)
      setRelatedPosts(related)

      // Calculate read time
      const contentString = typeof fetchedPost.content === 'string' ? fetchedPost.content : String(fetchedPost.content || '')
      const wordCount = contentString.split(/\s+/).length
      setReadTime(Math.ceil(wordCount / 200))
    }
    loadData()
  }, [params.slug])

  if (!post) {
    return <div>Loading...</div>
  }

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
          <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
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
    </div>
  )
} 

 