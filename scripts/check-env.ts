#!/usr/bin/env tsx

console.log('🔍 Environment Check for Rate Limiting')
console.log('=====================================')

const requiredEnvVars = [
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN'
]

console.log('\n📋 Checking required environment variables:')
requiredEnvVars.forEach(varName => {
  const value = process.env[varName]
  const status = value ? '✅ Present' : '❌ Missing'
  console.log(`${varName}: ${status}`)
  if (value) {
    console.log(`  Value: ${value.substring(0, 20)}...`)
  }
})

console.log('\n🔧 NODE_ENV:', process.env.NODE_ENV || 'not set')

console.log('\n💡 Recommendations:')
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.log('1. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables')
  console.log('2. Or the rate limiting will be automatically disabled (which is fine for development)')
} else {
  console.log('✅ All environment variables are set correctly')
}

console.log('\n📝 Note: Rate limiting will be disabled if Redis is not available, which is fine for development.')
