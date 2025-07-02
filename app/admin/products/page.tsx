"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, Package, Eye } from "lucide-react";

interface Product {
  _id: string;
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  images: Array<{ url: string; alt: string }>;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    color: "",
    fabric: "",
    pricePerPc: "",
    pricePerSet: "",
    category: "",
    images: [{ url: "", alt: "" }],
    isActive: true,
  });

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/products?search=${searchTerm}`, {
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
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          pricePerPc: parseFloat(formData.pricePerPc),
          pricePerSet: parseFloat(formData.pricePerSet),
        }),
      });

      if (response.ok) {
        toast.success("Product created successfully");
        setIsCreateModalOpen(false);
        resetForm();
        fetchProducts();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          pricePerPc: parseFloat(formData.pricePerPc),
          pricePerSet: parseFloat(formData.pricePerSet),
        }),
      });

      if (response.ok) {
        toast.success("Product updated successfully");
        setIsEditModalOpen(false);
        resetForm();
        fetchProducts();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      itemCode: "",
      itemName: "",
      color: "",
      fabric: "",
      pricePerPc: "",
      pricePerSet: "",
      category: "",
      images: [{ url: "", alt: "" }],
      isActive: true,
    });
    setSelectedProduct(null);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      itemCode: product.itemCode,
      itemName: product.itemName,
      color: product.color,
      fabric: product.fabric,
      pricePerPc: product.pricePerPc.toString(),
      pricePerSet: product.pricePerSet.toString(),
      category: product.category,
      images: product.images,
      isActive: product.isActive,
    });
    setIsEditModalOpen(true);
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", alt: "" }],
    }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImageField = (
    index: number,
    field: "url" | "alt",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) =>
        i === index ? { ...img, [field]: value } : img
      ),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product for your catalog
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleCreate}
              addImageField={addImageField}
              removeImageField={removeImageField}
              updateImageField={updateImageField}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Item Code</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Color</th>
                  <th className="text-left p-2">Fabric</th>
                  <th className="text-left p-2">Price (Pc)</th>
                  <th className="text-left p-2">Price (Set)</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-sm">
                      {product.itemCode}
                    </td>
                    <td className="p-2">{product.itemName}</td>
                    <td className="p-2">{product.color}</td>
                    <td className="p-2">{product.fabric}</td>
                    <td className="p-2">₹{product.pricePerPc}</td>
                    <td className="p-2">₹{product.pricePerSet}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">
                      <Badge
                        variant={product.isActive ? "default" : "secondary"}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleUpdate}
            addImageField={addImageField}
            removeImageField={removeImageField}
            updateImageField={updateImageField}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({
  formData,
  setFormData,
  onSubmit,
  addImageField,
  removeImageField,
  updateImageField,
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  addImageField: () => void;
  removeImageField: (index: number) => void;
  updateImageField: (
    index: number,
    field: "url" | "alt",
    value: string
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="itemCode">Item Code</Label>
          <Input
            id="itemCode"
            value={formData.itemCode}
            onChange={(e) =>
              setFormData({ ...formData, itemCode: e.target.value })
            }
            placeholder="e.g., KUR001"
          />
        </div>
        <div>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            id="itemName"
            value={formData.itemName}
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            placeholder="e.g., Cotton Kurti"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            placeholder="e.g., Blue"
          />
        </div>
        <div>
          <Label htmlFor="fabric">Fabric</Label>
          <Input
            id="fabric"
            value={formData.fabric}
            onChange={(e) =>
              setFormData({ ...formData, fabric: e.target.value })
            }
            placeholder="e.g., Cotton"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="pricePerPc">Price per Piece</Label>
          <Input
            id="pricePerPc"
            type="number"
            value={formData.pricePerPc}
            onChange={(e) =>
              setFormData({ ...formData, pricePerPc: e.target.value })
            }
            placeholder="0.00"
          />
        </div>
        <div>
          <Label htmlFor="pricePerSet">Price per Set</Label>
          <Input
            id="pricePerSet"
            type="number"
            value={formData.pricePerSet}
            onChange={(e) =>
              setFormData({ ...formData, pricePerSet: e.target.value })
            }
            placeholder="0.00"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kurti">Kurti</SelectItem>
              <SelectItem value="kurta">Kurta</SelectItem>
              <SelectItem value="saree">Saree</SelectItem>
              <SelectItem value="lehenga">Lehenga</SelectItem>
              <SelectItem value="salwar">Salwar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Images</Label>
        <div className="space-y-2">
          {formData.images.map((image: any, index: number) => (
            <div key={index} className="flex space-x-2">
              <Input
                placeholder="Image URL"
                value={image.url}
                onChange={(e) => updateImageField(index, "url", e.target.value)}
              />
              <Input
                placeholder="Alt text"
                value={image.alt}
                onChange={(e) => updateImageField(index, "alt", e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeImageField(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addImageField}>
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData({ ...formData, isActive: e.target.checked })
          }
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Save Product
        </Button>
      </div>
    </div>
  );
}
