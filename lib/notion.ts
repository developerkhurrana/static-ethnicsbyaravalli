import { Client } from '@notionhq/client'

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY environment variable')
}

if (!process.env.NOTION_BLOG_DATABASE_ID) {
  throw new Error('Missing NOTION_BLOG_DATABASE_ID environment variable')
}

// Default hero banner image to use when no cover image is provided
const DEFAULT_HERO_IMAGE = '/images/blog-hero.jpg'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  createdAt: string
  updatedAt: string
  content: string
  published: boolean
}

function getCoverImageUrl(properties: any): string {
  try {
    // Check if there's a cover image in the files property
    const coverImage = properties.CoverImage?.files?.[0]?.file?.url
    if (coverImage) {
      return coverImage
    }

    // Check if there's a cover image in the files property (alternative format)
    const coverImageAlt = properties.CoverImage?.files?.[0]?.external?.url
    if (coverImageAlt) {
      return coverImageAlt
    }

    // If no cover image is found, return the default hero image
    return DEFAULT_HERO_IMAGE
  } catch (error) {
    console.error('Error getting cover image:', error)
    return DEFAULT_HERO_IMAGE
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID!,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page: any) => {
      const properties = page.properties

      return {
        id: page.id,
        slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
        title: properties.Title?.title?.[0]?.plain_text || '',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        coverImage: getCoverImageUrl(properties),
        createdAt: properties.Created?.created_time || new Date().toISOString(),
        updatedAt: properties.Updated?.last_edited_time || new Date().toISOString(),
        content: page.content || '',
        published: properties.Published?.checkbox || false,
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID!,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      return null
    }

    const page = response.results[0] as any
    const properties = page.properties

    return {
      id: page.id,
      slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
      title: properties.Title?.title?.[0]?.plain_text || '',
      description: properties.Description?.rich_text?.[0]?.plain_text || '',
      coverImage: getCoverImageUrl(properties),
      createdAt: properties.Created?.created_time || new Date().toISOString(),
      updatedAt: properties.Updated?.last_edited_time || new Date().toISOString(),
      content: page.content || '',
      published: properties.Published?.checkbox || false,
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
} 