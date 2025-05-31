import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mobile = searchParams.get('mobile')
    
    if (!mobile) {
      return NextResponse.json(
        { error: 'Missing mobile number' },
        { status: 400 }
      )
    }

    // Get IP from Vercel headers
    const ip = request.headers.get('x-real-ip') || 
              request.headers.get('x-forwarded-for')?.split(',')[0] || 
              '127.0.0.1'

    // Create unique keys for this user
    const cooldownKey = `cooldown:${ip}:${mobile}`
    const dailyKey = `daily:${ip}:${mobile}`
    const totalKey = `total:${ip}:${mobile}`

    // Get all counts
    const [cooldown, dailyCount, totalCount] = await Promise.all([
      redis.get(cooldownKey),
      redis.get(dailyKey),
      redis.get(totalKey)
    ])

    return NextResponse.json({
      ip,
      mobile,
      cooldown: cooldown ? Math.ceil((Number(cooldown) - Date.now() / 1000)) : 0,
      dailyCount: Number(dailyCount) || 0,
      totalCount: Number(totalCount) || 0,
      limits: {
        maxSubmissions: 3,
        dailyLimit: 5,
        cooldownPeriod: 5 * 60 // 5 minutes in seconds
      }
    })
  } catch (error) {
    console.error('Rate limit check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 