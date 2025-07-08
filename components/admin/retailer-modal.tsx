"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface RetailerModalProps {
  onRetailerCreated: () => void;
  trigger?: React.ReactNode;
}

interface Priority {
  _id: string;
  priorityCode: string;
  priorityName: string;
  discountPercentage: number;
  isActive: boolean;
}

export default function RetailerModal({ onRetailerCreated, trigger }: RetailerModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priorities, setPriorities] = useState<{ _id: string; priorityCode: string; priorityName: string }[]>([]);
  const [catalogs, setCatalogs] = useState<{ _id: string; catalogName: string; catalogCode: string }[]>([]);
  const [selectedCatalogs, setSelectedCatalogs] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    contactPerson: "",
    businessName: "",
    city: ""
  });

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
        setPriorities(data.priorities.filter((p: any) => p.isActive));
      }
    } catch {}
  };

  const fetchCatalogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/catalogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCatalogs(data.catalogs);
      }
    } catch {}
  };

  const toggleCatalog = (catalogId: string) => {
    setSelectedCatalogs(prev => prev.includes(catalogId)
      ? prev.filter(id => id !== catalogId)
      : [...prev, catalogId]
    );
  };

  const togglePriority = (priorityId: string) => {
    setSelectedPriorities(prev => prev.includes(priorityId)
      ? prev.filter(id => id !== priorityId)
      : [...prev, priorityId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/retailers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          contactPerson: formData.contactPerson,
          businessName: formData.businessName,
          priorities: selectedPriorities,
          accessibleCatalogs: selectedCatalogs,
          address: { city: formData.city }
        }),
      });

      if (response.ok) {
        toast.success("Retailer created successfully!");
        setOpen(false);
        setFormData({
          phoneNumber: "",
          contactPerson: "",
          businessName: "",
          city: ""
        });
        setSelectedPriorities([]);
        setSelectedCatalogs([]);
        onRetailerCreated();
      } else {
        toast.error("Failed to create retailer");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add New Retailer</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Retailer</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson || ""}
                onChange={e => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName || ""}
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
                      checked={selectedPriorities.includes(priority._id)}
                      onChange={() => togglePriority(priority._id)}
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
                      checked={selectedCatalogs.includes(catalog._id)}
                      onChange={() => toggleCatalog(catalog._id)}
                    />
                    <label htmlFor={`catalog-${catalog._id}`}>{catalog.catalogName} ({catalog.catalogCode})</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city || ""}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Creating..." : "Create Retailer"}
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