import { getBlogPosts } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://ethnicsbyaravalli.com'; // Change to your production URL

  // Static pages
  const staticPages = [
    '',
    'about',
    'ethnic-wear-manufacturer',
    'kurti-manufacturer-in-jaipur',
    'manufacturing',
    'blog',
    'aravalli-clothing',
    'aravalli-kurtas-jaipur-secret',
    'best-kurti-manufacturer-in-jaipur',
    'faq',
    'contact',
  ];

  // Blog posts
  const posts = await getBlogPosts();

  const urls = [
    ...staticPages.map(
      (path) => `<url><loc>${baseUrl}/${path}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
    ...posts.map(
      (post) => `<url><loc>${baseUrl}/blog/${post.slug}</loc><lastmod>${post.updatedAt}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n      ')}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 