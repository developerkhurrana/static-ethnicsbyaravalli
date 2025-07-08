import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Retailer from "@/models/Retailer";
import Catalog from "@/models/Catalog";

export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    await dbConnect();
    
    console.log('--- Starting manual catalog access update ---');
    
    // Get all active retailers with their priorities populated
    const retailers = await Retailer.find({ isActive: true }).populate("priorities");
    console.log(`Found ${retailers.length} active retailers`);
    
    // Get all active catalogs
    const catalogs = await Catalog.find({ isActive: true });
    console.log(`Found ${catalogs.length} active catalogs`);
    
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
    
    console.log('Catalog access levels found:', Array.from(priorityToCatalogsMap.keys()));

    let updatedCount = 0;
    let skippedCount = 0;
    const updateResults: Array<{
      retailerId: string;
      phoneNumber: string;
      businessName: string;
      priorities: string[];
      accessibleCatalogs: string[];
      status: 'updated' | 'skipped';
    }> = [];
    
    for (const retailer of retailers) {
      const accessibleCatalogs: string[] = [];
      const retailerPriorities = retailer.priorities || [];
      
      if (retailerPriorities.length === 0) {
        console.log(`Retailer ${retailer.phoneNumber} has no priorities assigned - skipping`);
        skippedCount++;
        updateResults.push({
          retailerId: retailer._id.toString(),
          phoneNumber: retailer.phoneNumber,
          businessName: retailer.businessName,
          priorities: [],
          accessibleCatalogs: [],
          status: 'skipped'
        });
        continue;
      }
      
      const priorityCodes = retailerPriorities.map((p: any) => p.priorityCode);
      console.log(`Retailer ${retailer.phoneNumber} has priorities:`, priorityCodes);

      // Add catalogs for each priority level
      for (const priorityCode of priorityCodes) {
        // Get catalogs that match this priority level
        const priorityCatalogs = priorityToCatalogsMap.get(priorityCode) || [];
        accessibleCatalogs.push(...priorityCatalogs);
        
        // Also add GENERAL catalogs (accessible to everyone)
        const generalCatalogs = priorityToCatalogsMap.get("GENERAL") || [];
        accessibleCatalogs.push(...generalCatalogs);
        
        console.log(`  Priority ${priorityCode}: Found ${priorityCatalogs.length} catalogs + ${generalCatalogs.length} general catalogs`);
      }

      // Remove duplicates
      const uniqueCatalogs = [...new Set(accessibleCatalogs)];
      console.log(`  Total unique catalogs for ${retailer.phoneNumber}: ${uniqueCatalogs.length}`);

      // Update retailer's accessible catalogs
      await Retailer.findByIdAndUpdate(retailer._id, {
        accessibleCatalogs: uniqueCatalogs,
        lastSyncedAt: new Date(),
      });
      
      updatedCount++;
      updateResults.push({
        retailerId: retailer._id.toString(),
        phoneNumber: retailer.phoneNumber,
        businessName: retailer.businessName,
        priorities: priorityCodes,
        accessibleCatalogs: uniqueCatalogs,
        status: 'updated'
      });
    }
    
    console.log(`--- Completed catalog access update: Updated ${updatedCount} retailers, Skipped ${skippedCount} retailers ---`);

    return NextResponse.json({
      success: true,
      message: `Successfully updated catalog access for ${updatedCount} retailers`,
      summary: {
        totalRetailers: retailers.length,
        updated: updatedCount,
        skipped: skippedCount,
        totalCatalogs: catalogs.length,
        accessLevels: Array.from(priorityToCatalogsMap.keys())
      },
      results: updateResults
    });
    
  } catch (error) {
    console.error("Catalog access update error:", error);
    return NextResponse.json(
      { 
        error: "Failed to update catalog access",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}); 