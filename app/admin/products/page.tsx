"use client";

import { useState, useEffect } from "react";
import ModernAdminLayout from "@/components/admin/modern-admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import ProductModal from "@/components/admin/product-modal";
import EditProductModal from "@/components/admin/edit-product-modal";
import ProductImageGallery from "@/components/admin/product-image-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Search, 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  category: string;
  sizes: string[];
  isActive: boolean;
  images: Array<{ url: string; alt: string; isPrimary?: boolean }>;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.category-dropdown')) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch {
      toast.error("An error occurred while fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete product ${product.itemName}?`)) {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`/api/admin/products/${product._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          toast.success("Product deleted successfully!");
          fetchProducts();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to delete product");
        }
      } catch (error) {
        toast.error("An error occurred while deleting product");
      }
    }
  };

  if (isLoading) {
    return (
      <AdminProtection>
        <ModernAdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A8A0] mx-auto mb-4"></div>
              <p className="text-[#4A3A3A]">Loading products...</p>
            </div>
          </div>
        </ModernAdminLayout>
      </AdminProtection>
    );
  }

  return (
    <AdminProtection>
      <ModernAdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E1B1B] flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                Products
              </h1>
              <p className="text-[#4A3A3A] mt-2">
                Manage your product catalog ({filteredProducts.length} products)
              </p>
            </div>
            <ProductModal 
              onProductCreated={fetchProducts}
              trigger={
                <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Product
                </Button>
              }
            />
          </div>

          {/* Search and Filters */}
          <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
              <Input
                placeholder="Search products by name, code, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                    className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative category-dropdown">
                    <button
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center gap-2 px-4 py-2 border border-[#E5E0DC] rounded-lg bg-white hover:bg-[#F9F6F4] transition-all duration-200 focus:border-[#D9A8A0] focus:ring-1 focus:ring-[#D9A8A0] outline-none"
                    >
                      <Tag className="h-4 w-4 text-[#4A3A3A]" />
                      <span className="text-[#2E1B1B] font-medium">
                        {selectedCategory === "all" ? "All Categories" : selectedCategory}
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-[#4A3A3A] transition-transform duration-200",
                        isCategoryOpen && "rotate-180"
                      )} />
                    </button>
                    
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E0DC] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                      >
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsCategoryOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-2 text-left transition-colors duration-150",
                              selectedCategory === category 
                                ? "bg-[#D9A8A0] text-[#2E1B1B] font-medium" 
                                : "hover:bg-[#F9F6F4] text-[#2E1B1B]",
                              category === categories[0] && "rounded-t-lg",
                              category === categories[categories.length - 1] && "rounded-b-lg"
                            )}
                          >
                            {category === "all" ? "All Categories" : category}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <div className="relative flex border border-[#E5E0DC] rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "relative flex items-center justify-center px-3 py-2 transition-all duration-200 ease-in-out",
                        viewMode === "grid" 
                          ? "text-[#2E1B1B] font-medium" 
                          : "text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4]"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4 relative z-10" />
                      {viewMode === "grid" && (
                        <motion.div
                          layoutId="viewToggle"
                          className="absolute inset-0 bg-[#D9A8A0] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "relative flex items-center justify-center px-3 py-2 transition-all duration-200 ease-in-out",
                        viewMode === "list" 
                          ? "text-[#2E1B1B] font-medium" 
                          : "text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4]"
                      )}
                    >
                      <List className="h-4 w-4 relative z-10" />
                      {viewMode === "list" && (
                        <motion.div
                          layoutId="viewToggle"
                          className="absolute inset-0 bg-[#D9A8A0] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product._id} className="border-[#E5E0DC] hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-3 flex flex-col h-full">
                    {/* Product Image */}
                    <div className="relative mb-3 flex-shrink-0">
                      <div className="aspect-square w-full relative bg-[#F9F6F4] rounded-lg border border-[#E5E0DC] overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <div className="relative w-full h-full">
                            <img
                              src={product.images.find(img => img.isPrimary)?.url || product.images[0].url}
                              alt={product.images.find(img => img.isPrimary)?.alt || product.images[0].alt || product.itemName}
                              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full bg-[#F9F6F4] rounded-lg flex items-center justify-center text-[#4A3A3A] text-sm font-medium">No Image</div>';
                                }
                              }}
                            />
                            {product.images.length > 1 && (
                              <Badge className="absolute top-1 right-1 bg-[#D9A8A0] text-[#2E1B1B] shadow-sm text-xs px-1.5 py-0.5">
                                {product.images.length}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full bg-[#F9F6F4] flex items-center justify-center text-[#4A3A3A] text-sm font-medium">
                            <div className="text-center">
                              <Package className="h-8 w-8 mx-auto mb-2 text-[#4A3A3A] opacity-50" />
                              <span>No Image</span>
                            </div>
                          </div>
                        )}
                        <Badge 
                          className={`absolute top-1 left-1 shadow-sm text-xs px-1.5 py-0.5 ${
                            product.isActive 
                              ? "bg-green-100 text-green-800 border border-green-200" 
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1.5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-[#2E1B1B] text-xs truncate flex-1 mr-1">{product.itemName}</h3>
                        <span className="text-xs text-[#4A3A3A] font-mono flex-shrink-0">{product.itemCode}</span>
                      </div>
                      
                      <div className="text-xs text-[#4A3A3A] space-y-0.5">
                        <p className="truncate"><span className="font-medium">C:</span> {product.color}</p>
                        <p className="truncate"><span className="font-medium">F:</span> {product.fabric}</p>
                        <p className="truncate"><span className="font-medium">Cat:</span> {product.category}</p>
                      </div>

                      <div className="flex flex-wrap gap-0.5">
                        {["XS", "S", "M", "L", "XL", "XXL", "3XL"].filter(size => (product.sizes || []).includes(size)).map(size => (
                          <span
                            key={size}
                            className="px-1.5 py-0.5 bg-[#D9A8A0] text-[#2E1B1B] rounded-full text-xs font-medium"
                          >
                            {size}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-1 mt-auto">
                        <div className="text-xs">
                          <p className="font-semibold text-[#2E1B1B]">₹{product.pricePerPc}</p>
                          <p className="text-xs text-[#4A3A3A]">Set: ₹{product.pricePerSet}</p>
                        </div>
                        <div className="flex gap-1">
                          {product.images && product.images.length > 1 && (
                            <ProductImageGallery 
                              images={product.images} 
                              productName={product.itemName}
                              trigger={
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-7 w-7 p-0 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] transition-all duration-200"
                                >
                                  <Eye className="h-3.5 w-3.5 text-[#4A3A3A]" />
                                </Button>
                              }
                            />
                          )}
                          <EditProductModal 
                            product={product} 
                            onProductUpdated={fetchProducts}
                            trigger={
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 w-7 p-0 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] transition-all duration-200"
                              >
                                <Edit className="h-3.5 w-3.5 text-[#4A3A3A]" />
                              </Button>
                            }
                          />
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-7 w-7 p-0 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200"
                            onClick={() => setDeleteConfirm(product._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* List View */
            <Card className="border-[#E5E0DC]">
              <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                      <tr className="border-b border-[#E5E0DC] bg-[#F9F6F4]">
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Image</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Item Code</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Item Name</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Color</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Fabric</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Category</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Sizes</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Price per PC</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Price per Set</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Status</th>
                        <th className="text-left p-4 font-semibold text-[#2E1B1B] text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id} className="border-b border-[#E5E0DC] hover:bg-[#F9F6F4] transition-colors duration-150">
                          <td className="p-4">
                          {product.images && product.images.length > 0 ? (
                            <div className="relative">
                              <img
                                src={product.images.find(img => img.isPrimary)?.url || product.images[0].url}
                                alt={product.images.find(img => img.isPrimary)?.alt || product.images[0].alt || product.itemName}
                                  className="w-14 h-14 object-cover rounded-lg border border-[#E5E0DC] shadow-sm"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                      parent.innerHTML = '<div class="w-14 h-14 bg-[#F9F6F4] rounded-lg border border-[#E5E0DC] flex items-center justify-center text-[#4A3A3A] text-xs shadow-sm"><Package className="h-4 w-4" /></div>';
                                  }
                                }}
                              />
                              {product.images.length > 1 && (
                                  <div className="absolute -top-1 -right-1 bg-[#D9A8A0] text-[#2E1B1B] text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm font-medium">
                                  {product.images.length}
                                </div>
                              )}
                            </div>
                          ) : (
                              <div className="w-14 h-14 bg-[#F9F6F4] rounded-lg border border-[#E5E0DC] flex items-center justify-center text-[#4A3A3A] text-xs shadow-sm">
                                <Package className="h-4 w-4" />
                            </div>
                          )}
                        </td>
                          <td className="p-4 font-medium text-[#2E1B1B]">{product.itemCode}</td>
                          <td className="p-4">
                          <div>
                              <div className="font-medium text-[#2E1B1B]">{product.itemName}</div>
                            {product.images && product.images.length > 1 && (
                              <ProductImageGallery 
                                images={product.images} 
                                productName={product.itemName}
                                trigger={
                                    <button className="text-xs text-[#D9A8A0] hover:underline transition-colors duration-150">
                                    View all images
                                  </button>
                                }
                              />
                            )}
                          </div>
                        </td>
                          <td className="p-4 text-[#4A3A3A]">{product.color}</td>
                          <td className="p-4 text-[#4A3A3A]">{product.fabric}</td>
                          <td className="p-4">
                            <Badge className="bg-[#D9A8A0] text-[#2E1B1B]">
                            {product.category}
                            </Badge>
                        </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1" style={{ maxWidth: 280 }}>
                            {["XS", "S", "M", "L", "XL", "XXL", "3XL"].filter(size => (product.sizes || []).includes(size)).map(size => {
                              const sizeMap = {
                                XS: '34"',
                                S: '36"',
                                M: '38"',
                                L: '40"',
                                XL: '42"',
                                XXL: '44"',
                                '3XL': '46"',
                              };
                              return (
                                <span
                                  key={size}
                                    className="px-2 py-0.5 bg-[#D9A8A0] text-[#2E1B1B] rounded-full text-xs font-medium whitespace-nowrap"
                                >
                                  {size}({sizeMap[size as keyof typeof sizeMap]})
                                </span>
                              );
                            })}
                          </div>
                        </td>
                          <td className="p-4 font-medium text-[#2E1B1B]">₹{product.pricePerPc}</td>
                          <td className="p-4 font-medium text-[#2E1B1B]">₹{product.pricePerSet}</td>
                          <td className="p-4">
                            <Badge className={
                            product.isActive 
                                ? "bg-green-100 text-green-800 border border-green-200" 
                                : "bg-red-100 text-red-800 border border-red-200"
                            }>
                            {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              <EditProductModal 
                                product={product} 
                                onProductUpdated={fetchProducts}
                                trigger={
                            <Button 
                              size="sm"
                                    variant="outline" 
                                    className="h-7 w-7 p-0 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] transition-all duration-200"
                                  >
                                    <Edit className="h-3.5 w-3.5 text-[#4A3A3A]" />
                                  </Button>
                                }
                              />
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="h-7 w-7 p-0 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200"
                                onClick={() => setDeleteConfirm(product._id)}
                            >
                                <Trash2 className="h-3.5 w-3.5 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </CardContent>
            </Card>
          )}

              {filteredProducts.length === 0 && (
            <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-[#4A3A3A] mx-auto mb-4" />
                <p className="text-[#4A3A3A] text-lg font-medium">
                  {searchTerm ? "No products found matching your search." : "No products available."}
                </p>
                <p className="text-[#4A3A3A] text-sm mt-2">
                  {searchTerm ? "Try adjusting your search terms or filters." : "Get started by adding your first product."}
                </p>
            </CardContent>
          </Card>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        {deleteConfirm && (() => {
          const productToDelete = products.find(p => p._id === deleteConfirm);
          return productToDelete ? (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2E1B1B]">Delete Product</h3>
                    <p className="text-sm text-[#4A3A3A]">This action cannot be undone.</p>
                  </div>
                </div>

                {/* Product Preview */}
                <div className="border border-[#E5E0DC] rounded-lg p-4 mb-4 bg-[#F9F6F4]">
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-white rounded-lg border border-[#E5E0DC] overflow-hidden flex-shrink-0">
                      {productToDelete.images && productToDelete.images.length > 0 ? (
                        <img
                          src={productToDelete.images.find(img => img.isPrimary)?.url || productToDelete.images[0].url}
                          alt={productToDelete.images.find(img => img.isPrimary)?.alt || productToDelete.images[0].alt || productToDelete.itemName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[#4A3A3A] text-xs">No Image</div>';
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#4A3A3A] text-xs">
                          <Package className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#2E1B1B] text-sm truncate">
                        {productToDelete.itemName}
                      </h4>
                      <p className="text-xs text-[#4A3A3A] font-mono mb-1">
                        {productToDelete.itemCode}
                      </p>
                      <div className="text-xs text-[#4A3A3A] space-y-0.5">
                        <p><span className="font-medium">Color:</span> {productToDelete.color}</p>
                        <p><span className="font-medium">Fabric:</span> {productToDelete.fabric}</p>
                        <p><span className="font-medium">Category:</span> {productToDelete.category}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-[#2E1B1B]">
                          ₹{productToDelete.pricePerPc}
                        </span>
                        <Badge className={
                          productToDelete.isActive 
                            ? "bg-green-100 text-green-800 border border-green-200" 
                            : "bg-red-100 text-red-800 border border-red-200"
                        }>
                          {productToDelete.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleDeleteProduct(productToDelete);
                      setDeleteConfirm(null);
                    }}
                  >
                    Delete Product
                  </Button>
                </div>
              </div>
            </div>
          ) : null;
        })()}
      </ModernAdminLayout>
    </AdminProtection>
  );
} 