# Admin System for Ethnics by Aravalli

A comprehensive admin system for managing products, catalogs, orders, purchase orders, and retailers with Google Sheets integration.

## 🚀 Features

### 🔐 **Admin Authentication**
- Password-based admin login using `ADMIN_PASS` environment variable
- JWT token authentication with 24-hour expiration
- Secure admin dashboard with protected routes

### 📦 **Product Management**
- View all products with search and filtering
- Product status management (active/inactive)
- Product details: code, name, color, fabric, pricing
- Set-based pricing (1 set = 5 pieces S-XXL)

### 📚 **Catalog Management**
- Create and manage product catalogs
- Access level control (R1, R2, R3, GENERAL)
- Assign products to catalogs
- Catalog status management

### 📋 **Order Management**
- View all retailer orders
- Order status tracking: DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED → PO_GENERATED
- Order review and approval workflow
- Order summary with totals and GST calculation

### 🛒 **Purchase Order Management**
- Generate purchase orders from approved orders
- PO status tracking: GENERATED → SENT → ACKNOWLEDGED
- PDF generation with GST calculation
- PO download and management

### 🏪 **Retailer Management**
- Retailer registration and management
- Priority-based access control (expandable)
- Google Sheets integration for retailer sync
- Catalog access management
- Phone number-based catalog access

### ⭐ **Priority Management**
- **Dynamic Priority Objects**: Priorities are full objects with codes, names, descriptions, and discount percentages
- **Cascading Updates**: When a priority is deleted or changed, all retailers using that priority are automatically updated
- **Retailer Count Tracking**: See how many retailers are using each priority level
- **Expandable System**: Create unlimited priority levels (R1, R2, R3, etc.)
- **Priority-based Discounts**: Each priority level can have different discount percentages
- **Admin Interface**: Create, edit, delete, and manage priority levels

## 🛠️ Installation & Setup

### 1. Environment Variables
```env
ADMIN_PASS=your_admin_password
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install PDF Generation Dependencies
```bash
npm install pdfkit @types/pdfkit
```

### 4. Seed Initial Data
```bash
# Run the priority seeding script
npm run seed-priorities

# If migrating from string-based priorities, run:
npm run migrate-priorities
```

### 5. Start Development Server
```bash
npm run dev
```

## 📁 System Architecture

### Admin Pages
- `/admin/login` - Admin authentication
- `/admin/products` - Product management
- `/admin/catalogs` - Catalog management
- `/admin/orders` - Order management
- `/admin/purchaseOrders` - Purchase order management
- `/admin/retailers` - Retailer management
- `/admin/priorities` - Priority level management

### Retailer Catalog Access
- `/catalog/[phoneNumber]` - Retailer catalog access using phone number

### API Routes
- `/api/admin/login` - Admin authentication
- `/api/admin/products` - Product CRUD operations
- `/api/admin/catalogs` - Catalog CRUD operations
- `/api/admin/orders` - Order management
- `/api/admin/purchase-orders` - Purchase order management
- `/api/admin/retailers` - Retailer management
- `/api/admin/priorities` - Priority management
- `/api/retailer/access/[phoneNumber]` - Retailer access validation
- `/api/catalog/[catalogId]/products` - Catalog products
- `/api/orders` - Order submission

## 🔄 Workflow

### 1. Admin Setup
1. Access `/admin/login` with admin password
2. Create priority levels in `/admin/priorities`
3. Add products in `/admin/products`
4. Create catalogs and assign products in `/admin/catalogs`
5. Add retailers in `/admin/retailers`

### 2. Retailer Ordering Process
1. Admin creates retailer with priority and catalog access
2. Retailer receives catalog link: `/catalog/[phoneNumber]`
3. Retailer selects products and quantities (sets)
4. Retailer submits order
5. Order appears in admin dashboard

### 3. Order Processing
1. Admin reviews submitted orders in `/admin/orders`
2. Admin can approve, request changes, or reject orders
3. For approved orders, admin generates purchase order
4. PDF is generated with GST calculation
5. PO can be sent to retailer

## 🎯 Key Features

### Set-Based Ordering
- 1 Set = 5 Pieces (S-XXL sizes)
- Clear pricing display (per piece and per set)
- Automatic quantity calculations

### Priority System
- Expandable priority levels (R1, R2, R3, etc.)
- Priority-based discounts
- Access control based on priority

### Google Sheets Integration
- Retailer data sync with Google Sheets
- Automatic retailer updates
- Sheet row tracking

### PDF Generation
- Professional purchase order PDFs
- GST calculation and display
- Company branding and terms

### Security
- JWT-based authentication
- Admin-only access to management functions
- Phone number-based retailer access

## 🔧 Customization

### Adding New Priority Levels
1. Go to `/admin/priorities`
2. Click "Create New Priority"
3. Enter priority code, name, description, and discount
4. Save to add to the system

### Modifying PDF Templates
Edit `lib/pdf-generator.ts` to customize:
- Company information
- PDF layout and styling
- Terms and conditions
- Branding elements

### Google Sheets Integration
Configure Google Sheets API in `lib/google-sheets.ts`:
- Set up service account credentials
- Configure sheet IDs and ranges
- Implement sync logic

## 🚨 Security Considerations

1. **Environment Variables**: Keep `ADMIN_PASS` and `JWT_SECRET` secure
2. **Access Control**: All admin routes require authentication
3. **Data Validation**: Input validation on all forms
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **HTTPS**: Use HTTPS in production

## 📞 Support

For technical support or questions about the admin system, contact the development team.

---

**Ethnics by Aravalli** - Premium Ethnic Wear Manufacturer 