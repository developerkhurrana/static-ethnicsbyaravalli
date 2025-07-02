import { NextRequest, NextResponse } from "next/server";
import { requireAuth, JWTPayload } from "../../../../lib/auth";
import dbConnect from "../../../../lib/mongodb";
import Retailer from "../../../../models/Retailer";
import Catalog from "../../../../models/Catalog";

async function handler(request: NextRequest, user: JWTPayload) {
  try {
    await dbConnect();

    const retailer = await Retailer.findById(user.retailerId).populate({
      path: "accessibleCatalogs",
      match: { isActive: true },
      populate: {
        path: "products.productId",
        match: { isActive: true },
      },
    });

    if (!retailer) {
      return NextResponse.json(
        { error: "Retailer not found" },
        { status: 404 }
      );
    }

    const catalogs = retailer.accessibleCatalogs || [];

    return NextResponse.json({
      success: true,
      catalogs: catalogs.map((catalog: any) => ({
        id: catalog._id,
        catalogName: catalog.catalogName,
        catalogCode: catalog.catalogCode,
        accessLevel: catalog.accessLevel,
        products: catalog.products
          .filter((p: any) => p.isActive && p.productId)
          .map((p: any) => ({
            id: p.productId._id,
            itemCode: p.productId.itemCode,
            itemName: p.productId.itemName,
            color: p.productId.color,
            fabric: p.productId.fabric,
            pricePerPc: p.productId.pricePerPc,
            pricePerSet: p.productId.pricePerSet,
            images: p.productId.images,
            category: p.productId.category,
          })),
      })),
    });
  } catch (error) {
    console.error("Catalogs fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handler);
