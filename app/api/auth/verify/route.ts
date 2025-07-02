import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        retailerId: user.retailerId,
        phoneNumber: user.phoneNumber,
        businessName: user.businessName,
        priority: user.priority,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
