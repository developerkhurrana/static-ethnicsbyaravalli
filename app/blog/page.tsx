import { Metadata } from "next"
import { BlogList } from "@/components/blog/blog-list"

export const metadata: Metadata = {
  title: "Blog - Ethnics by Aravalli",
  description: "Latest news, updates, and insights from Ethnics by Aravalli - your trusted manufacturer of premium ethnic wear in Jaipur.",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BlogList />
    </div>
  )
} 