import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";
import Retailer from "@/models/Retailer";
import Catalog from "@/models/Catalog";
import Priority from "@/models/Priority";

export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    // Ensure all models are loaded
    ensureModelsLoaded();

    await dbConnect();

    const retailers = await Retailer.find({})
      .populate("accessibleCatalogs", "catalogName catalogCode")
      .populate("priorities", "priorityCode priorityName discountPercentage isActive")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      retailers: retailers.map(retailer => ({
        _id: retailer._id,
        phoneNumber: retailer.phoneNumber,
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        email: retailer.email,
        address: retailer.address,
        priorities: retailer.priorities,
        gstNumber: retailer.gstNumber,
        accessibleCatalogs: retailer.accessibleCatalogs.map((cat: any) => ({
          _id: cat._id,
          catalogName: cat.catalogName,
          catalogCode: cat.catalogCode
        })),
        isActive: retailer.isActive,
        sheetRowId: retailer.sheetRowId,
        lastSyncedAt: retailer.lastSyncedAt,
        createdAt: retailer.createdAt,
        updatedAt: retailer.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Admin retailers API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log('Creating retailer with data:', body);
    
    await dbConnect();

    const retailer = new Retailer({
      phoneNumber: body.phoneNumber,
      businessName: body.businessName,
      contactPerson: body.contactPerson,
      email: body.email,
      address: body.address,
      priorities: body.priorities || [],
      gstNumber: body.gstNumber,
      accessibleCatalogs: body.accessibleCatalogs || [],
      isActive: body.isActive !== undefined ? body.isActive : true,
      sheetRowId: body.sheetRowId,
    });

    await retailer.save();

    // Populate the priorities field for the response
    await retailer.populate("priorities", "priorityCode priorityName discountPercentage isActive");

    return NextResponse.json({
      success: true,
      retailer: {
        _id: retailer._id,
        phoneNumber: retailer.phoneNumber,
        businessName: retailer.businessName,
        contactPerson: retailer.contactPerson,
        email: retailer.email,
        address: retailer.address,
        priorities: retailer.priorities,
        gstNumber: retailer.gstNumber,
        accessibleCatalogs: retailer.accessibleCatalogs,
        isActive: retailer.isActive,
        sheetRowId: retailer.sheetRowId,
        lastSyncedAt: retailer.lastSyncedAt,
        createdAt: retailer.createdAt,
        updatedAt: retailer.updatedAt,
      },
    });
  } catch (error) {
    console.error("Admin retailers POST API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}); 