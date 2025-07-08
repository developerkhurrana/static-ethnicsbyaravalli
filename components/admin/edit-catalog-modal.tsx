"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Catalog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="catalogName">Catalog Name *</Label>
              <Input
                id="catalogName"
                value={formData.catalogName}
                onChange={(e) => setFormData(prev => ({ ...prev, catalogName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="catalogCode">Catalog Code *</Label>
              <Input
                id="catalogCode"
                value={formData.catalogCode}
                onChange={(e) => setFormData(prev => ({ ...prev, catalogCode: e.target.value }))}
                required
              />
            </div>
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <Label htmlFor="isActive">Catalog is active</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Catalog"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 