import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Catalog from "@/models/Catalog";
import Retailer from "@/models/Retailer";

export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    console.log("Fetching catalogs...");
    const catalogs = await Catalog.find({}).sort({ createdAt: -1 });
    console.log(`Found ${catalogs.length} catalogs`);

    return NextResponse.json({
      success: true,
      catalogs: catalogs.map(catalog => ({
        _id: catalog._id,
        catalogName: catalog.catalogName,
        catalogCode: catalog.catalogCode,
        accessLevel: catalog.accessLevel,
        isActive: catalog.isActive,
        products: catalog.products,
        createdAt: catalog.createdAt,
        updatedAt: catalog.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Admin catalogs API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
});

// Function to update catalog access for all retailers
async function updateCatalogAccessForAllRetailers(): Promise<void> {
  try {
    console.log('--- Updating catalog access after catalog change ---');
    
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
    
    console.log(`--- Updated catalog access for ${retailers.length} retailers ---`);
  } catch (error) {
    console.error("Error updating catalog access:", error);
  }
}

export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    await dbConnect();

    const body = await request.json();
    // Map product IDs to expected object structure
    const products = (body.products || []).map((id: string) => ({ productId: id, isActive: true }));

    const catalog = new Catalog({
      catalogName: body.catalogName,
      catalogCode: body.catalogCode,
      accessLevel: body.accessLevel,
      isActive: body.isActive !== undefined ? body.isActive : true,
      products,
    });

    await catalog.save();

    // Update catalog access for all retailers after creating a new catalog
    await updateCatalogAccessForAllRetailers();

    return NextResponse.json({
      success: true,
      catalog: {
        _id: catalog._id,
        catalogName: catalog.catalogName,
        catalogCode: catalog.catalogCode,
        accessLevel: catalog.accessLevel,
        isActive: catalog.isActive,
        products: catalog.products,
        createdAt: catalog.createdAt,
        updatedAt: catalog.updatedAt,
      },
      message: "Catalog created successfully",
    });
  } catch (error) {
    console.error("Admin catalogs POST API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}); 