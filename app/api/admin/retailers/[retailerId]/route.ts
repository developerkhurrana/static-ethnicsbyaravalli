import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import { ensureModelsLoaded } from "@/lib/models";
import Retailer from "@/models/Retailer";
import Priority from "@/models/Priority";

export const PUT = requireAdminAuth(async (request: NextRequest, { params }: { params: { retailerId: string } }) => {
  try {
    // Ensure all models are loaded
    ensureModelsLoaded();
    
    await dbConnect();
    const { retailerId } = params;
    const body = await request.json();
    const retailer = await Retailer.findById(retailerId);
    if (!retailer) {
      return NextResponse.json({ error: "Retailer not found" }, { status: 404 });
    }
    
    // Update fields
    retailer.phoneNumber = body.phoneNumber;
    retailer.businessName = body.businessName;
    retailer.contactPerson = body.contactPerson;
    retailer.email = body.email;
    retailer.address = body.address;
    retailer.priorities = body.priorities || [];
    retailer.gstNumber = body.gstNumber;
    retailer.accessibleCatalogs = body.accessibleCatalogs;
    retailer.isActive = body.isActive;
    
    await retailer.save();
    
    // Populate the priorities field for the response
    await retailer.populate("priorities", "priorityCode priorityName discountPercentage isActive");
    
    return NextResponse.json({ success: true, retailer });
  } catch (error) {
    console.error("Retailer update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const DELETE = requireAdminAuth(async (request: NextRequest, { params }: { params: { retailerId: string } }) => {
  try {
    await dbConnect();
    const { retailerId } = params;
    const retailer = await Retailer.findById(retailerId);
    if (!retailer) {
      return NextResponse.json({ error: "Retailer not found" }, { status: 404 });
    }
    await retailer.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Retailer delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}); 