"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileText, Search, Package, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Catalog {
  _id: string;
  catalogName: string;
  catalogCode: string;
  accessLevel: string;
  isActive: boolean;
  products: Array<{ productId: string; isActive: boolean }>;
}

interface EditCatalogModalProps {
  catalog: Catalog;
  onCatalogUpdated: () => void;
  trigger?: React.ReactNode;
}

const ACCESS_LEVELS = ["R1", "R2", "R3", "GENERAL"];

export default function EditCatalogModal({ catalog, onCatalogUpdated, trigger }: EditCatalogModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    catalogName: catalog.catalogName,
    catalogCode: catalog.catalogCode,
    accessLevel: catalog.accessLevel,
    isActive: catalog.isActive,
    products: catalog.products.map(p => p.productId)
  });

  // Fetch all products for selection
  const [allProducts, setAllProducts] = useState<{ _id: string; itemName: string }[]>([]);
  const [priorities, setPriorities] = useState<{ _id: string; priorityCode: string; priorityName: string }[]>([]);
  const [products, setProducts] = useState<{ _id: string; itemName: string; itemCode: string; images: { url: string; isPrimary?: boolean }[] }[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(formData.products);
  const [productSearchTerm, setProductSearchTerm] = useState("");

  useEffect(() => {
    if (open) {
      fetchPriorities();
      fetchProducts();
    }
  }, [open]);

  const fetchPriorities = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/priorities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPriorities(data.priorities.filter((p: any) => p.isActive));
      }
    } catch {}
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products.map((p: any) => ({ _id: p._id, itemName: p.itemName, itemCode: p.itemCode, images: p.images })));
      }
    } catch {}
  };

  // Reset form when catalog changes
  useEffect(() => {
    setFormData({
      catalogName: catalog.catalogName,
      catalogCode: catalog.catalogCode,
      accessLevel: catalog.accessLevel,
      isActive: catalog.isActive,
      products: catalog.products.map(p => p.productId)
    });
  }, [catalog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/catalogs/${catalog._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          products: selectedProducts.map(id => ({ productId: id, isActive: true })),
        }),
      });
      if (response.ok) {
        toast.success("Catalog updated successfully!");
        setOpen(false);
        onCatalogUpdated();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update catalog");
      }
    } catch (error) {
      toast.error("An error occurred while updating catalog");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => prev.includes(productId)
      ? prev.filter(id => id !== productId)
      : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product =>
    product.itemName.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.itemCode.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-[#2E1B1B]">Edit Catalog</DialogTitle>
              <p className="text-sm text-[#4A3A3A] mt-1">Update catalog details and product selection</p>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <h3 className="font-semibold text-[#2E1B1B] mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#D9A8A0]" />
              Basic Information
            </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="catalogName" className="text-[#2E1B1B] font-medium">Catalog Name *</Label>
              <Input
                id="catalogName"
                value={formData.catalogName}
                onChange={(e) => setFormData(prev => ({ ...prev, catalogName: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
            <div>
                <Label htmlFor="catalogCode" className="text-[#2E1B1B] font-medium">Catalog Code *</Label>
              <Input
                id="catalogCode"
                value={formData.catalogCode}
                onChange={(e) => setFormData(prev => ({ ...prev, catalogCode: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
          </div>
            <div className="mt-4">
              <Label htmlFor="accessLevel" className="text-[#2E1B1B] font-medium">Access Level *</Label>
            <Select value={formData.accessLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, accessLevel: value }))} required>
                <SelectTrigger className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority._id} value={priority.priorityCode}>
                    {priority.priorityCode} - {priority.priorityName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>

          {/* Product Selection */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#2E1B1B] flex items-center gap-2">
                <Package className="h-4 w-4 text-[#D9A8A0]" />
                Products in Catalog
              </h3>
              <Badge className="bg-[#D9A8A0] text-[#2E1B1B]">
                {selectedProducts.length} selected
              </Badge>
            </div>

            {/* Search Products */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
              <Input
                placeholder="Search products by name or code..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border border-[#E5E0DC] rounded-lg p-3 bg-white">
              {filteredProducts.map(product => {
                const img = product.images?.find(img => img.isPrimary) || product.images?.[0];
                const isSelected = selectedProducts.includes(product._id);
                return (
                  <div 
                    key={product._id} 
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all duration-200",
                      isSelected 
                        ? "border-[#D9A8A0] bg-[#F9F6F4]" 
                        : "border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                    )}
                    onClick={() => toggleProduct(product._id)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-white rounded border border-[#E5E0DC] overflow-hidden flex-shrink-0">
                        {img ? (
                          <img 
                            src={img.url} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'w-full h-full flex items-center justify-center';
                                const packageIcon = document.createElement('div');
                                packageIcon.innerHTML = '<svg class="h-4 w-4 text-[#4A3A3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>';
                                placeholder.appendChild(packageIcon);
                                parent.appendChild(placeholder);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-4 w-4 text-[#4A3A3A]" />
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D9A8A0] rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2E1B1B] text-sm truncate">{product.itemName}</p>
                      <p className="text-xs text-[#4A3A3A] font-mono">{product.itemCode}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <div className="flex items-center space-x-3">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="border-[#E5E0DC] data-[state=checked]:bg-[#D9A8A0] data-[state=checked]:border-[#D9A8A0]"
            />
              <Label htmlFor="isActive" className="text-[#2E1B1B] font-medium">Catalog is active</Label>
              {formData.isActive && (
                <Badge className="bg-green-100 text-green-800 border border-green-200">
                  Active
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E5E0DC]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="flex-1 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex-1 bg-[#D9A8A0] hover:bg-[#C08478] text-[#2E1B1B] font-medium"
            >
              {isLoading ? "Updating..." : "Update Catalog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 