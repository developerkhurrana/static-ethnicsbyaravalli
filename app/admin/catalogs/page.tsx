"use client";

import { useState, useEffect } from "react";
import ModernAdminLayout from "@/components/admin/modern-admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import CatalogModal from "@/components/admin/catalog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EditCatalogModal from "@/components/admin/edit-catalog-modal";
import { Search, FileText, Edit, Trash2, Share2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Catalog {
  _id: string;
  catalogName: string;
  catalogCode: string;
  accessLevel: "R1" | "R2" | "R3" | "GENERAL";
  isActive: boolean;
  products: Array<{ productId: string; isActive: boolean }>;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  _id: string;
  itemName: string;
  itemCode: string;
  images: Array<{ url: string; alt: string; isPrimary?: boolean }>;
}

export default function AdminCatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const [catalogsResponse, productsResponse] = await Promise.all([
        fetch("/api/admin/catalogs", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      if (catalogsResponse.ok && productsResponse.ok) {
        const catalogsData = await catalogsResponse.json();
        const productsData = await productsResponse.json();
        setCatalogs(catalogsData.catalogs);
        setProducts(productsData.products);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch {
      toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCatalogs = catalogs.filter((catalog) =>
    catalog.catalogName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    catalog.catalogCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    catalog.accessLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "R1":
        return "bg-red-100 text-red-800";
      case "R2":
        return "bg-yellow-100 text-yellow-800";
      case "R3":
        return "bg-blue-100 text-blue-800";
      case "GENERAL":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCatalogProducts = (catalog: Catalog) => {
    return products.filter(product => 
      catalog.products.some(catalogProduct => catalogProduct.productId === product._id)
    );
  };

  if (isLoading) {
    return (
      <AdminProtection>
        <ModernAdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A8A0] mx-auto mb-4"></div>
              <p className="text-[#4A3A3A]">Loading catalogs...</p>
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
              <h1 className="text-3xl font-bold text-[#2E1B1B] flex items-center gap-2">
                <FileText className="h-8 w-8 text-[#D9A8A0]" />
                Catalogs
              </h1>
              <p className="text-[#4A3A3A] mt-1">
                Manage product catalogs and access levels ({filteredCatalogs.length} catalogs)
            </p>
          </div>
          <CatalogModal onCatalogCreated={fetchCatalogs} />
        </div>

        {/* Search */}
          <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
          <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
            <Input
              placeholder="Search catalogs by name, code, or access level..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                  className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
            />
              </div>
          </CardContent>
        </Card>

        {/* Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredCatalogs.map((catalog) => (
            <Card key={catalog._id} className="border-[#E5E0DC] hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#2E1B1B] text-sm truncate">{catalog.catalogName}</h3>
                    <p className="text-xs text-[#4A3A3A] font-mono">{catalog.catalogCode}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] transition-all duration-200"
                      >
                        <MoreVertical className="h-4 w-4 text-[#4A3A3A]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <EditCatalogModal 
                        catalog={catalog} 
                        onCatalogUpdated={fetchCatalogs}
                        trigger={
                          <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>
                            <Edit className="h-4 w-4 mr-2 text-[#4A3A3A]" />
                            Edit Catalog
                          </DropdownMenuItem>
                        }
                      />
                      
                      <DropdownMenuItem 
                        onClick={() => {
                          const shareUrl = `${window.location.origin}/retailer/catalog/${catalog.catalogCode}`;
                          navigator.clipboard.writeText(shareUrl).then(() => {
                            toast.success(`Catalog link copied to clipboard!`, {
                              description: `Share this link with retailers to access catalog ${catalog.catalogCode}`,
                              duration: 4000,
                            });
                          }).catch(() => {
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = shareUrl;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            toast.success(`Catalog link copied to clipboard!`, {
                              description: `Share this link with retailers to access catalog ${catalog.catalogCode}`,
                              duration: 4000,
                            });
                          });
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-2 text-[#4A3A3A]" />
                        Share Catalog
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={() => setDeleteConfirm(catalog._id)}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Catalog
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status Badges */}
                <div className="flex gap-1 mb-4">
                  <Badge className={`text-xs font-medium ${getAccessLevelColor(catalog.accessLevel)}`}>
                    {catalog.accessLevel}
                  </Badge>
                  <Badge className={
                    catalog.isActive 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-red-100 text-red-800 border border-red-200"
                  }>
                    {catalog.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Product Images Preview */}
                {(() => {
                  const catalogProducts = getCatalogProducts(catalog);
                  const productImages = catalogProducts
                    .map(product => product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url)
                    .filter(Boolean)
                    .slice(0, 4); // Show max 4 images
                  
                  return productImages.length > 0 ? (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#4A3A3A] font-medium">Products Preview:</span>
                        <span className="text-xs text-[#4A3A3A] bg-[#F9F6F4] px-2 py-0.5 rounded">
                          {catalog.products.length}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {productImages.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 bg-white rounded border border-[#E5E0DC] overflow-hidden flex-shrink-0"
                          >
                            <img
                              src={imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'w-full h-full bg-[#F9F6F4] flex items-center justify-center';
                                  const dot = document.createElement('div');
                                  dot.className = 'w-2 h-2 bg-[#4A3A3A] rounded-full';
                                  placeholder.appendChild(dot);
                                  parent.appendChild(placeholder);
                                }
                              }}
                            />
                          </div>
                        ))}
                        {catalog.products.length > 4 && (
                          <div className="w-8 h-8 bg-[#D9A8A0] rounded border border-[#E5E0DC] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-[#2E1B1B]">
                              +{catalog.products.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                  </div>
                  ) : null;
                })()}

                {/* Catalog Stats */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#4A3A3A]">Access Level:</span>
                    <span className="text-xs font-medium text-[#2E1B1B]">{catalog.accessLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#4A3A3A]">Created:</span>
                    <span className="text-xs font-medium text-[#2E1B1B]">
                      {new Date(catalog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                

              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCatalogs.length === 0 && (
          <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-[#4A3A3A] mx-auto mb-4" />
              <p className="text-[#4A3A3A] text-lg font-medium">
                {searchTerm ? "No catalogs found matching your search." : "No catalogs available."}
              </p>
              <p className="text-[#4A3A3A] text-sm mt-2">
                {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first catalog."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirm && (() => {
          const catalogToDelete = catalogs.find(c => c._id === deleteConfirm);
          return catalogToDelete ? (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2E1B1B]">Delete Catalog</h3>
                    <p className="text-sm text-[#4A3A3A]">This action cannot be undone.</p>
                  </div>
                </div>

                {/* Catalog Preview */}
                <div className="border border-[#E5E0DC] rounded-lg p-4 mb-4 bg-[#F9F6F4]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#2E1B1B] text-sm">
                        {catalogToDelete.catalogName}
                      </h4>
                      <Badge className={
                        catalogToDelete.isActive 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-red-100 text-red-800 border border-red-200"
                      }>
                        {catalogToDelete.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#4A3A3A] font-mono">
                      {catalogToDelete.catalogCode}
                    </p>
                    <div className="text-xs text-[#4A3A3A] space-y-0.5">
                      <p><span className="font-medium">Access Level:</span> {catalogToDelete.accessLevel}</p>
                      <p><span className="font-medium">Products:</span> {catalogToDelete.products.length}</p>
                      <p><span className="font-medium">Created:</span> {new Date(catalogToDelete.createdAt).toLocaleDateString()}</p>
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
                    onClick={async () => {
                        try {
                          const token = localStorage.getItem("adminToken");
                        const response = await fetch(`/api/admin/catalogs/${catalogToDelete._id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          if (response.ok) {
                            toast.success("Catalog deleted successfully!");
                            fetchCatalogs();
                          } else {
                            const error = await response.json();
                            toast.error(error.error || "Failed to delete catalog");
                          }
                        } catch {
                          toast.error("An error occurred while deleting catalog");
                        }
                      setDeleteConfirm(null);
                    }}
                  >
                    Delete Catalog
                  </Button>
                </div>
              </div>
            </div>
          ) : null;
        })()}
        </div>
      </ModernAdminLayout>
    </AdminProtection>
  );
} 