"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ChevronDown
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
  "XS": '34"',
  "S": '36"',
  "M": '38"',
  "L": '40"',
  "XL": '42"',
  "XXL": '44"',
  "3XL": '46"',
  "4XL": '48"',
  "5XL": '50"',
};

export default function RetailerCatalogPage({ params }: { params: Promise<{ catalogCode: string }> }) {
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
        body: JSON.stringify({ phoneNumber, catalogCode: catalogCode })
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
    
    const product = products.find(p => p._id === productId);
    if (!product) return;

    setOrderItems(prev => {
      const existing = prev.find(item => item.product._id === productId);
      if (existing) {
        if (newSets === 0) {
          return prev.filter(item => item.product._id !== productId);
        } else {
          return prev.map(item => 
            item.product._id === productId 
              ? { ...item, sets: newSets, pieces: newSets * 5, totalPrice: newSets * product.pricePerSet }
              : item
          );
        }
      } else {
        if (newSets > 0) {
          return [...prev, {
            product,
            sets: newSets,
            pieces: newSets * 5,
            totalPrice: newSets * product.pricePerSet
          }];
        }
        return prev;
      }
    });
  };

  const getQuantity = (productId: string) => {
    const item = orderItems.find(item => item.product._id === productId);
    return item?.sets || 0;
  };

  const calculateOrderSummary = () => {
    const totalProducts = orderItems.length;
    const totalSets = orderItems.reduce((sum, item) => sum + item.sets, 0);
    const totalPieces = orderItems.reduce((sum, item) => sum + item.pieces, 0);
    const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    return {
      totalProducts,
      totalSets,
      totalPieces,
      totalAmount
    };
  };

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) return;
    
    setIsSubmittingOrder(true);
    const summary = calculateOrderSummary();
    const orderData = {
      catalogId: catalog?._id,
      retailerPhone: phoneNumber,
      items: orderItems.map(item => ({
        productId: item.product._id,
        productName: item.product.itemName,
        sets: item.sets,
        pieces: item.pieces,
        pricePerSet: item.product.pricePerSet,
        totalPrice: item.totalPrice
      })),
      summary,
      
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Order submitted successfully!', {
          orderNumber: result.order.orderNumber,
          retailerPhone: phoneNumber,
          totalAmount: summary.totalAmount,
          totalSets: summary.totalSets,
          totalPieces: summary.totalPieces
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
          retailer: retailer
        });
        setOrderItems([]);
      } else {
        const error = await response.json();
        console.error('Order submission error:', error);
        alert(`Failed to submit order: ${error.error || 'Please try again.'}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the order.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const summary = calculateOrderSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F4] to-[#E5E0DC]">
      {!catalog ? (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#2E1B1B] mb-2">Access Catalog</h1>
              <p className="text-[#4A3A3A] text-sm">Enter your phone number to view this exclusive catalog</p>
            </div>

            {/* Access Form */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#2E1B1B] flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#D9A8A0]" />
                      Phone Number
                    </label>
                    <div className="relative">
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        required
                        placeholder="Enter your 10-digit phone number"
                        className="h-14 text-lg border-2 border-[#E5E0DC] focus:border-[#D9A8A0] focus:ring-[#D9A8A0] rounded-xl pl-4 pr-4"
                        disabled={isLoading}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        aria-describedby="phone-help"
                      />
                    </div>
                    <p id="phone-help" className="text-xs text-[#4A3A3A]">
                      Enter your registered phone number to access the catalog
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium text-sm">Access Denied</p>
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verifying Access...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Access Catalog
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <div className="text-center mt-6">
              <p className="text-xs text-[#4A3A3A]">
                Need help? Contact your sales representative
              </p>
            </div>
          </div>
        </div>
      ) : orderSuccess ? (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D9A8A0] to-[#C08478] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#2E1B1B] mb-2">Order Submitted Successfully!</h1>
              <p className="text-[#4A3A3A] text-sm">Your order has been received and is being processed</p>
            </div>

            {/* Order Details Card */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden mb-6">
              <CardContent className="p-6 space-y-6">
                {/* Order Number */}
                <div className="text-center bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-[#4A3A3A] mb-2 flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Order Number
                  </h3>
                  <p className="text-3xl font-bold text-[#D9A8A0] tracking-wider">{orderSuccess.orderNumber}</p>
                </div>

                {/* Catalog Info */}
                <div className="bg-[#F9F6F4] rounded-xl p-4">
                  <h4 className="font-semibold text-[#2E1B1B] mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#D9A8A0]" />
                    Catalog Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#4A3A3A]">Name:</span>
                      <span className="font-medium text-[#2E1B1B]">{orderSuccess.catalogName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A3A3A]">Code:</span>
                      <span className="font-medium text-[#2E1B1B]">{orderSuccess.catalogCode}</span>
                    </div>
                  </div>
                </div>

                {/* Retailer Info */}
                <div className="bg-[#F9F6F4] rounded-xl p-4">
                  <h4 className="font-semibold text-[#2E1B1B] mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-[#D9A8A0]" />
                    Retailer Information
                  </h4>
                  {retailer ? (
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Home className="h-4 w-4 text-[#C08478] mt-0.5" />
                        <div>
                          <p className="font-medium text-[#2E1B1B]">{retailer.businessName}</p>
                          <p className="text-[#4A3A3A]">{retailer.contactPerson}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 text-[#C08478] mt-0.5" />
                        <p className="text-[#4A3A3A]">{retailer.phoneNumber}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-[#C08478] mt-0.5" />
                        <p className="text-[#4A3A3A] text-xs leading-relaxed">
                          {retailer.address.street}, {retailer.address.city}, {retailer.address.state} - {retailer.address.pincode}, {retailer.address.country}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#C08478]" />
                      <p className="text-[#4A3A3A]">{orderSuccess.retailerPhone}</p>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-xl p-4 border border-[#D9A8A0]">
                  <h4 className="font-semibold text-[#2E1B1B] mb-3 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[#D9A8A0]" />
                    Order Summary
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#4A3A3A]">Total Styles:</span>
                      <span className="font-semibold text-[#2E1B1B]">{orderSuccess.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A3A3A]">Total Sets:</span>
                      <span className="font-semibold text-[#2E1B1B]">{orderSuccess.totalSets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A3A3A]">Total Pieces:</span>
                      <span className="font-semibold text-[#2E1B1B]">{orderSuccess.totalPieces}</span>
                    </div>
                    <div className="pt-2 border-t border-[#D9A8A0]">
                      <div className="flex justify-between text-lg font-bold text-[#C08478]">
                        <span>Total Amount <span className="text-xs font-normal text-[#4A3A3A]">(without GST)</span></span>
                        <span>₹{orderSuccess.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setOrderSuccess(null);
                  setOrderItems([]);
                }}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-xl shadow-lg transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Place Another Order
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
                className="w-full h-14 text-lg font-medium border-2 border-[#E5E0DC] hover:border-[#D9A8A0] hover:bg-[#F9F6F4] text-[#2E1B1B] rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Catalog Access
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-24">
          {/* Modern Header with Retailer Info */}
          <div className="bg-gradient-to-r from-[#D9A8A0] to-[#C08478] text-white sticky top-16 z-50 shadow-lg">
            <div className="px-4 py-6">
              <div className="flex flex-col gap-4">
                {/* Catalog Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">{catalog.catalogName}</h1>
                      <p className="text-white/80 text-sm">Code: {catalog.catalogCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Retailer Info */}
                {retailer && (
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{retailer.businessName}</p>
                        <p className="text-white/80 text-sm">{retailer.contactPerson}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-3 w-3" />
                          <p className="text-white/80 text-xs">{retailer.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Home className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-4 mt-4 py-6 space-y-6">
            {products.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E5E0DC] to-[#D9A8A0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-[#C08478]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2E1B1B] mb-3">No Products Available</h3>
                <p className="text-[#4A3A3A] text-sm max-w-sm mx-auto">
                  This catalog doesn't have any products yet. Please check back later or contact your sales representative.
                </p>
              </div>
            ) : (
              products.map((product) => {
                const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
                const quantity = getQuantity(product._id);
                
                return (
                  <Card key={product._id} className="overflow-hidden shadow-xl rounded-2xl border-0 bg-white">
                    <div className="flex flex-col">
                      {/* Product Image with Modern Overlay */}
                      <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        {primaryImage ? (
                          <>
                            {/* Blurred background image */}
                            <Image
                              src={primaryImage.url}
                              alt=""
                              fill
                              className="object-cover blur-sm scale-110 z-0"
                              aria-hidden="true"
                              priority
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                            {/* Main product image */}
                            <Image
                              src={primaryImage.url}
                              alt={primaryImage.alt || product.itemName}
                              width={400}
                              height={500}
                              className="relative z-10 object-contain p-4"
                              priority
                            />
                            {/* Modern overlay details */}
                            <div className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 z-20">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-white drop-shadow-sm line-clamp-1">{product.itemName}</h3>
                                  <p className="text-xs text-gray-200">Code: {product.itemCode}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <span className="text-lg font-bold text-white">₹{product.pricePerSet}</span>
                                  <span className="text-xs text-gray-200">per set</span>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                <Badge className="flex items-center gap-1 text-xs px-2 py-1 bg-white/20 text-white border-0 backdrop-blur-sm">
                                  <Palette className="w-3 h-3" /> {product.color}
                                </Badge>
                                <Badge className="flex items-center gap-1 text-xs px-2 py-1 bg-white/20 text-white border-0 backdrop-blur-sm">
                                  <Scissors className="w-3 h-3" /> {product.fabric}
                                </Badge>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Package className="w-12 h-12 mx-auto mb-2" />
                              <p className="text-sm">No Image</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-4 space-y-4">
                        {/* Price Info */}
                        <div className="flex justify-between items-center bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-xl p-3">
                          <div className="text-center">
                            <p className="text-sm text-[#4A3A3A]">Per Piece</p>
                            <p className="text-lg font-bold text-[#2E1B1B]">₹{product.pricePerPc}</p>
                          </div>
                          <div className="w-px h-8 bg-[#D9A8A0]"></div>
                          <div className="text-center">
                            <p className="text-sm text-[#4A3A3A]">Per Set (5 pcs)</p>
                            <p className="text-xl font-bold text-[#C08478]">₹{product.pricePerSet}</p>
                          </div>
                        </div>

                        {/* Sizes Info */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="bg-[#F9F6F4] rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Package className="w-4 h-4 text-[#D9A8A0]" />
                              <span className="text-sm font-semibold text-[#2E1B1B]">Available Sizes</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(() => {
                                const sizeOrder = ["XS","S","M","L","XL","XXL","3XL","4XL","5XL"];
                                const productSizes = product.sizes.filter(size => SIZE_MEASUREMENTS[size]);
                                const sortedSizes = sizeOrder.filter(size => productSizes.includes(size));
                                if (
                                  productSizes.length > 1 &&
                                  productSizes.length === sortedSizes.length &&
                                  productSizes.every((size, idx) => size === sortedSizes[idx])
                                ) {
                                  const first = sortedSizes[0];
                                  const last = sortedSizes[sortedSizes.length - 1];
                                  return (
                                    <Badge className="bg-[#D9A8A0] text-white border-[#C08478]">
                                      {first}({SIZE_MEASUREMENTS[first]}) - {last}({SIZE_MEASUREMENTS[last]})
                                    </Badge>
                                  );
                                } else {
                                  return productSizes.map((size) => (
                                    <Badge key={size} className="bg-[#D9A8A0] text-white border-[#C08478]">
                                      {size}({SIZE_MEASUREMENTS[size] || ""})
                                    </Badge>
                                  ));
                                }
                              })()}
                            </div>
                          </div>
                        )}

                        {/* MOQ Info */}
                        <div className="bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-xl p-3 border border-[#D9A8A0]">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#D9A8A0]" />
                            <span className="text-sm font-medium text-[#2E1B1B]">MOQ: 1 set = 5 pieces (S to XXL)</span>
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-[#2E1B1B] flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4 text-[#D9A8A0]" />
                            How many sets do you want?
                          </label>
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(product._id, quantity - 1)}
                              disabled={quantity === 0}
                              className="w-12 h-12 p-0 rounded-xl border-2 hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-5 h-5" />
                            </Button>
                            <div className="min-w-[3rem] text-center">
                              <span className="text-2xl font-bold text-[#2E1B1B]">{quantity}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(product._id, quantity + 1)}
                              className="w-12 h-12 p-0 rounded-xl border-2 hover:border-[#D9A8A0] hover:bg-[#F9F6F4]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>

                        {/* Add to Order Button */}
                        <Button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className={cn(
                            "w-full h-14 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]",
                            quantity > 0
                              ? "bg-gradient-to-r from-[#C08478] to-[#B0766A] hover:from-[#B0766A] hover:to-[#A0685C] text-white"
                              : "bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white"
                          )}
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          {quantity > 0 ? `Update Order (${quantity} sets)` : "Add to Order"}
                        </Button>

                        {/* Current Item Summary */}
                        {quantity > 0 && (
                          <div className="bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-xl p-3 border border-[#D9A8A0]">
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center">
                                <p className="text-[#4A3A3A]">Sets</p>
                                <p className="font-bold text-[#C08478]">{quantity}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[#4A3A3A]">Pieces</p>
                                <p className="font-bold text-[#C08478]">{quantity * 5}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[#4A3A3A]">Total</p>
                                <p className="font-bold text-[#C08478]">₹{quantity * product.pricePerSet}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          {/* Modern Sticky Order Summary */}
          {orderItems.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E0DC] shadow-2xl z-20 backdrop-blur-sm">
              <div className="px-4 py-4">
                <div className="space-y-4">
                  {/* Collapse Toggle Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)}
                      className="h-8 px-3 bg-[#F9F6F4] hover:bg-[#E5E0DC] text-[#2E1B1B] rounded-full shadow-sm"
                    >
                      {isOrderSummaryCollapsed ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Show Summary
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Hide Summary
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Summary Details - Collapsible */}
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOrderSummaryCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                  }`}>
                    <div className="bg-gradient-to-r from-[#F9F6F4] to-[#E5E0DC] rounded-xl p-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-[#4A3A3A] text-xs">Styles</p>
                          <p className="font-bold text-[#2E1B1B] text-lg">{summary.totalProducts}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#4A3A3A] text-xs">Sets</p>
                          <p className="font-bold text-[#2E1B1B] text-lg">{summary.totalSets}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#4A3A3A] text-xs">Pieces</p>
                          <p className="font-bold text-[#2E1B1B] text-lg">{summary.totalPieces}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#D9A8A0]">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-bold text-[#2E1B1B]">Total Amount</p>
                            <p className="text-xs text-[#4A3A3A]">(without GST)</p>
                          </div>
                          <p className="text-2xl font-bold text-[#C08478]">₹{summary.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button - Always Visible */}
                  <Button
                    onClick={handleSubmitOrder}
                    className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-[#D9A8A0] to-[#C08478] hover:from-[#C08478] hover:to-[#B0766A] text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={isSubmittingOrder}
                  >
                    {isSubmittingOrder ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        Submitting Order...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6 mr-2" />
                        Submit Order ({summary.totalSets} sets)
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 