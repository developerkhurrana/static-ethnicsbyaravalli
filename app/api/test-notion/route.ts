import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

export async function GET() {
  try {
    // Log environment variables (without exposing the full token)
    console.log('Environment check:', {
      hasToken: !!process.env.NOTION_TOKEN,
      tokenLength: process.env.NOTION_TOKEN?.length,
      databaseId: process.env.NOTION_DATABASE_ID,
    })

    if (!process.env.NOTION_TOKEN) {
      throw new Error('NOTION_TOKEN is not set in environment variables')
    }

    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID is not set in environment variables')
    }

    // Try to query the database
    const response = await notion.databases.retrieve({
      database_id: DATABASE_ID!,
    })

    // Get the database title from the first title property
    const titleProperty = Object.entries(response.properties).find(([_, prop]) => prop.type === 'title')
    const title = titleProperty ? 'Contact Form Submissions' : 'Untitled'

    return NextResponse.json({
      success: true,
      database: {
        id: response.id,
        title,
        properties: Object.keys(response.properties),
      }
    })
  } catch (error) {
    console.error('Notion test error:', error)
    
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = {
      message: errorMessage,
      type: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack : undefined,
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Notion',
        details: errorDetails,
        env: {
          hasToken: !!process.env.NOTION_TOKEN,
          tokenLength: process.env.NOTION_TOKEN?.length,
          databaseId: process.env.NOTION_DATABASE_ID,
        }
      },
      { status: 500 }
    )
  }
} 