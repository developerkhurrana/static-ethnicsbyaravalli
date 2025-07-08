import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Retailer from "@/models/Retailer";
import Catalog from "@/models/Catalog";

export const POST = requireAdminAuth(async () => {
  try {
    await dbConnect();

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
    
    let updatedCount = 0;
    
    for (const retailer of retailers) {
      const accessibleCatalogs: string[] = [];
      const retailerPriorities = retailer.priorities || [];
      
      if (retailerPriorities.length === 0) {
        continue;
      }
      
      const priorityCodes = retailerPriorities.map((p: Record<string, unknown>) => p.priorityCode);

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
      
      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully updated catalog access for ${updatedCount} retailers`,
      updatedCount,
    });
  } catch (error) {
    console.error("Admin retailers update-catalog-access API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 