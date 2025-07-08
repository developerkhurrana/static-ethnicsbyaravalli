# ChatGPT Prompt: Generate Dummy Retailer Sheets Data

## **Complete Prompt for ChatGPT**

```
I need you to generate dummy data for Google Sheets that will be used to sync retailer information into a business management system. Please create realistic Indian retailer data for multiple priority levels.

**Requirements:**

**Sheet Structure (10 columns):**
- Column A: Phone Number (10-digit Indian mobile numbers)
- Column B: Business Name (fashion/clothing store names)
- Column C: Contact Person (Indian names)
- Column D: Email (business emails)
- Column E: Address (street addresses)
- Column F: City (major Indian cities)
- Column G: State (Indian states)
- Column H: Pincode (6-digit postal codes)
- Column I: GST Number (15-character GST format: 2 digits + 10 alphanumeric + 1 digit + 1 letter + 1 digit)
- Column J: Notes (business notes)

**Priority Sheets Needed:**
Create separate sheets for each of these priority levels:
1. VIP
2. PREMIUM  
3. STANDARD
4. BASIC
5. WHOLESALE

**Data Requirements:**
- Generate 8-12 retailers per sheet
- Use realistic Indian business names (fashion stores, boutiques, clothing shops)
- Include variety in cities (Jaipur, Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad, etc.)
- Make phone numbers unique across all sheets
- Use proper Indian GST number format
- Add realistic business notes

**Format:**
Provide the data in a tabular format that can be easily copied into Google Sheets, with:
- Row 1: Headers (Phone Number, Business Name, Contact Person, Email, Address, City, State, Pincode, GST Number, Notes)
- Row 2+: Data rows

**Example format:**
```
VIP Sheet:
Phone Number | Business Name | Contact Person | Email | Address | City | State | Pincode | GST Number | Notes
9876543210 | Luxury Fashion House | Rajesh Kumar | rajesh@luxuryfashion.com | 123 MG Road | Jaipur | Rajasthan | 302001 | 08ABCDE1234F1Z5 | High-end customer, VIP treatment
```

Please generate complete data for all 5 priority sheets with realistic Indian retailer information.
```

---

## **Short Version Prompt**

```
Generate dummy Indian retailer data for Google Sheets with these specifications:

**5 Sheets needed:** VIP, PREMIUM, STANDARD, BASIC, WHOLESALE

**Columns:** Phone Number | Business Name | Contact Person | Email | Address | City | State | Pincode | GST Number | Notes

**Requirements:**
- 10 retailers per sheet
- Unique phone numbers across all sheets
- Realistic Indian fashion store names
- Major Indian cities (Jaipur, Mumbai, Delhi, Bangalore, Chennai, etc.)
- Proper GST format (2 digits + 10 alphanumeric + 1 digit + 1 letter + 1 digit)
- Business-appropriate notes

Provide data in tabular format ready for Google Sheets import.
```

---

## **Usage Instructions**

### **Step 1: Generate Data**
1. Copy the prompt above
2. Paste it into ChatGPT
3. Wait for the generated data

### **Step 2: Create Google Sheets**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Create 5 sheets with these exact names:
   - VIP
   - PREMIUM
   - STANDARD
   - BASIC
   - WHOLESALE

### **Step 3: Import Data**
1. Copy the generated data from ChatGPT
2. Paste into the respective sheets
3. Make sure headers are in Row 1
4. Data starts from Row 2

### **Step 4: Get Spreadsheet ID**
1. Copy the URL of your Google Sheets
2. Extract the ID (long string between `/d/` and `/edit`)
3. Example: `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`

### **Step 5: Configure Environment**
Add to your `.env` file:
```
GOOGLE_SHEET_ID=your_spreadsheet_id_here
```

---

## **Expected Output Format**

ChatGPT should generate data like this:

### **VIP Sheet Example:**
```
Phone Number | Business Name | Contact Person | Email | Address | City | State | Pincode | GST Number | Notes
9876543210 | Luxury Fashion House | Rajesh Kumar | rajesh@luxuryfashion.com | 123 MG Road | Jaipur | Rajasthan | 302001 | 08ABCDE1234F1Z5 | High-end customer, VIP treatment
9876543211 | Elite Boutique | Priya Sharma | priya@eliteboutique.com | 456 Park Street | Mumbai | Maharashtra | 400001 | 27EFGHI5678G2Z6 | Premium client, high volume
```

### **PREMIUM Sheet Example:**
```
Phone Number | Business Name | Contact Person | Email | Address | City | State | Pincode | GST Number | Notes
9876543212 | Fashion Hub | Amit Patel | amit@fashionhub.com | 789 Oak Avenue | Delhi | Delhi | 110001 | 07JKLMN9012H3Z7 | Regular premium customer
```

---

## **Notes**

- **Phone Numbers**: Must be unique across all sheets
- **GST Format**: 2 digits + 10 alphanumeric + 1 digit + 1 letter + 1 digit
- **Cities**: Use major Indian cities for realism
- **Business Names**: Focus on fashion/clothing retail
- **Notes**: Include business-relevant information

This data will be perfect for testing your multiple priorities retailer management system! 