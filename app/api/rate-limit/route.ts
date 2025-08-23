import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client with fallback
let redis: Redis | null = null

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  } else {
    console.warn('⚠️ Redis environment variables not configured, rate limiting will be disabled')
  }
} catch (error) {
  console.error('❌ Failed to initialize Redis client:', error)
  redis = null
}

// Rate limiting configuration
const RATE_LIMIT = {
  MAX_SUBMISSIONS: 3,
  COOLDOWN_PERIOD: 5 * 60, // 5 minutes in seconds
  DAILY_LIMIT: 5,
  RESET_TIME: 24 * 60 * 60, // 24 hours in seconds
}

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    const { mobile, action = 'contact' } = body
    
    // Validate mobile number first
    if (!mobile || typeof mobile !== 'string' || mobile.trim().length === 0) {
      console.log('❌ Invalid mobile number:', mobile)
      return NextResponse.json(
        { error: 'Invalid mobile number' },
        { status: 400 }
      )
    }

    // In development or if Redis is not available, bypass rate limiting
    if (process.env.NODE_ENV === 'development' || !redis) {
      console.log('🛠️ Bypassing rate limits:', { 
        reason: process.env.NODE_ENV === 'development' ? 'development mode' : 'redis not available',
        mobile,
        action
      })
      return NextResponse.json({ 
        success: true,
        token: `${mobile}:${action}:${Date.now()}`,
        bypassed: true
      })
    }

    // Get IP from Vercel headers
    const ip = request.headers.get('x-real-ip') || 
              request.headers.get('x-forwarded-for')?.split(',')[0] || 
              '127.0.0.1'
    
    console.log('Rate limit check:', { ip, mobile, action })
    
    // Create unique keys for this user
    const cooldownKey = `cooldown:${mobile}:${action}`
    const dailyKey = `daily:${mobile}:${action}`
    const totalKey = `total:${mobile}:${action}`

    try {
      // Check cooldown period
      const cooldown = await redis.get(cooldownKey)
      if (cooldown) {
        const remainingTime = Math.ceil((Number(cooldown) - Date.now() / 1000))
        console.log('⏳ Cooldown active:', { 
          remainingTime, 
          cooldownKey,
          mobile,
          action
        })
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
        console.log('🚫 Daily limit reached:', { 
          dailyCount,
          dailyKey,
          mobile,
          action
        })
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
        console.log('🚫 Total limit reached:', { 
          totalCount,
          totalKey,
          mobile,
          action
        })
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

      console.log('✅ Rate limit passed, counters incremented')
      return NextResponse.json({ 
        success: true,
        token: `${mobile}:${action}:${Date.now()}` // Simplified token without IP
      })
    } catch (redisError) {
      console.error('❌ Redis operation failed:', redisError)
      // If Redis fails, fall back to bypassing rate limits
      console.log('🔄 Falling back to bypass due to Redis error')
      return NextResponse.json({ 
        success: true,
        token: `${mobile}:${action}:${Date.now()}`,
        bypassed: true,
        reason: 'redis_error'
      })
    }
  } catch (error) {
    console.error('❌ Rate limit error:', error)
    
    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 