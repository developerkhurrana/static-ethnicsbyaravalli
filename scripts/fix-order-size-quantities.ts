import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local first, then .env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");

dotenv.config({ path: envLocalPath });
dotenv.config({ path: envPath, override: false });

import dbConnect from "../lib/mongodb";
import Order from "../models/Order";

async function fixOrderSizeQuantities() {
  try {
    await dbConnect();

    // Find all orders that don't have sizeQuantities at the root level
    const orders = await Order.find({});

    let updatedCount = 0;
    let skippedCount = 0;

    for (const order of orders) {
      // Check if order already has sizeQuantities at root level
      if (order.sizeQuantities && Object.keys(order.sizeQuantities).length > 0) {
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