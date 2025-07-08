import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Catalog from "@/models/Catalog";
import Retailer from "@/models/Retailer";
import mongoose from "mongoose";

export const PUT = requireAdminAuth(async (request: NextRequest, context: any) => {
  try {
    await dbConnect();
    // Extract catalogId from context.params or fallback to URL path
    let catalogId;
    if (context?.params?.catalogId) {
      catalogId = context.params.catalogId;
    } else {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      catalogId = pathParts[pathParts.length - 1];
    }
    if (!catalogId) {
      return NextResponse.json({ error: "Catalog ID is required" }, { status: 400 });
    }
    const body = await request.json();
    const catalog = await Catalog.findById(catalogId);
    if (!catalog) {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
    catalog.catalogName = body.catalogName;
    catalog.catalogCode = body.catalogCode;
    catalog.accessLevel = body.accessLevel;
    catalog.isActive = body.isActive;
    // Map products to expected structure
    catalog.products = (body.products || []).map((p: any) => ({
      productId: new mongoose.Types.ObjectId(p.productId),
      isActive: p.isActive !== undefined ? p.isActive : true
    }));
    await catalog.save();
    
    // Update catalog access for all retailers after updating a catalog
    await updateCatalogAccessForAllRetailers();
    
    return NextResponse.json({ success: true, catalog });
  } catch (error) {
    console.error("Catalog update error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
});

// Function to update catalog access for all retailers
async function updateCatalogAccessForAllRetailers(): Promise<void> {
  try {
    // Get all active retailers with their priorities populated
    const retailers = await Retailer.find({ isActive: true }).populate("priorities");
    
    // Get all active catalogs
    const catalogs = await Catalog.find({ isActive: true });
    
    // Create a map of priority codes to catalog IDs for faster lookup
    const priorityToCatalogsMap = new Map<string, string[]>();
    
    // Pre-process catalogs by access level
    for (const catalog of catalogs) {
      const accessLevel = catalog.accessLevel;
      if (!priorityToCatalogsMap.has(accessLevel)) {
        priorityToCatalogsMap.set(accessLevel, []);
      }
      priorityToCatalogsMap.get(accessLevel)!.push(catalog._id.toString());
    }
    
    for (const retailer of retailers) {
      const accessibleCatalogs: string[] = [];
      const retailerPriorities = retailer.priorities || [];
      
      if (retailerPriorities.length === 0) {
        continue;
      }
      
      const priorityCodes = retailerPriorities.map((p: any) => p.priorityCode);

      // Add catalogs for each priority level
      for (const priorityCode of priorityCodes) {
        // Get catalogs that match this priority level
        const priorityCatalogs = priorityToCatalogsMap.get(priorityCode) || [];
        accessibleCatalogs.push(...priorityCatalogs);
        // Also add GENERAL catalogs (accessible to everyone)
        const generalCatalogs = priorityToCatalogsMap.get("GENERAL") || [];
        accessibleCatalogs.push(...generalCatalogs);
      }

      // Remove duplicates
      const uniqueCatalogs = [...new Set(accessibleCatalogs)];

      // Update retailer's accessible catalogs
      await Retailer.findByIdAndUpdate(retailer._id, {
        accessibleCatalogs: uniqueCatalogs,
        lastSyncedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error updating catalog access:", error);
  }
}

export const DELETE = requireAdminAuth(async (request: NextRequest, { params }: { params: Promise<{ catalogId: string }> }) => {
  try {
    await dbConnect();
    const { catalogId } = await params;
    const catalog = await Catalog.findById(catalogId);
    if (!catalog) {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
    await catalog.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Catalog delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}); 