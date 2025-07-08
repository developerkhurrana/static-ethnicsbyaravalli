import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";
import Order from "@/models/Order";
import Retailer from "@/models/Retailer";
import Product from "@/models/Product";

export const POST = requireAdminAuth(async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  // Helper function to convert productId to string consistently
  const getProductIdString = (productId: any): string => {
    if (typeof productId === 'string') {
      return productId;
    } else if (productId && typeof productId === 'object' && productId !== null) {
      if ('_id' in productId) {
      // Handle populated product object
        return String(productId._id);
      } else if ('toString' in productId && typeof productId.toString === 'function') {
        // Handle MongoDB ObjectId
        return productId.toString();
      } else {
        // Handle other object types
        return String(productId);
      }
    } else {
      // Handle ObjectId or other types
      return String(productId);
    }
  };

  try {
    // Ensure all models are loaded
    ensureModelsLoaded();
    
    const { orderId } = await params;
    const { action, notes, sizeQuantities, newStatus } = await request.json();

    // Debug: Log what we received
    console.log("Review API received sizeQuantities:", sizeQuantities);
    console.log("Review API received orderId:", orderId);

    // Connect to database
    await dbConnect();

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Validate sizeQuantities: sum of all sizes must be at least total pieces for each item
    if (sizeQuantities && Object.keys(sizeQuantities).length > 0) {
      console.log("Validating sizeQuantities with keys:", Object.keys(sizeQuantities));
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const productIdStr = getProductIdString(item.productId);
        const itemKey = `${productIdStr}-${i}`;
        console.log(`Item ${i}: productId=${item.productId}, productIdStr=${productIdStr}, itemKey=${itemKey}`);
        const sizes = sizeQuantities[itemKey];
        const totalPcs = Object.values(sizes || {}).reduce((sum: number, qty) => sum + Number(qty), 0);
        const expected = item.quantitySets * 5;
        if (totalPcs < expected) {
          return NextResponse.json({ error: `Item ${item.itemName} must have at least ${expected} pieces (currently ${totalPcs})` }, { status: 400 });
        }
      }
    }

    // Update order with review information
    const updateData: any = {
      status: newStatus,
      reviewedAt: new Date(),
      notes: notes || order.notes,
      sizeQuantities: sizeQuantities // Always update root-level sizeQuantities
    };

    // If size quantities were modified, update the items
    if (sizeQuantities && Object.keys(sizeQuantities).length > 0) {
      console.log("Updating items with sizeQuantities keys:", Object.keys(sizeQuantities));
      const updatedItems = order.items.map((item: any, index: number) => {
        const productIdStr = getProductIdString(item.productId);
        const itemKey = `${productIdStr}-${index}`;
        console.log(`Updating item ${index}: productId=${item.productId}, productIdStr=${productIdStr}, itemKey=${itemKey}`);
        const newSizes = sizeQuantities[itemKey];
        
        if (newSizes) {
          console.log(`Found sizes for ${itemKey}:`, newSizes);
          const totalPcs = Object.values(newSizes).reduce((sum: number, qty) => sum + Number(qty), 0);
          const totalSets = Math.floor(totalPcs / 5);
          const totalAmount = totalSets * item.pricePerSet;
          
          return {
            ...item,
            quantitySets: totalSets,
            totalPcs,
            totalAmount,
            sizeQuantities: newSizes // Store the size breakdown
          };
        }
        console.log(`No sizes found for ${itemKey}`);
        return item;
      });
      
      updateData.items = updatedItems;
    }

    // Add review history
    const reviewEntry = {
      action,
      notes,
      reviewedAt: new Date(),
      previousStatus: order.status,
      newStatus,
      sizeQuantities: sizeQuantities || null
    };

    updateData.reviewHistory = [
      ...(order.reviewHistory || []),
      reviewEntry
    ];

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );

    console.log(`Order ${orderId} reviewed:`, {
      action,
      newStatus,
      hasSizeChanges: !!sizeQuantities,
      notes: notes ? notes.substring(0, 100) + "..." : "No notes"
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: `Order ${action === 'approve' ? 'approved' : action === 'request_changes' ? 'sent for changes' : 'rejected'} successfully`
    });

  } catch (error) {
    console.error("Error reviewing order:", error);
    return NextResponse.json(
      { error: "Failed to review order" },
      { status: 500 }
    );
  }
}); 