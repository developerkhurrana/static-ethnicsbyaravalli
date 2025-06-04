import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion"

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

  // Generate enhanced structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.coverImage,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "Ethnics by Aravalli",
      "url": "https://ethnicsbyaravalli.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ethnics by Aravalli",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ethnicsbyaravalli.com/logo.png",
        "width": "112",
        "height": "112"
      },
      "url": "https://ethnicsbyaravalli.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ethnicsbyaravalli.com/blog/${post.slug}`
    },
    "keywords": [
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
    "articleSection": "Fashion & Manufacturing",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "wordCount": post.content.split(/\s+/).length,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".prose"]
    }
  }

  // Calculate read time (assuming average reading speed of 200 words per minute)
  const wordCount = post.content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-foreground">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-foreground" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <article className="max-w-7xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
            {post.coverImage && (
              <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  itemProp="image"
                />
              </div>
            )}
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h1 className="font-serif text-4xl font-bold mb-4" itemProp="headline">{post.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <time 
                  dateTime={post.createdAt}
                  itemProp="datePublished"
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
              </div>

              <div 
                className="mt-8"
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="max-w-7xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
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
                          <time 
                            dateTime={post.createdAt}
                            className="flex items-center gap-1"
                          >
                            <Calendar className="h-4 w-4" />
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 

 