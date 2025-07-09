"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Package, Palette, Scissors, ShoppingCart, Calculator, Loader2, AlertCircle } from "lucide-react";

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

export default function RetailerCatalogPage({ params }: { params: { catalogCode: string } }) {
  const { catalogCode } = params;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [retailer, setRetailer] = useState<Retailer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [isGSTApplicable, setIsGSTApplicable] = useState(true);

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
      isGSTApplicable
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
    <div className="min-h-screen mt-8 bg-gray-50 pb-20">
      {!catalog ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">📋 Access Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phoneNumber" className="block mb-2 text-lg font-medium">
                    Enter your phone number to view this catalog:
                  </label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    required
                    placeholder="Phone Number"
                    className="text-lg h-14"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-lg text-center p-3 bg-red-50 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full h-14 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Access Catalog"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : orderSuccess ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center text-green-600">✅ Order Submitted Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Order Number */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Number</h3>
                  <p className="text-2xl font-bold text-blue-600">{orderSuccess.orderNumber}</p>
                </div>

                {/* Catalog Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Catalog Details</h4>
                  <p className="text-gray-700">Name: {orderSuccess.catalogName}</p>
                  <p className="text-gray-700">Code: {orderSuccess.catalogCode}</p>
                </div>

                {/* Retailer Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Retailer Information</h4>
                  {retailer ? (
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Business:</span> {retailer.businessName}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Contact Person:</span> {retailer.contactPerson}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Phone:</span> {retailer.phoneNumber}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Address:</span> {retailer.address.street}, {retailer.address.city}, {retailer.address.state} - {retailer.address.pincode}, {retailer.address.country}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-700">Phone: {orderSuccess.retailerPhone}</p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Styles:</span>
                      <span className="font-semibold">{orderSuccess.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Sets:</span>
                      <span className="font-semibold">{orderSuccess.totalSets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Pieces:</span>
                      <span className="font-semibold">{orderSuccess.totalPieces}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Total Amount <sub className=" text-[10px] font-normal text-gray-500">without GST</sub></span>
                      <span>₹{orderSuccess.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      setOrderSuccess(null);
                      setOrderItems([]);
                    }}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  >
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
                    className="w-full h-12"
                  >
                    Back to Catalog Access
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="pb-24">
          {/* Header with Retailer Info */}
          <div className="bg-white shadow-sm border-b sticky top-0 z-10">
            <div className="px-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{catalog.catalogName}</h1>
                  <p className="text-gray-600">Catalog Code: {catalog.catalogCode}</p>
                  <p className="text-sm text-gray-500">Access Level: {catalog.accessLevel}</p>
                </div>
                {retailer && (
                  <div className="text-right text-sm text-gray-600">
                    <p className="font-medium">{retailer.businessName}</p>
                    <p>{retailer.contactPerson}</p>
                    <p>{retailer.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-4 py-6 space-y-6">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Available</h3>
                <p className="text-gray-600">This catalog doesn't have any products yet.</p>
              </div>
            ) : (
              products.map((product) => {
                const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
                const quantity = getQuantity(product._id);
                
                return (
                  <Card key={product._id} className="overflow-hidden shadow-lg rounded-2xl border-0">
                    <div className="flex flex-col">
                      {/* Product Image with Overlayed Info */}
                      <div className="w-full h-80 bg-gray-100 flex-shrink-0 flex items-center justify-center relative rounded-xl overflow-hidden">
                        {primaryImage ? (
                          <>
                            <img
                              src={primaryImage.url}
                              alt={primaryImage.alt || product.itemName}
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute bottom-0 left-0 w-full px-4 pb-3 pt-6 bg-gradient-to-t from-black/80 to-black/0 flex flex-col gap-1">
                              <span className="text-lg font-bold text-white drop-shadow-sm">{product.itemName}</span>
                              <span className="text-xs text-gray-200">Code: {product.itemCode}</span>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="flex items-center gap-1 text-xs px-2 py-1 bg-black/40 text-white border-0">
                                  <Palette className="w-4 h-4" /> Color: {product.color}
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1 text-xs px-2 py-1 bg-black/40 text-white border-0">
                                  <Scissors className="w-4 h-4" /> Fabric: {product.fabric}
                                </Badge>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📷 No Image
                          </div>
                        )}
                      </div>

                      {/* Price Info */}
                      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
                        <span className="text-base font-semibold text-gray-700">₹{product.pricePerPc} <span className="text-xs text-gray-400">per piece</span></span>
                        <span className="text-lg font-bold text-gray-900">₹{product.pricePerSet} <span className="text-base font-medium text-gray-500">per set (5 pcs)</span></span>
                      </div>

                      {/* Sizes Info */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
                          <span className="text-xs font-semibold text-gray-700">Available Sizes:</span>
                          {/* If all sizes are present and in order, show as a range */}
                          {(() => {
                            const sizeOrder = ["XS","S","M","L","XL","XXL","3XL","4XL","5XL"];
                            const productSizes = product.sizes.filter(size => SIZE_MEASUREMENTS[size]);
                            const sortedSizes = sizeOrder.filter(size => productSizes.includes(size));
                            if (
                              productSizes.length > 1 &&
                              productSizes.length === sortedSizes.length &&
                              productSizes.every((size, idx) => size === sortedSizes[idx])
                            ) {
                              // Show as range
                              const first = sortedSizes[0];
                              const last = sortedSizes[sortedSizes.length - 1];
                              return (
                                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-semibold border border-blue-200">
                                  {first}({SIZE_MEASUREMENTS[first]}) - {last}({SIZE_MEASUREMENTS[last]})
                                </span>
                              );
                            } else {
                              // Show each size with measurement
                              return productSizes.map((size) => (
                                <span key={size} className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-semibold border border-blue-200">
                                  {size}({SIZE_MEASUREMENTS[size] || ""})
                                </span>
                              ));
                            }
                          })()}
                        </div>
                      )}

                      {/* MOQ Info */}
                      <div className="bg-blue-50 px-4 py-2 flex items-center gap-2 text-blue-800 text-base">
                        <Package className="w-5 h-5" />
                        <span>MOQ: 1 set = 5 pieces (S to XXL)</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex flex-col gap-2 px-4 py-4">
                        <label className="text-base font-semibold text-gray-800 mb-1">How many sets you want?</label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product._id, quantity - 1)}
                            disabled={quantity === 0}
                            className="w-14 h-14 p-0 text-2xl"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-6 h-6" />
                          </Button>
                          <span className="text-2xl font-bold min-w-[2.5rem] text-center">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product._id, quantity + 1)}
                            className="w-14 h-14 p-0 text-2xl"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>

                      {/* Add to Order Button */}
                      <div className="px-4 pb-4">
                        <Button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 rounded-xl shadow-md"
                          variant="default"
                        >
                          <ShoppingCart className="w-6 h-6" />
                          {quantity > 0 ? `Update Order (${quantity} sets)` : "Add to Order"}
                        </Button>
                      </div>

                      {/* Current Item Summary */}
                      {quantity > 0 && (
                        <div className="bg-green-50 px-4 py-3 rounded-b-xl">
                          <div className="text-base text-green-800 flex justify-between">
                            <span>Sets: {quantity}</span>
                            <span>Pieces: {quantity * 5}</span>
                            <span className="font-semibold">Total: ₹{quantity * product.pricePerSet}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          {/* Sticky Order Summary */}
          {orderItems.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
              <div className="px-4 py-4">
                <div className="space-y-3">
                  {/* Summary Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Styles:</span>
                      <span className="font-semibold">{summary.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sets:</span>
                      <span className="font-semibold">{summary.totalSets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pieces:</span>
                      <span className="font-semibold">{summary.totalPieces}</span>
                    </div>
                    <div className="flex justify-between col-span-2 text-lg font-bold text-green-600">
                      <span>Total Amount <sub className=" text-[10px] font-normal text-gray-500">without GST</sub> :</span>
                      <span>₹{summary.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmitOrder}
                    className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
                    disabled={isSubmittingOrder}
                  >
                    {isSubmittingOrder ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Submit Order
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