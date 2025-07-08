import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";

export const GET = requireAdminAuth(async () => {
  return NextResponse.json({ success: true, message: "Admin authentication successful" });
}); 