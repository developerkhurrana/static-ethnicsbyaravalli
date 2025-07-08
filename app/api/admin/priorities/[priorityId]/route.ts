import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import dbConnect from "@/lib/mongodb";
import Priority from "@/models/Priority";
import Retailer from "@/models/Retailer";

export const PATCH = requireAdminAuth(async (
  request: NextRequest,
  { params }: { params: { priorityId: string } }
) => {
  try {
    await dbConnect();

    const { priorityId } = params;
    const body = await request.json();

    const priority = await Priority.findById(priorityId);
    if (!priority) {
      return NextResponse.json(
        { error: "Priority not found" },
        { status: 404 }
      );
    }

    // Update allowed fields
    if (body.isActive !== undefined) {
      priority.isActive = body.isActive;
    }
    if (body.priorityName) {
      priority.priorityName = body.priorityName;
    }
    if (body.description) {
      priority.description = body.description;
    }
    if (body.discountPercentage !== undefined) {
      priority.discountPercentage = body.discountPercentage;
    }

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
      message: "Priority updated successfully",
    });
  } catch (error) {
    console.error("Admin priority update API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export const DELETE = requireAdminAuth(async (
  request: NextRequest,
  { params }: { params: { priorityId: string } }
) => {
  try {
    await dbConnect();

    const { priorityId } = params;

    const priority = await Priority.findById(priorityId);
    if (!priority) {
      return NextResponse.json(
        { error: "Priority not found" },
        { status: 404 }
      );
    }

    // Check if any retailers are using this priority
    const retailerCount = await Retailer.countDocuments({ priority: priorityId });
    
    if (retailerCount > 0) {
      // Find another priority to reassign retailers to
      const alternativePriority = await Priority.findOne({ 
        _id: { $ne: priorityId } 
      }).sort({ priorityCode: 1 });
      
      if (alternativePriority) {
        // Reassign retailers to the alternative priority
        await Retailer.updateMany(
          { priority: priorityId },
          { priority: alternativePriority._id }
        );
      } else {
        // If no other priority exists, deactivate retailers
        await Retailer.updateMany(
          { priority: priorityId },
          { isActive: false }
        );
      }
    }

    // Delete the priority (middleware will handle cascading)
    await priority.deleteOne();

    return NextResponse.json({
      success: true,
      message: `Priority deleted successfully. ${retailerCount} retailer(s) were reassigned.`,
    });
  } catch (error) {
    console.error("Admin priority delete API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 