import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Metadata } from 'next'
import React from 'react'

import { Button } from "@/components/ui/button"

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
    image: "https://byshree.com/cdn/shop/articles/The-Rise-of-Sustainable-and-Ethical-Ethnic-Fashion.png?v=1695105858&width=2048",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    author: {
      name: "Priya Sharma",
      role: "Fashion Sustainability Expert",
      image: "https://avatar.iran.liara.run/public/girl?username=Priya",
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
    image: "https://www.ethnicplus.in/media/magefan_blog/ezgif-4-164a313f07.webp",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Trends",
    author: {
      name: "Rahul Verma",
      role: "Fashion Trend Analyst",
      image: "https://avatar.iran.liara.run/public?name=Rahul",
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
    image: "https://c.ndtvimg.com/2024-10/g3sh1kr8_cakes_625x300_18_October_24.jpg",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Styling",
    author: {
      name: "Ananya Patel",
      role: "Fashion Stylist",
      image: "https://avatar.iran.liara.run/public/girl?username=Ananya",
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
    image: "https://media.istockphoto.com/id/1193642393/photo/female-needlework-on-fabric-material-close-up-view-unidentified-tribal-women-sewing-ethnic.jpg?s=612x612&w=0&k=20&c=lwQ5wV5wzrnbqdoi-KciE9ec55LQD3wUvtWAc5lNJ-w=",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Craftsmanship",
    author: {
      name: "Meera Kapoor",
      role: "Textile Conservationist",
      image: "https://avatar.iran.liara.run/public/girl?username=Meera",
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
    image: "https://i.pinimg.com/736x/4c/19/e7/4c19e7132f4b4bdf2c1106ea8c44b53a.jpg",
    date: "February 20, 2024",
    readTime: "8 min read",
    category: "Business",
    author: {
      name: "Vikram Singh",
      role: "Retail Business Consultant",
      image: "https://avatar.iran.liara.run/public/boy?username=Vikram",
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
    image: "https://cdn.shopify.com/s/files/1/2196/3271/files/Evolution_of_Indian_wedding_fashion_1024x1024.png?v=1680083169",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Bridal",
    author: {
      name: "Neha Sharma",
      role: "Bridal Fashion Expert",
      image: "https://avatar.iran.liara.run/public/girl?username=Neha",
    },
  },
}

// Sample related products (replace with real data or fetch from your catalog)
const relatedProducts = [
  {
    id: 1,
    name: "Aqua Blue Printed Kurta Set",
    image: "https://i.pinimg.com/736x/10/f3/9f/10f39fe521ff063430d0afe5259bfd11.jpg",
    url: "/collections/aqua-blue-printed-kurta-set",
  },
  {
    id: 2,
    name: "Pastel Pink Anarkali Suit",
    image: "https://i.pinimg.com/736x/56/5b/64/565b641a12eaa255d72ba6a6de873db7.jpg",
    url: "/collections/pastel-pink-anarkali-suit",
  },
  {
    id: 3,
    name: "Hand-Embroidered Dupatta",
    image: "https://i.pinimg.com/736x/c6/05/9c/c6059cdf4ea1cc744a89c5374bb8dc57.jpg",
    url: "/collections/hand-embroidered-dupatta",
  },
]

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  return {
    title: post?.title || "Blog Post",
    description: "Discover the latest trends and insights in ethnic wear.",
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }): Promise<React.ReactElement> {
  const post = await Promise.resolve(blogPosts[params.slug as keyof typeof blogPosts])

  if (!post) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12">
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-16">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <Link href="/blog" className="mb-12 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
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
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
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
      </div>
    </div>
  )
}
