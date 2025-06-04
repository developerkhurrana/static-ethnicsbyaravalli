'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BlogPostImageProps {
  src: string
  alt: string
  className?: string
}

export function BlogPostImage({ src, alt, className }: BlogPostImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Log the image source when component mounts
    console.log('BlogPostImage - Image source:', src)
    
    // Only validate URLs that start with http:// or https://
    if (src.startsWith('http://') || src.startsWith('https://')) {
      try {
        const url = new URL(src)
        console.log('BlogPostImage - Valid URL:', url.toString())
      } catch (e) {
        console.error('BlogPostImage - Invalid URL:', src)
        setImageError(true)
        setIsLoading(false)
      }
    } else {
      // For relative paths, just log that we're using a relative path
      console.log('BlogPostImage - Using relative path:', src)
    }
  }, [src])

  if (imageError) {
    console.log('BlogPostImage - Error state, showing fallback')
    return (
      <div className={cn("relative w-full overflow-hidden bg-muted", className)}>
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative w-full overflow-hidden bg-muted", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-transform duration-300 group-hover:scale-110",
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        priority
        itemProp="image"
        onLoad={() => {
          console.log('BlogPostImage - Image loaded successfully:', src)
          setIsLoading(false)
        }}
        onError={() => {
          console.error('BlogPostImage - Image failed to load:', src)
          setImageError(true)
          setIsLoading(false)
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        unoptimized={src.startsWith('data:') || src.startsWith('blob:')}
      />
    </div>
  )
} 