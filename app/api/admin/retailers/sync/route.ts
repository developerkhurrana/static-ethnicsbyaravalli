import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { syncRetailersFromSheets } from "@/lib/google-sheets";

export const POST = requireAdminAuth(async () => {
  try {
    const result = await syncRetailersFromSheets();

    if (result.success) {
      return NextResponse.json({
        success: true,
        syncedCount: result.synced,
        message: `Successfully synced ${result.synced} retailers with Google Sheets`,
        errors: result.errors.length > 0 ? result.errors : undefined,
      });
    } else {
      return NextResponse.json(
        { 
          error: "Failed to sync with Google Sheets",
          details: result.errors 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Admin retailers sync API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 