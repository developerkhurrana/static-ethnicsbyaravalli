"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import CatalogModal from "@/components/admin/catalog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import EditCatalogModal from "@/components/admin/edit-catalog-modal";

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

export default function AdminCatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/catalogs", {
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
    } catch {
      toast.error("An error occurred while fetching catalogs");
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center">Loading catalogs...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminProtection>
      <AdminLayout>
        <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catalogs</h1>
            <p className="text-gray-600 mt-1">
              Manage product catalogs and access levels
            </p>
          </div>
          <CatalogModal onCatalogCreated={fetchCatalogs} />
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <Input
              placeholder="Search catalogs by name, code, or access level..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalogs.map((catalog) => (
            <Card key={catalog._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{catalog.catalogName}</CardTitle>
                    <CardDescription className="text-sm">
                      Code: {catalog.catalogCode}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(catalog.accessLevel)}`}>
                      {catalog.accessLevel}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      catalog.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {catalog.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products:</span>
                    <span className="font-medium">{catalog.products.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access Level:</span>
                    <span className="font-medium">{catalog.accessLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(catalog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <EditCatalogModal catalog={catalog} onCatalogUpdated={fetchCatalogs} />
                  
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={async () => {
                      if (window.confirm(`Are you sure you want to delete catalog ${catalog.catalogName}?`)) {
                        try {
                          const token = localStorage.getItem("adminToken");
                          const response = await fetch(`/api/admin/catalogs/${catalog._id}`, {
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
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCatalogs.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              {searchTerm ? "No catalogs found matching your search." : "No catalogs available."}
            </CardContent>
          </Card>
        )}
      </div>
      </AdminLayout>
    </AdminProtection>
  );
} 