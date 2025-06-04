import { MetadataRoute } from 'next'

// Base URL of your website
const baseUrl = 'https://ethnicsbyaravalli.com'

// Static routes with their metadata
const staticRoutes = [
  {
    url: '/',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  },
  {
    url: '/about',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/manufacturing',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/blog',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const blogPosts = await fetch(`${baseUrl}/api/blog-posts`)
    .then((res) => res.json())
    .catch(() => [])

  // Create blog post routes
  const blogRoutes = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Combine all routes
  const routes = [
    ...staticRoutes.map(route => ({
      ...route,
      url: `${baseUrl}${route.url}`,
    })),
    ...blogRoutes,
  ]

  return routes
} 