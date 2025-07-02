import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import dbConnect from "../../../../lib/mongodb";
import Catalog from "../../../../models/Catalog";

// Update catalog
async function updateCatalog(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    await dbConnect();
    const catalog = await Catalog.findByIdAndUpdate(id, body, { new: true });
    if (!catalog) {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, catalog });
  } catch (error) {
    console.error("Catalog update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete catalog
async function deleteCatalog(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await dbConnect();
    const catalog = await Catalog.findByIdAndDelete(id);
    if (!catalog) {
      return NextResponse.json({ error: "Catalog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Catalog delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const PUT = requireAdmin(updateCatalog);
export const DELETE = requireAdmin(deleteCatalog);
