import dbConnect from "../lib/mongodb";
import Retailer from "../models/Retailer";
import Priority from "../models/Priority";

async function migrateRetailerPriorities() {
  try {
    await dbConnect();
    console.log("Starting retailer priority migration...");

    // Get all priorities
    const priorities = await Priority.find({});
    const priorityMap = new Map();
    
    priorities.forEach(priority => {
      priorityMap.set(priority.priorityCode, priority._id);
    });

    console.log("Priority map created:", Object.fromEntries(priorityMap));

    // Find retailers with string-based priorities
    const retailersWithStringPriorities = await Retailer.find({
      priority: { $type: "string" }
    });

    console.log(`Found ${retailersWithStringPriorities.length} retailers with string-based priorities`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const retailer of retailersWithStringPriorities) {
      const oldPriority = retailer.priority as string;
      const newPriorityId = priorityMap.get(oldPriority);

      if (newPriorityId) {
        retailer.priority = newPriorityId;
        await retailer.save();
        console.log(`Updated retailer ${retailer.businessName} (${retailer.phoneNumber}) from ${oldPriority} to ${newPriorityId}`);
        updatedCount++;
      } else {
        console.log(`Skipped retailer ${retailer.businessName} (${retailer.phoneNumber}) - priority ${oldPriority} not found`);
        skippedCount++;
      }
    }

    console.log(`Migration completed!`);
    console.log(`Updated: ${updatedCount} retailers`);
    console.log(`Skipped: ${skippedCount} retailers`);

    process.exit(0);
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

migrateRetailerPriorities(); 