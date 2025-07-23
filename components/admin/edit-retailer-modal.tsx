"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Building, Users, Phone, Mail, MapPin, Star, Database, X, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

interface Priority {
  _id: string;
  priorityCode: string;
  priorityName: string;
  discountPercentage: number;
  isActive: boolean;
}

interface Catalog {
  _id: string;
  catalogName: string;
  catalogCode: string;
  isActive: boolean;
}

interface EditRetailerModalProps {
  retailer: Retailer;
  onRetailerUpdated: () => void;
  trigger?: React.ReactNode;
}

// Helper to get priorities array from retailer (supports both priorities and legacy priority)
function getRetailerPriorities(retailer: any): string[] {
  if (Array.isArray(retailer.priorities)) {
    return retailer.priorities.map((p: any) => typeof p === "string" ? p : p._id as string);
  } else if (retailer.priority?._id) {
    return [retailer.priority._id];
  } else {
    return [];
  }
}

export default function EditRetailerModal({ retailer, onRetailerUpdated, trigger }: EditRetailerModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [formData, setFormData] = useState<{
    phoneNumber: string;
    contactPerson: string;
    businessName: string;
    priorities: string[];
    accessibleCatalogs: string[];
    city: string;
  }>({
    phoneNumber: retailer.phoneNumber || "",
    contactPerson: retailer.contactPerson || "",
    businessName: retailer.businessName || "",
    priorities: getRetailerPriorities(retailer),
    accessibleCatalogs: Array.isArray(retailer.accessibleCatalogs)
      ? (retailer.accessibleCatalogs as any[]).map(cat => typeof cat === "string" ? cat : cat._id as string)
      : [],
    city: retailer.address?.city || ""
  });

  // Fetch priorities and catalogs when modal opens
  useEffect(() => {
    if (open) {
      fetchPriorities();
      fetchCatalogs();
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
        setPriorities(data.priorities.filter((p: Priority) => p.isActive));
      }
    } catch (error) {
      console.error("Failed to fetch priorities:", error);
    }
  };

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/catalogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCatalogs(data.catalogs.filter((c: Catalog) => c.isActive));
      }
    } catch (error) {
      console.error("Failed to fetch catalogs:", error);
    }
  };

  // Reset form when retailer changes
  useEffect(() => {
    setFormData({
      phoneNumber: retailer.phoneNumber || "",
      contactPerson: retailer.contactPerson || "",
      businessName: retailer.businessName || "",
      priorities: getRetailerPriorities(retailer),
      accessibleCatalogs: Array.isArray(retailer.accessibleCatalogs)
        ? (retailer.accessibleCatalogs as any[]).map(cat => typeof cat === "string" ? cat : cat._id as string)
        : [],
      city: retailer.address?.city || ""
    });
  }, [retailer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/retailers/${retailer._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          contactPerson: formData.contactPerson,
          businessName: formData.businessName,
          priorities: formData.priorities,
          accessibleCatalogs: formData.accessibleCatalogs,
          address: { city: formData.city }
        }),
      });

      if (response.ok) {
        toast.success("Retailer updated successfully!");
        setOpen(false);
        onRetailerUpdated();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update retailer");
      }
    } catch (error) {
      toast.error("An error occurred while updating retailer");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCatalog = (catalogId: string) => {
    setFormData(prev => ({
      ...prev,
      accessibleCatalogs: prev.accessibleCatalogs.includes(catalogId)
        ? prev.accessibleCatalogs.filter(id => id !== catalogId)
        : [...prev.accessibleCatalogs, catalogId]
    }));
  };

  const handlePriorityToggle = (priorityId: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priorityId)
        ? prev.priorities.filter(id => id !== priorityId)
        : [...prev.priorities, priorityId]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 py-6 border-b border-[#E5E0DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
              <Edit className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-[#2E1B1B]">Edit Retailer</DialogTitle>
              <p className="text-sm text-[#4A3A3A] mt-1">Update retailer information</p>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A3A3A] uppercase tracking-wide flex items-center gap-2">
              <Users className="h-4 w-4 text-[#D9A8A0]" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium text-[#2E1B1B]">
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  placeholder="Enter business name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-sm font-medium text-[#2E1B1B]">
                  Contact Person *
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={e => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  placeholder="Enter contact person name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-[#2E1B1B]">
                  Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-[#2E1B1B]">
                  City *
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  placeholder="Enter city"
                  required
                />
              </div>
            </div>
          </div>

          {/* Priorities */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A3A3A] uppercase tracking-wide flex items-center gap-2">
              <Star className="h-4 w-4 text-[#D9A8A0]" />
              Priority Levels *
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {priorities.map(priority => (
                <div
                  key={priority._id}
                  onClick={() => handlePriorityToggle(priority._id)}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                    formData.priorities.includes(priority._id)
                      ? "border-[#D9A8A0] bg-[#F9F6F4] shadow-sm"
                      : "border-[#E5E0DC] bg-white hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#2E1B1B]">{priority.priorityCode}</div>
                      <div className="text-sm text-[#4A3A3A]">{priority.priorityName}</div>
                    </div>
                    {formData.priorities.includes(priority._id) && (
                      <div className="w-6 h-6 bg-[#D9A8A0] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catalog Access */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A3A3A] uppercase tracking-wide flex items-center gap-2">
              <Database className="h-4 w-4 text-[#D9A8A0]" />
              Catalog Access
            </h3>
            
            {catalogs.length > 0 ? (
              <div className="space-y-3">
                {catalogs.map(catalog => (
                  <div
                    key={catalog._id}
                    onClick={() => toggleCatalog(catalog._id)}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                      formData.accessibleCatalogs.includes(catalog._id)
                        ? "border-[#D9A8A0] bg-[#F9F6F4] shadow-sm"
                        : "border-[#E5E0DC] bg-white hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[#2E1B1B]">{catalog.catalogName}</div>
                        <div className="text-sm text-[#4A3A3A]">Code: {catalog.catalogCode}</div>
                      </div>
                      {formData.accessibleCatalogs.includes(catalog._id) && (
                        <div className="w-6 h-6 bg-[#D9A8A0] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#4A3A3A] text-sm bg-[#F9F6F4] border border-[#E5E0DC] rounded-lg">
                No catalogs available
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-[#E5E0DC]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex-1 bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white font-medium"
            >
              {isLoading ? "Updating..." : "Update Retailer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 