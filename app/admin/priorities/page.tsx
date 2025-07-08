"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import EditPriorityModal from "@/components/admin/edit-priority-modal";

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
      <AdminLayout>
        <div className="text-center">Loading priorities...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Priority Levels</h1>
            <p className="text-gray-600 mt-1">
              Manage retailer priority levels and discounts
            </p>
          </div>
        </div>

        {/* Create New Priority */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Priority</CardTitle>
            <CardDescription>
              Add a new priority level for retailers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePriority} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Priority Code</label>
                  <Input
                    value={newPriority.priorityCode}
                    onChange={(e) => setNewPriority({ ...newPriority, priorityCode: e.target.value.toUpperCase() })}
                    placeholder="e.g., R1, R2, R3"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Priority Name</label>
                  <Input
                    value={newPriority.priorityName}
                    onChange={(e) => setNewPriority({ ...newPriority, priorityName: e.target.value })}
                    placeholder="e.g., High Priority, Medium Priority"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={newPriority.description}
                  onChange={(e) => setNewPriority({ ...newPriority, description: e.target.value })}
                  placeholder="Description of this priority level"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Discount Percentage</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={newPriority.discountPercentage}
                  onChange={(e) => setNewPriority({ ...newPriority, discountPercentage: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Priority"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Priorities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorities.map((priority) => (
            <Card key={priority._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{priority.priorityName}</CardTitle>
                    <CardDescription className="text-sm">
                      Code: {priority.priorityCode}
                    </CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    priority.isActive 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {priority.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">{priority.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium">{priority.discountPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retailers:</span>
                    <span className="font-medium">{priority.retailerCount} retailers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(priority.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <EditPriorityModal priority={priority} onPriorityUpdated={fetchPriorities} />
                  <Button 
                    variant={priority.isActive ? "destructive" : "default"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => togglePriorityStatus(priority._id, priority.isActive)}
                  >
                    {priority.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => deletePriority(priority._id, priority.priorityCode, priority.retailerCount)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {priorities.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              No priority levels available. Create your first priority level above.
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
} 