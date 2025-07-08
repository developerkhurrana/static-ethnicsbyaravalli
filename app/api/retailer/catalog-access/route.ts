import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Retailer from "@/models/Retailer";
import Catalog from "@/models/Catalog";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, catalogCode } = await request.json();
    if (!phoneNumber || !catalogCode) {
      return NextResponse.json({ error: "Phone number and catalog code are required" }, { status: 400 });
    }
    await dbConnect();
    const retailer = await Retailer.findOne({ phoneNumber });
    if (!retailer) {
      return NextResponse.json({ error: "Retailer not found" }, { status: 404 });
    }
    const catalog = await Catalog.findOne({ catalogCode });
    if (!catalog) {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
    // Check access - either through explicit catalog assignment or priority level
    const retailerPriorityCodes = retailer.priorities?.map((p: any) => p.priorityCode) || [];
    const hasExplicitAccess = retailer.accessibleCatalogs.some((catId: any) => catId.toString() === catalog._id.toString());
    const hasPriorityAccess = catalog.accessLevel === "GENERAL" || retailerPriorityCodes.includes(catalog.accessLevel);
    
    if (!hasExplicitAccess && !hasPriorityAccess) {
      return NextResponse.json({ error: "You do not have access to this catalog" }, { status: 403 });
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
      catalog: {
        _id: catalog._id,
        catalogName: catalog.catalogName,
        catalogCode: catalog.catalogCode,
        accessLevel: catalog.accessLevel,
        isActive: catalog.isActive,
      },
      retailer: {
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        phoneNumber: retailer.phoneNumber,
        address: retailer.address,
      },
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
        sizes: product.sizes,
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 