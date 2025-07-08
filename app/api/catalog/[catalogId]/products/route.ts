import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Catalog from "@/models/Catalog";
import Product from "@/models/Product";

export async function GET(
  request: NextRequest,
  { params }: { params: { catalogId: string } }
) {
  try {
    await dbConnect();

    const { catalogId } = params;

    // Find the catalog
    const catalog = await Catalog.findById(catalogId);
    if (!catalog || !catalog.isActive) {
      return NextResponse.json(
        { error: "Catalog not found or inactive" },
        { status: 404 }
      );
    }

    // Get product IDs from catalog
    const productIds = catalog.products
      .filter((product: any) => product.isActive)
      .map((product: any) => product.productId);

    // Fetch products
    const products = await Product.find({
      _id: { $in: productIds },
      isActive: true,
    }).sort({ itemName: 1 });

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
        images: product.images,
      })),
    });
  } catch (error) {
    console.error("Catalog products API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 