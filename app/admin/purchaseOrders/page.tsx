"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

  // Download PDF handler
  const handleDownloadPDF = async (po: PurchaseOrder) => {
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
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PO_${po.poNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("An error occurred while downloading PDF");
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

  const getStatusActions = (po: PurchaseOrder) => {
    switch (po.status) {
      case "GENERATED":
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleDownloadPDF(po)}>Download PDF</Button>
            <Button variant="default" size="sm" onClick={() => handleMarkAsSent(po)}>Mark as Sent</Button>
          </>
        );
      case "SENT":
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleDownloadPDF(po)}>Download PDF</Button>
            <Button variant="default" size="sm" onClick={() => handleMarkAsAcknowledged(po)}>Mark as Acknowledged</Button>
          </>
        );
      case "ACKNOWLEDGED":
        return (
          <Button variant="outline" size="sm" onClick={() => handleDownloadPDF(po)}>Download PDF</Button>
        );
      default:
        return null;
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
      <AdminLayout>
        <div className="text-center">Loading purchase orders...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
            <p className="text-gray-600 mt-1">
              Manage and track purchase orders
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search POs by number, business name, or contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="GENERATED">Generated</option>
                <option value="SENT">Sent</option>
                <option value="ACKNOWLEDGED">Acknowledged</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Orders List */}
        <div className="space-y-4">
          {filteredPurchaseOrders.map((po) => (
            <Card key={po._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">PO #{po.poNumber}</CardTitle>
                    <CardDescription className="text-sm">
                      {po.retailerInfo.businessName} • {po.retailerInfo.contactPerson}
                    </CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(po.status)}`}>
                    {po.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Total Pieces:</span>
                    <span className="font-medium ml-2">{po.poSummary.totalPcs}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Total Sets:</span>
                    <span className="font-medium ml-2">{po.poSummary.totalSets}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium ml-2">₹{po.poSummary.totalAmountAfterGST.toLocaleString()}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Generated By:</span>
                    <span className="font-medium ml-2">{po.generatedBy}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Created: {new Date(po.createdAt).toLocaleDateString()}
                    {po.sentAt && (
                      <span className="ml-4">
                        Sent: {new Date(po.sentAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openPODetails(po)}>View Details</Button>
                    {getStatusActions(po)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPurchaseOrders.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              {searchTerm || statusFilter !== "all" 
                ? "No purchase orders found matching your filters." 
                : "No purchase orders available."}
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle>
            PO Details{selectedPO ? ` - #${selectedPO.poNumber}` : ""}
          </DialogTitle>
          <DialogDescription>
            View all details for this purchase order, including retailer info, items, and summary.
          </DialogDescription>
          {selectedPO && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold">Retailer:</div>
                  <div>{selectedPO.retailerInfo.businessName}</div>
                  <div>{selectedPO.retailerInfo.contactPerson}</div>
                  <div>{selectedPO.retailerInfo.phoneNumber}</div>
                  <div>{selectedPO.retailerInfo.address.street}, {selectedPO.retailerInfo.address.city}, {selectedPO.retailerInfo.address.state} - {selectedPO.retailerInfo.address.pincode}, {selectedPO.retailerInfo.address.country}</div>
                </div>
                <div>
                  <div className="font-semibold">Status:</div>
                  <div>{selectedPO.status}</div>
                  <div className="font-semibold mt-2">Generated By:</div>
                  <div>{selectedPO.generatedBy}</div>
                  <div className="font-semibold mt-2">Created:</div>
                  <div>{new Date(selectedPO.createdAt).toLocaleString()}</div>
                  {selectedPO.sentAt && <div>Sent: {new Date(selectedPO.sentAt).toLocaleString()}</div>}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Order Items</div>
                <div className="space-y-2">
                  {selectedPO.items.map((item, idx) => (
                    <div key={idx} className="border rounded p-2 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold">{item.itemName} <span className="text-xs text-gray-500">({item.itemCode})</span></div>
                        <div className="text-xs text-gray-500">{item.color} • {item.fabric}</div>
                      </div>
                      <div className="text-sm text-gray-700 mt-2 md:mt-0">
                        <span className="font-semibold">Sets:</span> {item.quantitySets} | <span className="font-semibold">Total:</span> {item.totalPcs} pcs | <span className="font-semibold">Amount:</span> ₹{item.totalAmount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Order Summary</div>
                <div>Total Sets: {selectedPO.poSummary.totalSets}</div>
                <div>Total Pieces: {selectedPO.poSummary.totalPcs}</div>
                <div className="font-bold">Total Amount: ₹{selectedPO.poSummary.totalAmountAfterGST.toLocaleString()}</div>
              </div>
              <div>
                <div className="font-semibold mb-2">Terms & Conditions</div>
                <div>Payment Terms: {selectedPO.terms.paymentTerms}</div>
                <div>Delivery Terms: {selectedPO.terms.deliveryTerms}</div>
                <div>Warranty: {selectedPO.terms.warranty}</div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={closePODetails}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
} 