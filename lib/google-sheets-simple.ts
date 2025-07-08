import dbConnect from "./mongodb";
import Retailer from "../models/Retailer";
import Catalog from "../models/Catalog";
import Priority from "../models/Priority";

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
  priority: string;
  sheetRowId: string;
}

export async function syncRetailersFromSheetsSimple(): Promise<{
  success: boolean;
  synced: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let synced = 0;

  try {
    await dbConnect();
    
    // Get priority mappings
    const priorities = await Priority.find({ isActive: true });
    const priorityMap = new Map();
    priorities.forEach(p => {
      priorityMap.set(p.priorityCode, p._id.toString());
    });

    // For each priority, fetch from its own sheet
    for (const priority of priorities) {
      try {
        const retailers = await fetchRetailersFromSheetCSV(priority.priorityCode);
        for (const retailer of retailers) {
          try {
            await upsertRetailer(retailer, priorityMap);
            synced++;
          } catch (error) {
            errors.push(`${priority.priorityCode} ${retailer.phoneNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }
      } catch (error) {
        errors.push(`Error processing priority ${priority.priorityCode}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

async function fetchRetailersFromSheetCSV(priorityCode: string): Promise<SheetRetailer[]> {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      throw new Error("GOOGLE_SHEET_ID not configured");
    }

    let csvText: string | null = null;
    let lastError = "";

    // Check if it's a published URL
    const isPublishedUrl = sheetId.includes('/pub');

    if (isPublishedUrl) {
      // Try published URL formats
      const publishedUrls = [
        `${sheetId}?output=csv&gid=0`,
        `${sheetId}?output=csv&sheet=${encodeURIComponent(priorityCode)}`,
      ];

      for (const url of publishedUrls) {
        try {
          const response = await fetch(url);
          
          if (response.ok) {
            csvText = await response.text();
            
            // Check if we got HTML instead of CSV
            if (csvText.startsWith('<!DOCTYPE html>')) {
              csvText = null;
              lastError = "Got HTML instead of CSV";
              continue;
            }
            
            break;
          } else {
            lastError = `Published URL failed: ${response.status} ${response.statusText}`;
          }
        } catch (error) {
          lastError = `Published URL error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
      }
    } else {
      // Try regular sheet ID formats
      const regularUrls = [
        `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${encodeURIComponent(priorityCode)}`,
        `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(priorityCode)}`,
      ];

      for (const url of regularUrls) {
        try {
          const response = await fetch(url);
          
          if (response.ok) {
            csvText = await response.text();
            break;
          } else {
            lastError = `Regular URL failed: ${response.status} ${response.statusText}`;
          }
        } catch (error) {
          lastError = `Regular URL error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
      }
    }

    if (!csvText) {
      throw new Error(`Failed to fetch CSV for ${priorityCode}. Last error: ${lastError}`);
    }

    const rows = parseCSV(csvText);
    
    const retailers: SheetRetailer[] = [];

    // Skip header row and process data rows
    for (let i = 1; i < rows.length; i++) {
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
          priority: priorityCode,
          sheetRowId: `${priorityCode}_${i + 1}`,
        });
      }
    }

    const validRetailers = retailers.filter((r) => r.phoneNumber && r.businessName);
    return validRetailers;
  } catch (error) {
    console.error(`Error fetching ${priorityCode} retailers:`, error);
    throw error;
  }
}

function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n');
  return lines.map(line => {
    // Simple CSV parsing - you might want to use a proper CSV library for complex cases
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    return matches ? matches.map(cell => cell.replace(/^"|"$/g, '')) : [];
  }).filter(row => row.length > 0);
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
    priorities: [priorityId], // Overwrite with only the current priority
    gstNumber: sheetRetailer.gstNumber,
    sheetRowId: sheetRetailer.sheetRowId,
    lastSyncedAt: new Date(),
    isActive: true, // Always set isActive true on sync
  };

  if (existingRetailer) {
    // Overwrite priorities with only the current one
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