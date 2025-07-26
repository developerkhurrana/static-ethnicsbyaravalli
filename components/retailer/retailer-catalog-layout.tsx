"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Phone,
  Home,
  ShoppingCart,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RetailerCatalogLayoutProps {
  children: React.ReactNode;
  catalog: any;
  retailer: any;
  orderItems: any[];
  summary: any;
  isSubmittingOrder: boolean;
  isOrderSummaryCollapsed: boolean;
  setIsOrderSummaryCollapsed: (collapsed: boolean) => void;
  handleSubmitOrder: () => void;
  updateQuantity: (productId: string, newSets: number) => void;
  getQuantity: (productId: string) => number;
}

export default function RetailerCatalogLayout({
  children,
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
}: RetailerCatalogLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F9F6F4] pt-[42px]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-4">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto space-y-4">
            {open ? (
              <CatalogLogo catalog={catalog} />
            ) : (
              <CatalogLogoIcon catalog={catalog} />
            )}

            {/* Retailer Info - Clean Collapsed View */}
            {retailer && (
              <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                {open ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="h-4 w-4 text-[#C08478]" />
                      <span className="text-sm font-semibold text-[#2E1B1B]">
                        Retailer
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#2E1B1B] mb-1">
                      {retailer.businessName}
                    </p>
                    <p className="text-xs text-[#4A3A3A] mb-2">
                      {retailer.contactPerson}
                    </p>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-[#C08478]" />
                      <p className="text-xs text-[#4A3A3A]">
                        {retailer.phoneNumber}
                      </p>
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
              <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                {open ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-[#D9A8A0]" />
                        <span className="text-sm font-semibold text-[#2E1B1B]">
                          Order Summary
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)
                        }
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
                    <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                      <div className="text-center">
                        <p className="text-[#4A3A3A]">Styles</p>
                        <p className="font-bold text-[#2E1B1B]">
                          {summary.totalProducts}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#4A3A3A]">Sets</p>
                        <p className="font-bold text-[#2E1B1B]">
                          {summary.totalSets}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#4A3A3A]">Pieces</p>
                        <p className="font-bold text-[#2E1B1B]">
                          {summary.totalPieces}
                        </p>
                      </div>
                    </div>

                    {/* Collapsible Details */}
                    <div
                      className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden",
                        isOrderSummaryCollapsed
                          ? "max-h-0 opacity-0"
                          : "max-h-96 opacity-100"
                      )}
                    >
                      <div className="pt-2 border-t border-[#D9A8A0]">
                        <p className="text-xs text-[#4A3A3A] mb-2">
                          Order Details:
                        </p>
                        <div className="space-y-1.5 text-xs">
                          {orderItems.map((item, index) => (
                            <div key={index} className="space-y-0.5">
                              <div className="flex justify-between items-center">
                                <span className="text-[#2E1B1B] font-medium truncate">
                                  {item.product.itemName}
                                </span>
                                <span className="text-[#C08478] font-medium">
                                  {item.sets} sets
                                </span>
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
                              <p className="font-bold text-[#2E1B1B] text-sm">
                                Total
                              </p>
                              <p className="text-[#4A3A3A] text-xs">
                                (without GST)
                              </p>
                            </div>
                            <p className="font-bold text-[#C08478] text-lg">
                              ₹{summary.totalAmount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-[#D9A8A0]" />
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#2E1B1B]">
                        {summary.totalSets}
                      </p>
                      <p className="text-xs text-[#4A3A3A]">sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#C08478]">
                        ₹{summary.totalAmount.toFixed(0)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Order Button */}
          {orderItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#E5E0DC]">
              <Button
                onClick={handleSubmitOrder}
                className={cn(
                  "h-12 font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-lg shadow-lg transition-all duration-200",
                  open ? "w-full text-sm" : "w-12 text-xs"
                )}
                disabled={isSubmittingOrder}
              >
                {isSubmittingOrder ? (
                  <>
                    <Loader2
                      className={cn(
                        "animate-spin",
                        open ? "w-4 h-4 mr-2" : "w-4 h-4"
                      )}
                    />
                    {open && "Submitting..."}
                  </>
                ) : (
                  <>
                    <ShoppingCart
                      className={cn(open ? "w-4 h-4 mr-2" : "w-4 h-4")}
                    />
                    {open && `Submit Order (${summary.totalSets} sets)`}
                  </>
                )}
              </Button>
            </div>
          )}
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-[#E5E0DC]">
          {/* Main Header Row */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#D9A8A0] to-[#C08478] flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2E1B1B]">
                  {catalog?.catalogName}
                </p>
                <p className="text-xs text-[#4A3A3A]">{catalog?.catalogCode}</p>
              </div>
            </div>
            {orderItems.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-[#4A3A3A]">
                    {summary.totalSets} sets
                  </p>
                  <p className="text-sm font-bold text-[#C08478]">
                    ₹{summary.totalAmount.toFixed(0)}
                  </p>
                </div>
                <Button
                  onClick={() =>
                    setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)
                  }
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-[#F9F6F4]"
                >
                  {isOrderSummaryCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-[#C08478]" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-[#C08478]" />
                  )}
                </Button>
                <Button
                  onClick={handleSubmitOrder}
                  size="sm"
                  className="h-8 px-3 text-xs font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white"
                  disabled={isSubmittingOrder}
                >
                  {isSubmittingOrder ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Expandable Order Summary */}
          {orderItems.length > 0 && (
            <div
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden border-t border-[#E5E0DC]",
                isOrderSummaryCollapsed
                  ? "max-h-0 opacity-0"
                  : "max-h-96 opacity-100"
              )}
            >
              <div className="px-4 py-3 bg-[#F9F6F4]">
                {/* Order Details */}
                <div className="space-y-2 mb-3">
                  <p className="text-xs font-semibold text-[#2E1B1B]">
                    Order Details:
                  </p>
                  <div className="space-y-1.5">
                    {orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[#2E1B1B] font-medium truncate">
                            {item.product.itemName}
                          </p>
                          <p className="text-[#4A3A3A]">
                            Code: {item.product.itemCode}
                          </p>
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-[#C08478] font-medium">
                            {item.sets} sets
                          </p>
                          <p className="text-[#4A3A3A]">₹{item.totalPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div className="text-center bg-white rounded-lg p-2">
                    <p className="text-[#4A3A3A]">Styles</p>
                    <p className="font-bold text-[#2E1B1B]">
                      {summary.totalProducts}
                    </p>
                  </div>
                  <div className="text-center bg-white rounded-lg p-2">
                    <p className="text-[#4A3A3A]">Sets</p>
                    <p className="font-bold text-[#2E1B1B]">
                      {summary.totalSets}
                    </p>
                  </div>
                  <div className="text-center bg-white rounded-lg p-2">
                    <p className="text-[#4A3A3A]">Pieces</p>
                    <p className="font-bold text-[#2E1B1B]">
                      {summary.totalPieces}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-white rounded-lg p-3 border border-[#D9A8A0]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[#2E1B1B] text-sm">
                        Total Amount
                      </p>
                      <p className="text-[#4A3A3A] text-xs">(without GST)</p>
                    </div>
                    <p className="font-bold text-[#C08478] text-lg">
                      ₹{summary.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <main className="flex-1 overflow-y-auto bg-white w-full">
          <div className="p-4 sm:p-6 min-h-[calc(100vh-120px)]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export const CatalogLogo = ({ catalog }: { catalog: any }) => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-[#2E1B1B]">
      <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#D9A8A0] to-[#C08478] flex items-center justify-center">
        <FileText className="h-5 w-5 text-white" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col"
      >
        <span className="font-bold text-sm text-[#2E1B1B] line-clamp-1">
          {catalog?.catalogName}
        </span>
        <span className="text-xs text-[#4A3A3A]">{catalog?.catalogCode}</span>
      </motion.div>
    </div>
  );
};

export const CatalogLogoIcon = ({ catalog }: { catalog: any }) => {
  return (
    <div className="relative z-20 flex items-center justify-center py-1 text-sm font-normal text-[#2E1B1B] w-full">
      <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#D9A8A0] to-[#C08478] flex items-center justify-center">
        <FileText className="h-5 w-5 text-white" />
      </div>
    </div>
  );
};
