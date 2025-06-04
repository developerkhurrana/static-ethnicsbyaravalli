import { getBlogPosts } from "@/lib/notion"
import { SectionHeader } from "@/components/ui/section-header"
import { BentoBlogGrid } from "@/components/blog/bento-blog-grid"

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata() {
  return {
    title: "Blog | Ethnics by Aravalli - Premium Ethnic Wear Manufacturer in Jaipur",
    description: "Discover the latest insights, trends, and stories about ethnic wear manufacturing, traditional craftsmanship, and the fashion industry from Ethnics by Aravalli - your trusted manufacturer of premium ethnic wear in Jaipur.",
    keywords: [
      'ethnic wear blog',
      'Indian fashion trends',
      'traditional clothing manufacturing',
      'Jaipur fashion industry',
      'wholesale ethnic wear',
      'boutique supplier insights',
      'handcrafted fashion blog',
      'artisanal clothing manufacturing',
      'ethnic wear manufacturer blog',
      'fashion industry insights'
    ].join(', '),
    openGraph: {
      title: "Blog | Ethnics by Aravalli - Premium Ethnic Wear Manufacturer",
      description: "Discover the latest insights, trends, and stories about ethnic wear manufacturing, traditional craftsmanship, and the fashion industry from Ethnics by Aravalli.",
      type: 'website',
      url: 'https://ethnicsbyaravalli.com/blog',
      siteName: 'Ethnics by Aravalli',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Blog | Ethnics by Aravalli",
      description: "Discover the latest insights, trends, and stories about ethnic wear manufacturing and traditional craftsmanship.",
      creator: '@ethnicsbyaravalli',
      site: '@ethnicsbyaravalli',
    },
    alternates: {
      canonical: 'https://ethnicsbyaravalli.com/blog',
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
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  // Generate structured data for the blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Ethnics by Aravalli Blog",
    "description": "Latest insights, trends, and stories about ethnic wear manufacturing, traditional craftsmanship, and the fashion industry.",
    "url": "https://ethnicsbyaravalli.com/blog",
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
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.createdAt,
      "dateModified": post.updatedAt,
      "url": `https://ethnicsbyaravalli.com/blog/${post.slug}`,
      "author": {
        "@type": "Organization",
        "name": "Ethnics by Aravalli"
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Blog"
            description="Explore expert insights, industry trends, and styling tips in premium ethnic wear manufacturing and boutique success."
            className="mb-12"
          />
          <BentoBlogGrid posts={posts} />
        </div>
      </div>
    </>
  )
} 