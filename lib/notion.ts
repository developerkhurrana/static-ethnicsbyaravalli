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
  contentTitles: string[]
  contentBlocks: string[]
  contentImages: string[]
  published: boolean
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
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

// Helper to extract bracketed strings as array
function extractBracketedStrings(str: string): string[] {
  if (!str) return [];
  // Use [\s\S] to match across newlines (instead of 's' flag)
  const matches = str.match(/\[([\s\S]*?)\]/g) || [];
  return matches.map(s => s.slice(1, -1).trim()).filter(Boolean);
}

type NotionResponse = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

function getContentImages(properties: NotionProperties): string[] {
  const contentImagesStr = extractTextFromRichText(properties.contentImages) || '';
  return extractBracketedStrings(contentImagesStr);
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

    const posts = response.results.map((page: NotionResponse) => {
      if (!('properties' in page)) {
        return null;
      }
      const properties = page.properties as NotionProperties;
      
      // Extract contentTitles, contentBlocks, and contentImages
      const contentTitlesStr = extractTextFromRichText(properties.contentTitles) || '';
      const contentBlocksStr = extractTextFromRichText(properties.contentBlocks) || '';
      
      // Use bracket extraction
      const contentTitles = extractBracketedStrings(contentTitlesStr);
      const contentBlocks = extractBracketedStrings(contentBlocksStr);
      const contentImages = getContentImages(properties);

      return {
        id: page.id,
        slug: properties.slug?.rich_text?.[0]?.plain_text || properties.Slug?.rich_text?.[0]?.plain_text || '',
        title: properties.title?.title?.[0]?.plain_text || properties.Title?.title?.[0]?.plain_text || '',
        description: properties.description?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.plain_text || '',
        coverImage: getCoverImageUrl(properties),
        createdAt: properties.created?.created_time || properties.Created?.created_time || new Date().toISOString(),
        updatedAt: properties.updated?.last_edited_time || properties.Updated?.last_edited_time || new Date().toISOString(),
        contentTitles,
        contentBlocks,
        contentImages,
        published: properties.published?.checkbox || properties.Published?.checkbox || false,
        metaTitle: properties.metaTitle?.rich_text?.[0]?.plain_text || '',
        metaDescription: properties.metaDescription?.rich_text?.[0]?.plain_text || '',
        keywords: properties.keywords?.rich_text?.[0]?.plain_text?.split(',').map(k => k.trim()).filter(Boolean) || [],
        ogImage: properties.ogImage?.url || '',
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
      return null;
    }
    const properties = page.properties as NotionProperties;
    
    // Extract contentTitles, contentBlocks, and contentImages
    const contentTitlesStr = extractTextFromRichText(properties.contentTitles) || '';
    const contentBlocksStr = extractTextFromRichText(properties.contentBlocks) || '';

    // Extract content from Notion properties

    // Use bracket extraction
    const contentTitles = extractBracketedStrings(contentTitlesStr);
    const contentBlocks = extractBracketedStrings(contentBlocksStr);
    const contentImages = getContentImages(properties);

    return {
      id: page.id,
      slug: properties.slug?.rich_text?.[0]?.plain_text || properties.Slug?.rich_text?.[0]?.plain_text || '',
      title: properties.title?.title?.[0]?.plain_text || properties.Title?.title?.[0]?.plain_text || '',
      description: properties.description?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.plain_text || '',
      coverImage: getCoverImageUrl(properties),
      createdAt: properties.created?.created_time || properties.Created?.created_time || new Date().toISOString(),
      updatedAt: properties.updated?.last_edited_time || properties.Updated?.last_edited_time || new Date().toISOString(),
      contentTitles,
      contentBlocks,
      contentImages,
      published: properties.published?.checkbox || properties.Published?.checkbox || false,
      metaTitle: properties.metaTitle?.rich_text?.[0]?.plain_text || '',
      metaDescription: properties.metaDescription?.rich_text?.[0]?.plain_text || '',
      keywords: properties.keywords?.rich_text?.[0]?.plain_text?.split(',').map(k => k.trim()).filter(Boolean) || [],
      ogImage: properties.ogImage?.url || '',
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
} 