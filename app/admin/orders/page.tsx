"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, User, Phone, Building, ShoppingCart, FileText } from "lucide-react";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface OrderItem {
  productId: string;
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  quantityPcs: number;
  quantitySets: number;
  totalPcs: number;
  totalAmount: number;
  product?: {
    _id: string;
    itemCode: string;
    itemName: string;
    color: string;
    fabric: string;
    pricePerPc: number;
    pricePerSet: number;
    images: Array<{ url: string; alt: string; isPrimary?: boolean }>;
  };
  sizeQuantities?: Record<string, number>;
}

interface Order {
  _id: string;
  orderNumber: string;
  retailerInfo: {
    retailerId: string;
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
  items: OrderItem[];
  orderSummary: {
    totalPcs: number;
    totalSets: number;
    totalAmountBeforeGST: number;
    gstAmount: number;
    totalAmountAfterGST: number;
  };
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "PO_GENERATED";
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  reviewHistory?: { sizeQuantities: { [key: string]: { [size: string]: number } } }[];
  notes?: string;
  sizeQuantities?: { [key: string]: { [size: string]: number } };
}

// Helper function to convert productId to string consistently
const getProductIdString = (productId: unknown): string => {
  if (typeof productId === 'string') {
    return productId;
  } else if (productId && typeof productId === 'object' && productId !== null) {
    if ('_id' in productId) {
      // Handle populated product object
      return String(productId._id);
    } else if ('toString' in productId && typeof productId.toString === 'function') {
      // Handle MongoDB ObjectId
      return productId.toString();
    } else {
      // Handle other object types
      return String(productId);
    }
  } else {
    // Handle ObjectId or other types
    return String(productId);
  }
};

// New ApproveModal component for production use
function ApproveModal({ isOpen, order, onClose, onGeneratePO, onDeleteOrder }: {
  isOpen: boolean,
  order: Order | null,
  onClose: () => void,
  onGeneratePO: (order: Order) => void,
  onDeleteOrder: (order: Order) => void,
}) {
  // Calculate total amount (no GST)
  const totalAmount = order?.orderSummary.totalAmountBeforeGST || 0;

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-0">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b">
          <h2 className="text-2xl font-bold">Approve Order - <span className="text-primary">{order?.orderNumber}</span></h2>
        </div>

        {/* Retailer & Order Info */}
        <div className="px-8 py-4 bg-gray-50 rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
            <div>
              <span className="font-semibold">Retailer:</span> {order?.retailerInfo.businessName}
            </div>
            <div>
              <span className="font-semibold">Contact:</span> {order?.retailerInfo.contactPerson} | {order?.retailerInfo.phoneNumber}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {order?.status.replace('_', ' ')}
            </div>
            <div>
              <span className="font-semibold">Created:</span> {order && new Date(order.createdAt).toLocaleString()}
              {order?.submittedAt && <> | <span className="font-semibold">Submitted:</span> {new Date(order.submittedAt).toLocaleString()}</>}
            </div>
            <div>
              <span className="font-semibold">Total Sets:</span> {order?.orderSummary.totalSets}
            </div>
            <div>
              <span className="font-semibold">Total Pieces:</span> {order?.orderSummary.totalPcs}
            </div>
            <div>
              <span className="font-semibold">Total Amount:</span> ₹{totalAmount.toLocaleString()}
            </div>
          </div>
          {order?.notes && (
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-semibold">Notes:</span> {order.notes}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="px-8 py-4 space-y-6 max-h-[40vh] overflow-y-auto">
          {order?.items.map((item, idx) => {
            const product = item.product || item.productId;
            const productIdStr = getProductIdString(item.productId);
            const itemKey = `${productIdStr}-${idx}`;
            let sizes: Record<string, number> = {};
            if (order.sizeQuantities && order.sizeQuantities[itemKey]) {
              sizes = order.sizeQuantities[itemKey];
            } else if (item.sizeQuantities) {
              sizes = item.sizeQuantities;
            } else {
              sizes = {
                S: item.quantitySets,
                M: item.quantitySets,
                L: item.quantitySets,
                XL: item.quantitySets,
                XXL: item.quantitySets
              };
            }
            let primaryImage: { url: string; alt: string; isPrimary?: boolean } | undefined;
            if (product && typeof product === 'object' && !Array.isArray(product) && !(typeof product === 'string') && 'images' in product) {
              const productObj = product as { images?: Array<{ url: string; alt: string; isPrimary?: boolean }> };
              if (productObj.images && Array.isArray(productObj.images)) {
                primaryImage = productObj.images.find((img) => img.isPrimary) || productObj.images[0];
              }
            }
            return (
              <div key={`${item.productId}-${idx}`} className="flex gap-4 bg-white border rounded-lg shadow-sm p-4">
                {primaryImage?.url && (
                  <img src={primaryImage.url} alt={item.itemName} className="w-20 h-20 object-cover rounded-lg border" />
                )}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-semibold text-lg">{item.itemName} <span className="text-xs text-gray-500">({item.itemCode})</span></div>
                      <div className="text-xs text-gray-500">{item.color} • {item.fabric}</div>
                    </div>
                    <div className="text-sm text-gray-700 mt-2 md:mt-0">
                      <span className="font-semibold">Sets:</span> {item.quantitySets} | <span className="font-semibold">Total:</span> {item.totalPcs} pcs
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    {['S','M','L','XL','XXL'].map(size => (
                      <div key={size} className="text-center">
                        <div className="font-semibold">{size}</div>
                        <div>{sizes[size] || 0} pcs</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-semibold">Item Total:</span> ₹{item.totalAmount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 px-8 pb-8 pt-2">
          <Button
            className="flex-1 md:flex-none md:w-auto"
            variant="default"
            onClick={() => order && onGeneratePO(order)}
          >
            Approve and Generate PO
          </Button>
          <Button
            className="flex-1 md:flex-none md:w-auto"
            variant="destructive"
            onClick={() => order && onDeleteOrder(order)}
          >
            Delete Order
          </Button>
          <Button
            className="flex-1 md:flex-none md:w-auto"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [sizeQuantities, setSizeQuantities] = useState<{[key: string]: {[size: string]: number}}>({});
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [approveOrder, setApproveOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch {
      toast.error("An error occurred while fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.retailerInfo.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.retailerInfo.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "UNDER_REVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PO_GENERATED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case "SUBMITTED":
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => openReviewModal(order)}>Review</Button>
            <Button variant="default" size="sm" onClick={() => openApproveModal(order)}>Approve</Button>
          </>
        );
      case "UNDER_REVIEW":
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => openReviewModal(order)}>Request Changes</Button>
            <Button variant="default" size="sm" onClick={() => openApproveModal(order)}>Approve</Button>
          </>
        );
      case "APPROVED":
        return (
          <Button variant="default" size="sm" onClick={() => handleGeneratePO(order)}>Generate PO</Button>
        );
      default:
        return null;
    }
  };

  const openOrderDetails = async (order: Order) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/orders/${order._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedOrder(data.order);
      } else {
        setSelectedOrder(order); // fallback
      }
    } catch {
      setSelectedOrder(order); // fallback
    }
    setIsModalOpen(true);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
    fetchOrders(); // Force refresh after closing details modal
  };

  const openReviewModal = (order: Order) => {
    setReviewOrder(order);
    setIsReviewModalOpen(true);
    setReviewNotes("");

    // Use order-level sizeQuantities if present (this is the original/received data)
    const orderLevelSizeQuantities = order.sizeQuantities || {};
    console.log("Order sizeQuantities:", orderLevelSizeQuantities);
    const initialQuantities: {[key: string]: {[size: string]: number}} = {};
    
    order.items?.forEach((item, index) => {
      const productIdStr = getProductIdString(item.productId);
      const itemKey = `${productIdStr}-${index}`;
      console.log(`Frontend: Item ${index}: productId=${item.productId}, productIdStr=${productIdStr}, itemKey=${itemKey}`);
      
      // If order.sizeQuantities for this item exists, use it (this is the original data)
      if (
        orderLevelSizeQuantities[itemKey] &&
        Object.values(orderLevelSizeQuantities[itemKey]).some(qty => Number(qty) > 0)
      ) {
        initialQuantities[itemKey] = { ...orderLevelSizeQuantities[itemKey] };
        console.log(`Using existing quantities for ${itemKey}:`, orderLevelSizeQuantities[itemKey]);
      } else {
        // Fallback: calculate based on sets (1 piece per size per set)
        const sets = item.quantitySets;
        initialQuantities[itemKey] = {
          S: sets,
          M: sets,
          L: sets,
          XL: sets,
          XXL: sets
        };
        console.log(`Using default quantities for ${itemKey}:`, initialQuantities[itemKey]);
      }
    });
    console.log("Final initialQuantities:", initialQuantities);
    setSizeQuantities(initialQuantities);
  };

  const closeReviewModal = () => {
    setReviewOrder(null);
    setIsReviewModalOpen(false);
    setReviewNotes("");
    setSizeQuantities({});
    fetchOrders(); // Force refresh after closing review modal
  };

  const updateSizeQuantity = (itemKey: string, size: string, quantity: number) => {
    if (quantity < 0) return;
    console.log(`updateSizeQuantity called with itemKey: "${itemKey}", size: "${size}", quantity: ${quantity}`);
    setSizeQuantities(prev => {
      const newState = {
        ...prev,
        [itemKey]: {
          ...prev[itemKey],
          [size]: quantity
        }
      };
      console.log("New sizeQuantities state:", newState);
      return newState;
    });
  };

  const getTotalPcsForItem = (itemKey: string) => {
    const sizes = sizeQuantities[itemKey] || {};
    return Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
  };

  const validateSizeQuantities = () => {
    if (!reviewOrder) return false;
    for (const [index, item] of (reviewOrder.items || []).entries()) {
      const productIdStr = getProductIdString(item.productId);
      const itemKey = `${productIdStr}-${index}`;
      const totalPcs = getTotalPcsForItem(itemKey);
      const expected = item.quantitySets * 5;
      if (totalPcs < expected) {
        toast.error(`Item "${item.itemName}" must have at least ${expected} pieces (currently ${totalPcs})`);
        return false;
      }
    }
    return true;
  };

  const allItemsValid = reviewOrder?.items?.every((item, index) => {
    const productIdStr = getProductIdString(item.productId);
    const itemKey = `${productIdStr}-${index}`;
    const totalPcs = getTotalPcsForItem(itemKey);
    const expected = item.quantitySets * 5;
    return totalPcs >= expected;
  });

  const handleReviewSubmit = async (action: 'approve' | 'request_changes' | 'reject') => {
    if (!reviewOrder) return;

    if (action === 'approve' && !validateSizeQuantities()) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/orders/${reviewOrder._id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action,
          notes: reviewNotes,
          sizeQuantities: action === 'approve' ? sizeQuantities : undefined,
        }),
      });

      if (response.ok) {
        toast.success(`Order ${action === 'approve' ? 'approved' : action === 'request_changes' ? 'sent for changes' : 'rejected'} successfully`);
        closeReviewModal();
        fetchOrders();
      } else {
        toast.error("Failed to update order status");
      }
    } catch {
      toast.error("An error occurred while updating order status");
    }
  };

  const openApproveModal = async (order: Order) => {
    setApproveOrder(order);
    setIsApproveModalOpen(true);
  };

  const closeApproveModal = () => {
    setApproveOrder(null);
    setIsApproveModalOpen(false);
  };

  const handleGeneratePO = async (order: Order) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/purchase-orders/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order._id,
          generatedBy: "Admin", // You can make this dynamic if needed
        }),
      });

      if (response.ok) {
        toast.success("Purchase Order generated successfully");
        closeApproveModal();
        fetchOrders();
      } else {
        toast.error("Failed to generate Purchase Order");
      }
    } catch {
      toast.error("An error occurred while generating Purchase Order");
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/orders/${order._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Order deleted successfully");
        closeApproveModal();
        fetchOrders();
      } else {
        toast.error("Failed to delete order");
      }
    } catch {
      toast.error("An error occurred while deleting order");
    }
  };

  const handleDownloadPOPDF = async (order: Order) => {
    try {
      const token = localStorage.getItem("adminToken");
      // First get the PO for this order
      const poResponse = await fetch(`/api/admin/purchase-orders?orderId=${order._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!poResponse.ok) {
        toast.error("Purchase order not found");
        return;
      }
      
      const poData = await poResponse.json();
      const po = poData.purchaseOrder;
      
      // Now download the PDF using the PO ID
      const response = await fetch(`/api/admin/purchase-orders/pdf?poId=${po._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PO-${order.orderNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        toast.error("Failed to download PDF");
      }
    } catch {
      toast.error("An error occurred while downloading PDF");
    }
  };



  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center">Loading orders...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminProtection>
      <AdminLayout>
        <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">
              Manage and track customer orders
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search orders by number, business name, or contact person..."
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
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="PO_GENERATED">PO Generated</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                    <CardDescription className="text-sm">
                      {order.retailerInfo.businessName} • {order.retailerInfo.contactPerson}
                    </CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}> 
                    {order.status.replace("_", " ")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Styles:</span>
                    <span className="font-medium ml-2">{order.items.length}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Total Pieces:</span>
                    <span className="font-medium ml-2">{order.orderSummary.totalPcs}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Total Sets:</span>
                    <span className="font-medium ml-2">{order.orderSummary.totalSets}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium ml-2">₹{order.orderSummary.totalAmountBeforeGST.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Created: {new Date(order.createdAt).toLocaleDateString()}
                    {order.submittedAt && (
                      <span className="ml-4">
                        Submitted: {new Date(order.submittedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openOrderDetails(order)}>View Details</Button>
                    {getStatusActions(order)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              {searchTerm || statusFilter !== "all" 
                ? "No orders found matching your filters." 
                : "No orders available."}
            </CardContent>
          </Card>
        )}

        {/* Order Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Order Details - #{selectedOrder?.orderNumber}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              View all details for this order, including retailer info, items, and summary.
            </DialogDescription>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Order #{selectedOrder.orderNumber}</h3>
                    <p className="text-gray-600">Status: <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status.replace("_", " ")}</Badge></p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Created: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    {selectedOrder.submittedAt && (
                      <p>Submitted: {new Date(selectedOrder.submittedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>

                {/* Retailer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Retailer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{selectedOrder.retailerInfo.businessName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{selectedOrder.retailerInfo.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{selectedOrder.retailerInfo.phoneNumber}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Address:</h4>
                        <p className="text-sm text-gray-600">
                          {selectedOrder.retailerInfo.address?.street || "Not provided"}<br />
                          {selectedOrder.retailerInfo.address?.city || "Not provided"}
                          {selectedOrder.retailerInfo.address?.state && `, ${selectedOrder.retailerInfo.address.state}`}<br />
                          {selectedOrder.retailerInfo.address?.pincode && `${selectedOrder.retailerInfo.address.pincode}, `}
                          {selectedOrder.retailerInfo.address?.country || "India"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Order Items ({selectedOrder.items?.length || 0} items)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, index) => {
                          const product = item.product || item.productId;
                          const productIdStr = getProductIdString(item.productId);
                          const itemKey = `${productIdStr}-${index}`;
                          let primaryImage = undefined;
                          if (product && typeof product === 'object' && !Array.isArray(product) && !(typeof product === 'string') && 'images' in product) {
                            const productObj = product as { images?: Array<{ url: string; alt: string; isPrimary?: boolean }> };
                            if (productObj.images && Array.isArray(productObj.images)) {
                              primaryImage = productObj.images.find((img) => img.isPrimary) || productObj.images[0];
                            }
                          }
                          // Always prefer backend's order.sizeQuantities
                          let sizes: Record<string, number> = {};
                          if (selectedOrder.sizeQuantities && selectedOrder.sizeQuantities[itemKey]) {
                            sizes = selectedOrder.sizeQuantities[itemKey];
                          } else if (item.sizeQuantities) {
                            sizes = item.sizeQuantities;
                          } else {
                            sizes = {
                              S: item.quantitySets,
                              M: item.quantitySets,
                              L: item.quantitySets,
                              XL: item.quantitySets,
                              XXL: item.quantitySets
                            };
                          }
                          return (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex gap-4">
                                {/* Product Image */}
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                                  {primaryImage ? (
                                    <img
                                      src={primaryImage.url}
                                      alt={primaryImage.alt || item.itemName}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                      📷
                                    </div>
                                  )}
                                </div>
                                {/* Product Details */}
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h4 className="font-medium flex">{item.itemName} </h4>
                                      <div className="mt-2 flex items-center gap-2 flex-wrap mb-2">
                                        
                                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                          <span
                                            key={size}
                                            className="inline-block bg-blue-50 border border-blue-200 text-blue-800 rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-sm"
                                            style={{ minWidth: 28, textAlign: 'center' }}
                                          >
                                            {size}:{sizes[size] || 0}
                                          </span>
                                        ))}
                                      </div>
                                      <p className="text-sm text-gray-600">Code: {item.itemCode}</p>

                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">₹{item.totalAmount.toLocaleString()}</p>
                                      <p className="text-sm text-gray-600">{item.quantitySets} sets • {item.totalPcs} pieces</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-600">Color:</span>
                                      <span className="ml-1">{item.color}</span>
                                      {/* Size Breakdown - now under Color */}
                                      
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Fabric:</span>
                                      <span className="ml-1">{item.fabric}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Price per set:</span>
                                      <span className="ml-1">₹{item.pricePerSet}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Price per piece:</span>
                                      <span className="ml-1">₹{item.pricePerPc}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No items found in this order</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Styles:</span>
                          <span className="font-medium">{selectedOrder.items.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Sets:</span>
                          <span className="font-medium">{selectedOrder.orderSummary.totalSets}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Pieces:</span>
                          <span className="font-medium">{selectedOrder.orderSummary.totalPcs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount before GST:</span>
                          <span className="font-medium">₹{selectedOrder.orderSummary.totalAmountBeforeGST.toLocaleString()}</span>
                        </div>

                      </div>
                      <div className="border-l pl-6">
                        <div className="text-right">
                          <h4 className="text-lg font-bold text-green-600">
                            Total Amount: ₹{selectedOrder.orderSummary.totalAmountBeforeGST.toLocaleString()}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={closeOrderDetails}>
                    Close
                  </Button>
                  {getStatusActions(selectedOrder)}
                  {selectedOrder.status === "PO_GENERATED" && (
                    <Button variant="outline" onClick={() => handleDownloadPOPDF(selectedOrder)}>
                      Download PO PDF
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Review Modal */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Review Order - #{reviewOrder?.orderNumber}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Adjust size quantities, add review notes, and approve or request changes for this order.
            </DialogDescription>
            {reviewOrder && (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Order #{reviewOrder.orderNumber}</h3>
                    <p className="text-gray-600">Status: <Badge className={getStatusColor(reviewOrder.status)}>{reviewOrder.status.replace("_", " ")}</Badge></p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Created: {new Date(reviewOrder.createdAt).toLocaleString()}</p>
                    {reviewOrder.submittedAt && (
                      <p>Submitted: {new Date(reviewOrder.submittedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>

                {/* Retailer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Retailer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{reviewOrder.retailerInfo.businessName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{reviewOrder.retailerInfo.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{reviewOrder.retailerInfo.phoneNumber}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Address:</h4>
                        <p className="text-sm text-gray-600">
                          {reviewOrder.retailerInfo.address?.city || "Not provided"}     
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items with Size Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Order Items - Size Quantity Management
                    </CardTitle>
                    <CardDescription>
                      Adjust size-specific quantities. Each set = 5 pieces (S, M, L, XL, XXL)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviewOrder.items && reviewOrder.items.length > 0 ? (
                        reviewOrder.items.map((item, index) => {
                          // Handle both string and ObjectId types for productId
                          const productIdStr = getProductIdString(item.productId);
                          const itemKey = `${productIdStr}-${index}`;
                          const primaryImage = item.product?.images?.find(img => img.isPrimary) || item.product?.images?.[0];
                          const currentSizes = sizeQuantities[itemKey] || {};
                          const totalPcs = getTotalPcsForItem(itemKey);
                          const originalPcs = item.quantitySets * 5;
                          
                          return (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex gap-4 mb-4">
                                {/* Product Image */}
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                                  {primaryImage ? (
                                    <img
                                      src={primaryImage.url}
                                      alt={primaryImage.alt || item.itemName}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                      📷
                                    </div>
                                  )}
                                </div>
                                
                                {/* Product Details */}
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h4 className="font-medium">{item.itemName}</h4>
                                      <p className="text-sm text-gray-600">Code: {item.itemCode}</p>
                                      <p className="text-sm text-gray-600">{item.color} • {item.fabric}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">₹{item.totalAmount.toLocaleString()}</p>
                                      <p className="text-sm text-gray-600">Original: {originalPcs} pieces</p>
                                      <p className={`text-sm ${totalPcs !== originalPcs ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
                                        Current: {totalPcs} pieces
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Size Quantity Management */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium mb-3">Size Distribution (pieces):</h5>
                                <div className="grid grid-cols-5 gap-3">
                                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                                    // Get original value for comparison
                                    const originalValue = reviewOrder.sizeQuantities?.[itemKey]?.[size] || item.quantitySets;
                                    const currentValue = currentSizes[size] || 0;
                                    const isModified = currentValue !== originalValue;
                                    
                                    return (
                                      <div key={size} className="text-center">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{size}</label>
                                        <div className="flex items-center justify-center gap-1">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateSizeQuantity(itemKey, size, currentValue - 1)}
                                            disabled={currentValue <= 0}
                                            className="w-8 h-8 p-0"
                                          >
                                            -
                                          </Button>
                                          <span className={`w-12 text-center font-medium ${isModified ? 'text-orange-600' : ''}`}>
                                            {currentValue}
                                          </span>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateSizeQuantity(itemKey, size, currentValue + 1)}
                                            className="w-8 h-8 p-0"
                                          >
                                            +
                                          </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                          {currentValue} pcs
                                          {isModified && (
                                            <span className="block text-orange-600">
                                              (was {originalValue})
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="mt-3 pt-3 border-t">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Total Pieces: {totalPcs}</span>
                                    <span className="text-sm font-medium">Total Sets: {totalPcs / 5}</span>
                                    {totalPcs !== originalPcs && (
                                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                                        Modified
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No items found in this order</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Review Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Review Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add notes about this order review, size adjustments, or any special requirements..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </CardContent>
                </Card>

                {/* Warning Message */}
                {!allItemsValid && (
                  <div className="text-red-600 font-medium text-center mb-2">
                    Please ensure each item's size distribution adds up to the required total pieces.
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={closeReviewModal}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleReviewSubmit('reject')}
                    disabled={!allItemsValid}
                  >
                    Reject Order
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReviewSubmit('request_changes')}
                    disabled={!allItemsValid}
                  >
                    Submit Changes
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={() => handleReviewSubmit('approve')}
                    disabled={!allItemsValid}
                  >
                    Approve Order
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Always render the new ApproveModal for production */}
        <ApproveModal
          isOpen={isApproveModalOpen}
          order={approveOrder}
          onClose={closeApproveModal}
          onGeneratePO={handleGeneratePO}
          onDeleteOrder={handleDeleteOrder}
        />
      </div>
      </AdminLayout>
    </AdminProtection>
  );
} 