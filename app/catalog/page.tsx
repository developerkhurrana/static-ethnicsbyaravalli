"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Search } from "lucide-react"
import { getAllCatalogProducts } from "@/lib/catalog-data"

// Product categories
const categories = [
  "All",
  "Kurti Sets",
  "Suit Sets",
  "Co-ord Sets",
  "Kaftans",
  "Dresses",
  "Anarkalis",
  "Tops",
  "Tunics"
]

// Available sizes
const sizes = [
  "All",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL"
]

// Fetch products from catalog-data
const products = getAllCatalogProducts();

export default function CatalogPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSize, setSelectedSize] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products based on category, size and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSize = selectedSize === "All" || product.availableSizes.includes(selectedSize)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSize && matchesSearch
  })

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        <SectionHeader
          title="Product Catalog"
          description="Explore our premium collection of ethnic wear, crafted with precision in Jaipur."
          className="mb-8"
        />

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search field full width on all screens */}
          <div className="w-full">
            <label htmlFor="search" className="block text-sm font-medium text-[#4A3A3A] mb-1.5">
              Search Products
            </label>
            <div className="relative">
              <Input
                id="search"
                placeholder="Search by name, description, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 w-full"
                aria-label="Search products"
              />
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          {/* Filters and view in a row below search on mobile, in a row on desktop */}
          <div className="flex flex-col gap-2 mt-2 sm:mt-0 sm:flex-row sm:items-end sm:gap-4 sm:w-auto w-full">
            <div className="flex flex-col sm:flex-none flex-1 min-w-0 sm:w-[180px]">
              <label htmlFor="category" className="block text-sm font-medium text-[#4A3A3A] mb-1.5">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-none flex-1 min-w-0 sm:w-[120px]">
              <label htmlFor="size" className="block text-sm font-medium text-[#4A3A3A] mb-1.5">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size" className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-none items-end justify-end min-w-[60px]">
              <label className="block text-sm font-medium text-[#4A3A3A] mb-1.5">
                View
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden rounded-lg ${
                view === "list" ? "flex gap-6" : "flex flex-col"
              } bg-white border border-[#E5E0DC] shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <Link href={`/catalog/${product.slug}`} className={`relative overflow-hidden block ${view === "list" ? "w-1/3" : "aspect-[3/4]"}`} tabIndex={-1}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Image
                  src={product.images[1]}
                  alt={`${product.name} - Hover`}
                  fill
                  className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0"
                />
              </Link>
              <div className={`p-6 flex flex-col ${view === "list" ? "flex-1" : ""}`}>
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-[#F9F6F4] text-[#D9A8A0] rounded-full">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  <Link href={`/catalog/${product.slug}`} className="hover:text-[#D9A8A0] transition-colors duration-200">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4 flex-1">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs font-medium bg-[#F9F6F4] text-[#4A3A3A] rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.availableSizes.map((size) => (
                    <span
                      key={size}
                      className="inline-block px-2 py-1 text-xs font-medium bg-[#F9F6F4] text-[#4A3A3A] rounded-full"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <Button 
                  asChild 
                  className="w-full bg-[#D9A8A0] text-white hover:bg-[#C08478] hover:text-white"
                >
                  <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                    Inquire Now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 