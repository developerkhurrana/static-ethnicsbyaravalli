import { NextRequest, NextResponse } from "next/server";
import { requireAuth, JWTPayload } from "../../../lib/auth";
import dbConnect from "../../../lib/mongodb";
import Order from "../../../models/Order";
import Retailer from "../../../models/Retailer";
import Product from "../../../models/Product";

// Create order
async function createOrder(request: NextRequest, user: JWTPayload) {
  try {
    const { items, notes } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Get retailer info
    const retailer = await Retailer.findById(user.retailerId);
    if (!retailer) {
      return NextResponse.json(
        { error: "Retailer not found" },
        { status: 404 }
      );
    }

    // Validate and get product details
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found or inactive` },
          { status: 400 }
        );
      }

      orderItems.push({
        productId: product._id,
        itemCode: product.itemCode,
        itemName: product.itemName,
        color: product.color,
        fabric: product.fabric,
        pricePerPc: product.pricePerPc,
        pricePerSet: product.pricePerSet,
        quantityPcs: item.quantityPcs || 0,
        quantitySets: item.quantitySets || 0,
        totalPcs: (item.quantityPcs || 0) + (item.quantitySets || 0) * 5,
        totalAmount:
          (item.quantityPcs || 0) * product.pricePerPc +
          (item.quantitySets || 0) * product.pricePerSet,
      });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = await Order.create({
      orderNumber,
      retailerInfo: {
        retailerId: retailer._id,
        phoneNumber: retailer.phoneNumber,
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        address: retailer.address,
      },
      items: orderItems,
      notes: notes || "",
      status: "DRAFT",
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        orderSummary: order.orderSummary,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// List orders
async function listOrders(request: NextRequest, user: JWTPayload) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const filter: any = { "retailerInfo.retailerId": user.retailerId };
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("orderNumber status orderSummary createdAt submittedAt");

    const total = await Order.countDocuments(filter);

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handler(request: NextRequest, user: JWTPayload) {
  if (request.method === "POST") {
    return createOrder(request, user);
  } else if (request.method === "GET") {
    return listOrders(request, user);
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const POST = requireAuth(createOrder);
export const GET = requireAuth(listOrders);
