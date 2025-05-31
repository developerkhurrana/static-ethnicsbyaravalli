import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Rate limiting configuration
const RATE_LIMIT = {
  MAX_SUBMISSIONS: 3,
  COOLDOWN_PERIOD: 5 * 60, // 5 minutes in seconds
  DAILY_LIMIT: 5,
  RESET_TIME: 24 * 60 * 60, // 24 hours in seconds
}

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json()
    
    // Get IP from Vercel headers
    const ip = request.headers.get('x-real-ip') || 
              request.headers.get('x-forwarded-for')?.split(',')[0] || 
              '127.0.0.1'
    
    console.log('Rate limit check:', { ip, mobile })
    
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
    if (Number(dailyCount) >= RATE_LIMIT.DAILY_LIMIT) {
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
    if (Number(totalCount) >= RATE_LIMIT.MAX_SUBMISSIONS) {
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
    await redis.set(cooldownKey, Date.now() / 1000 + RATE_LIMIT.COOLDOWN_PERIOD, {
      ex: RATE_LIMIT.COOLDOWN_PERIOD
    })

    // Increment daily count
    await redis.incr(dailyKey)
    await redis.expire(dailyKey, RATE_LIMIT.RESET_TIME)

    // Increment total count
    await redis.incr(totalKey)

    console.log('Rate limit passed, counters incremented')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Rate limit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 