"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import RetailerModal from "@/components/admin/retailer-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import EditRetailerModal from "@/components/admin/edit-retailer-modal";

interface Retailer {
  _id: string;
  phoneNumber: string;
  businessName: string;
  contactPerson: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  priorities: Array<{
    _id: string;
    priorityCode: string;
    priorityName: string;
    discountPercentage: number;
    isActive: boolean;
  }>;
  gstNumber: string;
  accessibleCatalogs: string[];
  isActive: boolean;
  sheetRowId: string;
  lastSyncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminRetailersPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [priorities, setPriorities] = useState<{ _id: string; priorityCode: string; priorityName: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUpdatingCatalogAccess, setIsUpdatingCatalogAccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  useEffect(() => {
    fetchRetailers();
    fetchPriorities();
  }, []);

  const fetchPriorities = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/priorities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPriorities(data.priorities.filter((p: Record<string, unknown>) => p.isActive));
      }
    } catch {
      console.error("Failed to fetch priorities");
    }
  };

  const fetchRetailers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/retailers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRetailers(data.retailers);
      } else {
        toast.error("Failed to fetch retailers");
      }
    } catch {
      toast.error("An error occurred while fetching retailers");
    } finally {
      setIsLoading(false);
    }
  };

  const syncWithGoogleSheets = async () => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/retailers/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Successfully synced ${data.syncedCount} retailers`);
        fetchRetailers(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to sync with Google Sheets");
      }
    } catch {
      toast.error("An error occurred during sync");
    } finally {
      setIsSyncing(false);
    }
  };

  const updateCatalogAccess = async () => {
    setIsUpdatingCatalogAccess(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/retailers/update-catalog-access", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchRetailers(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update catalog access");
      }
    } catch {
      toast.error("An error occurred while updating catalog access");
    } finally {
      setIsUpdatingCatalogAccess(false);
    }
  };

  const filteredRetailers = retailers.filter((retailer) => {
    const matchesSearch = 
      (retailer.businessName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (retailer.contactPerson || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (retailer.phoneNumber || "").includes(searchTerm) ||
      (retailer.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || 
      (retailer.priorities && retailer.priorities.some(p => p.priorityCode === priorityFilter));
    
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "R1":
        return "bg-red-100 text-red-800";
      case "R2":
        return "bg-yellow-100 text-yellow-800";
      case "R3":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderPriorities = (priorities: Array<{ _id: string; priorityCode: string; priorityName: string }>) => {
    if (!priorities || priorities.length === 0) {
      return <span className="text-gray-500 text-xs">No priorities assigned</span>;
    }
    
    return priorities.map((priority, index) => (
      <div 
        key={priority._id || index} 
        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority.priorityCode)}`}
      >
        {priority.priorityCode} - {priority.priorityName}
      </div>
    ));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center">Loading retailers...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminProtection>
      <AdminLayout>
        <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Retailers</h1>
            <p className="text-gray-600 mt-1">
              Manage retailers and sync with Google Sheets
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={syncWithGoogleSheets} 
              disabled={isSyncing}
              variant="outline"
            >
              {isSyncing ? "Syncing..." : "Sync with Google Sheets"}
            </Button>
            {/* <Button 
              onClick={syncWithGoogleSheetsSimple} 
              disabled={isSyncingSimple}
              variant="outline"
            >
              {isSyncingSimple ? "Syncing..." : "Sync with Google Sheets (Simple)"}
            </Button> */}
            <Button 
              onClick={updateCatalogAccess} 
              disabled={isUpdatingCatalogAccess}
              variant="outline"
            >
              {isUpdatingCatalogAccess ? "Updating..." : "Update Catalog Access"}
            </Button>
            <RetailerModal onRetailerCreated={fetchRetailers} />
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search retailers by name, contact person, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                {priorities.map((priority) => (
                  <option key={priority._id} value={priority.priorityCode}>
                    {priority.priorityCode} - {priority.priorityName}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Retailers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRetailers.map((retailer) => (
            <Card key={retailer._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{retailer.businessName}</CardTitle>
                    <CardDescription className="text-sm">
                      {retailer.contactPerson} • {retailer.phoneNumber}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    {renderPriorities(retailer.priorities)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">City:</span>
                    <span className="font-medium">{retailer.address?.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Catalogs:</span>
                    <span className="font-medium">
                      {Array.isArray(retailer.accessibleCatalogs) && retailer.accessibleCatalogs.length > 0
                        ? retailer.accessibleCatalogs.map((cat: any) => `${cat.catalogName} (${cat.catalogCode})`).join(", ")
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <EditRetailerModal retailer={retailer} onRetailerUpdated={fetchRetailers} />
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={async () => {
                      if (window.confirm(`Are you sure you want to delete retailer ${retailer.businessName}?`)) {
                        try {
                          const token = localStorage.getItem("adminToken");
                          const response = await fetch(`/api/admin/retailers/${retailer._id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          if (response.ok) {
                            toast.success("Retailer deleted successfully!");
                            fetchRetailers();
                          } else {
                            const error = await response.json();
                            toast.error(error.error || "Failed to delete retailer");
                          }
                        } catch (error) {
                          toast.error("An error occurred while deleting retailer");
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

        {filteredRetailers.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              {searchTerm || priorityFilter !== "all" 
                ? "No retailers found matching your filters." 
                : "No retailers available."}
            </CardContent>
          </Card>
        )}
      </div>
      </AdminLayout>
    </AdminProtection>
  );
} 