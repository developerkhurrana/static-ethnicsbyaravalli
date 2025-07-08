import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const hasJwtSecret = !!process.env.JWT_SECRET;
    const hasAdminPass = !!process.env.ADMIN_PASS;
    const hasMongoUri = !!process.env.MONGODB_URI;
    
    return NextResponse.json({
      success: true,
      environment: {
        hasJwtSecret,
        hasAdminPass,
        hasMongoUri,
        jwtSecretLength: process.env.JWT_SECRET?.length || 0,
        adminPassLength: process.env.ADMIN_PASS?.length || 0,
        mongoUriLength: process.env.MONGODB_URI?.length || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Env check API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 