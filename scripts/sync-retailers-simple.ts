import { syncRetailersFromSheetsSimple } from "../lib/google-sheets-simple";

async function syncRetailersSimple() {
  try {
    const result = await syncRetailersFromSheetsSimple();
    
    if (result.success) {
      console.log(`✅ Successfully synced ${result.synced} retailers`);
      if (result.errors.length > 0) {
        console.log("⚠️  Some errors occurred:");
        result.errors.forEach(error => console.log(`  - ${error}`));
      }
    } else {
      console.log("❌ Sync failed:");
      result.errors.forEach(error => console.log(`  - ${error}`));
    }
  } catch (error) {
    console.error("❌ Script error:", error);
  } finally {
    process.exit(0);
  }
}

syncRetailersSimple(); 