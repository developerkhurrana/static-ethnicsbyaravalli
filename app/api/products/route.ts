import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../lib/auth";
import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";

// List all products
async function listProducts(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const filter: any = {};
    if (search) {
      filter.itemName = { $regex: search, $options: "i" };
    }
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.countDocuments(filter);
    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Product list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create product
async function createProduct(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(listProducts);
export const POST = requireAdmin(createProduct);
