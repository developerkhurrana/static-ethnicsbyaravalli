# Google Sheets Sync Guide - Simple CSV Method

## Overview

You can now sync your retailers from Google Sheets using direct CSV links instead of the Google Sheets API. This approach is much simpler and doesn't require API credentials.

## How It Works

The simple sync method fetches data directly from your Google Sheets as CSV format using public URLs. This eliminates the need for:
- Google Service Account credentials
- API keys
- Complex authentication setup

## Setup Instructions

### 1. Prepare Your Google Sheet

Make sure your Google Sheet has:
- Each priority level as a separate sheet/tab
- Sheet names matching your priority codes (e.g., "R1", "R2", "R3", "GENERAL")
- Headers in row 1
- Data starting from row 2

### 2. Get Your Sheet ID

1. Open your Google Sheet
2. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Set it as an environment variable: `GOOGLE_SHEET_ID=your_sheet_id_here`

### 3. Make Your Sheet Accessible

You have two options:

#### Option A: Use the built-in CSV export (Recommended)
- No additional setup needed
- Works with the current implementation
- URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}`

#### Option B: Publish to web (Alternative)
1. Go to File → Share → Publish to web
2. Choose "Entire document" or specific sheets
3. Set access to "Anyone with the link"
4. Copy the published URL and modify the code to use it

## Usage

### Method 1: Admin Panel
1. Go to your admin panel → Retailers
2. Click "Sync with Google Sheets (Simple)" button
3. The system will fetch data from each priority sheet and sync to your database

### Method 2: API Endpoint
```bash
POST /api/admin/retailers/sync-simple
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Method 3: Script
```bash
npm run ts-node scripts/sync-retailers-simple.ts
```

## File Structure

```
lib/
├── google-sheets.ts          # Original API-based sync
└── google-sheets-simple.ts   # New CSV-based sync

app/api/admin/retailers/
├── sync/route.ts             # Original API endpoint
└── sync-simple/route.ts      # New simple sync endpoint

scripts/
└── sync-retailers-simple.ts  # Standalone sync script
```

## Advantages of Simple Method

✅ **No API credentials required**
✅ **Simpler setup**
✅ **No rate limits**
✅ **Works with any Google account**
✅ **Real-time data access**

## Disadvantages

❌ **Requires sheet to be accessible via URL**
❌ **Less control over data format**
❌ **No real-time updates (manual sync only)**

## Troubleshooting

### Common Issues

1. **"Failed to fetch CSV" error**
   - Check if your sheet ID is correct
   - Ensure the sheet is accessible
   - Verify sheet names match priority codes

2. **"Priority not found" error**
   - Make sure sheet names exactly match your priority codes
   - Check that priorities exist in your database

3. **Empty data**
   - Verify data starts from row 2 (row 1 should be headers)
   - Check that required columns are present

### Debug Steps

1. Test the CSV URL directly in browser:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=R1
   ```

2. Check your environment variables:
   ```bash
   echo $GOOGLE_SHEET_ID
   ```

3. Run the sync script with verbose logging:
   ```bash
   npm run ts-node scripts/sync-retailers-simple.ts
   ```

## Migration from API Method

If you're currently using the API method and want to switch:

1. **Keep both methods** (recommended for testing)
2. **Test the simple method** with a small dataset
3. **Update your environment variables** if needed
4. **Switch to simple method** once confirmed working

## Security Considerations

- The CSV method exposes your sheet data publicly
- Consider using a separate sheet for syncing
- Regularly rotate sheet access if needed
- Monitor access logs if available

## Example Sheet Structure

```
Sheet: R1 (Priority R1)
| Phone Number | Business Name | Contact Person | Email | Address | City | State | Pincode | GST Number |
|--------------|---------------|----------------|-------|---------|------|-------|---------|------------|
| 9876543210   | ABC Store     | John Doe       | ...   | ...     | ...  | ...   | ...     | ...        |

Sheet: R2 (Priority R2)
| Phone Number | Business Name | Contact Person | Email | Address | City | State | Pincode | GST Number |
|--------------|---------------|----------------|-------|---------|------|-------|---------|------------|
| 9876543211   | XYZ Store     | Jane Smith     | ...   | ...     | ...  | ...   | ...     | ...        |
```

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your sheet structure matches the expected format
3. Test the CSV URL directly in your browser
4. Ensure all environment variables are set correctly 