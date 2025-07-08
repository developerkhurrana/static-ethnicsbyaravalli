"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Product {
  _id: string;
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  category: string;
  images: Array<{ url: string; alt: string }>;
}

interface Retailer {
  _id: string;
  businessName: string;
  contactPerson: string;
  phoneNumber: string;
  priority: "R1" | "R2" | "R3";
  accessibleCatalogs: string[];
}

interface Catalog {
  _id: string;
  catalogName: string;
  catalogCode: string;
  accessLevel: "R1" | "R2" | "R3" | "GENERAL";
  products: Array<{ productId: string; isActive: boolean }>;
}

interface CartItem {
  productId: string;
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  quantitySets: number;
  totalPcs: number;
  totalAmount: number;
}

export default function RetailerCatalogPage() {
  const params = useParams();
  const phoneNumber = params.phoneNumber as string;
  
  const [retailer, setRetailer] = useState<Retailer | null>(null);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCatalog, setSelectedCatalog] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (phoneNumber) {
      fetchRetailerData();
    }
  }, [phoneNumber]);

  const fetchRetailerData = async () => {
    try {
      const response = await fetch(`/api/retailer/access/${phoneNumber}`);
      if (response.ok) {
        const data = await response.json();
        setRetailer(data.retailer);
        setCatalogs(data.catalogs);
        setIsLoading(false);
      } else {
        toast.error("Invalid access link or retailer not found");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed to load catalog data");
      setIsLoading(false);
    }
  };

  const fetchCatalogProducts = async (catalogId: string) => {
    try {
      const response = await fetch(`/api/catalog/${catalogId}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  const handleCatalogChange = (catalogId: string) => {
    setSelectedCatalog(catalogId);
    fetchCatalogProducts(catalogId);
    setCart([]); // Clear cart when changing catalog
  };

  const addToCart = (product: Product, quantitySets: number) => {
    if (quantitySets <= 0) {
      toast.error("Please select at least 1 set");
      return;
    }

    const existingItem = cart.find(item => item.productId === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === product._id 
          ? {
              ...item,
              quantitySets: item.quantitySets + quantitySets,
              totalPcs: (item.quantitySets + quantitySets) * 5,
              totalAmount: (item.quantitySets + quantitySets) * item.pricePerSet
            }
          : item
      ));
    } else {
      const newItem: CartItem = {
        productId: product._id,
        itemCode: product.itemCode,
        itemName: product.itemName,
        color: product.color,
        fabric: product.fabric,
        pricePerPc: product.pricePerPc,
        pricePerSet: product.pricePerSet,
        quantitySets,
        totalPcs: quantitySets * 5,
        totalAmount: quantitySets * product.pricePerSet
      };
      setCart([...cart, newItem]);
    }
    
    toast.success(`${quantitySets} set(s) of ${product.itemName} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantitySets: number) => {
    if (quantitySets <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item => 
      item.productId === productId 
        ? {
            ...item,
            quantitySets,
            totalPcs: quantitySets * 5,
            totalAmount: quantitySets * item.pricePerSet
          }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalAmount, 0);
  };

  const getCartTotalPcs = () => {
    return cart.reduce((total, item) => total + item.totalPcs, 0);
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      toast.error("Please add items to cart before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        retailerId: retailer?._id,
        items: cart,
        totalAmount: getCartTotal(),
        totalPcs: getCartTotalPcs()
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Order submitted successfully!");
        setCart([]);
        // Optionally redirect to order confirmation
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit order");
      }
    } catch (error) {
      toast.error("An error occurred while submitting order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading catalog...</div>
      </div>
    );
  }

  if (!retailer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600">Invalid access link or retailer not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Product Catalog</h1>
              <p className="text-sm text-gray-600">
                Welcome, {retailer.businessName} ({retailer.contactPerson})
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Priority: {retailer.priority}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Catalog Selection and Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Catalog Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Catalog</CardTitle>
                <CardDescription>
                  Choose a catalog to view available products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCatalog} onValueChange={handleCatalogChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a catalog" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogs.map((catalog) => (
                      <SelectItem key={catalog._id} value={catalog._id}>
                        {catalog.catalogName} ({catalog.accessLevel})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Products Grid */}
            {selectedCatalog && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <Card key={product._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{product.itemName}</CardTitle>
                      <CardDescription>
                        Code: {product.itemCode} • {product.color} • {product.fabric}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Product Image */}
                        {product.images.length > 0 && (
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Pricing */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Price per PC:</span>
                            <span className="font-medium">₹{product.pricePerPc}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Price per Set (5 PCs):</span>
                            <span className="font-medium">₹{product.pricePerSet}</span>
                          </div>
                        </div>

                        {/* Quantity Selection */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            How many sets do you want? (1 set = 5 pcs S-XXL)
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              className="flex-1"
                              id={`quantity-${product._id}`}
                            />
                            <Button
                              onClick={() => {
                                const input = document.getElementById(`quantity-${product._id}`) as HTMLInputElement;
                                const quantity = parseInt(input.value) || 0;
                                addToCart(product, quantity);
                                input.value = "";
                              }}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {selectedCatalog && products.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  No products available in this catalog.
                </CardContent>
              </Card>
            )}
          </div>

          {/* Shopping Cart */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
                <CardDescription>
                  {cart.length} item(s) • {getCartTotalPcs()} total pieces
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.productId} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{item.itemName}</h4>
                            <p className="text-xs text-gray-600">
                              {item.itemCode} • {item.color}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              value={item.quantitySets}
                              onChange={(e) => updateCartQuantity(item.productId, parseInt(e.target.value) || 0)}
                              className="w-16 h-8 text-sm"
                            />
                            <span className="text-xs text-gray-600">sets</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">₹{item.totalAmount}</div>
                            <div className="text-xs text-gray-600">{item.totalPcs} pcs</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-lg">₹{getCartTotal()}</span>
                      </div>
                      <Button
                        onClick={handleSubmitOrder}
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Order"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 