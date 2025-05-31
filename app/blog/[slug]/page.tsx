import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = getBlogPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: ['Ethnics by Aravalli'],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const post = getBlogPost(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(resolvedParams.slug)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <Link 
          href="/blog" 
          className="mb-12 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="w-full">
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-lg">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.role}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 relative w-full h-[600px] overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-slate max-w-none dark:prose-invert 
              prose-headings:font-serif prose-headings:font-bold 
              prose-h1:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-6 text-muted-foreground">
              More Articles You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group h-full"
                >
                  <div className="rounded-lg border bg-card overflow-hidden shadow-sm transition hover:shadow-md h-full flex flex-col">
                    <div className="relative w-full h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {relatedPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-[#D9A8A0] transition">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-auto">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={relatedPost.author.image}
                            alt={relatedPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {relatedPost.author.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 