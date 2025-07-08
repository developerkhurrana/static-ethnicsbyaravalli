"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import ProductModal from "@/components/admin/product-modal";
import EditProductModal from "@/components/admin/edit-product-modal";
import ProductImageGallery from "@/components/admin/product-image-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

  useEffect(() => {
    fetchProducts();
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
    } catch (error) {
      toast.error("An error occurred while fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center">Loading products...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminProtection>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                Manage your product catalog
              </p>
            </div>
            <ProductModal onProductCreated={fetchProducts} />
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <Input
                placeholder="Search products by name, code, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-700">Image</th>
                      <th className="text-left p-3 font-medium text-gray-700">Item Code</th>
                      <th className="text-left p-3 font-medium text-gray-700">Item Name</th>
                      <th className="text-left p-3 font-medium text-gray-700">Color</th>
                      <th className="text-left p-3 font-medium text-gray-700">Fabric</th>
                      <th className="text-left p-3 font-medium text-gray-700">Category</th>
                      <th className="text-left p-3 font-medium text-gray-700">Sizes</th>
                      <th className="text-left p-3 font-medium text-gray-700">Price per PC</th>
                      <th className="text-left p-3 font-medium text-gray-700">Price per Set <sub>(1 Set = 5 PC (S-XXL))</sub></th>
                      <th className="text-left p-3 font-medium text-gray-700">Status</th>
                      <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3">
                          {product.images && product.images.length > 0 ? (
                            <div className="relative">
                              <img
                                src={product.images.find(img => img.isPrimary)?.url || product.images[0].url}
                                alt={product.images.find(img => img.isPrimary)?.alt || product.images[0].alt || product.itemName}
                                className="w-12 h-12 object-cover rounded border"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = '<div class="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-gray-400 text-xs">No Image</div>';
                                  }
                                }}
                              />
                              {product.images.length > 1 && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {product.images.length}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-gray-400 text-xs">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-medium text-gray-900">{product.itemCode}</td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-900">{product.itemName}</div>
                            {product.images && product.images.length > 1 && (
                              <ProductImageGallery 
                                images={product.images} 
                                productName={product.itemName}
                                trigger={
                                  <button className="text-xs text-blue-600 hover:underline">
                                    View all images
                                  </button>
                                }
                              />
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{product.color}</td>
                        <td className="p-3 text-gray-700">{product.fabric}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1 overflow-x-auto whitespace-nowrap" style={{ maxWidth: 220 }}>
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
                                  className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                                >
                                  {size}({sizeMap[size as keyof typeof sizeMap]})
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="p-3 font-medium text-gray-900">₹{product.pricePerPc}</td>
                        <td className="p-3 font-medium text-gray-900">₹{product.pricePerSet}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.isActive 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <EditProductModal product={product} onProductUpdated={fetchProducts} />
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={async () => {
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
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? "No products found matching your search." : "No products available."}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminProtection>
  );
} 