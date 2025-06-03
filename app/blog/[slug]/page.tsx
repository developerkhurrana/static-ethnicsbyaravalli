// import Image from "next/image"
// import Link from "next/link"
// import { ArrowLeft, Calendar, Clock } from "lucide-react"
// import { Metadata } from 'next'
// import { notFound } from "next/navigation"
// import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"

// type Props = {
//   params: { slug: string }
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const post = getBlogPost(params.slug)
  
//   if (!post) {
//     return {
//       title: 'Post Not Found - Ethnics by Aravalli',
//       description: 'The requested blog post could not be found.',
//     }
//   }

//   return {
//     title: `${post.title} - Ethnics by Aravalli Blog`,
//     description: post.metaDescription,
//     openGraph: {
//       title: post.title,
//       description: post.metaDescription,
//       type: 'article',
//       url: `https://ethnicsbyaravalli.com/blog/${post.slug}`,
//       images: [
//         {
//           url: post.image,
//           width: 1968,
//           height: 1312,
//           alt: post.title,
//         },
//       ],
//       publishedTime: post.date,
//       authors: [post.author.name],
//       tags: post.keywords,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: post.metaDescription,
//       images: [post.image],
//     },
//   }
// }

// export default async function BlogPostPage({ params }: Props) {
//   const post = getBlogPost(params.slug)
  
//   if (!post) {
//     notFound()
//   }

//   const relatedPosts = getRelatedPosts(params.slug)

//   // Generate structured data for the blog post
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "BlogPosting",
//     "headline": post.title,
//     "description": post.metaDescription,
//     "image": post.image,
//     "datePublished": post.date,
//     "author": {
//       "@type": "Person",
//       "name": post.author.name
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "Ethnics by Aravalli",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://ethnicsbyaravalli.com/logo.png"
//       }
//     },
//     "keywords": post.keywords.join(", "),
//     "mainEntityOfPage": {
//       "@type": "WebPage",
//       "@id": `https://ethnicsbyaravalli.com/blog/${post.slug}`
//     }
//   }

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />
//       <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
//         <div className="container max-w-7xl mx-auto px-4">
//           <Link
//             href="/blog"
//             className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Blog
//           </Link>

//           <article className="max-w-7xl mx-auto">
//             <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
//               <Image
//                 src={post.image}
//                 alt={post.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
            
//             <div className="prose prose-lg dark:prose-invert max-w-none">
//               <h1 className="font-serif text-4xl font-bold mb-4">{post.title}</h1>
              
//               <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
//                 <span className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   {post.date}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Clock className="h-4 w-4" />
//                   {post.readTime}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2 mb-8">
//                 <div className="relative w-10 h-10 rounded-full overflow-hidden">
//                   <Image
//                     src={post.author.image}
//                     alt={post.author.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-medium">{post.author.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {post.author.role}
//                   </p>
//                 </div>
//               </div>

//               <div 
//                 className="mt-8"
//                 dangerouslySetInnerHTML={{ __html: post.content }}
//               />
//             </div>
//           </article>

//           {relatedPosts.length > 0 && (
//             <div className="max-w-7xl mx-auto mt-16">
//               <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {relatedPosts.map((post) => (
//                   <Link 
//                     key={post.slug}
//                     href={`/blog/${post.slug}`}
//                     className="group block"
//                   >
//                     <div className="h-full rounded-lg border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
//                       <div className="relative w-full h-48 overflow-hidden">
//                         <Image
//                           src={post.image}
//                           alt={post.title}
//                           fill
//                           className="object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
//                           <span className="flex items-center gap-1">
//                             <Calendar className="h-4 w-4" />
//                             {post.date}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock className="h-4 w-4" />
//                             {post.readTime}
//                           </span>
//                         </div>
//                         <h3 className="font-medium text-lg mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#D9A8A0]">
//                           {post.title}
//                         </h3>
//                         <p className="text-sm text-muted-foreground line-clamp-2">
//                           {post.metaDescription}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// } 

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found - Ethnics by Aravalli',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} - Ethnics by Aravalli Blog`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url: `https://ethnicsbyaravalli.com/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1968,
          height: 1312,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(params.slug)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ethnics by Aravalli",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ethnicsbyaravalli.com/logo.png"
      }
    },
    "keywords": post.keywords.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ethnicsbyaravalli.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <article className="max-w-7xl mx-auto">
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h1 className="font-serif text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <div
                className="mt-8"
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
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="h-full rounded-lg border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
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
                        <h3 className="font-medium text-lg mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#D9A8A0]">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.metaDescription}
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
