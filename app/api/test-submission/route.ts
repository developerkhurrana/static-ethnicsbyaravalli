import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

export async function POST() {
  try {
    // Create a test submission
    const testData = {
      name: "Test User",
      email: "test@example.com",
      mobile: "9876543210",
      message: "This is a test submission to verify Notion integration",
      brand: "Test Brand",
      ip: "127.0.0.1"
    }

    // Store in Notion
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID!,
      },
      properties: {
        Timestamp: {
          date: {
            start: new Date().toISOString(),
          },
        },
        Name: {
          title: [
            {
              text: {
                content: testData.name,
              },
            },
          ],
        },
        Email: {
          email: testData.email,
        },
        Mobile: {
          phone_number: testData.mobile,
        },
        Message: {
          rich_text: [
            {
              text: {
                content: testData.message,
              },
            },
          ],
        },
        'Brand/Company Name': {
          rich_text: [
            {
              text: {
                content: testData.brand,
              },
            },
          ],
        },
        'IP Address': {
          rich_text: [
            {
              text: {
                content: testData.ip,
              },
            },
          ],
        },
        Status: {
          select: {
            name: "New"
          }
        }
      },
    })

    return NextResponse.json({
      success: true,
      message: "Test submission created successfully",
      pageId: response.id
    })
  } catch (error) {
    console.error('Test submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create test submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 