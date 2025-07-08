"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ProductModalProps {
  onProductCreated: () => void;
  trigger?: React.ReactNode;
}

interface ProductFormData {
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: string;
  pricePerSet: string;
  category: string;
  sizes: string[];
  images: Array<{ url: string; alt: string; isPrimary?: boolean }>;
}

const CATEGORIES = [
  "Kurta",
  "Kurti", 
  "Dupatta",
  "Kalidaar",
  "Anarkali",
  "Palazzo",
  "Salwar",
  "Other"
];

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function ProductModal({ onProductCreated, trigger }: ProductModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    itemCode: "",
    itemName: "",
    color: "",
    fabric: "",
    pricePerPc: "",
    pricePerSet: "",
    category: "",
    sizes: [],
    images: [{ url: "", alt: "", isPrimary: true }]
  });

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sizes: checked 
        ? [...prev.sizes, size]
        : prev.sizes.filter(s => s !== size)
    }));
  };

  const handleImageChange = (index: number, field: 'url' | 'alt', value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const handlePrimaryImageChange = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: "", alt: "", isPrimary: false }]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      // If we're removing the primary image and there are other images, make the first one primary
      if (prev.images[index].isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true;
      }
      return { ...prev, images: newImages };
    });
  };

  const calculatePricePerSet = () => {
    const pricePerPc = parseFloat(formData.pricePerPc);
    if (!isNaN(pricePerPc)) {
      setFormData(prev => ({
        ...prev,
        pricePerSet: (pricePerPc * 5).toString()
      }));
    }
  };

  const validateImageUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.itemCode || !formData.itemName || !formData.color || 
          !formData.fabric || !formData.pricePerPc || !formData.category) {
        toast.error("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      // Validate sizes
      if (formData.sizes.length === 0) {
        toast.error("Please select at least one size");
        setIsLoading(false);
        return;
      }

      // Validate images
      const validImages = formData.images.filter(img => img.url.trim() !== "");
      if (validImages.length === 0) {
        toast.error("Please add at least one product image");
        setIsLoading(false);
        return;
      }

      // Validate image URLs
      const invalidImages = validImages.filter(img => !validateImageUrl(img.url));
      if (invalidImages.length > 0) {
        toast.error("Please provide valid HTTP/HTTPS URLs for all images");
        setIsLoading(false);
        return;
      }

      // Ensure at least one image is primary
      const hasPrimary = validImages.some(img => img.isPrimary);
      if (!hasPrimary && validImages.length > 0) {
        validImages[0].isPrimary = true;
      }

      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          pricePerPc: parseFloat(formData.pricePerPc),
          pricePerSet: parseFloat(formData.pricePerSet),
          images: validImages,
          isActive: true
        }),
      });

      if (response.ok) {
        toast.success("Product created successfully!");
        setOpen(false);
        setFormData({
          itemCode: "",
          itemName: "",
          color: "",
          fabric: "",
          pricePerPc: "",
          pricePerSet: "",
          category: "",
          sizes: [],
          images: [{ url: "", alt: "", isPrimary: true }]
        });
        onProductCreated();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create product");
      }
    } catch (error) {
      toast.error("An error occurred while creating the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add New Product</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemCode">Item Code *</Label>
              <Input
                id="itemCode"
                value={formData.itemCode}
                onChange={(e) => handleInputChange("itemCode", e.target.value)}
                placeholder="e.g., KUR001"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => handleInputChange("itemName", e.target.value)}
                placeholder="e.g., Cotton Kurta"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="color">Color *</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                placeholder="e.g., Blue"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="fabric">Fabric *</Label>
              <Input
                id="fabric"
                value={formData.fabric}
                onChange={(e) => handleInputChange("fabric", e.target.value)}
                placeholder="e.g., Cotton"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="pricePerPc">Price per Piece (₹) *</Label>
              <Input
                id="pricePerPc"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerPc}
                onChange={(e) => handleInputChange("pricePerPc", e.target.value)}
                onBlur={calculatePricePerSet}
                placeholder="0.00"
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
                onChange={(e) => handleInputChange("pricePerSet", e.target.value)}
                placeholder="0.00"
                required
              />
              <p className="text-xs text-gray-500">1 Set = 5 pieces</p>
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
              {AVAILABLE_SIZES.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={formData.sizes.includes(size)}
                    onChange={(e) => handleSizeChange(size, e.target.checked)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm font-medium">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
            {formData.sizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.sizes.map((size) => {
                  const sizeMap: { [key: string]: string } = {
                    'XS': '34"',
                    'S': '36"',
                    'M': '38"',
                    'L': '40"',
                    'XL': '42"',
                    'XXL': '44"',
                    '3XL': '46"'
                  };
                  return (
                    <span key={size} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {size}({sizeMap[size]})
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Product Images</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addImage}
              >
                Add Image
              </Button>
            </div>
            
            {formData.images.map((image, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Image {index + 1}</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`primary-${index}`}
                        checked={image.isPrimary}
                        onChange={() => handlePrimaryImageChange(index)}
                      />
                      <Label htmlFor={`primary-${index}`} className="text-xs text-gray-600">
                        Primary
                      </Label>
                    </div>
                  </div>
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`image-url-${index}`} className="text-sm">Image URL *</Label>
                    <Input
                      id={`image-url-${index}`}
                      value={image.url}
                      onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`image-alt-${index}`} className="text-sm">Alt Text</Label>
                    <Input
                      id={`image-alt-${index}`}
                      value={image.alt}
                      onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                      placeholder="Product description for accessibility"
                    />
                  </div>
                </div>
                
                {/* Image Preview */}
                {image.url && (
                  <div className="mt-2">
                    <Label className="text-sm text-gray-600">Preview:</Label>
                    <div className="mt-1 border rounded overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.alt || "Product preview"}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const nextElement = target.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'block';
                          }
                        }}
                      />
                      <div 
                        className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
                        style={{ display: 'none' }}
                      >
                        Image not found
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {formData.images.length === 0 && (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                <p>No images added yet</p>
                <p className="text-sm">Click "Add Image" to add product images</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 