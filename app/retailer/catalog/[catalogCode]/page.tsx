"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RetailerCatalogLayout from "@/components/retailer/retailer-catalog-layout";
import {
  Minus,
  Plus,
  Package,
  Palette,
  Scissors,
  ShoppingCart,
  Calculator,
  Loader2,
  AlertCircle,
  Phone,
  FileText,
  CheckCircle,
  ArrowLeft,
  Home,
  User,
  MapPin,
  Calendar,
  CreditCard,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
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
  sizes?: string[]; // Added sizes to the Product interface
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

const SIZE_MEASUREMENTS: Record<string, string> = {
  XS: '34"',
  S: '36"',
  M: '38"',
  L: '40"',
  XL: '42"',
  XXL: '44"',
  "3XL": '46"',
  "4XL": '48"',
  "5XL": '50"',
};

export default function RetailerCatalogPage({
  params,
}: {
  params: Promise<{ catalogCode: string }>;
}) {
  const [catalogCode, setCatalogCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [retailer, setRetailer] = useState<Retailer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [isOrderSummaryCollapsed, setIsOrderSummaryCollapsed] = useState(false);

  // Handle async params
  useEffect(() => {
    params.then(({ catalogCode }) => {
      setCatalogCode(catalogCode);
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setCatalog(null);
    setRetailer(null);
    setProducts([]);
    setOrderItems([]);
    try {
      const response = await fetch(`/api/retailer/catalog-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, catalogCode: catalogCode }),
      });
      if (response.ok) {
        const data = await response.json();
        setCatalog(data.catalog);
        setRetailer(data.retailer);
        setProducts(data.products);
      } else {
        const data = await response.json();
        setError(data.error || "Access denied");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (productId: string, newSets: number) => {
    if (newSets < 0) return;

    const product = products.find((p) => p._id === productId);
    if (!product) return;

    setOrderItems((prev) => {
      const existing = prev.find((item) => item.product._id === productId);
      if (existing) {
        if (newSets === 0) {
          return prev.filter((item) => item.product._id !== productId);
        } else {
          return prev.map((item) =>
            item.product._id === productId
              ? {
                  ...item,
                  sets: newSets,
                  pieces: newSets * 5,
                  totalPrice: newSets * product.pricePerSet,
                }
              : item
          );
        }
      } else {
        if (newSets > 0) {
          return [
            ...prev,
            {
              product,
              sets: newSets,
              pieces: newSets * 5,
              totalPrice: newSets * product.pricePerSet,
            },
          ];
        }
        return prev;
      }
    });
  };

  const getQuantity = (productId: string) => {
    const item = orderItems.find((item) => item.product._id === productId);
    return item?.sets || 0;
  };

  const calculateOrderSummary = () => {
    const totalProducts = orderItems.length;
    const totalSets = orderItems.reduce((sum, item) => sum + item.sets, 0);
    const totalPieces = orderItems.reduce((sum, item) => sum + item.pieces, 0);
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    return {
      totalProducts,
      totalSets,
      totalPieces,
      totalAmount,
    };
  };

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) return;

    setIsSubmittingOrder(true);
    const summary = calculateOrderSummary();
    const orderData = {
      catalogId: catalog?._id,
      retailerPhone: phoneNumber,
      items: orderItems.map((item) => ({
        productId: item.product._id,
        productName: item.product.itemName,
        sets: item.sets,
        pieces: item.pieces,
        pricePerSet: item.product.pricePerSet,
        totalPrice: item.totalPrice,
      })),
      summary,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order submitted successfully!", {
          orderNumber: result.order.orderNumber,
          retailerPhone: phoneNumber,
          totalAmount: summary.totalAmount,
          totalSets: summary.totalSets,
          totalPieces: summary.totalPieces,
        });
        setOrderSuccess({
          orderNumber: result.order.orderNumber,
          retailerPhone: phoneNumber,
          totalAmount: summary.totalAmount,
          totalProducts: summary.totalProducts,
          totalSets: summary.totalSets,
          totalPieces: summary.totalPieces,
          catalogName: catalog?.catalogName,
          catalogCode: catalog?.catalogCode,
          retailer: retailer,
        });
        setOrderItems([]);
      } else {
        const error = await response.json();
        console.error("Order submission error:", error);
        alert(`Failed to submit order: ${error.error || "Please try again."}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the order.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const summary = calculateOrderSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F4] to-[#E5E0DC]">
      {!catalog ? (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E1B1B] mb-2">
                Access Catalog
              </h1>
              <p className="text-[#4A3A3A] text-sm sm:text-base">
                Enter your phone number to view this exclusive catalog
              </p>
            </div>

            {/* Access Form */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm sm:text-base font-semibold text-[#2E1B1B] flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#D9A8A0]" />
                      Phone Number
                    </label>
                    <div className="relative">
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        placeholder="Enter your 10-digit phone number"
                        className="h-14 sm:h-16 text-lg sm:text-xl border-2 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0] rounded-xl pl-4 pr-4"
                        disabled={isLoading}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        aria-describedby="phone-help"
                      />
                    </div>
                    <p
                      id="phone-help"
                      className="text-xs sm:text-sm text-[#4A3A3A]"
                    >
                      Enter your registered phone number to access the catalog
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium text-sm sm:text-base">
                          Access Denied
                        </p>
                        <p className="text-red-700 text-sm sm:text-base">
                          {error}
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-14 sm:h-16 text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-spin" />
                        Verifying Access...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                        Access Catalog
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <div className="text-center mt-6 sm:mt-8">
              <p className="text-xs sm:text-sm text-[#4A3A3A]">
                Need help? Contact your sales representative
              </p>
            </div>
          </div>
        </div>
      ) : orderSuccess ? (
        <div className="min-h-screen bg-white pt-[42px]">
          {/* Hero Section */}
          <div className="relative h-[60vh] bg-gradient-to-br from-[#F9F6F4] via-[#E5E0DC] to-[#D9A8A0] flex items-center justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#C08478] rounded-full"></div>
              <div className="absolute top-32 right-16 w-12 h-12 border-2 border-[#C08478] rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-[#C08478] rounded-full"></div>
              <div className="absolute bottom-32 right-10 w-8 h-8 border-2 border-[#C08478] rounded-full"></div>
            </div>

            {/* Success Content */}
            <div className="text-center relative z-10">
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4">
                    <CheckCircle className="h-12 w-12 text-[#C08478]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-light text-[#2E1B1B] mb-2 tracking-wide">
                  ORDER CONFIRMED
                </h1>
                <p className="text-[#4A3A3A] text-sm font-medium tracking-wide uppercase">
                  {orderSuccess.orderNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8 -mt-8 relative z-20">
            <div className="max-w-md mx-auto">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-[#2E1B1B]">
                    Order Summary
                  </h2>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#C08478]">
                      ₹{orderSuccess.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-[#4A3A3A]">Total Amount</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#F9F6F4] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-[#C08478]">
                        {orderSuccess.totalProducts}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3A3A] font-medium">Styles</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#F9F6F4] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-[#C08478]">
                        {orderSuccess.totalSets}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3A3A] font-medium">Sets</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#F9F6F4] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-[#C08478]">
                        {orderSuccess.totalPieces}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3A3A] font-medium">Pieces</p>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F9F6F4] rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[#C08478]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2E1B1B]">
                          Catalog
                        </p>
                        <p className="text-xs text-[#4A3A3A]">
                          {orderSuccess.catalogName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#C08478]">
                        {orderSuccess.catalogCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F9F6F4] rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-[#C08478]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2E1B1B]">
                          Retailer
                        </p>
                        {retailer ? (
                          <p className="text-xs text-[#4A3A3A]">
                            {retailer.businessName}
                          </p>
                        ) : (
                          <p className="text-xs text-[#4A3A3A]">
                            {orderSuccess.retailerPhone}
                          </p>
                        )}
                      </div>
                    </div>
                    {retailer && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#C08478]">
                          {retailer.phoneNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={() => {
                    setOrderSuccess(null);
                    setOrderItems([]);
                  }}
                  className="w-full h-14 text-base font-medium bg-[#2E1B1B] hover:bg-[#1A0F0F] text-white rounded-xl shadow-lg transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Place another order
                </Button>
                <Button
                  onClick={() => {
                    setOrderSuccess(null);
                    setCatalog(null);
                    setRetailer(null);
                    setProducts([]);
                    setOrderItems([]);
                  }}
                  variant="outline"
                  className="w-full h-14 text-base font-medium border-2 border-gray-200 hover:border-[#2E1B1B] hover:bg-gray-50 text-[#2E1B1B] rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Back to Catalog
                </Button>
              </div>

              {/* Status Message */}
              <div className="bg-[#F9F6F4] rounded-xl p-4 border border-[#E5E0DC]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2E1B1B]">
                      Order Processing
                    </p>
                    <p className="text-xs text-[#4A3A3A]">
                      Our team will contact you within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RetailerCatalogLayout
          catalog={catalog}
          retailer={retailer}
          orderItems={orderItems}
          summary={summary}
          isSubmittingOrder={isSubmittingOrder}
          isOrderSummaryCollapsed={isOrderSummaryCollapsed}
          setIsOrderSummaryCollapsed={setIsOrderSummaryCollapsed}
          handleSubmitOrder={handleSubmitOrder}
          updateQuantity={updateQuantity}
          getQuantity={getQuantity}
        >
          {/* Products Grid */}
          <div className="space-y-6">
            {products.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E5E0DC] to-[#D9A8A0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-[#C08478]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2E1B1B] mb-3">
                  No Products Available
                </h3>
                <p className="text-[#4A3A3A] text-sm max-w-sm mx-auto">
                  This catalog doesn&apos;t have any products yet. Please check
                  back later or contact your sales representative.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => {
                  const primaryImage =
                    product.images.find((img) => img.isPrimary) ||
                    product.images[0];
                  const quantity = getQuantity(product._id);

                  return (
                    <Card
                      key={product._id}
                      className="overflow-hidden shadow-lg rounded-xl border-0 bg-white hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col">
                        {/* Product Image - Clean and Full */}
                        <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                          {primaryImage ? (
                            <Image
                              src={primaryImage.url}
                              alt={primaryImage.alt || product.itemName}
                              fill
                              className="object-contain transition-transform duration-300 hover:scale-105"
                              priority
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <div className="text-center">
                                <Package className="w-8 h-8 mx-auto mb-1" />
                                <p className="text-xs">No Image</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-3 space-y-3">
                          {/* Product Info Header */}
                          <div className="space-y-1.5">
                            <h3 className="text-base font-semibold text-[#2E1B1B] line-clamp-1">
                              {product.itemName}
                            </h3>
                            <p className="text-xs text-[#4A3A3A]">
                              Code: {product.itemCode}
                            </p>
                            <div className="flex gap-1.5 flex-wrap">
                              <Badge className="flex items-center gap-1 text-xs px-1.5 py-0.5 bg-[#F9F6F4] text-[#2E1B1B] border border-[#E5E0DC]">
                                <Palette className="w-2.5 h-2.5 text-[#D9A8A0]" />{" "}
                                {product.color}
                              </Badge>
                              <Badge className="flex items-center gap-1 text-xs px-1.5 py-0.5 bg-[#F9F6F4] text-[#2E1B1B] border border-[#E5E0DC]">
                                <Scissors className="w-2.5 h-2.5 text-[#D9A8A0]" />{" "}
                                {product.fabric}
                              </Badge>
                            </div>
                          </div>

                          {/* Price Info */}
                          <div className="flex justify-between items-center bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-lg p-2">
                            <div className="text-center">
                              <p className="text-xs text-[#4A3A3A]">
                                Per Piece
                              </p>
                              <p className="text-sm font-bold text-[#2E1B1B]">
                                ₹{product.pricePerPc}
                              </p>
                            </div>
                            <div className="w-px h-6 bg-[#D9A8A0]"></div>
                            <div className="text-center">
                              <p className="text-xs text-[#4A3A3A]">
                                Per Set (5 pcs)
                              </p>
                              <p className="text-lg font-bold text-[#C08478]">
                                ₹{product.pricePerSet}
                              </p>
                            </div>
                          </div>

                          {/* Sizes Info */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="bg-[#F9F6F4] rounded-lg p-2">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Package className="w-3 h-3 text-[#D9A8A0]" />
                                <span className="text-xs font-semibold text-[#2E1B1B]">
                                  Available Sizes
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {(() => {
                                  const sizeOrder = [
                                    "XS",
                                    "S",
                                    "M",
                                    "L",
                                    "XL",
                                    "XXL",
                                    "3XL",
                                    "4XL",
                                    "5XL",
                                  ];
                                  const productSizes = product.sizes.filter(
                                    (size) => SIZE_MEASUREMENTS[size]
                                  );
                                  const sortedSizes = sizeOrder.filter((size) =>
                                    productSizes.includes(size)
                                  );
                                  if (
                                    productSizes.length > 1 &&
                                    productSizes.length ===
                                      sortedSizes.length &&
                                    productSizes.every(
                                      (size, idx) => size === sortedSizes[idx]
                                    )
                                  ) {
                                    const first = sortedSizes[0];
                                    const last =
                                      sortedSizes[sortedSizes.length - 1];
                                    return (
                                      <Badge className="bg-[#D9A8A0] text-white border-[#C08478] text-xs px-1.5 py-0.5">
                                        {first}({SIZE_MEASUREMENTS[first]}) -{" "}
                                        {last}({SIZE_MEASUREMENTS[last]})
                                      </Badge>
                                    );
                                  } else {
                                    return productSizes.map((size) => (
                                      <Badge
                                        key={size}
                                        className="bg-[#D9A8A0] text-white border-[#C08478] text-xs px-1.5 py-0.5"
                                      >
                                        {size}({SIZE_MEASUREMENTS[size] || ""})
                                      </Badge>
                                    ));
                                  }
                                })()}
                              </div>
                            </div>
                          )}

                          {/* MOQ Info */}
                          <div className="bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-lg p-2 border border-[#D9A8A0]">
                            <div className="flex items-center gap-1.5">
                              <Package className="w-3 h-3 text-[#D9A8A0]" />
                              <span className="text-xs font-medium text-[#2E1B1B]">
                                MOQ: 1 set = 5 pieces (S to XXL)
                              </span>
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-[#2E1B1B] flex items-center gap-1.5">
                              <ShoppingCart className="w-3 h-3 text-[#D9A8A0]" />
                              How many sets do you want?
                            </label>
                            <div className="flex items-center justify-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(product._id, quantity - 1)
                                }
                                disabled={quantity === 0}
                                className="w-10 h-10 p-0 rounded-lg border-2 hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <div className="min-w-[2.5rem] text-center">
                                <span className="text-xl font-bold text-[#2E1B1B]">
                                  {quantity}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(product._id, quantity + 1)
                                }
                                className="w-10 h-10 p-0 rounded-lg border-2 hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Add to Order Button */}
                          <Button
                            onClick={() =>
                              updateQuantity(product._id, quantity + 1)
                            }
                            className={cn(
                              "w-full h-12 text-sm font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]",
                              quantity > 0
                                ? "bg-gradient-to-r from-[#C08478] to-[#B0766A] hover:from-[#B0766A] hover:to-[#A0685C] text-white"
                                : "bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white"
                            )}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1.5" />
                            {quantity > 0
                              ? `Update (${quantity} sets)`
                              : "Add to Order"}
                          </Button>

                          {/* Current Item Summary */}
                          {quantity > 0 && (
                            <div className="bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-lg p-2 border border-[#D9A8A0]">
                              <div className="grid grid-cols-3 gap-1.5 text-xs">
                                <div className="text-center">
                                  <p className="text-[#4A3A3A]">Sets</p>
                                  <p className="font-bold text-[#C08478]">
                                    {quantity}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-[#4A3A3A]">Pieces</p>
                                  <p className="font-bold text-[#C08478]">
                                    {quantity * 5}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-[#4A3A3A]">Total</p>
                                  <p className="font-bold text-[#C08478]">
                                    ₹{quantity * product.pricePerSet}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </RetailerCatalogLayout>
      )}
    </div>
  );
}
