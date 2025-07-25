import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import PurchaseOrder from "@/models/PurchaseOrder";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const runtime = "nodejs";

export const GET = requireAdminAuth(async (
  request: NextRequest,
) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const poId = searchParams.get('poId');

    if (!poId) {
      return new NextResponse('Missing poId', { status: 400 });
    }

    console.log('Fetching PO with ID:', poId);
    const po = await PurchaseOrder.findById(poId);
    if (!po) {
      console.log('PO not found for ID:', poId);
      return new NextResponse('Purchase order not found', { status: 404 });
    }

    console.log('PO found:', po.poNumber);

    // Fetch product images for each item
    const productImages: Record<string, string> = {};
    for (const item of po.items) {
      try {
        const product = await Product.findOne({ itemCode: item.itemCode });
        if (product && product.images && product.images.length > 0) {
          const primaryImg = product.images.find((img: any) => img.isPrimary) || product.images[0];
          productImages[item.itemCode] = primaryImg.url;
        } else {
          productImages[item.itemCode] = "";
        }
      } catch (error) {
        console.log('Error fetching product image for itemCode:', item.itemCode, error);
        productImages[item.itemCode] = "";
      }
    }

    // Return HTML that can be printed to PDF by the browser
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Purchase Order #${po.poNumber}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;600;700&display=swap');
            
            @media print {
              body { 
                margin: 0; 
                padding: 0;
              }
              .no-print { display: none; }
              @page {
                margin: 20mm 15mm;
                size: A4;
                counter-increment: page;
              }
              html, body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                print-color-adjust: exact;
              }
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
            
            * {
              box-sizing: border-box;
            }
            
            body { 
              font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; 
              margin: 0; 
              padding: 0;
              line-height: 1.3;
              color: #000000;
              background: #ffffff;
              font-size: 11pt;
            }
            
            .page {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background: white;
              position: relative;
              padding-bottom: 80px;
            }
            
            .header {
              border-bottom: 2px solid #000;
              padding: 10px 0;
              margin-bottom: 20px;
            }
            
            .company-header {
              text-align: center;
              margin-bottom: 15px;
            }
            
            .company-name {
              font-size: 18pt;
              font-weight: bold;
              margin: 0;
              color: #000;
            }
            
            .company-tagline {
              font-size: 10pt;
              margin: 5px 0 0 0;
              color: #333;
            }
            
            .document-title {
              font-size: 16pt;
              font-weight: bold;
              text-align: center;
              margin: 10px 0;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            .po-info {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 20px;
            }
            
            .po-details {
              flex: 1;
            }
            
            .po-number {
              font-size: 12pt;
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            .po-date {
              font-size: 10pt;
              color: #333;
            }
            
            .status-section {
              text-align: right;
            }
            
            .status-label {
              font-size: 10pt;
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            .status-value {
              font-size: 10pt;
              padding: 3px 8px;
              background: #f0f0f0;
              border: 1px solid #ccc;
              display: inline-block;
              border-radius: 3px;
            }
            
            .info-sections {
              display: flex;
              gap: 30px;
              margin-bottom: 25px;
            }
            
            .info-section {
              flex: 1;
            }
            
            .section-title {
              font-size: 11pt;
              font-weight: bold;
              margin-bottom: 8px;
              border-bottom: 1px solid #000;
              padding-bottom: 3px;
            }
            
            .info-row {
              margin-bottom: 5px;
              display: flex;
              align-items: center;
            }
            
            .info-label {
              font-weight: bold;
              min-width: 80px;
              font-size: 10pt;
            }
            
            .info-value {
              font-size: 10pt;
              flex: 1;
            }
            
            .items-section {
              margin-bottom: 25px;
            }
            
            .items-title {
              font-size: 12pt;
              font-weight: bold;
              margin-bottom: 10px;
              border-bottom: 1px solid #000;
              padding-bottom: 5px;
            }
            
            .items-table {
              width: 100%;
              border-collapse: collapse;
              border: 1px solid #000;
              font-size: 9pt;
            }
            
            .items-table th {
              background: #f0f0f0;
              border: 1px solid #000;
              padding: 6px 4px;
              text-align: center;
              font-weight: bold;
              vertical-align: middle;
            }
            
            .items-table td {
              border: 1px solid #000;
              padding: 4px 6px;
              vertical-align: top;
            }
            
            .items-table .image-cell {
              width: 15%;
              text-align: center;
              vertical-align: middle;
            }
            
            .items-table .product-cell {
              width: 20%;
            }
            
            .items-table .details-cell {
              width: 25%;
            }
            
            .items-table .quantity-cell {
              width: 10%;
              text-align: center;
            }
            
            .items-table .amount-cell {
              width: 15%;
              text-align: right;
            }
            
            .image-cell {
              width: 80px;
              padding: 4px;
            }
            
            .product-image {
              width: 100%;
              height: auto;
              object-fit: contain;
              border: 1px solid #ccc;
              border-radius: 2px;
              aspect-ratio: 4/3;
            }
            
            .no-image {
              width: 100%;
              height: auto;
              background: #f5f5f5;
              border: 1px solid #ccc;
              border-radius: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 8pt;
              color: #999;
              aspect-ratio: 4/3;
            }
            
            .product-name {
              font-weight: bold;
              margin-bottom: 2px;
            }
            
            .product-code {
              font-size: 8pt;
              color: #666;
              font-family: 'Courier New', monospace;
            }
            
            .product-specs {
              font-size: 8pt;
              color: #666;
              margin-top: 2px;
            }
            
            .summary-section {
              margin-bottom: 100px;
            }
            
            .summary-title {
              font-size: 12pt;
              font-weight: bold;
              margin-bottom: 10px;
              border-bottom: 1px solid #000;
              padding-bottom: 5px;
            }
            
            .summary-table {
              width: 100%;
              border-collapse: collapse;
              border: 1px solid #000;
              font-size: 10pt;
            }
            
            .summary-table th {
              background: #f0f0f0;
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
              font-weight: bold;
            }
            
            .summary-table td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
            }
            
            .summary-table .total-row {
              background: #f0f0f0;
              font-weight: bold;
            }
            
            .footer {
              position: absolute;
              bottom: 20px;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 9pt;
              color: #666;
              border-top: 1px solid #ccc;
              padding-top: 10px;
              background: white;
            }
            
            .footer-text {
              margin-bottom: 5px;
            }
            
            .footer-disclaimer {
              font-style: italic;
            }
            
            .page-number {
              position: absolute;
              bottom: 10px;
              right: 15px;
              font-size: 9pt;
              color: #666;
            }
            
            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 10px 20px;
              background: #0078d4;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12pt;
              font-weight: bold;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            
            .print-button:hover {
              background: #106ebe;
            }
            
            @media (max-width: 768px) {
              .info-sections {
                flex-direction: column;
                gap: 15px;
              }
              
              .po-info {
                flex-direction: column;
                gap: 10px;
              }
              
              .status-section {
                text-align: left;
              }
            }
          </style>
        </head>
        <body>
          <button class="print-button no-print" onclick="window.print()">🖨️ Print Document</button>
          
          <div class="page">
            <div class="header">
              <div class="company-header">
                <div class="company-name">Ethnics by Aravalli</div>
                <div class="company-tagline">Premium Ethnic Wear Manufacturer</div>
              </div>
              <div class="document-title">Purchase Order</div>
            </div>
            
            <div class="po-info">
              <div class="po-details">
                <div class="po-number">Purchase Order #${po.poNumber}</div>
                <div class="po-date">Date: ${new Date(po.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div class="status-section">
                <div class="status-label">Status:</div>
                <div class="status-value">${po.status}</div>
              </div>
            </div>
            
            <div class="info-sections">
              <div class="info-section">
                <div class="section-title">Retailer Information</div>
                <div class="info-row">
                  <span class="info-label">Business:</span>
                  <span class="info-value">${po.retailerInfo.businessName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Contact:</span>
                  <span class="info-value">${po.retailerInfo.contactPerson}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Phone:</span>
                  <span class="info-value">${po.retailerInfo.phoneNumber}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Address:</span>
                  <span class="info-value">${po.retailerInfo.address.street}, ${po.retailerInfo.address.city}, ${po.retailerInfo.address.state} - ${po.retailerInfo.address.pincode}, ${po.retailerInfo.address.country}</span>
                </div>
              </div>
              
              <div class="info-section">
                <div class="section-title">Order Information</div>
                <div class="info-row">
                  <span class="info-label">Generated By:</span>
                  <span class="info-value">${po.generatedBy}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Created:</span>
                  <span class="info-value">${new Date(po.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                ${po.sentAt ? `
                <div class="info-row">
                  <span class="info-label">Sent:</span>
                  <span class="info-value">${new Date(po.sentAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                ` : ""}
                <div class="info-row">
                  <span class="info-label">Status:</span>
                  <span class="info-value">${po.status}</span>
                </div>
              </div>
            </div>
            
            <div class="items-section">
              <div class="items-title">Order Items</div>
                              <table class="items-table">
                  <thead>
                    <tr>
                      <th style="width: 15%">Image</th>
                      <th style="width: 20%">Product</th>
                      <th style="width: 25%">Details</th>
                      <th style="width: 10%">Sets</th>
                      <th style="width: 10%">Pieces</th>
                      <th style="width: 20%">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${po.items.map((item: any) => `
                      <tr>
                        <td class="image-cell">
                          ${productImages[item.itemCode] ? 
                            `<img src="${productImages[item.itemCode]}" class="product-image" alt="${item.itemName}" />` : 
                            '<div class="no-image">No Image</div>'
                          }
                        </td>
                        <td class="product-cell">
                          <div class="product-name">${item.itemName}</div>
                          <div class="product-code">${item.itemCode}</div>
                        </td>
                        <td class="details-cell">
                          <div class="product-specs">Color: ${item.color}</div>
                          <div class="product-specs">Fabric: ${item.fabric}</div>
                        </td>
                        <td class="quantity-cell">${item.quantitySets}</td>
                        <td class="quantity-cell">${item.totalPcs}</td>
                        <td class="amount-cell">₹${item.totalAmount.toLocaleString()}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
            </div>
            
            <div class="summary-section">
              <div class="summary-title">Order Summary</div>
              <table class="summary-table">
                <thead>
                  <tr>
                    <th>Total Styles</th>
                    <th>Total Sets</th>
                    <th>Total Pieces</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="total-row">
                    <td>${[...new Set(po.items.map((item: any) => item.itemCode))].length}</td>
                    <td>${po.poSummary.totalSets}</td>
                    <td>${po.poSummary.totalPcs}</td>
                    <td>₹${po.poSummary.totalAmountAfterGST.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="footer">
              <div class="footer-text">Thank you for choosing Ethnics by Aravalli</div>
              <div class="footer-disclaimer">This is a reference document. Tax invoice will be generated post payment.</div>
            </div>
            
            <div class="page-number">Page 1</div>
          </div>
        </body>
      </html>
    `;

    console.log('Returning HTML response...');
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename=PO_${po.poNumber}.html`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new NextResponse(
      `PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 
      { status: 500 }
    );
  }
}); 