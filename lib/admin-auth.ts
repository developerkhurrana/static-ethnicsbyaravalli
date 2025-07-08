import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

export interface AdminJWTPayload {
  role: string;
  timestamp: number;
  exp: number;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJWTPayload;
    return decoded.role === "admin";
  } catch (error) {
    return false;
  }
}

export async function getAdminUser(request: NextRequest): Promise<AdminJWTPayload | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJWTPayload;

    if (decoded.role !== "admin") {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAdminAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    const user = await getAdminUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Admin authentication required" },
        { status: 401 }
      );
    }

    return handler(request, context);
  };
} 