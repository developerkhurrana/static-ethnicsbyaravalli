"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Star, Edit, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 py-6 border-b border-[#E5E0DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
              <Edit className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-[#2E1B1B]">Edit Priority</DialogTitle>
              <p className="text-sm text-[#4A3A3A] mt-1">Update priority level information</p>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Priority Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A3A3A] uppercase tracking-wide flex items-center gap-2">
              <Star className="h-4 w-4 text-[#D9A8A0]" />
              Priority Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priorityCode" className="text-sm font-medium text-[#2E1B1B]">
                  Priority Code *
                </Label>
                <Input
                  id="priorityCode"
                  value={formData.priorityCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, priorityCode: e.target.value.toUpperCase() }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  placeholder="e.g., R1, R2, R3"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priorityName" className="text-sm font-medium text-[#2E1B1B]">
                  Priority Name *
                </Label>
                <Input
                  id="priorityName"
                  value={formData.priorityName}
                  onChange={(e) => setFormData(prev => ({ ...prev, priorityName: e.target.value }))}
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  placeholder="e.g., High Priority, Medium Priority"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-[#2E1B1B]">
                Description *
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                placeholder="Description of this priority level"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercentage" className="text-sm font-medium text-[#2E1B1B]">
                Discount Percentage (%)
              </Label>
              <Input
                id="discountPercentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.discountPercentage}
                onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: parseFloat(e.target.value) || 0 }))}
                className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                placeholder="0"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A3A3A] uppercase tracking-wide flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#D9A8A0]" />
              Status
            </h3>
            
            <div 
              onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                formData.isActive
                  ? "border-[#D9A8A0] bg-[#F9F6F4] shadow-sm"
                  : "border-[#E5E0DC] bg-white hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {formData.isActive ? (
                    <CheckCircle className="h-5 w-5 text-[#D9A8A0]" />
                  ) : (
                    <XCircle className="h-5 w-5 text-[#4A3A3A]" />
                  )}
                  <div>
                    <div className="font-semibold text-[#2E1B1B]">Priority is active</div>
                    <div className="text-sm text-[#4A3A3A]">
                      {formData.isActive ? "This priority is currently active" : "This priority is currently inactive"}
                    </div>
                  </div>
                </div>
                <Badge 
                  className={cn(
                    "px-3 py-1 text-xs font-medium",
                    formData.isActive 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : "bg-red-100 text-red-800 border-red-200"
                  )}
                >
                  {formData.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Warning Message */}
          {priority.retailerCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-amber-800 mb-1">Affects {priority.retailerCount} retailer(s)</div>
                  <div className="text-sm text-amber-700">
                    This priority is used by {priority.retailerCount} retailer(s). 
                    Changes will affect all retailers using this priority.
                  </div>
                </div>
              </div>
            </div>
          )}

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
              {isLoading ? "Updating..." : "Update Priority"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 