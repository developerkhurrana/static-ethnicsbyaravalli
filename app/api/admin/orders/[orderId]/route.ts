import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";
import Order from "@/models/Order";

export const GET = requireAdminAuth(async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  ensureModelsLoaded();
  await dbConnect();

  const { orderId } = await params;
  const order = await Order.findById(orderId)
    .populate("retailerInfo.retailerId", "businessName contactPerson phoneNumber")
    .populate("items.productId", "itemCode itemName color fabric pricePerPc pricePerSet images");

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
});

export const DELETE = requireAdminAuth(async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  ensureModelsLoaded();
  await dbConnect();

  const { orderId } = await params;
  const order = await Order.findById(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  await Order.findByIdAndDelete(orderId);
  return NextResponse.json({ success: true, message: "Order deleted successfully" });
});

export const PATCH = requireAdminAuth(async (
  request: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  await dbConnect();
  const { orderId } = await params;
  const body = await request.json();
  const { isGSTApplicable } = body;

  const order = await Order.findById(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (typeof isGSTApplicable === "boolean") {
    order.isGSTApplicable = isGSTApplicable;
    // Recalculate GST and totals
    const totalAmountBeforeGST = order.orderSummary.totalAmountBeforeGST;
    const gstRate = isGSTApplicable ? 18 : 0;
    const gstAmount = isGSTApplicable ? Math.round(totalAmountBeforeGST * 0.18) : 0;
    const totalAmountAfterGST = totalAmountBeforeGST + gstAmount;
    order.orderSummary.gstAmount = gstAmount;
    order.orderSummary.totalAmountAfterGST = totalAmountAfterGST;
    await order.save();
  }

  return NextResponse.json({ success: true, order });
}); 