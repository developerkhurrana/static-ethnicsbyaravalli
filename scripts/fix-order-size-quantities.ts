import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local first, then .env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

console.log("Loading environment variables...");
console.log("Looking for .env.local at:", envLocalPath);
console.log("Looking for .env at:", envPath);

dotenv.config({ path: envLocalPath });
dotenv.config({ path: envPath, override: false });

// Debug: Check if MONGODB_URI is loaded
console.log("MONGODB_URI loaded:", !!process.env.MONGODB_URI);
if (process.env.MONGODB_URI) {
  console.log("MONGODB_URI starts with:", process.env.MONGODB_URI.substring(0, 20) + "...");
}

import dbConnect from "../lib/mongodb";
import Order from "../models/Order";

async function fixOrderSizeQuantities() {
  try {
    await dbConnect();
    console.log("Connected to database");

    // Find all orders that don't have sizeQuantities at the root level
    const orders = await Order.find({});
    console.log(`Found ${orders.length} total orders`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const order of orders) {
      // Check if order already has sizeQuantities at root level
      if (order.sizeQuantities && Object.keys(order.sizeQuantities).length > 0) {
        console.log(`Order ${order.orderNumber} already has sizeQuantities, skipping`);
        skippedCount++;
        continue;
      }

      // Create sizeQuantities from items
      const orderLevelSizeQuantities: { [key: string]: { [size: string]: number } } = {};
      
      order.items.forEach((item: any, index: number) => {
        const productIdStr = String(item.productId);
        const itemKey = `${productIdStr}-${index}`;
        
        // Use item's sizeQuantities if available, otherwise default to equal distribution
        if (item.sizeQuantities && Object.values(item.sizeQuantities).some(qty => Number(qty) > 0)) {
          orderLevelSizeQuantities[itemKey] = { ...item.sizeQuantities };
        } else {
          // Default: equal distribution across sizes
          orderLevelSizeQuantities[itemKey] = {
            S: item.quantitySets,
            M: item.quantitySets,
            L: item.quantitySets,
            XL: item.quantitySets,
            XXL: item.quantitySets
          };
        }
      });

      // Update the order
      await Order.findByIdAndUpdate(order._id, {
        sizeQuantities: orderLevelSizeQuantities
      });

      console.log(`Updated order ${order.orderNumber} with sizeQuantities:`, orderLevelSizeQuantities);
      updatedCount++;
    }

    console.log(`\nMigration completed:`);
    console.log(`- Updated: ${updatedCount} orders`);
    console.log(`- Skipped: ${skippedCount} orders (already had sizeQuantities)`);
    console.log(`- Total: ${orders.length} orders processed`);

  } catch (error) {
    console.error("Error fixing order size quantities:", error);
  } finally {
    process.exit(0);
  }
}

fixOrderSizeQuantities(); 