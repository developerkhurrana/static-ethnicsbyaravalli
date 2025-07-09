export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";
import Order from "@/models/Order";
import PurchaseOrder from "@/models/PurchaseOrder";
import Retailer from "@/models/Retailer";
import Product from "@/models/Product";


export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    // Ensure all models are loaded
    ensureModelsLoaded();
    
    await dbConnect();

    const { orderId, generatedBy } = await request.json();

    // Find the order
    const order = await Order.findById(orderId).populate("retailerInfo.retailerId");
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Order must be approved before generating PO" },
        { status: 400 }
      );
    }

    // Check if PO already exists
    const existingPO = await PurchaseOrder.findOne({ orderId });
    if (existingPO) {
      return NextResponse.json(
        { error: "Purchase order already exists for this order" },
        { status: 400 }
      );
    }

    // Generate PO number
    // const poNumber = `PO-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const date = new Date();
    const ymd = date.toISOString().slice(2,10).replace(/-/g,''); // e.g. "240704" for July 4, 2024
    const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
    const poNumber = `EBA-${ymd}-${rand}`;

    // Defensive: Check orderSummary exists and has required fields
    if (!order.orderSummary || typeof order.orderSummary.totalAmountBeforeGST !== 'number') {
      return NextResponse.json(
        { error: "Order summary is missing or malformed. Cannot generate PO." },
        { status: 400 }
      );
    }

    // Calculate totals (no GST)
    const totalAmountBeforeGST = order.orderSummary.totalAmountBeforeGST ?? 0;
    const gstRate = 0;
    const gstAmount = 0;
    const totalAmountAfterGST = totalAmountBeforeGST;

    // Create purchase order
    const purchaseOrder = new PurchaseOrder({
      poNumber,
      orderId: order._id,
      retailerInfo: {
        phoneNumber: order.retailerInfo.phoneNumber,
        businessName: order.retailerInfo.businessName,
        contactPerson: order.retailerInfo.contactPerson,
        address: order.retailerInfo.address,
      },
      items: order.items,
      poSummary: {
        totalPcs: order.orderSummary.totalPcs ?? 0,
        totalSets: order.orderSummary.totalSets ?? 0,
        totalAmountBeforeGST,
        gstRate,
        gstAmount,
        totalAmountAfterGST,
      },
      terms: {
        paymentTerms: "50% advance, 50% before delivery",
        deliveryTerms: "15-20 days from order confirmation",
        warranty: "No warranty on ethnic wear",
      },

      status: "GENERATED",
      generatedBy,
    });

    await purchaseOrder.save();

    // Update order status
    order.status = "PO_GENERATED";
    await order.save();

    // Generate PDF (temporarily disabled due to fontkit dependency issues)
    // const pdfData = {
    //   poNumber: purchaseOrder.poNumber,
    //   orderNumber: order.orderNumber,
    //   retailerInfo: purchaseOrder.retailerInfo,
    //   items: purchaseOrder.items,
    //   poSummary: purchaseOrder.poSummary,
    //   terms: purchaseOrder.terms,
    //   generatedBy: purchaseOrder.generatedBy,
    //   generatedAt: purchaseOrder.createdAt,
    // };
    // const pdfBuffer = generatePurchaseOrderPDF(pdfData);

    return NextResponse.json({
      success: true,
      purchaseOrder: {
        _id: purchaseOrder._id,
        poNumber: purchaseOrder.poNumber,
        orderId: purchaseOrder.orderId,
        status: purchaseOrder.status,
        generatedBy: purchaseOrder.generatedBy,
        createdAt: purchaseOrder.createdAt,
      },
      message: "Purchase order generated successfully",
    });
  } catch (error) {
    console.error("Generate PO API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 