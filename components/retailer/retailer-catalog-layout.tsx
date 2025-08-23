"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import {
  ShoppingCart,
  Home,
  Phone,
  ChevronUp,
  ChevronDown,
  Package,
  Calculator,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  _id: string;
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  category: string;
  images: Array<{ url: string; alt: string; isPrimary?: boolean }>;
  sizes?: string[];
}

interface Catalog {
  _id: string;
  catalogName: string;
  catalogCode: string;
  accessLevel: string;
  isActive: boolean;
}

interface Retailer {
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
}

interface OrderItem {
  product: Product;
  sets: number;
  pieces: number;
  totalPrice: number;
}

interface RetailerCatalogLayoutProps {
  catalog: Catalog | null;
  retailer: Retailer | null;
  orderItems: OrderItem[];
  summary: {
    totalProducts: number;
    totalSets: number;
    totalPieces: number;
    totalAmount: number;
  };
  isSubmittingOrder: boolean;
  isOrderSummaryCollapsed: boolean;
  setIsOrderSummaryCollapsed: (collapsed: boolean) => void;
  handleSubmitOrder: () => void;
  updateQuantity: (productId: string, newSets: number) => void;
  getQuantity: (productId: string) => number;
  children: React.ReactNode;
}

// Catalog Logo Component
const CatalogLogo = ({ catalog }: { catalog: Catalog | null }) => (
  <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-2">
      <Package className="h-4 w-4 text-[#C08478]" />
      <span className="text-sm font-semibold text-[#2E1B1B]">Catalog</span>
    </div>
    <p className="text-xs font-medium text-[#2E1B1B] mb-1">{catalog?.catalogName}</p>
    <p className="text-xs text-[#4A3A3A]">{catalog?.catalogCode}</p>
  </div>
);

// Catalog Logo Icon Component
const CatalogLogoIcon = ({ catalog }: { catalog: Catalog | null }) => (
  <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-2">
      <Package className="h-5 w-5 text-[#C08478]" />
      <span className="text-xs text-[#2E1B1B] font-medium">{catalog?.catalogCode}</span>
    </div>
  </div>
);

