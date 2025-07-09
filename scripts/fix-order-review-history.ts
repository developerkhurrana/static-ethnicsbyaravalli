import dbConnect from "../lib/mongodb";
import Order from "../models/Order";
import PurchaseOrder from "../models/PurchaseOrder";

async function deleteAllOrdersAndPOs() {
  try {
    await dbConnect();
    const orderResult = await Order.deleteMany({});
    const poResult = await PurchaseOrder.deleteMany({});
    console.log(`Deleted ${orderResult.deletedCount} orders and ${poResult.deletedCount} purchase orders.`);
  } catch (error) {
    console.error("Error deleting orders and POs:", error);
  } finally {
    process.exit(0);
  }
}

deleteAllOrdersAndPOs(); 