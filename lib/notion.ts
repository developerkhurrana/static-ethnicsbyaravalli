import { Client } from '@notionhq/client'
import { PageObjectResponse, PartialPageObjectResponse, DatabaseObjectResponse, PartialDatabaseObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
// import { NotionToMarkdown } from 'notion-to-md' // Not used
// import { marked } from 'marked' // Not used

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY environment variable')
}

if (!process.env.NOTION_BLOG_DATABASE_ID) {
  throw new Error('Missing NOTION_BLOG_DATABASE_ID environment variable')
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// n2m removed

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

interface NotionProperties {
  [key: string]: {
    rich_text?: RichTextItemResponse[]
    title?: { plain_text: string }[]
    checkbox?: boolean
    created_time?: string
    last_edited_time?: string
    url?: string
  }
}

function getCoverImageUrl(properties: NotionProperties): string {
  const coverImageUrl = properties.coverImage?.rich_text?.[0]?.plain_text || properties.coverImage?.url || '';
  if (coverImageUrl && typeof coverImageUrl === 'string') {
    return coverImageUrl;
  }
  return "/images/blog-hero.jpg";
}

function extractTextFromRichText(contentObj: unknown): string {
  if (typeof contentObj === 'string') return contentObj;
  if (Array.isArray(contentObj)) {
    return contentObj.map(extractTextFromRichText).join(' ');
  }
  if (contentObj && typeof contentObj === 'object' && 'rich_text' in contentObj) {
    const richText = (contentObj as { rich_text: RichTextItemResponse[] }).rich_text;
    if (Array.isArray(richText)) {
      return richText.map(rt => rt.plain_text || '').join('');
    }
  }
  return '';
}

type NotionResponse = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

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

    const posts = response.results.map((page: NotionResponse) => {
      if (!('properties' in page)) {
        console.warn("Skipping page without properties:", page);
        return null;
      }
      const properties = page.properties as NotionProperties;
      const content = extractTextFromRichText(properties.content) || extractTextFromRichText(properties.Content) || ''
      console.log('Notion DEBUG - BlogPost content:', content)
      return {
        id: page.id,
        slug: properties.slug?.rich_text?.[0]?.plain_text || properties.Slug?.rich_text?.[0]?.plain_text || '',
        title: properties.title?.title?.[0]?.plain_text || properties.Title?.title?.[0]?.plain_text || '',
        description: properties.description?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.plain_text || '',
        coverImage: getCoverImageUrl(properties),
        createdAt: properties.created?.created_time || properties.Created?.created_time || new Date().toISOString(),
        updatedAt: properties.updated?.last_edited_time || properties.Updated?.last_edited_time || new Date().toISOString(),
        content,
        published: properties.published?.checkbox || properties.Published?.checkbox || false,
      }
    }).filter((post): post is BlogPost => post !== null);
    return posts;
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

    const page = response.results[0] as NotionResponse;
    if (!('properties' in page)) {
      console.warn("Page without properties:", page);
      return null;
    }
    const properties = page.properties as NotionProperties;
    const content = extractTextFromRichText(properties.content) || extractTextFromRichText(properties.Content) || ''
    console.log('Notion DEBUG - BlogPostBySlug content:', content)

    return {
      id: page.id,
      slug: properties.slug?.rich_text?.[0]?.plain_text || properties.Slug?.rich_text?.[0]?.plain_text || '',
      title: properties.title?.title?.[0]?.plain_text || properties.Title?.title?.[0]?.plain_text || '',
      description: properties.description?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.plain_text || '',
      coverImage: getCoverImageUrl(properties),
      createdAt: properties.created?.created_time || properties.Created?.created_time || new Date().toISOString(),
      updatedAt: properties.updated?.last_edited_time || properties.Updated?.last_edited_time || new Date().toISOString(),
      content,
      published: properties.published?.checkbox || properties.Published?.checkbox || false,
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
} 