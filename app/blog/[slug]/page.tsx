import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"

// This would typically come from a CMS or API
const blogPost = {
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
  image: "/blog/sustainable-fashion.jpg",
  date: "March 15, 2024",
  readTime: "5 min read",
  category: "Sustainability",
  author: {
    name: "Priya Sharma",
    role: "Fashion Sustainability Expert",
    image: "/blog/authors/priya.jpg",
  },
}

export const metadata = {
  title: blogPost.title,
  description: "Discover how sustainable practices are transforming the ethnic wear industry.",
}

export default function BlogPostPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col py-12">
      <div className="container max-w-7xl flex-1 flex flex-col">
        <Link href="/blog" className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {blogPost.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blogPost.readTime}
              </span>
            </div>
            <h1 className="mb-4 font-serif text-4xl font-bold">
              {blogPost.title}
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src={blogPost.author.image}
                alt={blogPost.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{blogPost.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {blogPost.author.role}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              width={1200}
              height={675}
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-slate max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="mt-12 flex items-center justify-between border-t pt-8">
            <Button variant="outline" size="lg">
              Share Article
            </Button>
            <Link href="/blog">
              <Button variant="ghost" size="lg">
                Back to Blog
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
} 