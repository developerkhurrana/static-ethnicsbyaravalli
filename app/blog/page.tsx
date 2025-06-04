import { Metadata } from "next"
import { BlogList } from "@/components/blog/blog-list"
import { SectionHeader } from "@/components/ui/section-header"
import { getBlogPosts } from "@/lib/notion"

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getBlogPosts()
  
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
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-foreground">Home</a>
            </li>
            <li>/</li>
            <li className="text-foreground" aria-current="page">Blog</li>
          </ol>
        </nav>

        <SectionHeader
          title="Blog"
          description="Discover the latest insights, trends, and stories from Ethnics by Aravalli about ethnic wear manufacturing, traditional craftsmanship, and the fashion industry."
          className="mb-12"
        />
        <BlogList />
      </div>
    </>
  )
} 