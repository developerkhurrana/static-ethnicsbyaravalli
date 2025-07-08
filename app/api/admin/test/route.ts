import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";

export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    return NextResponse.json({
      success: true,
      message: "Admin authentication is working",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Admin test API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 