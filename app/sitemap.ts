import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ethnicsbyaravalli.com'
  
  // Main navigation routes
  const mainRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Guide and resource pages
  const guidePages = [
    {
      url: `${baseUrl}/how-to-choose-the-right-fabric-for-ethnic-wear`,
      lastModified: new Date('2025-06-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Add more guide pages here as they are created
  ]

  // Business related routes
  const businessRoutes = [
    {
      url: `${baseUrl}/kurti-manufacturer-in-jaipur`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/become-retailer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-to-order`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Collection category routes
  const collectionCategories = [
    'kurtis',
    'kurta-sets',
    'dresses',
    'suits',
    'lehengas',
    'gowns',
    'western',
  ].map(category => ({
    url: `${baseUrl}/collections/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combine all routes
  return [
    ...mainRoutes,
    ...guidePages,
    ...businessRoutes,
    ...collectionCategories,
  ]
} 