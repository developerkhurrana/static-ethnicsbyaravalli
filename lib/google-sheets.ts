import { google } from "googleapis";
import dbConnect from "./mongodb";
import Retailer from "../models/Retailer";
import Catalog from "../models/Catalog";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export interface SheetRetailer {
  phoneNumber: string;
  businessName: string;
  contactPerson: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  priority: "R1" | "R2" | "R3";
  sheetRowId: string;
}

export async function syncRetailersFromSheets(): Promise<{
  success: boolean;
  synced: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let synced = 0;

  try {
    await dbConnect();
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      throw new Error("GOOGLE_SHEET_ID not configured");
    }

    // Sync R1 retailers
    const r1Retailers = await fetchRetailersFromSheet(sheetId, "R1");
    for (const retailer of r1Retailers) {
      try {
        await upsertRetailer(retailer);
        synced++;
      } catch (error) {
        errors.push(`R1 ${retailer.phoneNumber}: ${error}`);
      }
    }

    // Sync R2 retailers
    const r2Retailers = await fetchRetailersFromSheet(sheetId, "R2");
    for (const retailer of r2Retailers) {
      try {
        await upsertRetailer(retailer);
        synced++;
      } catch (error) {
        errors.push(`R2 ${retailer.phoneNumber}: ${error}`);
      }
    }

    // Sync R3 retailers
    const r3Retailers = await fetchRetailersFromSheet(sheetId, "R3");
    for (const retailer of r3Retailers) {
      try {
        await upsertRetailer(retailer);
        synced++;
      } catch (error) {
        errors.push(`R3 ${retailer.phoneNumber}: ${error}`);
      }
    }

    // Update catalog access based on priority
    await updateCatalogAccess();

    return { success: true, synced, errors };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, synced, errors: [error.message] };
  }
}

async function fetchRetailersFromSheet(
  sheetId: string,
  priority: string
): Promise<SheetRetailer[]> {
  try {
    const range = `${priority}!A2:J`; // Assuming columns A-J contain retailer data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const rows = response.data.values || [];
    const retailers: SheetRetailer[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.length >= 9) {
        retailers.push({
          phoneNumber: row[0]?.toString() || "",
          businessName: row[1]?.toString() || "",
          contactPerson: row[2]?.toString() || "",
          email: row[3]?.toString() || "",
          address: row[4]?.toString() || "",
          city: row[5]?.toString() || "",
          state: row[6]?.toString() || "",
          pincode: row[7]?.toString() || "",
          gstNumber: row[8]?.toString() || "",
          priority: priority as "R1" | "R2" | "R3",
          sheetRowId: `${priority}_${i + 2}`,
        });
      }
    }

    return retailers.filter((r) => r.phoneNumber && r.businessName);
  } catch (error) {
    console.error(`Error fetching ${priority} retailers:`, error);
    throw error;
  }
}

async function upsertRetailer(sheetRetailer: SheetRetailer): Promise<void> {
  const existingRetailer = await Retailer.findOne({
    phoneNumber: sheetRetailer.phoneNumber,
  });

  const retailerData = {
    phoneNumber: sheetRetailer.phoneNumber,
    businessName: sheetRetailer.businessName,
    contactPerson: sheetRetailer.contactPerson,
    email: sheetRetailer.email,
    address: {
      street: sheetRetailer.address,
      city: sheetRetailer.city,
      state: sheetRetailer.state,
      pincode: sheetRetailer.pincode,
      country: "India",
    },
    priority: sheetRetailer.priority,
    gstNumber: sheetRetailer.gstNumber,
    sheetRowId: sheetRetailer.sheetRowId,
    lastSyncedAt: new Date(),
  };

  if (existingRetailer) {
    // Update existing retailer
    await Retailer.findByIdAndUpdate(existingRetailer._id, retailerData);
  } else {
    // Create new retailer
    await Retailer.create(retailerData);
  }
}

async function updateCatalogAccess(): Promise<void> {
  const retailers = await Retailer.find({ isActive: true });
  const catalogs = await Catalog.find({ isActive: true });

  for (const retailer of retailers) {
    const accessibleCatalogs: string[] = [];

    // R1 retailers get R1 catalogs
    if (retailer.priority === "R1") {
      const r1Catalogs = catalogs.filter(
        (c) => c.accessLevel === "R1" || c.accessLevel === "GENERAL"
      );
      accessibleCatalogs.push(...r1Catalogs.map((c) => c._id.toString()));
    }
    // R2 retailers get R1 + R2 catalogs
    else if (retailer.priority === "R2") {
      const r2Catalogs = catalogs.filter(
        (c) =>
          c.accessLevel === "R1" ||
          c.accessLevel === "R2" ||
          c.accessLevel === "GENERAL"
      );
      accessibleCatalogs.push(...r2Catalogs.map((c) => c._id.toString()));
    }
    // R3 retailers get R1 + R2 + R3 catalogs
    else if (retailer.priority === "R3") {
      const r3Catalogs = catalogs.filter(
        (c) =>
          c.accessLevel === "R1" ||
          c.accessLevel === "R2" ||
          c.accessLevel === "R3" ||
          c.accessLevel === "GENERAL"
      );
      accessibleCatalogs.push(...r3Catalogs.map((c) => c._id.toString()));
    }

    // Update retailer's accessible catalogs
    await Retailer.findByIdAndUpdate(retailer._id, {
      accessibleCatalogs,
      lastSyncedAt: new Date(),
    });
  }
}

export async function setupWebhook(sheetId: string): Promise<void> {
  // This would set up a webhook to Google Sheets
  // Implementation depends on your webhook setup
  console.log("Webhook setup for sheet:", sheetId);
}
