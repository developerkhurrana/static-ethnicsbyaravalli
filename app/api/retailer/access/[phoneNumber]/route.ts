import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Retailer from "@/models/Retailer";
import Catalog from "@/models/Catalog";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ phoneNumber: string }> }
) {
  const { phoneNumber } = await params;
  try {
    await dbConnect();



    // Find retailer by phone number with populated priorities
    const retailer = await Retailer.findOne({
      phoneNumber,
      isActive: true,
    }).populate("priorities", "priorityCode priorityName");

    if (!retailer) {
      return NextResponse.json(
        { error: "Retailer not found or inactive" },
        { status: 404 }
      );
    }

    // Get accessible catalogs based on retailer priorities
    const retailerPriorityCodes = retailer.priorities?.map((p: any) => p.priorityCode) || [];
    
    const accessibleCatalogs = await Catalog.find({
      $or: [
        { accessLevel: "GENERAL" },
        { accessLevel: { $in: retailerPriorityCodes } },
        { _id: { $in: retailer.accessibleCatalogs } }
      ],
      isActive: true,
    }).select("catalogName catalogCode accessLevel");

    return NextResponse.json({
      success: true,
      retailer: {
        _id: retailer._id,
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        phoneNumber: retailer.phoneNumber,
        priorities: retailer.priorities,
        accessibleCatalogs: retailer.accessibleCatalogs,
      },
      catalogs: accessibleCatalogs,
    });
  } catch (error) {
    console.error("Retailer access API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 