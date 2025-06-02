import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

export async function POST(request: Request) {
  // Immediate logging test
  console.log('\n\n🔔 CONTACT FORM HIT - ' + new Date().toISOString() + '\n\n')
  
  try {
    console.log('📥 Parsing request body...')
    const { name, email, mobile, message, brand, token } = await request.json()
    console.log('📦 Request body parsed:', { name, email, mobile, message, brand, token: token ? 'present' : 'missing' })
    
    // Get IP from Vercel headers
    const ip = request.headers.get('x-real-ip') || 
              request.headers.get('x-forwarded-for')?.split(',')[0] || 
              '127.0.0.1'
    console.log('🌐 IP Address:', ip)

    // Validate token
    if (!token) {
      console.error('❌ Missing rate limit token')
      return NextResponse.json(
        { error: 'Rate limit validation required' },
        { status: 400 }
      )
    }

    // Verify token format and expiration (tokens are valid for 1 minute)
    console.log('🔑 Validating token...')
    const parts = token.split(':')
    if (parts.length !== 3) {
      console.error('❌ Invalid token format:', token)
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      )
    }

    const [tokenMobile, action, timestamp] = parts
    const tokenTime = parseInt(timestamp)
    const now = Date.now()
    
    console.log('🔍 Token validation:', {
      tokenMobile,
      action,
      timestamp,
      tokenTime,
      now,
      timeDiff: now - tokenTime,
      isValid: tokenMobile === mobile && 
               action === 'contact' &&
               !isNaN(tokenTime) &&
               now - tokenTime <= 60000
    })
    
    if (!tokenMobile || !action || !timestamp || 
        tokenMobile !== mobile || 
        action !== 'contact' ||
        isNaN(tokenTime) ||
        now - tokenTime > 60000) { // 1 minute expiration
      console.error('❌ Invalid rate limit token:', { 
        token, 
        mobile,
        parsed: { tokenMobile, action, timestamp, tokenTime },
        expected: { mobile, action: 'contact' }
      })
      return NextResponse.json(
        { error: 'Invalid rate limit token' },
        { status: 400 }
      )
    }

    console.log('✅ Token validation passed')

    // Detailed submission logging
    console.log('=== Contact Form Submission ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Form Data:', {
      name,
      email,
      mobile,
      message,
      brand,
      ip,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      origin: request.headers.get('origin'),
    })
    console.log('=============================')

    // Store in Notion
    try {
      console.log('📝 Storing in Notion...')
      console.log('🔑 Using database ID:', DATABASE_ID)
      
      const notionResponse = await notion.pages.create({
        parent: {
          database_id: DATABASE_ID!,
        },
        properties: {
          Timestamp: {
            date: {
              start: new Date().toISOString(),
              end: null,
              time_zone: null
            }
          },
          Name: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          Mobile: {
            phone_number: mobile,
          },
          Message: {
            rich_text: [
              {
                text: {
                  content: message,
                },
              },
            ],
          },
          'Brand/Company Name': {
            rich_text: [
              {
                text: {
                  content: brand || '',
                },
              },
            ],
          },
          'IP Address': {
            rich_text: [
              {
                text: {
                  content: ip,
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
      console.log('✅ Successfully stored in Notion:', {
        pageId: notionResponse.id,
        url: `https://notion.so/${notionResponse.id.replace(/-/g, '')}`
      })
    } catch (notionError) {
      console.error('❌ Notion Error:', {
        error: notionError instanceof Error ? notionError.message : 'Unknown error',
        stack: notionError instanceof Error ? notionError.stack : undefined,
        submission: { name, mobile, ip },
        databaseId: DATABASE_ID,
        properties: {
          Timestamp: { date: { start: new Date().toISOString() } },
          Name: { title: [{ text: { content: name } }] },
          Mobile: { phone_number: mobile },
          Message: { rich_text: [{ text: { content: message } }] },
          'Brand/Company Name': { rich_text: [{ text: { content: brand || '' } }] },
          'IP Address': { rich_text: [{ text: { content: ip } }] },
          Status: { select: { name: "New" } }
        }
      })
      return NextResponse.json(
        { error: 'Failed to store in database' },
        { status: 500 }
      )
    }

    console.log('✅ Form submission completed successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Contact form error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      request: {
        headers: Object.fromEntries(request.headers.entries()),
        url: request.url,
        method: request.method
      }
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}