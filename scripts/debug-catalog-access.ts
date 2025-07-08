import dbConnect from "../lib/mongodb";
import Retailer from "../models/Retailer";
import Catalog from "../models/Catalog";
import Priority from "../models/Priority";
import mongoose from "mongoose";

async function debugCatalogAccess() {
  try {
    await dbConnect();
    console.log("Connected to database");

    // Print all raw retailer documents from the DB (bypass Mongoose schema)
    const raw = await mongoose.connection.db.collection('retailers').find({}).toArray();
    console.log("\n=== RAW RETAILERS FROM DB ===");
    console.dir(raw, { depth: null });

    // Get all priorities
    const priorities = await Priority.find({ isActive: true });
    console.log("\n=== PRIORITIES ===");
    priorities.forEach(p => {
      console.log(`${p.priorityCode}: ${p.priorityName}`);
    });

    // Get all catalogs
    const catalogs = await Catalog.find({ isActive: true });
    console.log("\n=== CATALOGS ===");
    catalogs.forEach(c => {
      console.log(`${c.catalogCode}: ${c.catalogName} (Access: ${c.accessLevel})`);
    });

    // Get all retailers with their priorities
    const retailers = await Retailer.find({}).populate("priorities");
    console.log("\n=== RETAILERS ===");
    
    for (const retailer of retailers) {
      console.log(`\n${retailer.businessName} (${retailer.phoneNumber})`);
      console.log(`  Priorities: ${retailer.priorities?.map((p: any) => p.priorityCode).join(", ") || "None"}`);
      console.log(`  Accessible Catalogs: ${retailer.accessibleCatalogs?.length || 0}`);
      
      // Calculate what catalogs they should have access to
      const shouldHaveAccess: string[] = [];
      const retailerPriorities = retailer.priorities || [];
      
      for (const priority of retailerPriorities) {
        const priorityCode = (priority as any).priorityCode;
        const matchingCatalogs = catalogs.filter(c => c.accessLevel === priorityCode);
        shouldHaveAccess.push(...matchingCatalogs.map(c => c.catalogCode));
      }
      
      // Add GENERAL catalogs
      const generalCatalogs = catalogs.filter(c => c.accessLevel === "GENERAL");
      shouldHaveAccess.push(...generalCatalogs.map(c => c.catalogCode));
      
      const uniqueShouldHave = [...new Set(shouldHaveAccess)];
      console.log(`  Should have access to: ${uniqueShouldHave.join(", ")}`);
      
      // Check if there's a mismatch
      if (retailer.accessibleCatalogs?.length !== uniqueShouldHave.length) {
        console.log(`  ⚠️  MISMATCH: Has ${retailer.accessibleCatalogs?.length || 0} but should have ${uniqueShouldHave.length}`);
      }
    }

    console.log("\n=== SUMMARY ===");
    console.log(`Total Priorities: ${priorities.length}`);
    console.log(`Total Catalogs: ${catalogs.length}`);
    console.log(`Total Retailers: ${retailers.length}`);
    
    const retailersWithPriorities = retailers.filter(r => r.priorities && r.priorities.length > 0);
    console.log(`Retailers with priorities: ${retailersWithPriorities.length}`);
    
    const retailersWithoutAccess = retailers.filter(r => !r.accessibleCatalogs || r.accessibleCatalogs.length === 0);
    console.log(`Retailers without catalog access: ${retailersWithoutAccess.length}`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

debugCatalogAccess(); 