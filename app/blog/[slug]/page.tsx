import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Metadata } from 'next'
import React from 'react'
import { notFound } from "next/navigation"
import { getBlogPost, getRelatedPosts } from "@/lib/blog"

// This would typically come from a CMS or API
const blogPosts = {
  "sustainable-ethnic-fashion": {
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
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    author: {
      name: "Priya Sharma",
      role: "Fashion Sustainability Expert",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "eco-friendly-dyes": {
    title: "Revolutionizing Ethnic Wear with Natural Dyes",
    content: `
      <p>The art of natural dyeing is making a comeback in ethnic wear, bringing both environmental benefits and unique aesthetics to contemporary fashion.</p>

      <h2>Traditional Dyeing Techniques</h2>
      <ul>
        <li>Indigo dyeing from natural sources</li>
        <li>Turmeric and henna-based colors</li>
        <li>Flower and plant-based dyes</li>
        <li>Mineral-based natural pigments</li>
        <li>Traditional mordant techniques</li>
      </ul>

      <h2>Environmental Benefits</h2>
      <p>Natural dyes offer numerous environmental advantages over synthetic alternatives, including biodegradability and reduced water pollution.</p>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    author: {
      name: "Arjun Mehta",
      role: "Textile Conservationist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "summer-trends-2024": {
    title: "Top Ethnic Wear Trends for Summer 2024",
    content: `
      <p>Summer 2024 brings exciting new trends in ethnic wear that blend traditional aesthetics with modern sensibilities. From lightweight fabrics to contemporary designs, this season is all about comfort and style.</p>

      <h2>Key Summer Trends</h2>
      <ul>
        <li>Lightweight cotton and linen fabrics</li>
        <li>Pastel and vibrant color combinations</li>
        <li>Contemporary fusion wear</li>
        <li>Minimalist embroidery and embellishments</li>
        <li>Versatile layering pieces</li>
      </ul>

      <h2>Popular Styles</h2>
      <p>This summer, we&apos;re seeing a rise in:</p>
      <ul>
        <li>Anarkali suits with modern cuts</li>
        <li>Palazzo pants with kurta tops</li>
        <li>Asymmetric hemlines</li>
        <li>Mix-and-match separates</li>
        <li>Contemporary saree drapes</li>
      </ul>

      <h2>Color Palette</h2>
      <p>The summer 2024 color palette includes:</p>
      <ul>
        <li>Soft pastels: mint green, peach, lavender</li>
        <li>Vibrant hues: coral, turquoise, fuchsia</li>
        <li>Neutral tones: beige, ivory, light gray</li>
        <li>Earthy shades: terracotta, sage green</li>
      </ul>

      <h2>Styling Tips</h2>
      <p>Make the most of summer ethnic wear with these styling tips:</p>
      <ul>
        <li>Layer lightweight pieces for versatility</li>
        <li>Accessorize with minimal jewelry</li>
        <li>Choose breathable fabrics</li>
        <li>Mix traditional and contemporary elements</li>
        <li>Focus on comfort without compromising style</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Trends",
    author: {
      name: "Rahul Verma",
      role: "Fashion Trend Analyst",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "festival-collection": {
    title: "Festival Season Ethnic Wear Guide 2024",
    content: `
      <p>Discover the perfect ethnic ensembles for the upcoming festival season, combining traditional elements with contemporary style.</p>

      <h2>Festival Fashion Essentials</h2>
      <ul>
        <li>Statement anarkali suits</li>
        <li>Embroidered lehengas</li>
        <li>Designer sarees</li>
        <li>Fusion kurtas</li>
        <li>Traditional jewelry pairings</li>
      </ul>

      <h2>Color Trends</h2>
      <p>This festival season embraces both traditional and modern color palettes, from rich jewel tones to contemporary pastels.</p>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 8, 2024",
    readTime: "5 min read",
    category: "Trends",
    author: {
      name: "Sneha Patel",
      role: "Fashion Editor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    },
  },
  "modern-traditional-styling": {
    title: "How to Style Traditional Wear for Modern Occasions",
    content: `
      <p>Traditional ethnic wear has evolved to meet the demands of modern lifestyles. Learn how to style these timeless pieces for contemporary occasions while maintaining their cultural essence.</p>

      <h2>Fusion Styling Techniques</h2>
      <ul>
        <li>Pair traditional kurtas with modern denim</li>
        <li>Layer ethnic pieces with contemporary jackets</li>
        <li>Mix traditional and western accessories</li>
        <li>Experiment with modern draping styles</li>
        <li>Combine traditional embroidery with modern silhouettes</li>
      </ul>

      <h2>Occasion-Specific Styling</h2>
      <p>Different occasions call for different approaches:</p>
      <ul>
        <li>Office wear: Subtle prints and minimal embellishments</li>
        <li>Casual outings: Comfortable fabrics and relaxed fits</li>
        <li>Evening events: Rich fabrics and statement pieces</li>
        <li>Festive occasions: Traditional elements with modern cuts</li>
      </ul>

      <h2>Accessorizing Tips</h2>
      <p>Modern accessories can transform traditional wear:</p>
      <ul>
        <li>Statement jewelry with minimal outfits</li>
        <li>Contemporary bags with traditional ensembles</li>
        <li>Modern footwear options</li>
        <li>Layered neckpieces for added dimension</li>
      </ul>

      <h2>Color and Pattern Coordination</h2>
      <p>Master the art of combining colors and patterns:</p>
      <ul>
        <li>Mix solid colors with subtle prints</li>
        <li>Layer complementary patterns</li>
        <li>Use color blocking techniques</li>
        <li>Balance traditional and modern color palettes</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Styling",
    author: {
      name: "Ananya Patel",
      role: "Fashion Stylist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    },
  },
  "office-ethnic-wear": {
    title: "Professional Ethnic Wear for the Modern Workplace",
    content: `
      <p>Discover how to incorporate ethnic wear into your professional wardrobe while maintaining a polished and contemporary look.</p>

      <h2>Office-Appropriate Ethnic Wear</h2>
      <ul>
        <li>Tailored kurtas with formal pants</li>
        <li>Minimalist saree drapes</li>
        <li>Structured anarkali suits</li>
        <li>Professional color palettes</li>
        <li>Subtle embellishments</li>
      </ul>

      <h2>Styling Tips</h2>
      <p>Learn how to balance traditional elements with professional requirements for a perfect office look.</p>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "March 3, 2024",
    readTime: "5 min read",
    category: "Styling",
    author: {
      name: "Vikram Singh",
      role: "Corporate Fashion Consultant",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "hand-embroidery-art": {
    title: "The Art of Hand Embroidery in Ethnic Wear",
    content: `
      <p>Hand embroidery is a centuries-old art form that continues to define the beauty of ethnic wear. Discover the intricate techniques and cultural significance behind these stunning creations.</p>

      <h2>Traditional Embroidery Techniques</h2>
      <ul>
        <li>Zardozi: Metallic thread embroidery</li>
        <li>Chikankari: Delicate white thread work</li>
        <li>Kantha: Running stitch embroidery</li>
        <li>Phulkari: Floral pattern embroidery</li>
        <li>Mirror work: Reflective embellishments</li>
      </ul>

      <h2>Regional Specialties</h2>
      <p>Different regions of India are known for unique embroidery styles:</p>
      <ul>
        <li>Lucknow: Chikankari</li>
        <li>Kashmir: Sozni and Aari work</li>
        <li>Gujarat: Mirror work and bead embroidery</li>
        <li>West Bengal: Kantha stitch</li>
        <li>Punjab: Phulkari</li>
      </ul>

      <h2>Modern Applications</h2>
      <p>Contemporary designers are innovating with traditional techniques:</p>
      <ul>
        <li>Fusion of multiple embroidery styles</li>
        <li>Use of unconventional materials</li>
        <li>Abstract and geometric patterns</li>
        <li>Minimalist embroidery designs</li>
        <li>Sustainable embroidery practices</li>
      </ul>

      <h2>Preserving the Craft</h2>
      <p>Efforts to sustain this traditional art form include:</p>
      <ul>
        <li>Training programs for artisans</li>
        <li>Fair trade practices</li>
        <li>Documentation of techniques</li>
        <li>Innovation in design</li>
        <li>Market access for artisans</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Craftsmanship",
    author: {
      name: "Meera Kapoor",
      role: "Textile Conservationist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    },
  },
  "block-printing": {
    title: "The Revival of Traditional Block Printing",
    content: `
      <p>Explore the ancient art of block printing and its modern applications in contemporary ethnic wear.</p>

      <h2>Block Printing Techniques</h2>
      <ul>
        <li>Wooden block carving</li>
        <li>Natural dye preparation</li>
        <li>Traditional printing methods</li>
        <li>Contemporary adaptations</li>
        <li>Digital block printing</li>
      </ul>

      <h2>Cultural Significance</h2>
      <p>Understanding the cultural heritage and regional variations in block printing techniques.</p>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 25, 2024",
    readTime: "6 min read",
    category: "Craftsmanship",
    author: {
      name: "Rajesh Kumar",
      role: "Textile Artist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "successful-ethnic-boutique": {
    title: "Building a Successful Ethnic Wear Boutique",
    content: `
      <p>Creating a thriving ethnic wear boutique requires a perfect blend of business acumen and fashion expertise. Learn the essential strategies for success in this competitive market.</p>

      <h2>Key Success Factors</h2>
      <ul>
        <li>Curated product selection</li>
        <li>Quality assurance</li>
        <li>Customer service excellence</li>
        <li>Strategic pricing</li>
        <li>Effective marketing</li>
      </ul>

      <h2>Inventory Management</h2>
      <p>Smart inventory practices include:</p>
      <ul>
        <li>Seasonal planning</li>
        <li>Stock rotation</li>
        <li>Size range optimization</li>
        <li>Trend forecasting</li>
        <li>Supplier relationships</li>
      </ul>

      <h2>Customer Experience</h2>
      <p>Enhance your boutique&apos;s appeal with:</p>
      <ul>
        <li>Personalized styling services</li>
        <li>Comfortable fitting rooms</li>
        <li>Knowledgeable staff</li>
        <li>Loyalty programs</li>
        <li>After-sales service</li>
      </ul>

      <h2>Marketing Strategies</h2>
      <p>Effective marketing approaches include:</p>
      <ul>
        <li>Social media presence</li>
        <li>Fashion shows and events</li>
        <li>Collaborations with influencers</li>
        <li>Email marketing</li>
        <li>Community engagement</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 20, 2024",
    readTime: "8 min read",
    category: "Business",
    author: {
      name: "Vikram Singh",
      role: "Retail Business Consultant",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "online-ethnic-retail": {
    title: "The Future of Ethnic Wear E-commerce",
    content: `
      <p>Explore the evolving landscape of online ethnic wear retail and discover strategies for success in the digital marketplace.</p>

      <h2>Digital Retail Strategies</h2>
      <ul>
        <li>Virtual try-on technology</li>
        <li>Social media marketing</li>
        <li>Customer engagement</li>
        <li>Inventory management</li>
        <li>Logistics optimization</li>
      </ul>

      <h2>Market Trends</h2>
      <p>Understanding current market dynamics and future projections for online ethnic wear retail.</p>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 18, 2024",
    readTime: "7 min read",
    category: "Business",
    author: {
      name: "Priya Sharma",
      role: "E-commerce Expert",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    },
  },
  "modern-bridal-wear": {
    title: "The Evolution of Bridal Wear in Modern India",
    content: `
      <p>Bridal wear in India has undergone a remarkable transformation, blending traditional elements with contemporary design sensibilities. Explore how modern brides are redefining wedding fashion.</p>

      <h2>Contemporary Bridal Trends</h2>
      <ul>
        <li>Fusion of traditional and modern elements</li>
        <li>Lighter weight fabrics</li>
        <li>Contemporary color palettes</li>
        <li>Innovative silhouettes</li>
        <li>Personalized design elements</li>
      </ul>

      <h2>Design Innovations</h2>
      <p>Modern bridal wear features:</p>
      <ul>
        <li>Asymmetric hemlines</li>
        <li>Mix of traditional and modern fabrics</li>
        <li>Contemporary embroidery patterns</li>
        <li>Versatile separates</li>
        <li>Customizable elements</li>
      </ul>

      <h2>Color Evolution</h2>
      <p>Beyond traditional red, modern brides are choosing:</p>
      <ul>
        <li>Pastel shades</li>
        <li>Metallic tones</li>
        <li>Jewel tones</li>
        <li>Monochromatic looks</li>
        <li>Color blocking</li>
      </ul>

      <h2>Styling Tips</h2>
      <p>Modern bridal styling includes:</p>
      <ul>
        <li>Contemporary jewelry</li>
        <li>Modern makeup looks</li>
        <li>Innovative draping styles</li>
        <li>Mix of traditional and modern accessories</li>
        <li>Personalized elements</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Bridal",
    author: {
      name: "Neha Sharma",
      role: "Bridal Fashion Expert",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    },
  },
  "wedding-season-guide": {
    title: "Complete Wedding Season Style Guide 2024",
    content: `
      <p>Your comprehensive guide to wedding season fashion, from engagement ceremonies to reception parties.</p>

      <h2>Wedding Event Wardrobe</h2>
      <ul>
        <li>Engagement ceremony outfits</li>
        <li>Mehendi ceremony ensembles</li>
        <li>Wedding day attire</li>
        <li>Reception party looks</li>
        <li>Guest wear options</li>
      </ul>

      <h2>Accessorizing Tips</h2>
      <p>Learn how to complement your wedding wear with the perfect jewelry and accessories.</p>
    `,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    date: "February 12, 2024",
    readTime: "8 min read",
    category: "Bridal",
    author: {
      name: "Ananya Patel",
      role: "Wedding Stylist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    },
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: ['Ethnics by Aravalli'],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <Link 
          href="/blog" 
          className="mb-12 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="w-full">
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-lg">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.role}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 relative w-full h-[600px] overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-slate max-w-none dark:prose-invert 
              prose-headings:font-serif prose-headings:font-bold 
              prose-h1:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-6 text-muted-foreground">
              More Articles You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.title}
                  href={`/blog/${Object.entries(blogPosts).find(([, post]) => post.title === relatedPost.title)?.[0]}`}
                  className="group h-full"
                >
                  <div className="rounded-lg border bg-card overflow-hidden shadow-sm transition hover:shadow-md h-full flex flex-col">
                    <div className="relative w-full h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {relatedPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-[#D9A8A0] transition">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-auto">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={relatedPost.author.image}
                            alt={relatedPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {relatedPost.author.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
