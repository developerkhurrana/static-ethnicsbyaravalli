import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";

// Import referenced models first to ensure they're registered
import Retailer from "@/models/Retailer";
import Product from "@/models/Product";
import Order from "@/models/Order";

export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    // Ensure all models are loaded
    ensureModelsLoaded();
    
    await dbConnect();

    const orders = await Order.find({})
      .populate("retailerInfo.retailerId", "businessName contactPerson phoneNumber")
      .populate("items.productId", "itemCode itemName color fabric pricePerPc pricePerSet images")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders: orders.map(order => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        retailerInfo: {
          retailerId: order.retailerInfo.retailerId,
          businessName: order.retailerInfo.businessName,
          contactPerson: order.retailerInfo.contactPerson,
          phoneNumber: order.retailerInfo.phoneNumber,
          address: order.retailerInfo.address,
        },
        items: order.items.map(item => ({
          productId: item.productId,
          itemCode: item.itemCode,
          itemName: item.itemName,
          color: item.color,
          fabric: item.fabric,
          pricePerPc: item.pricePerPc,
          pricePerSet: item.pricePerSet,
          quantityPcs: item.quantityPcs,
          quantitySets: item.quantitySets,
          totalPcs: item.totalPcs,
          totalAmount: item.totalAmount,
          product: item.productId // This will contain the populated product data including images
        })),
        orderSummary: order.orderSummary,
        status: order.status,
        submittedAt: order.submittedAt,
        reviewedAt: order.reviewedAt,
        approvedAt: order.approvedAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        sizeQuantities: order.sizeQuantities,
        isGSTApplicable: order.isGSTApplicable,
      })),
    });
  } catch (error) {
    console.error("Admin orders API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 