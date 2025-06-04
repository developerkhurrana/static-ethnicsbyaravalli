"use client"

import { useEffect, useRef } from 'react'

interface KeywordTickerProps {
  keywords: string[]
  className?: string
}

export function KeywordTicker({ keywords, className = '' }: KeywordTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    // Remove any previous clones
    while (container.children.length > 1) {
      container.removeChild(container.lastChild!)
    }

    // Clone the keywords for seamless looping
    const clone = content.cloneNode(true) as HTMLElement
    container.appendChild(clone)

    // Calculate animation duration based on content width
    const contentWidth = content.offsetWidth
    const duration = contentWidth * 0.05 // Slower speed for better readability

    // Set initial animation
    const setAnimation = () => {
      container.style.animation = `scroll ${duration}s linear infinite`
    }
    setAnimation()

    // Reset animation when it completes
    const handleAnimationEnd = () => {
      // Remove animation
      container.style.animation = 'none'
      // Force a reflow by setting and getting a property
      void container.getBoundingClientRect()
      // Re-add animation
      setAnimation()
    }

    container.addEventListener('animationend', handleAnimationEnd)
    return () => container.removeEventListener('animationend', handleAnimationEnd)
  }, [keywords])

  return (
    <section 
      aria-label="Popular Searches" 
      className={`relative overflow-hidden bg-gray-50 py-4 ${className}`}
    >
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="flex whitespace-nowrap"
        role="marquee"
        aria-label="Scrolling keywords"
      >
        <ul 
          ref={contentRef}
          className="flex items-center space-x-8 px-4"
          role="list"
        >
          {keywords.map((keyword, index) => (
            <li 
              key={`${keyword}-${index}`}
              className="inline-flex items-center text-gray-600 hover:text-[#D9A8A0] transition-colors duration-200 opacity-70 hover:opacity-100"
            >
              <span className="text-xs md:text-sm font-medium">{keyword}</span>
              {index < keywords.length - 1 && (
                <span className="mx-4 text-gray-300">•</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
 