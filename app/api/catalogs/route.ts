import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../lib/auth";
import dbConnect from "../../../lib/mongodb";
import Catalog from "../../../models/Catalog";
import Product from "../../../models/Product";

// List all catalogs
async function listCatalogs(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const filter: any = {};
    if (search) {
      filter.catalogName = { $regex: search, $options: "i" };
    }
    const catalogs = await Catalog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "products.productId",
        model: Product,
      });
    const total = await Catalog.countDocuments(filter);
    return NextResponse.json({
      success: true,
      catalogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Catalog list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create catalog
async function createCatalog(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();
    const catalog = await Catalog.create(body);
    return NextResponse.json({ success: true, catalog });
  } catch (error) {
    console.error("Catalog create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(listCatalogs);
export const POST = requireAdmin(createCatalog);
