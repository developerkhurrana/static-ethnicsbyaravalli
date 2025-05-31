import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Initialize Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })
const SPREADSHEET_ID = '1q3p2BZPPuzxiB4nDBtCyaIsk_Gya8N0BXUq76sHhOPk'
const SHEET_NAME = 'Sheet1'

// Initialize headers if sheet is empty
async function initializeSheet() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:F1`,
    })

    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:F`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Timestamp', 'Name', 'Email', 'Mobile', 'Message', 'IP Address']],
        },
      })
      console.log('Initialized sheet headers')
    }
  } catch (error) {
    console.error('Error initializing sheet:', error)
  }
}

// Initialize sheet on startup
initializeSheet()

export async function POST(request: Request) {
  try {
    const { name, email, mobile, message } = await request.json()
    
    // Get IP from Vercel headers
    const ip = request.headers.get('x-real-ip') || 
              request.headers.get('x-forwarded-for')?.split(',')[0] || 
              '127.0.0.1'
    
    console.log('Contact form submission:', { name, email, mobile, ip })
    
    if (!mobile) {
      console.log('Missing mobile number')
      return NextResponse.json(
        { error: 'Missing mobile number' },
        { status: 400 }
      )
    }

    // Create unique keys for this user
    const cooldownKey = `cooldown:${ip}:${mobile}`
    const dailyKey = `daily:${ip}:${mobile}`
    const totalKey = `total:${ip}:${mobile}`

    // Check cooldown period
    const cooldown = await redis.get(cooldownKey)
    if (cooldown) {
      const remainingTime = Math.ceil((Number(cooldown) - Date.now() / 1000))
      console.log('Cooldown active:', { remainingTime, cooldownKey })
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          remainingTime,
          type: 'cooldown'
        },
        { status: 429 }
      )
    }

    // Check daily limit
    const dailyCount = await redis.get(dailyKey) || 0
    console.log('Daily count:', { dailyCount, dailyKey })
    if (Number(dailyCount) >= 5) {
      console.log('Daily limit reached')
      return NextResponse.json(
        { 
          error: 'Daily limit reached',
          type: 'daily'
        },
        { status: 429 }
      )
    }

    // Check total submissions
    const totalCount = await redis.get(totalKey) || 0
    console.log('Total count:', { totalCount, totalKey })
    if (Number(totalCount) >= 3) {
      console.log('Total limit reached')
      return NextResponse.json(
        { 
          error: 'Maximum submissions reached',
          type: 'total'
        },
        { status: 429 }
      )
    }

    // Set cooldown period
    await redis.set(cooldownKey, Date.now() / 1000 + 5 * 60, {
      ex: 5 * 60
    })

    // Increment daily count
    await redis.incr(dailyKey)
    await redis.expire(dailyKey, 24 * 60 * 60)

    // Increment total count
    await redis.incr(totalKey)

    // Store in Google Sheets
    const timestamp = new Date().toISOString()
    const row = [timestamp, name, email, mobile, message, ip]
    
    console.log('Google Sheets Configuration:', {
      spreadsheetId: SPREADSHEET_ID,
      sheetName: SHEET_NAME,
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY
    })

    try {
      console.log('Attempting to write to Google Sheets:', {
        spreadsheetId: SPREADSHEET_ID,
        sheetName: SHEET_NAME,
        row
      })

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:F`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [row],
        },
      })

      console.log('Google Sheets Response:', response.data)
      console.log('Successfully wrote to Google Sheets')
    } catch (sheetsError: any) {
      console.error('Google Sheets Error Details:', {
        message: sheetsError.message,
        code: sheetsError.code,
        errors: sheetsError.errors,
        stack: sheetsError.stack
      })
      // Continue with WhatsApp even if Sheets fails
    }

    // Send WhatsApp message
    const whatsappMessage = `New Lead from Website:\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`
    
    console.log('Form submitted successfully:', { name, email, mobile })
    return NextResponse.json({ 
      success: true,
      whatsappUrl 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}