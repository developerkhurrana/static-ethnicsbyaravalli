"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CatalogModalProps {
  onCatalogCreated: () => void;
  trigger?: React.ReactNode;
}

const ACCESS_LEVELS = ["R1", "R2", "R3", "GENERAL"];

export default function CatalogModal({ onCatalogCreated, trigger }: CatalogModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        setProducts(data.products.map((p: any) => ({ _id: p._id, itemName: p.itemName, itemCode: p.itemCode, images: p.images })));
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
        setPriorities(data.priorities.filter((p: any) => p.isActive));
      }
    } catch {}
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => prev.includes(productId)
      ? prev.filter(id => id !== productId)
      : [...prev, productId]
    );
  };

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
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Create New Catalog</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Catalog</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="catalogName">Catalog Name *</Label>
            <Input
              id="catalogName"
              value={formData.catalogName}
              onChange={(e) => setFormData(prev => ({ ...prev, catalogName: e.target.value }))}
              placeholder="e.g., Premium Collection"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="catalogCode">Catalog Code *</Label>
            <Input
              id="catalogCode"
              value={formData.catalogCode}
              onChange={(e) => setFormData(prev => ({ ...prev, catalogCode: e.target.value }))}
              placeholder="e.g., PREM001"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="accessLevel">Access Level *</Label>
            <Select value={formData.accessLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, accessLevel: value }))} required>
              <SelectTrigger>
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

          <div>
            <label className="text-sm font-medium">Products in Catalog</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
              {products.map(product => {
                const img = product.images?.find(img => img.isPrimary) || product.images?.[0];
                return (
                  <div key={product._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`product-${product._id}`}
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => toggleProduct(product._id)}
                    />
                    {img && (
                      <img src={img.url} alt="" className="w-8 h-8 object-cover rounded border" />
                    )}
                    <label htmlFor={`product-${product._id}`}>{product.itemName} ({product.itemCode})</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Catalog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 