import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/notion'

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
  const posts = await getBlogPosts();
  const postEntries = posts.map((post) => ({
    url: `https://ethnicsbyaravalli.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: 'https://ethnicsbyaravalli.com', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: 'https://ethnicsbyaravalli.com/blog', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://ethnicsbyaravalli.com/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://ethnicsbyaravalli.com/contact', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  return [...staticPages, ...postEntries];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function someFunction(param: any) {
  // ...
} 