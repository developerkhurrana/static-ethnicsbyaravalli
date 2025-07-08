# Google Sheets Setup Guide - Fix 401 Unauthorized Error

## The Problem

You're getting 401 Unauthorized errors because Google Sheets requires authentication for CSV export. Here are the solutions:

## Solution 1: Publish Your Sheet to Web (Recommended)

### Step 1: Publish Your Google Sheet
1. Open your Google Sheet
2. Go to **File** → **Share** → **Publish to web**
3. Choose **"Entire document"** or **"Specific sheets"**
4. Set access to **"Anyone with the link"**
5. Click **"Publish"**

### Step 2: Get the Published URL
After publishing, you'll get a URL like:
```
https://docs.google.com/spreadsheets/d/e/2PACX-1vQ.../pub?output=csv
```

### Step 3: Update Your Environment Variable
Replace your current `GOOGLE_SHEET_ID` with the published URL:
```bash
GOOGLE_SHEET_ID=https://docs.google.com/spreadsheets/d/e/2PACX-1vQ.../pub
```

## Solution 2: Use Sheet GIDs (Alternative)

### Step 1: Find Sheet GIDs
1. Open your Google Sheet
2. Click on each sheet tab (VIP, PREMIUM, etc.)
3. Look at the URL - it will contain `&gid=XXXXX`
4. Note down each GID for each sheet

### Step 2: Update the Code
In `lib/google-sheets-simple.ts`, update the `getSheetGid` function:

```typescript
function getSheetGid(priorityCode: string): string {
  const gidMap: { [key: string]: string } = {
    'VIP': '1234567890',      // Replace with actual GID
    'PREMIUM': '2345678901',  // Replace with actual GID  
    'STANDARD': '3456789012', // Replace with actual GID
    'BASIC': '4567890123',    // Replace with actual GID
    'GENERAL': '5678901234',  // Replace with actual GID
  };
  
  return gidMap[priorityCode] || '0';
}
```

## Solution 3: Use a Different Approach (Simplest)

### Step 1: Create a Public CSV File
1. Export each sheet as CSV manually
2. Upload to a public service (Google Drive, Dropbox, etc.)
3. Use direct CSV URLs

### Step 2: Update Environment Variables
```bash
GOOGLE_SHEET_VIP_URL=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
GOOGLE_SHEET_PREMIUM_URL=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
# ... etc for each priority
```

## Quick Fix: Test with a Sample Sheet

### Step 1: Create a Test Sheet
1. Create a new Google Sheet
2. Add your retailer data
3. Publish it to web
4. Test the sync

### Step 2: Test URLs
Try these URLs in your browser to see which works:

**Method 1: Published URL**
```
https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?output=csv&gid=0
```

**Method 2: Direct Export**
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&sheet=VIP
```

**Method 3: GViz**
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=VIP
```

## Troubleshooting

### If you still get 401 errors:

1. **Check Sheet Permissions**
   - Make sure the sheet is shared with "Anyone with the link"
   - Try sharing with "Anyone on the internet"

2. **Verify Sheet Structure**
   - Ensure sheet names exactly match your priority codes
   - Check that data starts from row 2 (row 1 = headers)

3. **Test with a Simple Sheet**
   - Create a minimal test sheet with just one priority
   - Publish it and test the URL directly

4. **Use Browser Developer Tools**
   - Open the sheet URL in browser
   - Check Network tab for any redirects or errors

## Alternative: Manual CSV Upload

If Google Sheets continues to cause issues, consider:

1. **Export CSVs manually** from Google Sheets
2. **Upload to your server** in a `/public/csv/` folder
3. **Update the sync code** to read local files:

```typescript
const csvText = await fs.readFile(`./public/csv/${priorityCode}.csv`, 'utf8');
```

## Environment Variables Setup

Make sure you have these in your `.env` file:

```bash
# Option 1: Published URL
GOOGLE_SHEET_ID=https://docs.google.com/spreadsheets/d/e/2PACX-1vQ.../pub

# Option 2: Sheet ID (if using GIDs)
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

# Option 3: Individual URLs
GOOGLE_SHEET_VIP_URL=https://drive.google.com/uc?export=download&id=...
GOOGLE_SHEET_PREMIUM_URL=https://drive.google.com/uc?export=download&id=...
```

## Testing Your Setup

1. **Test the URL directly** in your browser
2. **Run the sync script** with verbose logging
3. **Check the console output** for detailed error messages
4. **Verify the CSV format** matches your expected structure

## Next Steps

Once you've set up the correct URL:

1. Test with a small dataset first
2. Verify the data is being parsed correctly
3. Check that retailers are being created/updated in your database
4. Monitor the sync process for any errors

## Support

If you're still having issues:
1. Share your sheet URL (without sensitive data)
2. Check the browser console for specific error messages
3. Try the manual CSV approach as a fallback 