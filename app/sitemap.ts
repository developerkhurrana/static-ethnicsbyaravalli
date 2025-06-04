import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/notion'

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
    { url: 'https://ethnicsbyaravalli.com/manufacturing', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  return [...staticPages, ...postEntries];
} 