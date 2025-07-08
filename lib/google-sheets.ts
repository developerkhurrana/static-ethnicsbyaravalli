import { google } from "googleapis";
import dbConnect from "./mongodb";
import Retailer from "../models/Retailer";
import Catalog from "../models/Catalog";
import Priority from "../models/Priority";

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
  priority: string; // Now supports any priority code
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

    // Get priority mappings
    const priorities = await Priority.find({ isActive: true });
    const priorityMap = new Map();
    priorities.forEach(p => {
      priorityMap.set(p.priorityCode, p._id.toString());
    });

    // Get all sheet names from the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const sheetsList = spreadsheet.data.sheets || [];
    
    // Sync retailers from each sheet (each sheet represents a priority)
    for (const sheet of sheetsList) {
      const sheetName = sheet.properties?.title;
      if (!sheetName) continue;

      // Check if this sheet name corresponds to a priority in our database
      if (priorityMap.has(sheetName)) {
        try {
          const retailers = await fetchRetailersFromSheet(sheetId, sheetName);
          for (const retailer of retailers) {
            try {
              await upsertRetailer(retailer, priorityMap);
              synced++;
            } catch (error) {
              errors.push(`${sheetName} ${retailer.phoneNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          }
        } catch (error) {
          errors.push(`Error processing sheet ${sheetName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    // Update catalog access based on priorities
    await updateCatalogAccess();

    return { success: true, synced, errors };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, synced, errors: [error instanceof Error ? error.message : 'Unknown error'] };
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
          priority: priority, // Now supports any priority code
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

async function upsertRetailer(sheetRetailer: SheetRetailer, priorityMap: Map<string, string>): Promise<void> {
  const existingRetailer = await Retailer.findOne({
    phoneNumber: sheetRetailer.phoneNumber,
  });

  // Get priority ID from the map
  const priorityId = priorityMap.get(sheetRetailer.priority);
  if (!priorityId) {
    throw new Error(`Priority ${sheetRetailer.priority} not found in database`);
  }

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
    priorities: [priorityId], // Convert to array of priority IDs
    gstNumber: sheetRetailer.gstNumber,
    sheetRowId: sheetRetailer.sheetRowId,
    lastSyncedAt: new Date(),
  };

  if (existingRetailer) {
    // Update existing retailer - preserve existing priorities and add new one if not present
    const existingPriorities = existingRetailer.priorities || [];
    if (!existingPriorities.includes(priorityId)) {
      retailerData.priorities = [...existingPriorities, priorityId];
    } else {
      retailerData.priorities = existingPriorities;
    }
    await Retailer.findByIdAndUpdate(existingRetailer._id, retailerData);
  } else {
    // Create new retailer
    await Retailer.create(retailerData);
  }
}

async function updateCatalogAccess(): Promise<void> {
  // Get all active retailers with their priorities populated
  const retailers = await Retailer.find({ isActive: true }).populate("priorities");
  
  // Get all active catalogs
  const catalogs = await Catalog.find({ isActive: true });
  
  // Create a map of priority codes to catalog IDs for faster lookup
  const priorityToCatalogsMap = new Map<string, string[]>();
  
  // Pre-process catalogs by access level
  for (const catalog of catalogs) {
    const accessLevel = catalog.accessLevel;
    if (!priorityToCatalogsMap.has(accessLevel)) {
      priorityToCatalogsMap.set(accessLevel, []);
    }
    priorityToCatalogsMap.get(accessLevel)!.push(catalog._id.toString());
  }

  let updatedCount = 0;
  
  for (const retailer of retailers) {
    const accessibleCatalogs: string[] = [];
    const retailerPriorities = retailer.priorities || [];
    
    if (retailerPriorities.length === 0) {
      continue;
    }
    
    const priorityCodes = retailerPriorities.map((p: any) => p.priorityCode);

    // Add catalogs for each priority level
    for (const priorityCode of priorityCodes) {
      // Get catalogs that match this priority level
      const priorityCatalogs = priorityToCatalogsMap.get(priorityCode) || [];
      accessibleCatalogs.push(...priorityCatalogs);
      
      // Also add GENERAL catalogs (accessible to everyone)
      const generalCatalogs = priorityToCatalogsMap.get("GENERAL") || [];
      accessibleCatalogs.push(...generalCatalogs);
    }

    // Remove duplicates
    const uniqueCatalogs = [...new Set(accessibleCatalogs)];

    // Update retailer's accessible catalogs
    await Retailer.findByIdAndUpdate(retailer._id, {
      accessibleCatalogs: uniqueCatalogs,
      lastSyncedAt: new Date(),
    });
    
    updatedCount++;
  }
}

export async function setupWebhook(sheetId: string): Promise<void> {
  // This would set up a webhook to Google Sheets
  // Implementation depends on your webhook setup
}
