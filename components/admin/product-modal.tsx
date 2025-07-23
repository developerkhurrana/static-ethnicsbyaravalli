"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, Image, Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-[#2E1B1B]">Create New Product</DialogTitle>
              <p className="text-sm text-[#4A3A3A] mt-1">Add a new product to your catalog</p>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <h3 className="font-semibold text-[#2E1B1B] mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#D9A8A0]" />
              Basic Information
            </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="itemCode" className="text-[#2E1B1B] font-medium">Item Code *</Label>
              <Input
                id="itemCode"
                value={formData.itemCode}
                onChange={(e) => handleInputChange("itemCode", e.target.value)}
                placeholder="e.g., KUR001"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
            
            <div>
                <Label htmlFor="itemName" className="text-[#2E1B1B] font-medium">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => handleInputChange("itemName", e.target.value)}
                placeholder="e.g., Cotton Kurta"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
            
            <div>
                <Label htmlFor="color" className="text-[#2E1B1B] font-medium">Color *</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                placeholder="e.g., Blue"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
            
            <div>
                <Label htmlFor="fabric" className="text-[#2E1B1B] font-medium">Fabric *</Label>
              <Input
                id="fabric"
                value={formData.fabric}
                onChange={(e) => handleInputChange("fabric", e.target.value)}
                placeholder="e.g., Cotton"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
            
            <div>
                <Label htmlFor="pricePerPc" className="text-[#2E1B1B] font-medium">Price per Piece (₹) *</Label>
              <Input
                id="pricePerPc"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerPc}
                onChange={(e) => handleInputChange("pricePerPc", e.target.value)}
                onBlur={calculatePricePerSet}
                placeholder="0.00"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
            </div>
            
            <div>
                <Label htmlFor="pricePerSet" className="text-[#2E1B1B] font-medium">Price per Set (₹) *</Label>
              <Input
                id="pricePerSet"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerSet}
                onChange={(e) => handleInputChange("pricePerSet", e.target.value)}
                placeholder="0.00"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                required
              />
                <p className="text-xs text-[#4A3A3A] mt-1">1 Set = 5 pieces</p>
            </div>
            
            <div>
                <Label htmlFor="category" className="text-[#2E1B1B] font-medium">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]">
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
          </div>

          {/* Size Selection */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <h3 className="font-semibold text-[#2E1B1B] mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#D9A8A0]" />
              Available Sizes *
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AVAILABLE_SIZES.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={formData.sizes.includes(size)}
                    onChange={(e) => handleSizeChange(size, e.target.checked)}
                    className="border-[#E5E0DC] data-[state=checked]:bg-[#D9A8A0] data-[state=checked]:border-[#D9A8A0]"
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm font-medium text-[#2E1B1B]">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
            {formData.sizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
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
                    <Badge key={size} className="bg-[#D9A8A0] text-[#2E1B1B] font-medium">
                      {size}({sizeMap[size]})
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Images Section */}
          <div className="bg-[#F9F6F4] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#2E1B1B] flex items-center gap-2">
                <Image className="h-4 w-4 text-[#D9A8A0]" />
                Product Images
              </h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addImage}
                className="border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>
            
            {formData.images.map((image, index) => (
              <div key={index} className="border border-[#E5E0DC] rounded-lg p-4 space-y-3 bg-white mb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Label className="text-sm font-medium text-[#2E1B1B]">Image {index + 1}</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`primary-${index}`}
                        checked={image.isPrimary}
                        onChange={() => handlePrimaryImageChange(index)}
                        className="border-[#E5E0DC] data-[state=checked]:bg-[#D9A8A0] data-[state=checked]:border-[#D9A8A0]"
                      />
                      <Label htmlFor={`primary-${index}`} className="text-xs text-[#4A3A3A]">
                        Primary
                      </Label>
                    </div>
                    {image.isPrimary && (
                      <Badge className="bg-[#D9A8A0] text-[#2E1B1B] text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`image-url-${index}`} className="text-sm text-[#2E1B1B] font-medium">Image URL *</Label>
                    <Input
                      id={`image-url-${index}`}
                      value={image.url}
                      onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`image-alt-${index}`} className="text-sm text-[#2E1B1B] font-medium">Alt Text</Label>
                    <Input
                      id={`image-alt-${index}`}
                      value={image.alt}
                      onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                      placeholder="Product description for accessibility"
                      className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                    />
                  </div>
                </div>
                
                {/* Image Preview */}
                {image.url && (
                  <div className="mt-3">
                    <Label className="text-sm text-[#4A3A3A] font-medium">Preview:</Label>
                    <div className="mt-1 border border-[#E5E0DC] rounded-lg overflow-hidden">
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
                        className="w-full h-32 bg-[#F9F6F4] flex items-center justify-center text-[#4A3A3A] text-sm"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <Image className="h-6 w-6 mx-auto mb-1 text-[#4A3A3A] opacity-50" />
                          <span>Image not found</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {formData.images.length === 0 && (
              <div className="text-center py-8 text-[#4A3A3A] border-2 border-dashed border-[#E5E0DC] rounded-lg bg-white">
                <Image className="h-8 w-8 mx-auto mb-2 text-[#4A3A3A] opacity-50" />
                <p className="font-medium">No images added yet</p>
                <p className="text-sm">Click "Add Image" to add product images</p>
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
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 