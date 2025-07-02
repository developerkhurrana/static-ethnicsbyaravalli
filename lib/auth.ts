import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./mongodb";
import Retailer from "../models/Retailer";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

export interface JWTPayload {
  retailerId: string;
  phoneNumber: string;
  businessName: string;
  priority: string;
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function authenticateRetailer(phoneNumber: string): Promise<{
  success: boolean;
  retailer?: any;
  token?: string;
  error?: string;
}> {
  try {
    await dbConnect();

    const retailer = await Retailer.findOne({
      phoneNumber,
      isActive: true,
    }).populate("accessibleCatalogs");

    if (!retailer) {
      return {
        success: false,
        error: "Retailer not found or inactive",
      };
    }

    const payload: JWTPayload = {
      retailerId: retailer._id.toString(),
      phoneNumber: retailer.phoneNumber,
      businessName: retailer.businessName,
      priority: retailer.priority,
    };

    const token = await generateToken(payload);

    return {
      success: true,
      retailer,
      token,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      error: "Authentication failed",
    };
  }
}

export async function getAuthUser(
  req: NextRequest
): Promise<JWTPayload | null> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload) {
      return null;
    }

    // Verify retailer still exists and is active
    await dbConnect();
    const retailer = await Retailer.findById(payload.retailerId).select(
      "isActive"
    );

    if (!retailer || !retailer.isActive) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return null;
  }
}

export function requireAuth(handler: Function) {
  return async (req: NextRequest) => {
    const user = await getAuthUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    return handler(req, user);
  };
}

export function requireAdmin(handler: Function) {
  return async (req: NextRequest) => {
    // For admin authentication, you can implement a separate admin token system
    // or use a simple admin password check for now
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Simple admin token check - in production, use proper admin authentication
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Invalid admin token" },
        { status: 401 }
      );
    }

    return handler(req);
  };
}
