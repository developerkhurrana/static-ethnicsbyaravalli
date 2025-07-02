"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, BookOpen } from "lucide-react";

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
}

interface Catalog {
  _id: string;
  catalogName: string;
  catalogCode: string;
  products: Array<{ productId: Product; isActive: boolean }>;
  accessLevel: "R1" | "R2" | "R3" | "GENERAL";
  isActive: boolean;
  createdAt: string;
}

export default function CatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [formData, setFormData] = useState({
    catalogName: "",
    catalogCode: "",
    accessLevel: "GENERAL" as "R1" | "R2" | "R3" | "GENERAL",
    products: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    fetchCatalogs();
    fetchProducts();
  }, [searchTerm]);

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/catalogs?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCatalogs(data.catalogs);
      } else {
        toast.error("Failed to fetch catalogs");
      }
    } catch (error) {
      console.error("Error fetching catalogs:", error);
      toast.error("Failed to fetch catalogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const catalogData = {
        ...formData,
        products: formData.products.map((productId) => ({
          productId,
          isActive: true,
        })),
      };

      const response = await fetch("/api/catalogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(catalogData),
      });

      if (response.ok) {
        toast.success("Catalog created successfully");
        setIsCreateModalOpen(false);
        resetForm();
        fetchCatalogs();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create catalog");
      }
    } catch (error) {
      console.error("Error creating catalog:", error);
      toast.error("Failed to create catalog");
    }
  };

  const handleUpdate = async () => {
    if (!selectedCatalog) return;

    try {
      const token = localStorage.getItem("adminToken");
      const catalogData = {
        ...formData,
        products: formData.products.map((productId) => ({
          productId,
          isActive: true,
        })),
      };

      const response = await fetch(`/api/catalogs/${selectedCatalog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(catalogData),
      });

      if (response.ok) {
        toast.success("Catalog updated successfully");
        setIsEditModalOpen(false);
        resetForm();
        fetchCatalogs();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update catalog");
      }
    } catch (error) {
      console.error("Error updating catalog:", error);
      toast.error("Failed to update catalog");
    }
  };

  const handleDelete = async (catalogId: string) => {
    if (!confirm("Are you sure you want to delete this catalog?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/catalogs/${catalogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Catalog deleted successfully");
        fetchCatalogs();
      } else {
        toast.error("Failed to delete catalog");
      }
    } catch (error) {
      console.error("Error deleting catalog:", error);
      toast.error("Failed to delete catalog");
    }
  };

  const resetForm = () => {
    setFormData({
      catalogName: "",
      catalogCode: "",
      accessLevel: "GENERAL",
      products: [],
      isActive: true,
    });
    setSelectedCatalog(null);
  };

  const openEditModal = (catalog: Catalog) => {
    setSelectedCatalog(catalog);
    setFormData({
      catalogName: catalog.catalogName,
      catalogCode: catalog.catalogCode,
      accessLevel: catalog.accessLevel,
      products: catalog.products.map((p) => p.productId._id),
      isActive: catalog.isActive,
    });
    setIsEditModalOpen(true);
  };

  const toggleProduct = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter((id) => id !== productId)
        : [...prev.products, productId],
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
          <h1 className="text-2xl font-bold text-gray-900">Catalogs</h1>
          <p className="text-gray-600">Manage your product catalogs</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Catalog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Catalog</DialogTitle>
              <DialogDescription>
                Create a new catalog for your products
              </DialogDescription>
            </DialogHeader>
            <CatalogForm
              formData={formData}
              setFormData={setFormData}
              products={products}
              toggleProduct={toggleProduct}
              onSubmit={handleCreate}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search catalogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Catalog Code</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Access Level</th>
                  <th className="text-left p-2">Products</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {catalogs.map((catalog) => (
                  <tr key={catalog._id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-sm">
                      {catalog.catalogCode}
                    </td>
                    <td className="p-2">{catalog.catalogName}</td>
                    <td className="p-2">
                      <Badge variant="outline">{catalog.accessLevel}</Badge>
                    </td>
                    <td className="p-2">{catalog.products.length} products</td>
                    <td className="p-2">
                      <Badge
                        variant={catalog.isActive ? "default" : "secondary"}
                      >
                        {catalog.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(catalog)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(catalog._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {catalogs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No catalogs found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Catalog</DialogTitle>
            <DialogDescription>Update catalog information</DialogDescription>
          </DialogHeader>
          <CatalogForm
            formData={formData}
            setFormData={setFormData}
            products={products}
            toggleProduct={toggleProduct}
            onSubmit={handleUpdate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CatalogForm({
  formData,
  setFormData,
  products,
  toggleProduct,
  onSubmit,
}: {
  formData: {
    catalogName: string;
    catalogCode: string;
    accessLevel: "R1" | "R2" | "R3" | "GENERAL";
    products: string[];
    isActive: boolean;
  };
  setFormData: (data: any) => void;
  products: Product[];
  toggleProduct: (productId: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="catalogName">Catalog Name</Label>
          <Input
            id="catalogName"
            value={formData.catalogName}
            onChange={(e) =>
              setFormData({ ...formData, catalogName: e.target.value })
            }
            placeholder="e.g., Summer Collection 2024"
          />
        </div>
        <div>
          <Label htmlFor="catalogCode">Catalog Code</Label>
          <Input
            id="catalogCode"
            value={formData.catalogCode}
            onChange={(e) =>
              setFormData({ ...formData, catalogCode: e.target.value })
            }
            placeholder="e.g., SUM2024"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="accessLevel">Access Level</Label>
        <Select
          value={formData.accessLevel}
          onValueChange={(value: "R1" | "R2" | "R3" | "GENERAL") =>
            setFormData({ ...formData, accessLevel: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select access level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GENERAL">General</SelectItem>
            <SelectItem value="R1">R1 (Premium)</SelectItem>
            <SelectItem value="R2">R2 (Standard)</SelectItem>
            <SelectItem value="R3">R3 (Basic)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Products</Label>
        <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
          {products.map((product) => (
            <div key={product._id} className="flex items-center space-x-2">
              <Checkbox
                id={product._id}
                checked={formData.products.includes(product._id)}
                onCheckedChange={() => toggleProduct(product._id)}
              />
              <Label htmlFor={product._id} className="text-sm cursor-pointer">
                {product.itemCode} - {product.itemName} ({product.color})
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked as boolean })
          }
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Save Catalog
        </Button>
      </div>
    </div>
  );
}
