import dbConnect from "../lib/mongodb";
import Retailer from "../models/Retailer";

async function fixRetailersIsActive() {
  try {
    await dbConnect();
    console.log("Connected to database");
    const result = await Retailer.updateMany({}, { $set: { isActive: true } });
    console.log(`Updated ${result.modifiedCount} retailers to have isActive: true`);
  } catch (error) {
    console.error("Error updating retailers:", error);
  } finally {
    process.exit(0);
  }
}

fixRetailersIsActive(); 