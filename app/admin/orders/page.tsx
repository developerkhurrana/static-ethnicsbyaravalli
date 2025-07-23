"use client";

import { useState, useEffect } from "react";
import ModernAdminLayout from "@/components/admin/modern-admin-layout";
import { AdminProtection } from "@/lib/admin-protection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, User, Phone, Building, ShoppingCart, FileText, Search, Filter, Grid3X3, List, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      
      // Now get the PDF content using the PO ID
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
      
      // Create a blob from the HTML content for download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PO-${order.orderNumber}.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Also open in new window for printing
      const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        // Auto-print after a short delay to ensure content is loaded
        setTimeout(() => {
          newWindow.focus();
          newWindow.print();
        }, 1000);
        toast.success("PO downloaded and opened for printing");
      } else {
        toast.error("Please allow popups to view the purchase order");
      }
    } catch {
      toast.error("An error occurred while processing the purchase order");
    }
  };
  // Calculate total amount (no GST)
  const totalAmount = order?.orderSummary.totalAmountBeforeGST || 0;

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
            </div>
                Approve Order - <span className="text-emerald-600">{order?.orderNumber}</span>
              </h2>
              <p className="text-gray-600 mt-1">Final approval and purchase order generation</p>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                {order?.status.replace("_", " ")}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">
                {order && new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            </div>
            </div>

        <div className="flex h-full">
          {/* Left Panel - Order Info & Items */}
          <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 120px)' }}>
            {/* Order Overview */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{order?.items.length}</div>
                  <div className="text-xs text-gray-500">Styles</div>
            </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{order?.orderSummary.totalPcs}</div>
                  <div className="text-xs text-gray-500">Pieces</div>
            </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-bold text-gray-900">{order?.orderSummary.totalSets}</div>
                  <div className="text-xs text-gray-500">Sets</div>
          </div>
                <div className="text-center p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg border border-emerald-600">
                  <div className="text-lg font-bold text-white">₹{totalAmount.toLocaleString()}</div>
                  <div className="text-xs text-white/90">Amount</div>
            </div>
              </div>
        </div>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Order Items</h3>
                <Badge variant="outline" className="text-xs">
                  {order?.items?.length || 0} items
                </Badge>
              </div>
              
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
                  <div key={`${item.productId}-${idx}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    {/* Product Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border">
                        {primaryImage?.url ? (
                          <img src={primaryImage.url} alt={item.itemName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <div className="text-lg">👗</div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                    <div>
                            <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.itemName}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">#{item.itemCode}</span>
                              <span>{item.color} • {item.fabric}</span>
                    </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Price per set:</span>
                                <span className="ml-1 font-medium">₹{item.pricePerSet}</span>
                    </div>
                              <div>
                                <span className="text-gray-600">Price per piece:</span>
                                <span className="ml-1 font-medium">₹{item.pricePerPc}</span>
                  </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-gray-900 text-lg">₹{item.totalAmount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{item.quantitySets} sets • {item.totalPcs} pieces</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Size Distribution */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">Size Distribution</span>
                        </div>
                        <span className="text-sm text-gray-500">Total: {item.totalPcs} pcs</span>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-3">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <div key={size} className="text-center">
                            <div className="text-sm font-medium text-gray-600 mb-2">{size}</div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                              <div className="text-lg font-bold text-gray-900">{sizes[size] || 0}</div>
                              <div className="text-xs text-gray-500">pcs</div>
                            </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
          </div>

          {/* Right Panel - Summary & Actions */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
            {/* Retailer Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-600" />
                Retailer Information
              </h3>
              <div className="bg-white rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{order?.retailerInfo.businessName}</span>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span>{order?.retailerInfo.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{order?.retailerInfo.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 text-gray-400">📍</div>
                    <span>
                      {order?.retailerInfo.address?.street && `${order.retailerInfo.address.street}, `}
                      {order?.retailerInfo.address?.city || "Not provided"}
                      {order?.retailerInfo.address?.state && `, ${order.retailerInfo.address.state}`}
                      {order?.retailerInfo.address?.pincode && ` - ${order.retailerInfo.address.pincode}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-600" />
                Order Summary
              </h3>
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">{order?.items?.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Sets:</span>
                    <span className="font-medium">{order?.orderSummary.totalSets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Pieces:</span>
                    <span className="font-medium">{order?.orderSummary.totalPcs}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-emerald-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        {/* Action Buttons */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Actions
              </h3>
              <div className="space-y-2">
                <button 
            onClick={() => order && onGeneratePO(order)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  ✓ Approve and Generate PO
                </button>
                {order?.status === "PO_GENERATED" && (
                  <button 
                    onClick={() => order && handleDownloadPOPDF(order)}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    📄 Download & Print PO
                  </button>
                )}
                <button 
            onClick={() => order && onDeleteOrder(order)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  ✕ Delete Order
                </button>
                <button 
            onClick={onClose}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Close
                </button>
              </div>
            </div>

            {/* Notes */}
            {order?.notes && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  Notes
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">{order.notes}</p>
                </div>
              </div>
            )}
          </div>
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.status-dropdown')) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "DRAFT", label: "Draft" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "UNDER_REVIEW", label: "Under Review" },
    { value: "APPROVED", label: "Approved" },
    { value: "PO_GENERATED", label: "PO Generated" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-[#F9F6F4] text-[#4A3A3A] border border-[#E5E0DC]";
      case "SUBMITTED":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "UNDER_REVIEW":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "APPROVED":
        return "bg-green-50 text-green-700 border border-green-200";
      case "PO_GENERATED":
        return "bg-[#D9A8A0] text-[#2E1B1B] border border-[#C08478]";
      default:
        return "bg-[#F9F6F4] text-[#4A3A3A] border border-[#E5E0DC]";
    }
  };

  const getStatusBarColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gradient-to-r from-[#E5E0DC] to-[#D9A8A0]";
      case "SUBMITTED":
        return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "UNDER_REVIEW":
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      case "APPROVED":
        return "bg-gradient-to-r from-green-400 to-green-600";
      case "PO_GENERATED":
        return "bg-gradient-to-r from-[#D9A8A0] to-[#C08478]";
      default:
        return "bg-gradient-to-r from-[#E5E0DC] to-[#D9A8A0]";
    }
  };

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case "SUBMITTED":
        return (
          <button 
            onClick={() => openReviewModal(order)}
            className="bg-white border border-gray-300 hover:border-amber-500 hover:bg-amber-50 text-gray-700 hover:text-amber-700 text-xs font-medium py-2.5 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200 w-full"
          >
            Review & Approve
          </button>
        );
      case "UNDER_REVIEW":
        return (
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => openReviewModal(order)}
              className="bg-white border border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-gray-700 hover:text-orange-700 text-xs font-medium py-2.5 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200 w-full"
            >
              Continue Review
            </button>
            <button 
              onClick={() => openApproveModal(order)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-medium py-2.5 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200 w-full"
            >
              Final Approve
            </button>
          </div>
        );
      case "APPROVED":
        return (
          <button 
            onClick={() => openApproveModal(order)}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-medium py-2.5 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200 w-full"
          >
            Generate PO
          </button>
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
          sizeQuantities: Object.keys(sizeQuantities).length > 0 ? sizeQuantities : undefined,
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
      
      // Now get the PDF content using the PO ID
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
      
      // Create a blob from the HTML content for download
      const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
      a.download = `PO-${order.orderNumber}.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      
      // Also open in new window for printing
      const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        // Auto-print after a short delay to ensure content is loaded
        setTimeout(() => {
          newWindow.focus();
          newWindow.print();
        }, 1000);
        toast.success("PO downloaded and opened for printing");
      } else {
        toast.error("Please allow popups to view the purchase order");
      }
    } catch {
      toast.error("An error occurred while processing the purchase order");
    }
  };



  if (isLoading) {
    return (
      <AdminProtection>
        <ModernAdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A8A0] mx-auto mb-4"></div>
              <p className="text-[#4A3A3A]">Loading orders...</p>
            </div>
          </div>
        </ModernAdminLayout>
      </AdminProtection>
    );
  }

  return (
    <AdminProtection>
      <ModernAdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
              <h1 className="text-3xl font-bold text-[#2E1B1B] flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                Orders
              </h1>
              <p className="text-[#4A3A3A] mt-2">
                Manage and track customer orders ({filteredOrders.length} orders)
            </p>
          </div>
        </div>

          {/* Search and Filters */}
          <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
          <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A3A3A] h-4 w-4 pointer-events-none" />
              <Input
                placeholder="Search orders by number, business name, or contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                    className="!pl-10 !pr-4 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0]"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative status-dropdown">
                    <button
                      onClick={() => setIsStatusOpen(!isStatusOpen)}
                      className="flex items-center gap-2 px-4 py-2 border border-[#E5E0DC] rounded-lg bg-white hover:bg-[#F9F6F4] transition-all duration-200 focus:border-[#D9A8A0] focus:ring-1 focus:ring-[#D9A8A0] outline-none"
                    >
                      <Filter className="h-4 w-4 text-[#4A3A3A]" />
                      <span className="text-[#2E1B1B] font-medium">
                        {statusOptions.find(option => option.value === statusFilter)?.label || "All Status"}
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-[#4A3A3A] transition-transform duration-200",
                        isStatusOpen && "rotate-180"
                      )} />
                    </button>
                    
                    {isStatusOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E0DC] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                      >
                        {statusOptions.map((option, index) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setStatusFilter(option.value);
                              setIsStatusOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-2 text-left transition-colors duration-150",
                              statusFilter === option.value 
                                ? "bg-[#D9A8A0] text-[#2E1B1B] font-medium" 
                                : "hover:bg-[#F9F6F4] text-[#2E1B1B]",
                              index === 0 && "rounded-t-lg",
                              index === statusOptions.length - 1 && "rounded-b-lg"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <div className="relative flex border border-[#E5E0DC] rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "relative flex items-center justify-center px-3 py-2 transition-all duration-200 ease-in-out",
                        viewMode === "grid" 
                          ? "text-[#2E1B1B] font-medium" 
                          : "text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4]"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4 relative z-10" />
                      {viewMode === "grid" && (
                        <motion.div
                          layoutId="viewToggle"
                          className="absolute inset-0 bg-[#D9A8A0] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "relative flex items-center justify-center px-3 py-2 transition-all duration-200 ease-in-out",
                        viewMode === "list" 
                          ? "text-[#2E1B1B] font-medium" 
                          : "text-[#4A3A3A] hover:text-[#2E1B1B] hover:bg-[#F9F6F4]"
                      )}
                    >
                      <List className="h-4 w-4 relative z-10" />
                      {viewMode === "list" && (
                        <motion.div
                          layoutId="viewToggle"
                          className="absolute inset-0 bg-[#D9A8A0] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>

                    {/* Orders Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg border border-gray-200 hover:border-[#D9A8A0] hover:shadow-md transition-all duration-200 group">
                  {/* Top Section */}
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">#{order.orderNumber}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' :
                        order.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'UNDER_REVIEW' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        'bg-[#D9A8A0] text-white'
                      }`}>
                    {order.status.replace("_", " ")}
                      </span>
                  </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">{order.retailerInfo.contactPerson}</span>
                      <span className="mx-1">•</span>
                      <span className="truncate">{order.retailerInfo.businessName}</span>
                </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-gray-900">{order.items.length}</div>
                        <div className="text-xs text-gray-500">Styles</div>
                  </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-gray-900">{order.orderSummary.totalPcs}</div>
                        <div className="text-xs text-gray-500">Pieces</div>
                  </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-gray-900">{order.orderSummary.totalSets}</div>
                        <div className="text-xs text-gray-500">Sets</div>
                  </div>
                </div>
                
                    {/* Amount */}
                    <div className="mb-3 p-2 bg-gradient-to-r from-[#D9A8A0] to-[#C08478] rounded text-center">
                      <div className="text-sm font-bold text-white">₹{order.orderSummary.totalAmountBeforeGST.toLocaleString()}</div>
                  </div>

                    {/* Date and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => openOrderDetails(order)}
                          className="border border-[#D9A8A0] hover:bg-[#D9A8A0] hover:text-white text-[#D9A8A0] text-xs font-medium py-2 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          View
                        </button>
                    {getStatusActions(order)}
                  </div>
                </div>
                  </div>
                </div>
          ))}
        </div>
          ) : (
            <Card className="border-[#E5E0DC] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9F6F4] border-b border-[#E5E0DC]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Order Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Retailer
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Items
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Sets
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Pieces
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-[#4A3A3A] uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0DC]">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-[#F9F6F4] transition-colors duration-150">
                        {/* Order Details */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#2E1B1B]">#{order.orderNumber}</div>
                              <div className="text-sm text-[#4A3A3A]">
                                {order.retailerInfo.contactPerson}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Retailer */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-[#2E1B1B] text-sm">
                              {order.retailerInfo.businessName}
                            </div>
                            <div className="text-xs text-[#4A3A3A] flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {order.retailerInfo.phoneNumber}
                            </div>
                          </div>
                        </td>

                        {/* Items */}
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-[#F9F6F4] rounded-lg">
                            <span className="text-sm font-bold text-[#2E1B1B]">{order.items.length}</span>
                          </div>
                        </td>

                        {/* Sets */}
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-[#F9F6F4] rounded-lg">
                            <span className="text-sm font-bold text-[#2E1B1B]">{order.orderSummary.totalSets}</span>
                          </div>
                        </td>

                        {/* Pieces */}
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-[#F9F6F4] rounded-lg">
                            <span className="text-sm font-bold text-[#2E1B1B]">{order.orderSummary.totalPcs}</span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center justify-center px-3 py-1 bg-gradient-to-r from-[#D9A8A0] to-[#C08478] rounded-lg">
                            <span className="text-sm font-bold text-white">₹{order.orderSummary.totalAmountBeforeGST.toLocaleString()}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace("_", " ")}
                          </Badge>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-center">
                          <div className="text-sm text-[#4A3A3A]">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openOrderDetails(order)}
                              className="border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] font-medium transition-all duration-200"
                            >
                              View
                            </Button>
                            {getStatusActions(order)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

        {filteredOrders.length === 0 && (
            <Card className="border-[#E5E0DC] bg-[#F9F6F4]">
              <CardContent className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-[#4A3A3A] mx-auto mb-4" />
                <p className="text-[#4A3A3A] text-lg font-medium">
              {searchTerm || statusFilter !== "all" 
                ? "No orders found matching your filters." 
                : "No orders available."}
                </p>
                <p className="text-[#4A3A3A] text-sm mt-2">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search terms or filters." 
                    : "Orders will appear here once customers start placing them."}
                </p>
            </CardContent>
          </Card>
        )}

        {/* Order Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-6xl h-[95vh] overflow-hidden p-0">
            {selectedOrder && (
              <div className="flex h-full">
                {/* Left Panel - Order Info & Items */}
                <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: '95vh' }}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-xl flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                  </div>
                        Order #{selectedOrder.orderNumber}
                      </h2>
                      <p className="text-gray-600 mt-1">Complete order details and information</p>
                  </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status.replace("_", " ")}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>



                  {/* Order Items - Modern Design */}
                    <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Order Items</h3>
                      <Badge variant="outline" className="text-xs">
                        {selectedOrder.items?.length || 0} items
                      </Badge>
                    </div>
                    
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
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                            {/* Product Info */}
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border">
                                  {primaryImage ? (
                                    <img
                                      src={primaryImage.url}
                                      alt={primaryImage.alt || item.itemName}
                                    className="w-full h-full object-cover"
                                    />
                                  ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <div className="text-lg">👗</div>
                                    </div>
                                  )}
                                </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div>
                                    <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.itemName}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">#{item.itemCode}</span>
                                      <span>{item.color} • {item.fabric}</span>
                                      </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Price per set:</span>
                                        <span className="ml-1 font-medium">₹{item.pricePerSet}</span>
                                    </div>
                                      <div>
                                        <span className="text-gray-600">Price per piece:</span>
                                        <span className="ml-1 font-medium">₹{item.pricePerPc}</span>
                                    </div>
                                  </div>
                                    </div>
                                  <div className="text-right ml-4">
                                    <p className="font-bold text-gray-900 text-lg">₹{item.totalAmount.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">{item.quantitySets} sets • {item.totalPcs} pieces</p>
                                    </div>
                                    </div>
                                    </div>
                                  </div>

                            {/* Size Distribution */}
                            <div className="border-t pt-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                  <span className="text-sm font-medium text-gray-700">Size Distribution</span>
                                </div>
                                <span className="text-sm text-gray-500">Total: {item.totalPcs} pcs</span>
                              </div>
                              
                              <div className="grid grid-cols-5 gap-3">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                  <div key={size} className="text-center">
                                    <div className="text-sm font-medium text-gray-600 mb-2">{size}</div>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                                      <div className="text-lg font-bold text-gray-900">{sizes[size] || 0}</div>
                                      <div className="text-xs text-gray-500">pcs</div>
                                    </div>
                                  </div>
                                ))}
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
                </div>

                {/* Right Panel - Summary & Actions */}
                <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto" style={{ maxHeight: '95vh' }}>


                {/* Order Summary */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-600" />
                      Order Summary
                    </h3>
                    <div className="bg-white rounded-lg p-4 space-y-4">
                      {/* Retailer Info */}
                      <div className="pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="h-3 w-3 text-blue-600" />
                        </div>
                          <span className="text-sm font-semibold text-gray-900">{selectedOrder.retailerInfo.businessName}</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>{selectedOrder.retailerInfo.contactPerson}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{selectedOrder.retailerInfo.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 text-gray-400">📍</div>
                            <span>{selectedOrder.retailerInfo.address?.city || "Not provided"}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Metrics */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Items:</span>
                          <span className="font-medium">{selectedOrder.items?.length || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Sets:</span>
                          <span className="font-medium">{selectedOrder.orderSummary.totalSets}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Pieces:</span>
                          <span className="font-medium">{selectedOrder.orderSummary.totalPcs}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-sm font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-emerald-600">₹{selectedOrder.orderSummary.totalAmountBeforeGST.toLocaleString()}</span>
                        </div>
                      </div>
                        </div>
                      </div>
                    </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#D9A8A0] rounded-full"></div>
                      Actions
                    </h3>
                    <div className="space-y-2">
                  {getStatusActions(selectedOrder)}
                  {selectedOrder.status === "PO_GENERATED" && (
                        <button 
                          onClick={() => handleDownloadPOPDF(selectedOrder)}
                          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2.5 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          📄 Download & Print PO
                        </button>
                      )}
                      <button 
                        onClick={closeOrderDetails}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2.5 px-3 rounded shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Review Modal */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent className="max-w-5xl h-[95vh] overflow-hidden p-0">
            {reviewOrder && (
              <div className="flex h-full">
                {/* Left Panel - Order Info & Items */}
                <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: '95vh' }}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                  </div>
                        #{reviewOrder.orderNumber}
                      </h2>
                      <p className="text-gray-600 mt-1">Review and approve order details</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(reviewOrder.status)}>
                        {reviewOrder.status.replace("_", " ")}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(reviewOrder.createdAt).toLocaleDateString()}
                      </p>
                  </div>
                </div>

                  



                  {/* Order Items - Modern Compact Design */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-purple-600" />
                        </div>
                      <h3 className="font-semibold text-gray-900">Order Items</h3>
                      <Badge variant="outline" className="text-xs">
                        {reviewOrder.items?.length || 0} items
                      </Badge>
                        </div>
                    
                      {reviewOrder.items && reviewOrder.items.length > 0 ? (
                        reviewOrder.items.map((item, index) => {
                          const productIdStr = getProductIdString(item.productId);
                          const itemKey = `${productIdStr}-${index}`;
                          const primaryImage = item.product?.images?.find(img => img.isPrimary) || item.product?.images?.[0];
                          const currentSizes = sizeQuantities[itemKey] || {};
                          const totalPcs = getTotalPcsForItem(itemKey);
                          const originalPcs = item.quantitySets * 5;
                          
                          return (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                            {/* Compact Product Info */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border">
                                  {primaryImage ? (
                                    <img
                                      src={primaryImage.url}
                                      alt={primaryImage.alt || item.itemName}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <div className="text-lg">👗</div>
                                    </div>
                                  )}
                                </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div>
                                    <h4 className="font-semibold text-gray-900 text-base mb-1">{item.itemName}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">#{item.itemCode}</span>
                                      <span>{item.color} • {item.fabric}</span>
                                    </div>
                                  </div>
                                  <div className="text-right ml-2">
                                    <p className="font-bold text-gray-900 text-base">₹{item.totalAmount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{item.quantitySets} sets</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            {/* Compact Size Distribution */}
                            <div className="border-t pt-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                  <span className="text-xs font-medium text-gray-700">Size Distribution</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Total: {totalPcs} pcs</span>
                                  {totalPcs !== originalPcs && (
                                    <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">
                                      Modified
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              {/* Compact Size Selectors */}
                              <div className="grid grid-cols-5 gap-2">
                                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                                    const originalValue = reviewOrder.sizeQuantities?.[itemKey]?.[size] || item.quantitySets;
                                    const currentValue = currentSizes[size] || 0;
                                    const isModified = currentValue !== originalValue;
                                    
                                    return (
                                      <div key={size} className="text-center">
                                      <div className="text-xs font-medium text-gray-600 mb-2">{size}</div>
                                      
                                      {/* React Icons Quantity Selector */}
                                      <div className="flex items-center justify-center gap-1 relative z-10">
                                        <button
                                            onClick={() => updateSizeQuantity(itemKey, size, currentValue - 1)}
                                            disabled={currentValue <= 0}
                                          className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center"
                                        >
                                          <span className="text-red-500 font-bold text-lg">−</span>
                                        </button>
                                        
                                        <div className={`w-10 h-6 rounded border flex items-center justify-center text-xs font-bold transition-all duration-150 ${
                                          isModified 
                                            ? 'border-orange-400 bg-orange-50 text-orange-700' 
                                            : 'border-gray-300 bg-gray-50 text-gray-700'
                                        }`}>
                                            {currentValue}
                                        </div>
                                        
                                        <button
                                            onClick={() => updateSizeQuantity(itemKey, size, currentValue + 1)}
                                          className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-green-50 hover:border-green-300 transition-all duration-150 flex items-center justify-center"
                                          >
                                          <span className="text-green-500 font-bold text-lg">+</span>
                                        </button>
                                        </div>
                                      </div>
                                    );
                                  })}
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
                </div>

                {/* Right Panel - Actions & Notes */}
                <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto" style={{ maxHeight: '95vh' }}>
                  {/* Quick Actions */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          setReviewNotes("Order approved after review - no changes required");
                          handleReviewSubmit('approve');
                        }}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        ✓ Approve Order
                      </button>
                      <button 
                        onClick={() => {
                          // Just close the modal without taking action
                          closeReviewModal();
                        }}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                      >
                        Review Later
                      </button>
                    </div>
                  </div>

                {/* Review Notes */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-600" />
                      Review Notes
                    </h3>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add notes about changes, requirements, or special instructions..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-600" />
                      Order Summary
                    </h3>
                    <div className="bg-white rounded-lg p-4 space-y-4">
                      {/* Retailer Info */}
                      <div className="pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="h-3 w-3 text-blue-600" />
                  </div>
                          <span className="text-sm font-semibold text-gray-900">{reviewOrder.retailerInfo.businessName}</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 text-gray-400" />
                            <span>{reviewOrder.retailerInfo.contactPerson}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{reviewOrder.retailerInfo.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 text-gray-400">📍</div>
                            <span>{reviewOrder.retailerInfo.address?.city || "Not provided"}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Metrics */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Items:</span>
                          <span className="font-medium">{reviewOrder.items?.length || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Sets:</span>
                          <span className="font-medium">{reviewOrder.orderSummary.totalSets}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Pieces:</span>
                          <span className="font-medium">{reviewOrder.orderSummary.totalPcs}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-sm font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-emerald-600">₹{reviewOrder.orderSummary.totalAmountBeforeGST.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                    onClick={() => handleReviewSubmit('reject')}
                    disabled={!allItemsValid}
                      className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      ✕ Reject Order
                    </button>
                    <button 
                    onClick={() => handleReviewSubmit('request_changes')}
                    disabled={!allItemsValid}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      ↻ Request Changes
                    </button>
                  </div>

                  {/* Warning Message */}
                  {!allItemsValid && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-xs font-medium">
                        Please ensure each item's size distribution adds up to the required total pieces.
                      </p>
                    </div>
                  )}
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
      </ModernAdminLayout>
    </AdminProtection>
  );
} 