import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { syncRetailersFromSheetsSimple } from "@/lib/google-sheets-simple";

export const POST = requireAdminAuth(async () => {
  try {
    const result = await syncRetailersFromSheetsSimple();

    if (result.success) {
      return NextResponse.json({
        success: true,
        syncedCount: result.synced,
        message: `Successfully synced ${result.synced} retailers with Google Sheets (Simple CSV method)`,
        errors: result.errors.length > 0 ? result.errors : undefined,
      });
    } else {
      return NextResponse.json(
        { 
          error: "Failed to sync with Google Sheets (Simple method)",
          details: result.errors 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Admin retailers sync-simple API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}); 