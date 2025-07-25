"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface CatalogModalProps {
  onCatalogCreated: () => void;
  trigger?: React.ReactNode;
}

export default function CatalogModal({ onCatalogCreated, trigger }: CatalogModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    catalogName: "",
    catalogCode: "",
    accessLevel: "",
    isActive: true
  });
  const [products, setProducts] = useState<{ _id: string; itemName: string; itemCode: string; images: { url: string; isPrimary?: boolean }[] }[]>([]);
  const [priorities, setPriorities] = useState<{ _id: string; priorityCode: string; priorityName: string }[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      fetchProducts();
      fetchPriorities();
    }
  }, [open]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products.map((p: Record<string, unknown>) => ({ _id: p._id, itemName: p.itemName, itemCode: p.itemCode, images: p.images })));
      }
    } catch {}
  };

  const fetchPriorities = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/priorities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPriorities(data.priorities.filter((p: Record<string, unknown>) => p.isActive));
      }
    } catch {}
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => prev.includes(productId)
      ? prev.filter(id => id !== productId)
      : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product =>
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/catalogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, products: selectedProducts }),
      });

      if (response.ok) {
        toast.success("Catalog created successfully!");
        setOpen(false);
        setFormData({
          catalogName: "",
          catalogCode: "",
          accessLevel: "",
          isActive: true
        });
        onCatalogCreated();
      } else {
        toast.error("Failed to create catalog");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-[#D9A8A0] hover:bg-[#C08478] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Catalog
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-[#2E1B1B]">Create New Catalog</DialogTitle>
              <p className="text-sm text-[#4A3A3A] mt-1">Add a new product catalog with access controls</p>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <h3 className="font-semibold text-[#2E1B1B] mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#D9A8A0]" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
                <Label htmlFor="catalogName" className="text-[#2E1B1B] font-medium">Catalog Name *</Label>
            <Input
              id="catalogName"
              value={formData.catalogName}
              onChange={(e) => setFormData(prev => ({ ...prev, catalogName: e.target.value }))}
              placeholder="e.g., Premium Collection"
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
              placeholder="e.g., PREM001"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
              required
            />
          </div>
          
          <div>
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
          </div>

          {/* Products Selection */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <h3 className="font-semibold text-[#2E1B1B] mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#D9A8A0]" />
              Products in Catalog
            </h3>
            
            {/* Search Products */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
              <Input
                placeholder="Search products by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
              />
          </div>

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
            
            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-[#4A3A3A] border border-[#E5E0DC] rounded-lg bg-white">
                <Search className="h-8 w-8 mx-auto mb-2 text-[#4A3A3A] opacity-50" />
                <p className="font-medium">No products found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            )}
            
            {/* Selected Products Counter */}
            {selectedProducts.length > 0 && (
              <div className="mt-3 text-sm text-[#4A3A3A]">
                <span className="font-medium">{selectedProducts.length}</span> product{selectedProducts.length !== 1 ? 's' : ''} selected
              </div>
            )}
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
              className="flex-1 bg-[#D9A8A0] hover:bg-[#C08478] text-white font-medium"
            >
              {isLoading ? "Creating..." : "Create Catalog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 