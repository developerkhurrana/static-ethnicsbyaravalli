"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Retailer</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={e => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label>Priorities *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                {priorities.map(priority => (
                  <div key={priority._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`priority-${priority._id}`}
                      checked={formData.priorities.includes(priority._id)}
                      onChange={() => handlePriorityToggle(priority._id)}
                    />
                    <label htmlFor={`priority-${priority._id}`}>
                      {priority.priorityCode} - {priority.priorityName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Catalog Access</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
                {catalogs.map(catalog => (
                  <div key={catalog._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`catalog-${catalog._id}`}
                      checked={formData.accessibleCatalogs.includes(catalog._id)}
                      onChange={() => toggleCatalog(catalog._id)}
                    />
                    <label htmlFor={`catalog-${catalog._id}`}>
                      {catalog.catalogName} ({catalog.catalogCode})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Retailer"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 