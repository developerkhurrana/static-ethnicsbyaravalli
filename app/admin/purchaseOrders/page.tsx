"use client";

import { useState, useEffect } from "react";
import ModernAdminLayout from "@/components/admin/modern-admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, Filter, Eye, Printer, Send, CheckCircle, FileText, Calendar, User, Building, Package, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface PurchaseOrder {
  _id: string;
  poNumber: string;
  orderId: string;
  retailerInfo: {
    businessName: string;
    contactPerson: string;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
  };
  poSummary: {
    totalPcs: number;
    totalSets: number;
    totalAmountAfterGST: number;
    totalAmountBeforeGST: number;
    gstRate: number;
    gstAmount: number;
  };
  items: {
    itemName: string;
    itemCode: string;
    color: string;
    fabric: string;
    quantitySets: number;
    totalPcs: number;
    totalAmount: number;
  }[];
  terms: {
    paymentTerms: string;
    deliveryTerms: string;
    warranty: string;
  };
  status: "GENERATED" | "SENT" | "ACKNOWLEDGED";
  generatedBy: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/purchase-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPurchaseOrders(data.purchaseOrders);
      } else {
        toast.error("Failed to fetch purchase orders");
      }
    } catch {
      toast.error("An error occurred while fetching purchase orders");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPurchaseOrders = purchaseOrders.filter((po) => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.retailerInfo.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.retailerInfo.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || po.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "GENERATED":
        return "bg-blue-100 text-blue-800";
      case "SENT":
        return "bg-yellow-100 text-yellow-800";
      case "ACKNOWLEDGED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Print PO handler
  const handlePrintPO = async (po: PurchaseOrder) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/purchase-orders/pdf?poId=${po._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 501) {
        toast.error("PDF download not implemented yet.");
        return;
      }
      if (!response.ok) {
        toast.error("Failed to download PDF");
        return;
      }
      
      // Get the HTML content
      const htmlContent = await response.text();
      
      // Open in new window for printing
      const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        // Auto-print after a short delay to ensure content is loaded
        setTimeout(() => {
          newWindow.focus();
          newWindow.print();
        }, 1000);
      } else {
        toast.error("Please allow popups to view the purchase order");
      }
          } catch {
        toast.error("An error occurred while opening the purchase order");
      }
  };

  // Mark as Sent handler
  const handleMarkAsSent = async (po: PurchaseOrder) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/purchase-orders?poId=${po._id}&action=mark-sent`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("Purchase order marked as sent successfully!");
        await fetchPurchaseOrders(); // Refresh the list
      } else {
        toast.error("Failed to mark purchase order as sent");
      }
    } catch {
      toast.error("An error occurred while marking purchase order as sent");
    }
  };

  // Mark as Acknowledged handler
  const handleMarkAsAcknowledged = async (po: PurchaseOrder) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/purchase-orders?poId=${po._id}&action=mark-acknowledged`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("Purchase order marked as acknowledged!");
        await fetchPurchaseOrders();
      } else {
        toast.error("Failed to mark purchase order as acknowledged");
      }
    } catch {
      toast.error("An error occurred while marking as acknowledged");
    }
  };



  const openPODetails = async (po: PurchaseOrder) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/purchase-orders?poId=${po._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedPO(data.purchaseOrder);
      } else {
        setSelectedPO(po); // fallback
      }
    } catch {
      setSelectedPO(po); // fallback
    }
    setIsDetailsModalOpen(true);
  };

  const closePODetails = () => {
    setSelectedPO(null);
    setIsDetailsModalOpen(false);
  };

  if (isLoading) {
    return (
      <ModernAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D9A8A0] mx-auto mb-4"></div>
            <p className="text-[#4A3A3A]">Loading purchase orders...</p>
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
            <h1 className="text-2xl font-bold text-[#2E1B1B]">Purchase Orders</h1>
            <p className="text-[#4A3A3A] mt-1 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Manage and track purchase orders
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
                <Input
                  placeholder="Search POs by number, business name, or contact person..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="!pl-10 !pr-8 py-2 border border-[#E5E0DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D9A8A0] focus:border-[#D9A8A0] bg-white text-[#2E1B1B] min-w-[140px]"
                >
                  <option value="all">All Status</option>
                  <option value="GENERATED">Generated</option>
                  <option value="SENT">Sent</option>
                  <option value="ACKNOWLEDGED">Acknowledged</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPurchaseOrders.map((po) => (
            <Card key={po._id} className="border-[#E5E0DC] shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                {/* Header with Icon and Status */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#2E1B1B] text-sm truncate">PO #{po.poNumber}</h3>
                    <p className="text-xs text-[#4A3A3A] truncate">{po.retailerInfo.businessName}</p>
                  </div>
                  <Badge 
                    className={cn(
                      "text-xs font-medium flex-shrink-0",
                      po.status === "GENERATED" && "bg-blue-100 text-blue-800 border-blue-200",
                      po.status === "SENT" && "bg-yellow-100 text-yellow-800 border-yellow-200",
                      po.status === "ACKNOWLEDGED" && "bg-green-100 text-green-800 border-green-200"
                    )}
                  >
                    {po.status}
                  </Badge>
                </div>

                {/* Key Metrics */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#4A3A3A]">Pieces:</span>
                    <span className="font-medium text-[#2E1B1B]">{po.poSummary.totalPcs}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#4A3A3A]">Sets:</span>
                    <span className="font-medium text-[#2E1B1B]">{po.poSummary.totalSets}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#4A3A3A]">Amount:</span>
                    <span className="font-medium text-[#2E1B1B]">₹{po.poSummary.totalAmountAfterGST.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#4A3A3A]">By:</span>
                    <span className="font-medium text-[#2E1B1B] truncate">{po.generatedBy}</span>
                  </div>
                </div>

                {/* Footer with Date and Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-[#E5E0DC]">
                  <div className="text-xs text-[#4A3A3A]">
                    {new Date(po.createdAt).toLocaleDateString()}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 w-7 p-0 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] transition-all duration-200"
                      >
                        <MoreVertical className="h-3.5 w-3.5 text-[#4A3A3A]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => openPODetails(po)}>
                        <Eye className="h-4 w-4 mr-2 text-[#4A3A3A]" />
                        View Details
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => handlePrintPO(po)}>
                        <Printer className="h-4 w-4 mr-2 text-[#4A3A3A]" />
                        Print PO
                      </DropdownMenuItem>
                      
                      {po.status === "GENERATED" && (
                        <DropdownMenuItem onClick={() => handleMarkAsSent(po)}>
                          <Send className="h-4 w-4 mr-2 text-[#4A3A3A]" />
                          Mark as Sent
                        </DropdownMenuItem>
                      )}
                      
                      {po.status === "SENT" && (
                        <DropdownMenuItem onClick={() => handleMarkAsAcknowledged(po)}>
                          <CheckCircle className="h-4 w-4 mr-2 text-[#4A3A3A]" />
                          Mark as Acknowledged
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPurchaseOrders.length === 0 && (
          <Card className="border-[#E5E0DC] shadow-sm">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-[#D9A8A0] mx-auto mb-4" />
              <p className="text-[#4A3A3A] text-lg font-medium mb-2">
                {searchTerm || statusFilter !== "all" 
                  ? "No purchase orders found" 
                  : "No purchase orders available"}
              </p>
              <p className="text-[#4A3A3A] text-sm">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "Purchase orders will appear here once created."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6 border-b border-[#E5E0DC]">
            <DialogTitle className="text-xl font-bold text-[#2E1B1B] flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              PO Details{selectedPO ? ` - #${selectedPO.poNumber}` : ""}
            </DialogTitle>
            <DialogDescription className="text-[#4A3A3A] mt-2">
              View all details for this purchase order, including retailer info, items, and summary.
            </DialogDescription>
          </div>
          {selectedPO && (
            <div className="p-6 space-y-6">
              {/* Retailer and Status Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-[#E5E0DC]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#2E1B1B] flex items-center gap-2">
                      <Building className="h-5 w-5 text-[#D9A8A0]" />
                      Retailer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="font-semibold text-[#2E1B1B]">{selectedPO.retailerInfo.businessName}</div>
                    <div className="text-[#4A3A3A]">{selectedPO.retailerInfo.contactPerson}</div>
                    <div className="text-[#4A3A3A]">{selectedPO.retailerInfo.phoneNumber}</div>
                    <div className="text-sm text-[#4A3A3A]">
                      {selectedPO.retailerInfo.address.street}, {selectedPO.retailerInfo.address.city}, {selectedPO.retailerInfo.address.state} - {selectedPO.retailerInfo.address.pincode}, {selectedPO.retailerInfo.address.country}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#E5E0DC]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#2E1B1B] flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#D9A8A0]" />
                      Order Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#4A3A3A]">Status:</span>
                      <Badge 
                        className={cn(
                          "text-xs",
                          selectedPO.status === "GENERATED" && "bg-blue-100 text-blue-800 border-blue-200",
                          selectedPO.status === "SENT" && "bg-yellow-100 text-yellow-800 border-yellow-200",
                          selectedPO.status === "ACKNOWLEDGED" && "bg-green-100 text-green-800 border-green-200"
                        )}
                      >
                        {selectedPO.status}
                      </Badge>
                    </div>
                    <div><span className="text-[#4A3A3A]">Generated By:</span> <span className="font-semibold text-[#2E1B1B]">{selectedPO.generatedBy}</span></div>
                    <div><span className="text-[#4A3A3A]">Created:</span> <span className="font-semibold text-[#2E1B1B]">{new Date(selectedPO.createdAt).toLocaleString()}</span></div>
                    {selectedPO.sentAt && (
                      <div><span className="text-[#4A3A3A]">Sent:</span> <span className="font-semibold text-[#2E1B1B]">{new Date(selectedPO.sentAt).toLocaleString()}</span></div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <Card className="border-[#E5E0DC]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#2E1B1B] flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#D9A8A0]" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPO.items.map((item, idx) => (
                      <div key={idx} className="border border-[#E5E0DC] rounded-lg p-4 hover:bg-[#F9F6F4] transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <div className="font-semibold text-[#2E1B1B]">
                              {item.itemName} <span className="text-xs text-[#4A3A3A]">({item.itemCode})</span>
                            </div>
                            <div className="text-sm text-[#4A3A3A] mt-1">{item.color} • {item.fabric}</div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div><span className="text-[#4A3A3A]">Sets:</span> <span className="font-semibold text-[#2E1B1B]">{item.quantitySets}</span></div>
                            <div><span className="text-[#4A3A3A]">Total:</span> <span className="font-semibold text-[#2E1B1B]">{item.totalPcs} pcs</span></div>
                            <div><span className="text-[#4A3A3A]">Amount:</span> <span className="font-semibold text-[#2E1B1B]">₹{item.totalAmount.toLocaleString()}</span></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="border-[#E5E0DC]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#2E1B1B] flex items-center gap-2">
                    <span className="text-[#D9A8A0] font-bold text-xl">₹</span>
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-[#F9F6F4] rounded-lg">
                      <div className="text-2xl font-bold text-[#2E1B1B]">{selectedPO.poSummary.totalSets}</div>
                      <div className="text-sm text-[#4A3A3A]">Total Sets</div>
                    </div>
                    <div className="text-center p-4 bg-[#F9F6F4] rounded-lg">
                      <div className="text-2xl font-bold text-[#2E1B1B]">{selectedPO.poSummary.totalPcs}</div>
                      <div className="text-sm text-[#4A3A3A]">Total Pieces</div>
                    </div>
                    <div className="text-center p-4 bg-[#F9F6F4] rounded-lg">
                      <div className="text-2xl font-bold text-[#2E1B1B]">₹{selectedPO.poSummary.totalAmountAfterGST.toLocaleString()}</div>
                      <div className="text-sm text-[#4A3A3A]">Total Amount</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <Card className="border-[#E5E0DC]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#2E1B1B] flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#D9A8A0]" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div><span className="text-[#4A3A3A]">Payment Terms:</span> <span className="font-semibold text-[#2E1B1B]">{selectedPO.terms.paymentTerms}</span></div>
                  <div><span className="text-[#4A3A3A]">Delivery Terms:</span> <span className="font-semibold text-[#2E1B1B]">{selectedPO.terms.deliveryTerms}</span></div>
                  <div><span className="text-[#4A3A3A]">Warranty:</span> <span className="font-semibold text-[#2E1B1B]">{selectedPO.terms.warranty}</span></div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t border-[#E5E0DC]">
                <Button 
                  variant="outline" 
                  onClick={closePODetails}
                  className="border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B]"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ModernAdminLayout>
  );
} 