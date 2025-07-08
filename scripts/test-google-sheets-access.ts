import Priority from "../models/Priority";
import dbConnect from "../lib/mongodb";

async function testGoogleSheetsAccess() {
  try {
    await dbConnect();
    
    // Get priorities from database
    const priorities = await Priority.find({ isActive: true });
    
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      console.error("❌ GOOGLE_SHEET_ID not configured");
      return;
    }
    
    console.log("📋 Testing Google Sheets access...");
    
    // Check if it's a published URL
    const isPublishedUrl = sheetId.includes('/pub');
    
    if (isPublishedUrl) {
      console.log("✅ Detected published URL - testing published formats");
      
      // Test published URL formats
      for (const priority of priorities) {
        console.log(`\n🔍 Testing priority: ${priority.priorityCode}`);
        
        const urls = [
          // Method 1: Direct published CSV
          `${sheetId}?output=csv&gid=0`,
          
          // Method 2: Published with sheet name
          `${sheetId}?output=csv&sheet=${encodeURIComponent(priority.priorityCode)}`,
          
          // Method 3: Alternative published format
          `${sheetId.replace('/pub', '/pubhtml')}?output=csv&gid=0`,
        ];
        
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          
          try {
            const response = await fetch(url);
            
            if (response.ok) {
              const text = await response.text();
              console.log(`    ✅ Success! Content length: ${text.length} characters`);
              
              // Check if it's CSV or HTML
              if (text.startsWith('<!DOCTYPE html>')) {
                console.log(`    ⚠️  Warning: Got HTML instead of CSV`);
              } else {
                console.log(`    ✅ Confirmed: Got CSV data`);
              }
              
              // Try to parse as CSV
              const lines = text.split('\n');
              console.log(`    CSV lines: ${lines.length}`);
              break; // Found working URL, stop testing others
            } else {
              console.log(`    ❌ Failed: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.log(`    ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }
      }
    } else {
      console.log("📋 Testing regular sheet ID formats");
      
      // Test regular sheet ID formats
      for (const priority of priorities) {
        console.log(`\n🔍 Testing priority: ${priority.priorityCode}`);
        
        const urls = [
          // Method 1: Direct export
          `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${encodeURIComponent(priority.priorityCode)}`,
          
          // Method 2: GViz
          `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(priority.priorityCode)}`,
          
          // Method 3: Alternative export format
          `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0&sheet=${encodeURIComponent(priority.priorityCode)}`,
        ];
        
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          
          try {
            const response = await fetch(url);
            
            if (response.ok) {
              const text = await response.text();
              console.log(`    ✅ Success! Content length: ${text.length} characters`);
              
              // Try to parse as CSV
              const lines = text.split('\n');
              console.log(`    CSV lines: ${lines.length}`);
              break; // Found working URL, stop testing others
            } else {
              console.log(`    ❌ Failed: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.log(`    ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }
      }
    }
    
    console.log("\n📝 Next Steps:");
    console.log("1. If any URL worked, use that format in your sync code");
    console.log("2. If all failed, you need to republish your sheet");
    console.log("3. Make sure to publish as CSV, not HTML");
    console.log("4. Check the setup guide for detailed instructions");
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    process.exit(0);
  }
}

testGoogleSheetsAccess(); 