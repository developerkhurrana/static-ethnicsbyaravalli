export interface Author {
  name: string
  role: string
  image: string
}

export interface BlogPost {
  slug: string
  title: string
  content: string
  image: string
  date: string
  readTime: string
  category: string
  author: Author
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sustainable-ethnic-fashion",
    title: "The Rise of Sustainable Ethnic Fashion",
    content: `
      <p>The ethnic wear industry is undergoing a significant transformation, with sustainability taking center stage. As consumers become more conscious of their environmental impact, the demand for eco-friendly fashion has never been higher.</p>

      <h2>The Impact of Sustainable Practices</h2>
      <p>Traditional ethnic wear manufacturing has often been associated with water-intensive processes and chemical dyes. However, modern manufacturers are adopting sustainable practices that reduce environmental impact while maintaining the quality and beauty of ethnic wear.</p>

      <h2>Key Sustainable Initiatives</h2>
      <ul>
        <li>Use of organic and natural fibers</li>
        <li>Eco-friendly dyeing processes</li>
        <li>Water conservation in production</li>
        <li>Waste reduction and recycling</li>
        <li>Ethical labor practices</li>
      </ul>

      <h2>Benefits for Retailers</h2>
      <p>For boutique owners and retailers, embracing sustainable ethnic wear offers several advantages:</p>
      <ul>
        <li>Appeal to environmentally conscious customers</li>
        <li>Higher perceived value of products</li>
        <li>Long-term cost savings through efficient processes</li>
        <li>Positive brand image and customer loyalty</li>
      </ul>

      <h2>The Future of Sustainable Ethnic Fashion</h2>
      <p>As the industry continues to evolve, we can expect to see more innovations in sustainable practices. From biodegradable packaging to carbon-neutral manufacturing, the future of ethnic wear is green.</p>
    `,
    image: "https://byshree.com/cdn/shop/articles/The-Rise-of-Sustainable-and-Ethical-Ethnic-Fashion.png?v=1695105858&width=2048",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    author: {
      name: "Priya Sharma",
      role: "Fashion Sustainability Expert",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    },
  },
  // Add more blog posts here...
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
} 