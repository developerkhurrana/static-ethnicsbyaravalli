import { NextRequest, NextResponse } from "next/server";
import { authenticateRetailer } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Validate phone number format (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    const result = await authenticateRetailer(phoneNumber);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      token: result.token,
      retailer: {
        id: result.retailer._id,
        phoneNumber: result.retailer.phoneNumber,
        businessName: result.retailer.businessName,
        contactPerson: result.retailer.contactPerson,
        priority: result.retailer.priority,
        accessibleCatalogs: result.retailer.accessibleCatalogs,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
