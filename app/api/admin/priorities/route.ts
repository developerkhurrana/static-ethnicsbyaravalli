import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Priority from "@/models/Priority";
import Retailer from "@/models/Retailer";

export const GET = requireAdminAuth(async () => {
  try {
    await dbConnect();

    const priorities = await Priority.find({}).sort({ priorityCode: 1 });

    // Get retailer count for each priority
    const prioritiesWithRetailerCount = await Promise.all(
      priorities.map(async (priority) => {
        const retailerCount = await Retailer.countDocuments({ priority: priority._id });
        return {
          _id: priority._id,
          priorityCode: priority.priorityCode,
          priorityName: priority.priorityName,
          description: priority.description,
          discountPercentage: priority.discountPercentage,
          isActive: priority.isActive,
          retailerCount,
          createdAt: priority.createdAt,
          updatedAt: priority.updatedAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      priorities: prioritiesWithRetailerCount,
    });
  } catch (error) {
    console.error("Admin priorities API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    await dbConnect();

    const body = await request.json();
    const { priorityCode, priorityName, description, discountPercentage } = body;

    // Check if priority code already exists
    const existingPriority = await Priority.findOne({ priorityCode: priorityCode.toUpperCase() });
    if (existingPriority) {
      return NextResponse.json(
        { error: "Priority code already exists" },
        { status: 400 }
      );
    }

    const priority = new Priority({
      priorityCode: priorityCode.toUpperCase(),
      priorityName,
      description,
      discountPercentage: discountPercentage || 0,
    });

    await priority.save();

    return NextResponse.json({
      success: true,
      priority: {
        _id: priority._id,
        priorityCode: priority.priorityCode,
        priorityName: priority.priorityName,
        description: priority.description,
        discountPercentage: priority.discountPercentage,
        isActive: priority.isActive,
        createdAt: priority.createdAt,
        updatedAt: priority.updatedAt,
      },
      message: "Priority created successfully",
    });
  } catch (error) {
    console.error("Admin priorities API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 