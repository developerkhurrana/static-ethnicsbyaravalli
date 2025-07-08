import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_PASS = process.env.ADMIN_PASS!;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

if (!ADMIN_PASS) {
  throw new Error("Please define the ADMIN_PASS environment variable");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASS) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    // Generate admin JWT token
    const token = jwt.sign(
      {
        role: "admin",
        timestamp: Date.now(),
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({
      success: true,
      token,
      message: "Admin login successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 