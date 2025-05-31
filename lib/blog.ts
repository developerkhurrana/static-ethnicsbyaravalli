interface BlogPost {
  title: string
  date: string
  excerpt: string
  content: string
}

// This is a placeholder. In a real application, you would fetch this data from a CMS or database
const blogPosts: Record<string, BlogPost> = {
  'how-to-order': {
    title: 'How to Order from Ethnics by Aravalli',
    date: '2024-03-20',
    excerpt: 'Learn about our ordering process and how to get started with your bulk orders.',
    content: `
      <h2>Ordering Process</h2>
      <p>At Ethnics by Aravalli, we make bulk ordering simple and efficient. Here's how to get started:</p>
      
      <h3>1. Contact Us</h3>
      <p>Reach out to us through our contact form or WhatsApp to discuss your requirements.</p>
      
      <h3>2. Sample Review</h3>
      <p>We'll send you samples of our products for your review and approval.</p>
      
      <h3>3. Order Confirmation</h3>
      <p>Once you're satisfied with the samples, we'll confirm your order details and timeline.</p>
      
      <h3>4. Production</h3>
      <p>Our skilled artisans will craft your order with precision and care.</p>
      
      <h3>5. Quality Check</h3>
      <p>Each piece undergoes rigorous quality control before dispatch.</p>
      
      <h3>6. Delivery</h3>
      <p>Your order will be carefully packaged and shipped to your location.</p>
    `
  },
  'become-retailer': {
    title: 'Become a Retailer with Ethnics by Aravalli',
    date: '2024-03-19',
    excerpt: 'Join our network of retailers and grow your business with our premium ethnic wear collection.',
    content: `
      <h2>Why Partner With Us?</h2>
      <p>Partnering with Ethnics by Aravalli offers numerous benefits for your retail business:</p>
      
      <h3>Premium Quality</h3>
      <p>Our products are crafted with the finest materials and attention to detail.</p>
      
      <h3>Competitive Pricing</h3>
      <p>We offer wholesale prices that ensure good margins for our retail partners.</p>
      
      <h3>Regular New Collections</h3>
      <p>Stay ahead with our regularly updated collections featuring the latest trends.</p>
      
      <h3>Marketing Support</h3>
      <p>We provide marketing materials and support to help you promote our products.</p>
      
      <h3>Flexible Ordering</h3>
      <p>Order in quantities that suit your business needs.</p>
    `
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return blogPosts[slug] || null
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return Object.values(blogPosts)
} 