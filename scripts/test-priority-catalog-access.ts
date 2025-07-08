import dbConnect from "../lib/mongodb";
import Retailer from "../models/Retailer";
import Catalog from "../models/Catalog";
import Priority from "../models/Priority";

async function testPriorityCatalogAccess() {
  try {
    await dbConnect();

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
    const retailers = await Retailer.find({ isActive: true }).populate("priorities");
    console.log("\n=== RETAILERS ===");
    
    for (const retailer of retailers) {
      console.log(`\n${retailer.businessName} (${retailer.phoneNumber})`);
      console.log(`  Priorities: ${retailer.priorities?.map((p: any) => p.priorityCode).join(", ") || "None"}`);
      console.log(`  Explicit Accessible Catalogs: ${retailer.accessibleCatalogs?.length || 0}`);
      
      // Calculate what catalogs they should have access to based on priorities
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
      console.log(`  Priority-based access: ${uniqueShouldHave.join(", ")}`);
      
      // Test the API endpoint logic
      const retailerPriorityCodes = retailer.priorities?.map((p: any) => p.priorityCode) || [];
      const accessibleCatalogs = catalogs.filter(catalog => 
        catalog.accessLevel === "GENERAL" ||
        retailerPriorityCodes.includes(catalog.accessLevel) ||
        retailer.accessibleCatalogs.some((catId: any) => catId.toString() === catalog._id.toString())
      );
      
      console.log(`  Total accessible catalogs (API logic): ${accessibleCatalogs.length}`);
      console.log(`  Accessible catalog codes: ${accessibleCatalogs.map(c => c.catalogCode).join(", ")}`);
      
      // Check if there's a mismatch
      if (retailer.accessibleCatalogs?.length === 0 && accessibleCatalogs.length > 0) {
        console.log(`  ✅ PRIORITY ACCESS WORKING: Retailer has 0 explicit catalogs but can access ${accessibleCatalogs.length} catalogs via priority`);
      } else if (retailer.accessibleCatalogs?.length > 0) {
        console.log(`  ℹ️  Retailer has explicit catalog access: ${retailer.accessibleCatalogs.length} catalogs`);
      } else {
        console.log(`  ⚠️  Retailer has no access to any catalogs`);
      }
    }

    console.log("\n=== SUMMARY ===");
    console.log(`Total Priorities: ${priorities.length}`);
    console.log(`Total Catalogs: ${catalogs.length}`);
    console.log(`Total Retailers: ${retailers.length}`);
    
    const retailersWithPriorities = retailers.filter(r => r.priorities && r.priorities.length > 0);
    console.log(`Retailers with priorities: ${retailersWithPriorities.length}`);
    
    const retailersWithoutExplicitAccess = retailers.filter(r => !r.accessibleCatalogs || r.accessibleCatalogs.length === 0);
    console.log(`Retailers without explicit catalog access: ${retailersWithoutExplicitAccess.length}`);
    
    const retailersWithPriorityAccess = retailersWithoutExplicitAccess.filter(r => {
      const retailerPriorityCodes = r.priorities?.map((p: any) => p.priorityCode) || [];
      return catalogs.some(c => 
        c.accessLevel === "GENERAL" || 
        retailerPriorityCodes.includes(c.accessLevel)
      );
    });
    console.log(`Retailers with priority-based access: ${retailersWithPriorityAccess.length}`);

  } catch (error) {
    console.error("Test error:", error);
  } finally {
    process.exit(0);
  }
}

testPriorityCatalogAccess(); 