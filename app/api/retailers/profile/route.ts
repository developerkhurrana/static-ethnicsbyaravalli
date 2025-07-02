import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/auth";
import dbConnect from "../../../../lib/mongodb";
import Retailer from "../../../../models/Retailer";

async function handler(request: NextRequest, user: any) {
  try {
    await dbConnect();

    const retailer = await Retailer.findById(user.retailerId)
      .populate("accessibleCatalogs")
      .select("-__v");

    if (!retailer) {
      return NextResponse.json(
        { error: "Retailer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      retailer: {
        id: retailer._id,
        phoneNumber: retailer.phoneNumber,
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        email: retailer.email,
        address: retailer.address,
        priority: retailer.priority,
        gstNumber: retailer.gstNumber,
        accessibleCatalogs: retailer.accessibleCatalogs,
        lastSyncedAt: retailer.lastSyncedAt,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handler);
