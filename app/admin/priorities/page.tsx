"use client";

import { useState, useEffect } from "react";
import ModernAdminLayout from "@/components/admin/modern-admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EditPriorityModal from "@/components/admin/edit-priority-modal";
import { Star, Plus, Edit, Trash2, Users, Percent, Calendar, FileText, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Priority {
  _id: string;
  priorityCode: string;
  priorityName: string;
  description: string;
  discountPercentage: number;
  isActive: boolean;
  retailerCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPrioritiesPage() {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newPriority, setNewPriority] = useState({
    priorityCode: "",
    priorityName: "",
    description: "",
    discountPercentage: 0,
  });

  useEffect(() => {
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
        setPriorities(data.priorities);
      } else {
        toast.error("Failed to fetch priorities");
      }
    } catch {
      toast.error("An error occurred while fetching priorities");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePriority = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/priorities", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPriority),
      });

      if (response.ok) {
        toast.success("Priority created successfully!");
        setNewPriority({
          priorityCode: "",
          priorityName: "",
          description: "",
          discountPercentage: 0,
        });
        fetchPriorities();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create priority");
      }
    } catch {
      toast.error("An error occurred while creating priority");
    } finally {
      setIsCreating(false);
    }
  };

  const togglePriorityStatus = async (priorityId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/priorities/${priorityId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        toast.success("Priority status updated successfully!");
        fetchPriorities();
      } else {
        toast.error("Failed to update priority status");
      }
    } catch {
      toast.error("An error occurred while updating priority");
    }
  };

  const deletePriority = async (priorityId: string, priorityCode: string, retailerCount: number) => {
    if (retailerCount > 0) {
      const confirmed = window.confirm(
        `This priority is used by ${retailerCount} retailer(s). Deleting it will reassign these retailers to another priority. Are you sure you want to continue?`
      );
      if (!confirmed) return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/priorities/${priorityId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Priority deleted successfully!");
        fetchPriorities();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete priority");
      }
    } catch {
      toast.error("An error occurred while deleting priority");
    }
  };

  if (isLoading) {
    return (
      <ModernAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D9A8A0] mx-auto mb-4"></div>
            <p className="text-[#4A3A3A]">Loading priorities...</p>
          </div>
        </div>
      </ModernAdminLayout>
    );
  }

  return (
    <ModernAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#2E1B1B]">Priority Levels</h1>
            <p className="text-[#4A3A3A] mt-1 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Manage retailer priority levels and discounts
            </p>
          </div>
        </div>

        {/* Create New Priority */}
        <Card className="border-[#E5E0DC] shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-[#2E1B1B]">Create New Priority</CardTitle>
                <CardDescription className="text-[#4A3A3A]">
                  Add a new priority level for retailers
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePriority} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2E1B1B]">Priority Code</label>
                  <Input
                    value={newPriority.priorityCode}
                    onChange={(e) => setNewPriority({ ...newPriority, priorityCode: e.target.value.toUpperCase() })}
                    placeholder="e.g., R1, R2, R3"
                    className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2E1B1B]">Priority Name</label>
                  <Input
                    value={newPriority.priorityName}
                    onChange={(e) => setNewPriority({ ...newPriority, priorityName: e.target.value })}
                    placeholder="e.g., High Priority, Medium Priority"
                    className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2E1B1B]">Description</label>
                <Input
                  value={newPriority.description}
                  onChange={(e) => setNewPriority({ ...newPriority, description: e.target.value })}
                  placeholder="Description of this priority level"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2E1B1B]">Discount Percentage</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={newPriority.discountPercentage}
                  onChange={(e) => setNewPriority({ ...newPriority, discountPercentage: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                  className="border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isCreating}
                className="bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white"
              >
                {isCreating ? "Creating..." : "Create Priority"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Priorities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorities.map((priority) => (
            <Card key={priority._id} className="border-[#E5E0DC] shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-[#2E1B1B]">{priority.priorityName}</CardTitle>
                        <CardDescription className="text-sm text-[#4A3A3A] flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Code: {priority.priorityCode}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className={cn(
                      "px-2 py-1 text-xs font-medium",
                      priority.isActive 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-red-100 text-red-800 border-red-200"
                    )}
                  >
                    {priority.isActive ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {priority.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#D9A8A0]" />
                    <span className="text-[#4A3A3A]">Description:</span>
                    <span className="font-semibold text-[#2E1B1B]">{priority.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-[#D9A8A0]" />
                    <span className="text-[#4A3A3A]">Discount:</span>
                    <span className="font-semibold text-[#2E1B1B]">{priority.discountPercentage}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#D9A8A0]" />
                    <span className="text-[#4A3A3A]">Retailers:</span>
                    <span className="font-semibold text-[#2E1B1B]">{priority.retailerCount} retailers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#D9A8A0]" />
                    <span className="text-[#4A3A3A]">Created:</span>
                    <span className="font-semibold text-[#2E1B1B]">
                      {new Date(priority.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6 pt-4 border-t border-[#E5E0DC]">
                  <EditPriorityModal priority={priority} onPriorityUpdated={fetchPriorities} />
                  <Button 
                    variant={priority.isActive ? "outline" : "default"} 
                    size="sm" 
                    className={cn(
                      "flex-1",
                      priority.isActive 
                        ? "border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700" 
                        : "bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white"
                    )}
                    onClick={() => togglePriorityStatus(priority._id, priority.isActive)}
                  >
                    {priority.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700"
                    onClick={() => deletePriority(priority._id, priority.priorityCode, priority.retailerCount)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {priorities.length === 0 && (
          <Card className="border-[#E5E0DC] shadow-sm">
            <CardContent className="p-12 text-center">
              <Star className="h-12 w-12 text-[#D9A8A0] mx-auto mb-4" />
              <p className="text-[#4A3A3A] text-lg font-medium mb-2">No priority levels available</p>
              <p className="text-[#4A3A3A] text-sm">Create your first priority level above to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ModernAdminLayout>
  );
} 