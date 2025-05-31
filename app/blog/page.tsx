import { Metadata } from "next"
import { BlogList } from "@/components/blog/blog-list"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata: Metadata = {
  title: "Blog - Ethnics by Aravalli",
  description: "Latest news, updates, and insights from Ethnics by Aravalli - your trusted manufacturer of premium ethnic wear in Jaipur.",
}

export default function BlogPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <SectionHeader
        title="Blog"
        description="Discover the latest insights, trends, and stories from Ethnics by Aravalli."
        className="mb-12"
      />
      <BlogList />
    </div>
  )
} 