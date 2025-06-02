import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Log to both console and response
  const logMessage = `🔔 TEST LOG - ${new Date().toISOString()}`
  console.log('\n\n' + logMessage + '\n\n')
  
  try {
    const body = await request.json()
    console.log('Received body:', body)
    
    return NextResponse.json({ 
      success: true, 
      message: logMessage,
      receivedData: body 
    })
  } catch (error) {
    console.error('Test log error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
} 