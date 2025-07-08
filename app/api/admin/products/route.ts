import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Fetching products...");
    const products = await Product.find({}).sort({ createdAt: -1 });
    console.log(`Found ${products.length} products`);

    return NextResponse.json({
      success: true,
      products: products.map(product => ({
        _id: product._id,
        itemCode: product.itemCode,
        itemName: product.itemName,
        color: product.color,
        fabric: product.fabric,
        pricePerPc: product.pricePerPc,
        pricePerSet: product.pricePerSet,
        category: product.category,
        sizes: product.sizes,
        isActive: product.isActive,
        images: product.images,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Admin products API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
});

export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();
    
    await dbConnect();

    const product = new Product({
      itemCode: body.itemCode,
      itemName: body.itemName,
      color: body.color,
      fabric: body.fabric,
      pricePerPc: body.pricePerPc,
      pricePerSet: body.pricePerSet,
      category: body.category,
      sizes: body.sizes || [],
      images: body.images || [],
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    await product.save();

    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        itemCode: product.itemCode,
        itemName: product.itemName,
        color: product.color,
        fabric: product.fabric,
        pricePerPc: product.pricePerPc,
        pricePerSet: product.pricePerSet,
        category: product.category,
        sizes: product.sizes,
        isActive: product.isActive,
        images: product.images,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (error) {
    console.error("Admin products POST API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
});