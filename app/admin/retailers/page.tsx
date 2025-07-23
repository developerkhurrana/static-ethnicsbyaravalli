"use client";

import { useState, useEffect } from "react";
import ModernAdminLayout from "@/components/admin/modern-admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import RetailerModal from "@/components/admin/retailer-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import EditRetailerModal from "@/components/admin/edit-retailer-modal";
import { Building, Users, Phone, Mail, MapPin, Search, Filter, ChevronDown, RefreshCw, Database, Grid3X3, List, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [retailerToDelete, setRetailerToDelete] = useState<Retailer | null>(null);

  useEffect(() => {
    fetchRetailers();
    fetchPriorities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.priority-dropdown')) {
        setIsPriorityOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const openDeleteModal = (retailer: Retailer) => {
    setRetailerToDelete(retailer);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setRetailerToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteRetailer = async () => {
    if (!retailerToDelete) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/retailers/${retailerToDelete._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        toast.success("Retailer deleted successfully!");
        closeDeleteModal();
        fetchRetailers();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete retailer");
      }
    } catch (error) {
      toast.error("An error occurred while deleting retailer");
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
      <AdminProtection>
        <ModernAdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A8A0] mx-auto mb-4"></div>
              <p className="text-[#4A3A3A]">Loading retailers...</p>
            </div>
          </div>
        </ModernAdminLayout>
      </AdminProtection>
    );
  }

  return (
    <AdminProtection>
      <ModernAdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2E1B1B] flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-white" />
                </div>
                Retailers
              </h1>
              <p className="text-[#4A3A3A] mt-2">
                Manage retailers and sync with Google Sheets ({filteredRetailers.length} retailers)
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={syncWithGoogleSheets} 
                disabled={isSyncing}
                className="bg-white border border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <RefreshCw className={cn("h-4 w-4 mr-2", isSyncing && "animate-spin")} />
                {isSyncing ? "Syncing..." : "Sync with Sheets"}
              </Button>
              <Button 
                onClick={updateCatalogAccess} 
                disabled={isUpdatingCatalogAccess}
                className="bg-white border border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Database className="h-4 w-4 mr-2" />
                {isUpdatingCatalogAccess ? "Updating..." : "Update Catalogs"}
              </Button>
              <RetailerModal 
                onRetailerCreated={fetchRetailers}
                trigger={
                  <Button 
                    className="bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Add New Retailer
                  </Button>
                }
              />
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
                  <Input
                    placeholder="Search retailers by name, contact person, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative priority-dropdown">
                    <button
                      onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                      className="flex items-center gap-2 px-4 py-2 border border-[#E5E0DC] rounded-lg bg-white hover:bg-[#F9F6F4] transition-all duration-200 focus:border-[#D9A8A0] focus:ring-1 focus:ring-[#D9A8A0] outline-none"
                    >
                      <Filter className="h-4 w-4 text-[#4A3A3A]" />
                      <span className="text-[#2E1B1B] font-medium">
                        {priorityFilter === "all" ? "All Priorities" : 
                         priorities.find(p => p.priorityCode === priorityFilter)?.priorityName || "All Priorities"}
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-[#4A3A3A] transition-transform duration-200",
                        isPriorityOpen && "rotate-180"
                      )} />
                    </button>
                    
                    {isPriorityOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E0DC] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                      >
                        <button
                          onClick={() => {
                            setPriorityFilter("all");
                            setIsPriorityOpen(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2 text-left transition-colors duration-150",
                            priorityFilter === "all" 
                              ? "bg-[#D9A8A0] text-[#2E1B1B] font-medium" 
                              : "hover:bg-[#F9F6F4] text-[#2E1B1B]",
                            "rounded-t-lg"
                          )}
                        >
                          All Priorities
                        </button>
                        {priorities.map((priority, index) => (
                          <button
                            key={priority._id}
                            onClick={() => {
                              setPriorityFilter(priority.priorityCode);
                              setIsPriorityOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-2 text-left transition-colors duration-150",
                              priorityFilter === priority.priorityCode 
                                ? "bg-[#D9A8A0] text-[#2E1B1B] font-medium" 
                                : "hover:bg-[#F9F6F4] text-[#2E1B1B]",
                              index === priorities.length - 1 && "rounded-b-lg"
                            )}
                          >
                            {priority.priorityCode} - {priority.priorityName}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <div className="relative flex border border-[#E5E0DC] rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "relative flex items-center justify-center px-3 py-2 transition-all duration-200 ease-in-out",
                        viewMode === "grid" 
                          ? "text-[#2E1B1B] font-medium" 
                          : "text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4]"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4 relative z-10" />
                      {viewMode === "grid" && (
                        <motion.div
                          layoutId="viewToggle"
                          className="absolute inset-0 bg-[#D9A8A0] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "relative flex items-center justify-center px-3 py-2 transition-all duration-200 ease-in-out",
                        viewMode === "list" 
                          ? "text-[#2E1B1B] font-medium" 
                          : "text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4]"
                      )}
                    >
                      <List className="h-4 w-4 relative z-10" />
                      {viewMode === "list" && (
                        <motion.div
                          layoutId="viewToggle"
                          className="absolute inset-0 bg-[#D9A8A0] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

                    {/* Retailers Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredRetailers.map((retailer) => (
                <Card key={retailer._id} className="border-[#E5E0DC] hover:shadow-lg transition-all duration-200 group overflow-hidden">
                  {/* Header with Status */}
                  <div className="px-4 py-3 border-b border-[#E5E0DC] bg-[#F9F6F4]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                          <Building className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-[#2E1B1B] text-sm truncate">{retailer.businessName}</h3>
                          <p className="text-xs text-[#4A3A3A] truncate">{retailer.contactPerson}</p>
                        </div>
                      </div>
                      <Badge className={retailer.isActive ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                        {retailer.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Contact Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-[#4A3A3A]">
                          <Phone className="h-3 w-3 text-[#D9A8A0] flex-shrink-0" />
                          <span className="truncate">{retailer.phoneNumber}</span>
                        </div>
                        {retailer.email && (
                          <div className="flex items-center gap-2 text-xs text-[#4A3A3A]">
                            <Mail className="h-3 w-3 text-[#D9A8A0] flex-shrink-0" />
                            <span className="truncate">{retailer.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-[#4A3A3A]">
                          <MapPin className="h-3 w-3 text-[#D9A8A0] flex-shrink-0" />
                          <span className="truncate">{retailer.address?.city || "Not specified"}</span>
                        </div>
                      </div>

                      {/* Priorities */}
                      <div className="flex flex-wrap gap-1">
                        {renderPriorities(retailer.priorities)}
                      </div>

                      {/* Catalog Count */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#4A3A3A]">Catalogs:</span>
                        <span className="font-medium text-[#2E1B1B]">
                          {Array.isArray(retailer.accessibleCatalogs) && retailer.accessibleCatalogs.length > 0
                            ? retailer.accessibleCatalogs.length
                            : "0"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 mt-4 pt-3 border-t border-[#E5E0DC]">
                      <EditRetailerModal 
                        retailer={retailer} 
                        onRetailerUpdated={fetchRetailers}
                        trigger={
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4] py-1.5 px-2 rounded-md transition-all duration-200"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs">Edit</span>
                          </Button>
                        }
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50 py-1.5 px-2 rounded-md transition-all duration-200"
                        onClick={() => openDeleteModal(retailer)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-[#E5E0DC] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9F6F4] border-b border-[#E5E0DC]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Retailer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Location
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Priorities
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Catalogs
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0DC]">
                    {filteredRetailers.map((retailer) => (
                      <tr key={retailer._id} className="hover:bg-[#F9F6F4] transition-colors duration-150">
                        {/* Retailer Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#2E1B1B]">{retailer.businessName}</div>
                              <div className="text-sm text-[#4A3A3A]">
                                {retailer.contactPerson}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm text-[#4A3A3A] flex items-center gap-1">
                              <Phone className="h-3 w-3 text-[#D9A8A0]" />
                              {retailer.phoneNumber}
                            </div>
                            {retailer.email && (
                              <div className="text-sm text-[#4A3A3A] flex items-center gap-1">
                                <Mail className="h-3 w-3 text-[#D9A8A0]" />
                                <span className="truncate max-w-[150px]">{retailer.email}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4 text-center">
                          <div className="text-sm text-[#4A3A3A] flex items-center justify-center gap-1">
                            <MapPin className="h-3 w-3 text-[#D9A8A0]" />
                            {retailer.address?.city || "Not specified"}
                          </div>
                        </td>

                        {/* Priorities */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {renderPriorities(retailer.priorities)}
                          </div>
                        </td>

                        {/* Catalogs */}
                        <td className="px-6 py-4 text-center">
                          <div className="text-sm text-[#4A3A3A]">
                            {Array.isArray(retailer.accessibleCatalogs) && retailer.accessibleCatalogs.length > 0
                              ? retailer.accessibleCatalogs.length
                              : "0"}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          <Badge className={retailer.isActive ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                            {retailer.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>

                                                 {/* Actions */}
                         <td className="px-6 py-4">
                           <div className="flex gap-2">
                             <EditRetailerModal 
                               retailer={retailer} 
                               onRetailerUpdated={fetchRetailers}
                               trigger={
                                 <Button 
                                   variant="outline"
                                   size="sm"
                                   className="w-8 h-8 p-0 bg-white border border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                 >
                                   <Edit className="h-4 w-4" />
                                 </Button>
                               }
                             />
                             <Button 
                               variant="destructive" 
                               size="sm"
                               className="w-8 h-8 p-0 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                               onClick={() => openDeleteModal(retailer)}
                             >
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </div>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {filteredRetailers.length === 0 && (
            <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
              <CardContent className="text-center py-12">
                <Building className="h-12 w-12 text-[#4A3A3A] mx-auto mb-4" />
                <p className="text-[#4A3A3A] text-lg font-medium">
                  {searchTerm || priorityFilter !== "all" 
                    ? "No retailers found matching your filters." 
                    : "No retailers available."}
                </p>
                <p className="text-[#4A3A3A] text-sm mt-2">
                  {searchTerm || priorityFilter !== "all" 
                    ? "Try adjusting your search terms or filters." 
                    : "Retailers will appear here once they are added."}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Delete Confirmation Modal */}
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#2E1B1B]">Delete Retailer</div>
                    <div className="text-sm text-[#4A3A3A] mt-1">This action cannot be undone</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="py-4">
                <p className="text-[#4A3A3A] mb-4">
                  Are you sure you want to delete <span className="font-semibold text-[#2E1B1B]">{retailerToDelete?.businessName}</span>?
                </p>

                {/* Retailer Information */}
                <div className="bg-[#F9F6F4] border border-[#E5E0DC] rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-[#2E1B1B] mb-3 flex items-center gap-2">
                    <Building className="h-4 w-4 text-[#D9A8A0]" />
                    Retailer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-[#D9A8A0]" />
                      <span className="text-[#4A3A3A]">Contact:</span>
                      <span className="font-medium text-[#2E1B1B]">{retailerToDelete?.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-[#D9A8A0]" />
                      <span className="text-[#4A3A3A]">Phone:</span>
                      <span className="font-medium text-[#2E1B1B]">{retailerToDelete?.phoneNumber}</span>
                    </div>
                    {retailerToDelete?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-[#D9A8A0]" />
                        <span className="text-[#4A3A3A]">Email:</span>
                        <span className="font-medium text-[#2E1B1B]">{retailerToDelete.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-[#D9A8A0]" />
                      <span className="text-[#4A3A3A]">Location:</span>
                      <span className="font-medium text-[#2E1B1B]">{retailerToDelete?.address?.city || "Not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4A3A3A]">Status:</span>
                      <Badge className={retailerToDelete?.isActive ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                        {retailerToDelete?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4A3A3A]">Catalogs:</span>
                      <span className="font-medium text-[#2E1B1B]">
                        {Array.isArray(retailerToDelete?.accessibleCatalogs) && retailerToDelete?.accessibleCatalogs.length > 0
                          ? retailerToDelete.accessibleCatalogs.length
                          : "0"}
                      </span>
                    </div>
                    {retailerToDelete?.priorities && retailerToDelete.priorities.length > 0 && (
                      <div className="flex items-start gap-2">
                        <span className="text-[#4A3A3A] mt-0.5">Priorities:</span>
                        <div className="flex flex-wrap gap-1">
                          {renderPriorities(retailerToDelete.priorities)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-xs font-bold">!</span>
                    </div>
                    <div className="text-sm text-red-700">
                      <p className="font-medium mb-1">This will permanently delete:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>All retailer information and contact details</li>
                        <li>Associated catalog access permissions</li>
                        <li>Priority assignments and discounts</li>
                        <li>Any related order history</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={closeDeleteModal}
                  className="flex-1 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteRetailer}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium"
                >
                  Delete Retailer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ModernAdminLayout>
    </AdminProtection>
  );
} 