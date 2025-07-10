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
            @media print {
              body { 
                margin: 0; 
                padding: 0;
              }
              .no-print { display: none; }
              @page {
                margin: 20mm;
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
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px; 
              line-height: 1.6;
              color: #333;
            }
            h1 { 
              color: #333; 
              text-align: center;
              margin-bottom: 30px;
              font-size: 28px;
            }
            .brand-heading { 
              text-align: center; 
              font-size: 1.5rem; 
              font-weight: bold; 
              letter-spacing: 2px; 
              margin-bottom: 20px; 
              color: #222; 
            }
            .section { 
              margin-bottom: 24px; 
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 8px;
            }
            .section-title {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 10px;
              color: #555;
            }
            .items-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 16px; 
              font-size: 12px;
            }
            .items-table th, .items-table td { 
              border: 1px solid #ccc; 
              padding: 8px; 
              text-align: left;
              vertical-align: top;
            }
            .items-table th { 
              background: #f5f5f5; 
              font-weight: bold;
            }
            .product-img { 
              width: 80px; 
              height: auto; 
              border-radius: 6px; 
              border: 1px solid #eee;
              max-width: 80px;
              display: block;
            }
            .summary-box {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .total-amount {
              font-size: 18px;
              font-weight: bold;
              color: #2c5aa0;
            }
            .disclaimer { 
              margin-top: 40px; 
              font-size: 13px; 
              color: #a00; 
              font-style: italic;
              text-align: center;
              padding: 15px;
              border-top: 1px solid #eee;
            }
            .header-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .po-number {
              font-size: 20px;
              font-weight: bold;
              color: #2c5aa0;
            }
            .status-badge {
              padding: 5px 15px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .status-generated { background: #e3f2fd; color: #1976d2; }
            .status-sent { background: #fff3e0; color: #f57c00; }
            .status-acknowledged { background: #e8f5e8; color: #388e3c; }
            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 10px 20px;
              background: #007bff;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 14px;
            }
            .print-button:hover {
              background: #0056b3;
            }
            .item-details {
              margin-top: 5px;
              font-size: 11px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <button class="print-button no-print" onclick="window.print()">Print PDF</button>
          
          <div class="brand-heading">Ethnics by Aravalli</div>
          
          <div class="header-info">
            <div class="po-number">Purchase Order #${po.poNumber}</div>
            <div class="status-badge status-${po.status.toLowerCase()}">${po.status}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Retailer Information</div>
            <strong>Business Name:</strong> ${po.retailerInfo.businessName}<br/>
            <strong>Contact Person:</strong> ${po.retailerInfo.contactPerson}<br/>
            <strong>Phone:</strong> ${po.retailerInfo.phoneNumber}<br/>
            <strong>Address:</strong> ${po.retailerInfo.address.street}, ${po.retailerInfo.address.city}, ${po.retailerInfo.address.state} - ${po.retailerInfo.address.pincode}, ${po.retailerInfo.address.country}
          </div>
          
          <div class="section">
            <div class="section-title">Order Details</div>
            <strong>Generated By:</strong> ${po.generatedBy}<br/>
            <strong>Created:</strong> ${new Date(po.createdAt).toLocaleString()}<br/>
            ${po.sentAt ? `<strong>Sent:</strong> ${new Date(po.sentAt).toLocaleString()}<br/>` : ""}
          </div>
          
          <div class="section">
            <div class="section-title">Order Items</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item Details</th>
                  <th>Color</th>
                  <th>Fabric</th>
                  <th>Sets</th>
                  <th>Total Pcs</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${po.items.map((item: any) => `
                  <tr>
                    <td>
                      ${productImages[item.itemCode] ? 
                        `<img src="${productImages[item.itemCode]}" class="product-img" alt="${item.itemName}" onerror="this.style.display='none'"/>` : 
                        '<div style="width: 80px; height: 60px; background: #f5f5f5; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999;">No Image</div>'
                      }
                    </td>
                    <td>
                      <strong>${item.itemName}</strong>
                      <div class="item-details">Code: ${item.itemCode}</div>
                    </td>
                    <td>${item.color}</td>
                    <td>${item.fabric}</td>
                    <td>${item.quantitySets}</td>
                    <td>${item.totalPcs}</td>
                    <td>${item.totalAmount.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="summary-box">
            <div class="section-title">Order Summary</div>
            <div>Total Styles: ${[...new Set(po.items.map((item: any) => item.itemCode))].length}</div>
            <div>Total Sets: ${po.poSummary.totalSets}</div>
            <div>Total Pieces: ${po.poSummary.totalPcs}</div>
            <div class="total-amount">Total Amount: ₹${po.poSummary.totalAmountAfterGST.toLocaleString()}</div>
          </div>
          
          <div class="disclaimer">
            This PO is for reference purposes only. <i>Not an official document</i>. Tax invoice will be generated post payment.
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