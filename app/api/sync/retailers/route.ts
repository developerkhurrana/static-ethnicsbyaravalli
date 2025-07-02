import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { syncRetailersFromSheets } from "../../../../lib/google-sheets";

async function handler(request: NextRequest) {
  try {
    const result = await syncRetailersFromSheets();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Sync failed",
          details: result.errors,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.synced} retailers`,
      synced: result.synced,
      errors: result.errors,
    });
  } catch (error) {
    console.error("Sync API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const POST = requireAdmin(handler);
