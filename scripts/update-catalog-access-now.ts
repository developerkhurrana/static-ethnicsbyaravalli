import dbConnect from "../lib/mongodb";
import Retailer from "../models/Retailer";
import Catalog from "../models/Catalog";
import "../lib/models";

async function updateCatalogAccessNow() {
  try {
    await dbConnect();
    console.log("Connected to database");
    
    console.log('--- Starting catalog access update ---');
    
    // Get all retailers with their priorities populated (including inactive ones for now)
    const retailers = await Retailer.find({}).populate("priorities");
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
    
    for (const retailer of retailers) {
      const accessibleCatalogs: string[] = [];
      const retailerPriorities = retailer.priorities || [];
      
      if (retailerPriorities.length === 0) {
        console.log(`Retailer ${retailer.phoneNumber} has no priorities assigned - skipping`);
        skippedCount++;
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
    }
    
    console.log(`--- Completed catalog access update: Updated ${updatedCount} retailers, Skipped ${skippedCount} retailers ---`);
    
    // Show summary
    console.log("\n=== SUMMARY ===");
    console.log(`Total retailers processed: ${retailers.length}`);
    console.log(`Retailers updated: ${updatedCount}`);
    console.log(`Retailers skipped: ${skippedCount}`);
    console.log(`Total catalogs: ${catalogs.length}`);
    
    // Show some examples
    console.log("\n=== EXAMPLES ===");
    const sampleRetailers = await Retailer.find({})
      .populate("priorities")
      .populate("accessibleCatalogs", "catalogName catalogCode accessLevel")
      .limit(5);
      
    for (const retailer of sampleRetailers) {
      console.log(`\n${retailer.businessName} (${retailer.phoneNumber})`);
      console.log(`  Priorities: ${retailer.priorities?.map((p: any) => p.priorityCode).join(", ") || "None"}`);
      console.log(`  Accessible Catalogs: ${retailer.accessibleCatalogs?.length || 0}`);
      if (retailer.accessibleCatalogs && retailer.accessibleCatalogs.length > 0) {
        console.log(`  Catalog codes: ${retailer.accessibleCatalogs.map((cat: any) => cat.catalogCode).join(", ")}`);
      }
    }

  } catch (error) {
    console.error("Update error:", error);
  } finally {
    process.exit(0);
  }
}

updateCatalogAccessNow(); 