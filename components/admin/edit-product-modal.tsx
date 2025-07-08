"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  isActive: boolean;
  images: Array<{ url: string; alt: string; isPrimary?: boolean }>;
  sizes: string[];
}

interface EditProductModalProps {
  product: Product;
  onProductUpdated: () => void;
  trigger?: React.ReactNode;
}

const CATEGORIES = ["Kurta", "Kurti", "Dupatta", "Kalidaar", "Other"];

export default function EditProductModal({ product, onProductUpdated, trigger }: EditProductModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSetPricePerSet, setHasSetPricePerSet] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: product.itemCode,
    itemName: product.itemName,
    color: product.color,
    fabric: product.fabric,
    pricePerPc: product.pricePerPc,
    pricePerSet: product.pricePerSet,
    category: product.category,
    isActive: product.isActive,
    images: product.images || [],
    sizes: product.sizes || []
  });

  // Reset form when product changes
  useEffect(() => {
    setFormData({
      itemCode: product.itemCode,
      itemName: product.itemName,
      color: product.color,
      fabric: product.fabric,
      pricePerPc: product.pricePerPc,
      pricePerSet: product.pricePerSet,
      category: product.category,
      isActive: product.isActive,
      images: product.images || [],
      sizes: product.sizes || []
    });
    setHasSetPricePerSet(false);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/products/${product._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        setOpen(false);
        onProductUpdated();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating product");
    } finally {
      setIsLoading(false);
    }
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: "", alt: "", isPrimary: false }]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImage = (index: number, field: 'url' | 'alt' | 'isPrimary', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const setPrimaryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemCode">Item Code *</Label>
              <Input
                id="itemCode"
                value={formData.itemCode}
                onChange={(e) => setFormData(prev => ({ ...prev, itemCode: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Color *</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="fabric">Fabric *</Label>
              <Input
                id="fabric"
                value={formData.fabric}
                onChange={(e) => setFormData(prev => ({ ...prev, fabric: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pricePerPc">Price per PC (₹) *</Label>
              <Input
                id="pricePerPc"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerPc}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setFormData(prev => ({
                    ...prev,
                    pricePerPc: value,
                    pricePerSet: hasSetPricePerSet ? prev.pricePerSet : value * 5
                  }));
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="pricePerSet">Price per Set (₹) *</Label>
              <Input
                id="pricePerSet"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerSet}
                onChange={(e) => {
                  setHasSetPricePerSet(true);
                  setFormData(prev => ({ ...prev, pricePerSet: parseFloat(e.target.value) || 0 }));
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Available Sizes *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={formData.sizes?.includes(size)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev) => ({
                        ...prev,
                        sizes: checked
                          ? [...(prev.sizes || []), size]
                          : (prev.sizes || []).filter((s: string) => s !== size),
                      }));
                    }}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm font-medium">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
            {formData.sizes && formData.sizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.sizes.map((size: string) => {
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
                    <span key={size} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {size}({sizeMap[size as keyof typeof sizeMap]})
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Product Images</Label>
              <Button type="button" variant="outline" size="sm" onClick={addImage}>
                Add Image
              </Button>
            </div>
            
            {formData.images.map((image, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Image {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Image URL *</Label>
                    <Input
                      value={image.url}
                      onChange={(e) => updateImage(index, 'url', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div>
                    <Label>Alt Text *</Label>
                    <Input
                      value={image.alt}
                      onChange={(e) => updateImage(index, 'alt', e.target.value)}
                      placeholder="Description of the image"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`primary-${index}`}
                    checked={image.isPrimary}
                    onChange={e => {
                      if (e.target.checked) {
                        setPrimaryImage(index);
                      }
                    }}
                  />
                  <Label htmlFor={`primary-${index}`}>Set as primary image</Label>
                </div>
                
                {image.url && (
                  <div className="mt-2">
                    <Label>Preview:</Label>
                    <div className="mt-1 w-32 h-32 border rounded overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500 text-xs">Invalid URL</div>';
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <Label htmlFor="isActive">Product is active</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Product"}
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