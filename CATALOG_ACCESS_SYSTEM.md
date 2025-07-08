# Catalog Access System

## Overview

The catalog access system automatically assigns catalogs to retailers based on their priority levels. When a retailer is synced from Google Sheets or when catalogs are created/updated, the system automatically determines which catalogs each retailer should have access to.

## How It Works

### Priority-Based Access

1. **Retailer Priorities**: Each retailer can have multiple priority levels (e.g., VIP, R1, R2, R3)
2. **Catalog Access Levels**: Each catalog has an access level that determines which priority levels can access it
3. **Automatic Assignment**: The system automatically assigns catalogs to retailers based on their priorities

### Access Rules

- **Priority Matching**: Retailers get access to catalogs that match their priority levels
- **General Access**: All retailers get access to catalogs with "GENERAL" access level
- **Multiple Priorities**: If a retailer has multiple priorities, they get access to catalogs for all their priority levels
- **No Duplicates**: The system ensures no duplicate catalog assignments
- **Dynamic Access**: Retailers can access catalogs based on their priority levels even if they have 0 explicit catalog assignments

## Implementation Details

### Key Functions

1. **`updateCatalogAccess()`** in `lib/google-sheets.ts`
   - Called automatically during retailer sync
   - Updates catalog access for all retailers

2. **`/api/admin/retailers/update-catalog-access`**
   - Manual endpoint to trigger catalog access update
   - Available in admin panel

3. **Dynamic Access APIs**
   - `/api/retailer/access/[phoneNumber]` - Returns catalogs accessible via priority or explicit assignment
   - `/api/retailer/catalog-access` - Validates access based on priority or explicit assignment

4. **Automatic Updates**
   - Triggered when catalogs are created or updated
   - Ensures catalog access stays current

### Database Structure

```typescript
// Retailer Model
interface IRetailer {
  priorities: Types.ObjectId[]; // Array of priority IDs
  accessibleCatalogs: Types.ObjectId[]; // Array of catalog IDs
}

// Catalog Model
interface ICatalog {
  accessLevel: string; // Priority code (e.g., "VIP", "R1", "GENERAL")
}
```

## Usage

### Automatic Updates

The system automatically updates catalog access in these scenarios:

1. **Retailer Sync**: When syncing retailers from Google Sheets
2. **Catalog Creation**: When creating a new catalog
3. **Catalog Updates**: When updating catalog access levels

### Manual Updates

Admins can manually trigger catalog access updates:

1. **Admin Panel**: Use the "Update Catalog Access" button in the retailers page
2. **API Endpoint**: Call `/api/admin/retailers/update-catalog-access`

### Debugging

Use the debug script to check catalog access:

```bash
npx tsx scripts/debug-catalog-access.ts
```

This script will show:
- All priorities and catalogs
- Each retailer's current access
- What access they should have
- Any mismatches

## Example Scenarios

### Scenario 1: VIP Retailer
- **Retailer**: Has "VIP" priority
- **Catalogs**: 
  - "Premium Collection" (access: "VIP")
  - "Standard Collection" (access: "GENERAL")
- **Result**: Retailer gets access to both catalogs

### Scenario 2: Multiple Priorities
- **Retailer**: Has "R1" and "R2" priorities
- **Catalogs**:
  - "R1 Collection" (access: "R1")
  - "R2 Collection" (access: "R2")
  - "General Collection" (access: "GENERAL")
- **Result**: Retailer gets access to all three catalogs

### Scenario 3: No Priorities
- **Retailer**: Has no priorities assigned
- **Result**: Retailer gets no catalog access (skipped during update)

## Configuration

### Priority Levels

Create priority levels in the admin panel:
- Priority Code (e.g., "VIP", "R1", "R2")
- Priority Name (e.g., "VIP Customer", "Regular Customer")
- Discount Percentage
- Active Status

### Catalog Access Levels

When creating catalogs, set the access level to match priority codes:
- Use existing priority codes (e.g., "VIP", "R1")
- Use "GENERAL" for catalogs accessible to all retailers

## Troubleshooting

### Common Issues

1. **Retailer has no catalog access**
   - Check if retailer has priorities assigned
   - Verify catalogs exist with matching access levels
   - Run manual catalog access update

2. **Catalog access not updating**
   - Check console logs for errors
   - Verify database connections
   - Run debug script to identify issues

3. **Duplicate catalog assignments**
   - System automatically removes duplicates
   - Check if multiple priorities are causing issues

### Debug Steps

1. Run the debug script: `npx tsx scripts/debug-catalog-access.ts`
2. Check admin panel for catalog access status
3. Verify priority assignments in retailer details
4. Check catalog access levels in catalog management

## API Endpoints

### Update Catalog Access
```
POST /api/admin/retailers/update-catalog-access
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "success": true,
  "message": "Successfully updated catalog access for X retailers",
  "summary": {
    "totalRetailers": 10,
    "updated": 8,
    "skipped": 2,
    "totalCatalogs": 5,
    "accessLevels": ["VIP", "R1", "R2", "GENERAL"]
  },
  "results": [...]
}
```

### Retailer Access Check
```
GET /api/retailer/access/{phoneNumber}
```

Response:
```json
{
  "success": true,
  "retailer": {
    "priorities": [
      {"priorityCode": "VIP", "priorityName": "VIP Customer"}
    ],
    "accessibleCatalogs": [...]
  },
  "catalogs": [...]
}
``` 