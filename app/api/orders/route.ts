import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Retailer from "@/models/Retailer";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { catalogId, retailerPhone, items, summary, isGSTApplicable } = body;

    // Log the phone number received
    console.log('Order API received phone:', retailerPhone);

    // Validate retailer by phone number (trim to avoid space issues)
    const retailer = await Retailer.findOne({ phoneNumber: retailerPhone.trim() });
    console.log('Retailer found:', retailer);
    if (!retailer || retailer.isActive === false) {
      return NextResponse.json(
        { error: "Invalid retailer" },
        { status: 400 }
      );
    }

    // Validate items and calculate totals
    const orderItems = [];
    let calculatedTotalPcs = 0;
    let calculatedTotalSets = 0;
    let calculatedTotalAmount = 0;
    const orderLevelSizeQuantities: { [key: string]: { [size: string]: number } } = {};

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Product ${item.itemName} not found or inactive` },
          { status: 400 }
        );
      }

      // Calculate size quantities: 1 piece per size per set
      const sizeQuantities = {
        S: item.sets,
        M: item.sets,
        L: item.sets,
        XL: item.sets,
        XXL: item.sets
      };

      // Create item key for order-level size quantities
      const itemKey = `${product._id}-${i}`;
      orderLevelSizeQuantities[itemKey] = sizeQuantities;

      const orderItem = {
        productId: product._id,
        itemCode: product.itemCode,
        itemName: product.itemName,
        color: product.color,
        fabric: product.fabric,
        pricePerPc: product.pricePerPc,
        pricePerSet: product.pricePerSet,
        quantityPcs: 0, // All quantities are in sets
        quantitySets: item.sets,
        totalPcs: item.pieces,
        totalAmount: item.totalPrice,
        sizeQuantities: sizeQuantities // Add size quantities to each item
      };

      orderItems.push(orderItem);
      calculatedTotalPcs += orderItem.totalPcs;
      calculatedTotalSets += orderItem.quantitySets;
      calculatedTotalAmount += orderItem.totalAmount;
    }

    // Generate order number
    // const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const date = new Date();
    const ymd = date.toISOString().slice(2,10).replace(/-/g,''); // e.g. "240704" for July 4, 2024
    const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
    const orderNumber = `EBA-${ymd}-${rand}`;

    // Use summary from frontend or calculate if not provided
    const totalAmount = summary?.totalAmount || calculatedTotalAmount;

    // Create order
    const order = new Order({
      orderNumber,
      catalogId: catalogId,
      retailerInfo: {
        retailerId: retailer._id,
        phoneNumber: retailer.phoneNumber,
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        address: {
          street: retailer.address?.street || "Not provided",
          city: retailer.address?.city || "Not provided",
          state: retailer.address?.state || "Not provided",
          pincode: retailer.address?.pincode || "Not provided",
          country: retailer.address?.country || "India",
        },
      },
      items: orderItems,
      orderSummary: {
        totalPcs: calculatedTotalPcs,
        totalSets: calculatedTotalSets,
        totalAmountBeforeGST: totalAmount,
        gstAmount: isGSTApplicable === false ? 0 : 0, // You can add GST logic if needed
        totalAmountAfterGST: totalAmount, // If GST is needed, add it here
      },
      isGSTApplicable: isGSTApplicable !== false,
      status: "SUBMITTED",
      submittedAt: new Date(),
      sizeQuantities: orderLevelSizeQuantities // Add order-level size quantities
    });

    await order.save();

    console.log('Order submitted successfully for retailer:', {
      retailerId: retailer._id,
      phoneNumber: retailer.phoneNumber,
      businessName: retailer.businessName,
      contactPerson: retailer.contactPerson,
      city: retailer.address?.city,
      sizeQuantities: orderLevelSizeQuantities
    });

    return NextResponse.json({
      success: true,
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalAmount: totalAmount,
      },
      message: "Order submitted successfully",
    });
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 