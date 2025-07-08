"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Priority {
  _id: string;
  priorityCode: string;
  priorityName: string;
  description: string;
  discountPercentage: number;
  isActive: boolean;
  retailerCount: number;
}

interface EditPriorityModalProps {
  priority: Priority;
  onPriorityUpdated: () => void;
  trigger?: React.ReactNode;
}

export default function EditPriorityModal({ priority, onPriorityUpdated, trigger }: EditPriorityModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    priorityCode: priority.priorityCode,
    priorityName: priority.priorityName,
    description: priority.description,
    discountPercentage: priority.discountPercentage,
    isActive: priority.isActive
  });

  // Reset form when priority changes
  useEffect(() => {
    setFormData({
      priorityCode: priority.priorityCode,
      priorityName: priority.priorityName,
      description: priority.description,
      discountPercentage: priority.discountPercentage,
      isActive: priority.isActive
    });
  }, [priority]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/priorities/${priority._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Priority updated successfully!");
        setOpen(false);
        onPriorityUpdated();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update priority");
      }
    } catch (error) {
      toast.error("An error occurred while updating priority");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Priority</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="priorityCode">Priority Code *</Label>
            <Input
              id="priorityCode"
              value={formData.priorityCode}
              onChange={(e) => setFormData(prev => ({ ...prev, priorityCode: e.target.value.toUpperCase() }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="priorityName">Priority Name *</Label>
            <Input
              id="priorityName"
              value={formData.priorityName}
              onChange={(e) => setFormData(prev => ({ ...prev, priorityName: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
            <Input
              id="discountPercentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.discountPercentage}
              onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <Label htmlFor="isActive">Priority is active</Label>
          </div>
          
          {priority.retailerCount > 0 && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded">
              ⚠️ This priority is used by {priority.retailerCount} retailer(s). 
              Changes will affect all retailers using this priority.
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Priority"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 