export default function RetailerCatalogLayout({
  catalog,
  retailer,
  orderItems,
  summary,
  isSubmittingOrder,
  isOrderSummaryCollapsed,
  setIsOrderSummaryCollapsed,
  handleSubmitOrder,
  updateQuantity,
  getQuantity,
  children,
}: RetailerCatalogLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F6F4]">
      {/* Desktop Layout */}
      <div className="hidden sm:flex h-screen pt-[42px]">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-4">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto space-y-4">
              {open ? <CatalogLogo catalog={catalog} /> : <CatalogLogoIcon catalog={catalog} />}
              
              {/* Retailer Info - Clean Collapsed View */}
              {retailer && (
                <div className="bg-white/50 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
                  {open ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="h-4 w-4 text-[#C08478]" />
                        <span className="text-sm font-semibold text-[#2E1B1B]">Retailer</span>
                      </div>
                      <p className="text-xs font-medium text-[#2E1B1B] mb-1">{retailer.businessName}</p>
                      <p className="text-xs text-[#4A3A3A] mb-2">{retailer.contactPerson}</p>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-[#C08478]" />
                        <p className="text-xs text-[#4A3A3A]">{retailer.phoneNumber}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Home className="h-5 w-5 text-[#C08478]" />
                      <Phone className="h-4 w-4 text-[#C08478]" />
                    </div>
                  )}
                </div>
              )}

              {/* Order Summary - Clean Collapsed View */}
              {orderItems.length > 0 && (
                <div className="bg-white/50 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
                  {open ? (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-[#D9A8A0]" />
                          <span className="text-sm font-semibold text-[#2E1B1B]">Order Summary</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)}
                          className="h-6 w-6 p-0 hover:bg-white/20"
                        >
                          {isOrderSummaryCollapsed ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Always Visible Quick Summary */}
                      <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-2 text-xs">
                        <div className="text-center">
                          <p className="text-[#4A3A3A]">Styles</p>
                          <p className="font-bold text-[#2E1B1B]">{summary.totalProducts}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#4A3A3A]">Sets</p>
                          <p className="font-bold text-[#2E1B1B]">{summary.totalSets}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#4A3A3A]">Pieces</p>
                          <p className="font-bold text-[#2E1B1B]">{summary.totalPieces}</p>
                        </div>
                      </div>
                      
                      {/* Collapsible Details */}
                      <div className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden",
                        isOrderSummaryCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                      )}>
                        <div className="pt-2 border-t border-[#D9A8A0]">
                          <p className="text-xs text-[#4A3A3A] mb-2">Order Details:</p>
                          <div className="space-y-1.5 text-xs">
                            {orderItems.map((item, index) => (
                              <div key={index} className="space-y-0.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#2E1B1B] font-medium truncate">{item.product.itemName}</span>
                                  <span className="text-[#C08478] font-medium">{item.sets} sets</span>
                                </div>
                                <div className="text-[#4A3A3A] text-xs">
                                  Code: {item.product.itemCode}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Total Amount - Below Order Details */}
                          <div className="pt-3 border-t border-[#D9A8A0] mt-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-bold text-[#2E1B1B] text-sm">Total</p>
                                <p className="text-[#4A3A3A] text-xs">(without GST)</p>
                              </div>
                              <p className="font-bold text-[#C08478] text-lg">₹{summary.totalAmount.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-[#D9A8A0]" />
                      <div className="text-center">
                        <p className="text-xs font-bold text-[#2E1B1B]">{summary.totalProducts}</p>
                        <p className="text-xs text-[#4A3A3A]">styles</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Order Button */}
              {orderItems.length > 0 && (
                <div className="bg-white/50 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
                  {open ? (
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={isSubmittingOrder}
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {isSubmittingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Submit Order
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Calculator className="h-5 w-5 text-[#D9A8A0]" />
                      <span className="text-xs text-[#2E1B1B] font-medium">Submit</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden pt-[42px]">
        {/* Mobile Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-[#E5E0DC] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-[#C08478]" />
              <div>
                <p className="text-sm font-semibold text-[#2E1B1B]">{catalog?.catalogName}</p>
                <p className="text-xs text-[#4A3A3A]">{catalog?.catalogCode}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(!open)}
              className="h-8 w-8 p-0"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-4">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto space-y-4">
              {/* Retailer Info */}
              {retailer && (
                <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-4 w-4 text-[#C08478]" />
                    <span className="text-sm font-semibold text-[#2E1B1B]">Retailer</span>
                  </div>
                  <p className="text-xs font-medium text-[#2E1B1B] mb-1">{retailer.businessName}</p>
                  <p className="text-xs text-[#4A3A3A] mb-2">{retailer.contactPerson}</p>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-[#C08478]" />
                    <p className="text-xs text-[#4A3A3A]">{retailer.phoneNumber}</p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              {orderItems.length > 0 && (
                <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-[#D9A8A0]" />
                      <span className="text-sm font-semibold text-[#2E1B1B]">Order Summary</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)}
                      className="h-6 w-6 p-0 hover:bg-white/20"
                    >
                      {isOrderSummaryCollapsed ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Quick Summary */}
                  <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                    <div className="text-center">
                      <p className="text-[#4A3A3A]">Styles</p>
                      <p className="font-bold text-[#2E1B1B]">{summary.totalProducts}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#4A3A3A]">Sets</p>
                      <p className="font-bold text-[#2E1B1B]">{summary.totalSets}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#4A3A3A]">Pieces</p>
                      <p className="font-bold text-[#2E1B1B]">{summary.totalPieces}</p>
                    </div>
                  </div>
                  
                  {/* Collapsible Details */}
                  <div className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    isOrderSummaryCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                  )}>
                    <div className="pt-2 border-t border-[#D9A8A0]">
                      <p className="text-xs text-[#4A3A3A] mb-2">Order Details:</p>
                      <div className="space-y-1.5 text-xs">
                        {orderItems.map((item, index) => (
                          <div key={index} className="space-y-0.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[#2E1B1B] font-medium truncate">{item.product.itemName}</span>
                              <span className="text-[#C08478] font-medium">{item.sets} sets</span>
                            </div>
                            <div className="text-[#4A3A3A] text-xs">
                              Code: {item.product.itemCode}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Total Amount */}
                      <div className="pt-3 border-t border-[#D9A8A0] mt-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-[#2E1B1B] text-sm">Total</p>
                            <p className="text-[#4A3A3A] text-xs">(without GST)</p>
                          </div>
                          <p className="font-bold text-[#C08478] text-lg">₹{summary.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Order Button */}
              {orderItems.length > 0 && (
                <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={isSubmittingOrder}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isSubmittingOrder ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5 mr-2" />
                        Submit Order
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Mobile Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
