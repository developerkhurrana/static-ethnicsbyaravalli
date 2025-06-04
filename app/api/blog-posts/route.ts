import { NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/notion'

interface BlogPost {
  slug: string
  createdAt: string
  updatedAt: string
}

// This is a placeholder - replace with your actual blog data fetching logic
export async function GET() {
  try {
    const blogPosts = await getBlogPosts()
    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json([], { status: 500 })
  }
} 