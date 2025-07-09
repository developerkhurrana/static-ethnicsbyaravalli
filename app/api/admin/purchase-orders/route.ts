import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";
import PurchaseOrder from "@/models/PurchaseOrder";
import Order from "@/models/Order";
import puppeteer from "puppeteer";

export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const poId = searchParams.get('poId');
    
    if (poId) {
      // Get PO by PO ID
      const purchaseOrder = await PurchaseOrder.findById(poId);
      if (!purchaseOrder) {
        return NextResponse.json({ error: "Purchase order not found" }, { status: 404 });
      }
      return NextResponse.json({ purchaseOrder });
    }
    
    if (orderId) {
      // Get PO by order ID
      const purchaseOrder = await PurchaseOrder.findOne({ orderId });
      if (!purchaseOrder) {
        return NextResponse.json({ error: "Purchase order not found" }, { status: 404 });
      }
      return NextResponse.json({ purchaseOrder });
    }
    
    // Get all purchase orders
    const purchaseOrders = await PurchaseOrder.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ purchaseOrders });
    
  } catch (error) {
    console.error("Get purchase orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const PATCH = requireAdminAuth(async (
  request: NextRequest,
) => {
  ensureModelsLoaded();
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const poId = searchParams.get('poId');
  const action = searchParams.get('action');

  if (!poId) {
    return NextResponse.json({ error: 'Purchase order ID is required' }, { status: 400 });
  }

  if (action === 'mark-sent') {
    const po = await PurchaseOrder.findById(poId);
    if (!po) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }

    po.status = 'SENT';
    po.sentAt = new Date();
    await po.save();

    return NextResponse.json({ success: true, purchaseOrder: po });
  }

  if (action === 'mark-acknowledged') {
    const po = await PurchaseOrder.findById(poId);
    if (!po) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }
    po.status = 'ACKNOWLEDGED';
    po.updatedAt = new Date();
    await po.save();
    return NextResponse.json({ success: true, purchaseOrder: po });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
});

export const DELETE = requireAdminAuth(async (
  request: NextRequest,
) => {
  ensureModelsLoaded();
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const poId = searchParams.get('poId');
  const action = searchParams.get('action');

  if (!poId) {
    return NextResponse.json({ error: 'Purchase order ID is required' }, { status: 400 });
  }

  if (action === 'delete') {
    try {
      // Find the PO to get the orderId
      const po = await PurchaseOrder.findById(poId);
      if (!po) {
        return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
      }

      // Delete the PO
      await PurchaseOrder.findByIdAndDelete(poId);

      // Update the order status back to APPROVED
      await Order.findByIdAndUpdate(po.orderId, { status: 'APPROVED' });

      return NextResponse.json({ 
        success: true, 
        message: 'Purchase order deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting purchase order:', error);
      return NextResponse.json({ 
        error: 'Failed to delete purchase order' 
      }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}); 