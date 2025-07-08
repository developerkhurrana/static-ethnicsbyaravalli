import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const PUT = requireAdminAuth(async (request: NextRequest, context: any) => {
  try {
    await dbConnect();
    
    // Extract productId from context.params or fallback to URL path
    let productId;
    if (context?.params?.productId) {
      productId = context.params.productId;
    } else {
      // Fallback: extract from URL path
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      productId = pathParts[pathParts.length - 1];
    }
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    
    const body = await request.json();
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    // Update fields
    product.itemCode = body.itemCode;
    product.itemName = body.itemName;
    product.color = body.color;
    product.fabric = body.fabric;
    product.pricePerPc = body.pricePerPc;
    product.pricePerSet = body.pricePerSet;
    product.category = body.category;
    product.sizes = body.sizes;
    product.isActive = body.isActive;
    product.images = body.images;
    await product.save();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
});

export const DELETE = requireAdminAuth(async (request: NextRequest, context: any) => {
  try {
    await dbConnect();
    
    // Extract productId from context.params or fallback to URL path
    let productId;
    if (context?.params?.productId) {
      productId = context.params.productId;
    } else {
      // Fallback: extract from URL path
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      productId = pathParts[pathParts.length - 1];
    }
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await product.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}); 