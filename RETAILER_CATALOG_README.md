# Retailer Catalog Page

A mobile-friendly catalog page for retailers to browse products and place orders.

## Features

### 📱 Mobile-First Design
- Responsive layout optimized for mobile devices
- Large, tappable buttons (minimum 44x44px)
- Easy-to-read text and intuitive icons
- Sticky header and bottom order summary

### 🛍️ Product Display
Each product card shows:
- **Product Image**: Primary image with fallback
- **Product Name & Code**: Clear identification
- **Color & Fabric**: Visual badges with icons (🎨 for color, ✂️ for fabric)
- **Pricing**: Both per piece and per set prices
- **MOQ Information**: Clear minimum order quantity (1 set = 5 pieces)
- **Quantity Selector**: +/- buttons for easy quantity adjustment

### 📦 Order Management
- **Set-based ordering**: 1 set = 5 pieces (S to XXL sizes)
- **Real-time calculations**: Auto-updates totals as quantities change
- **Visual feedback**: Green summary box shows current item totals
- **Order summary**: Sticky bottom bar with complete order details

### 💰 Pricing
- **Base prices**: All prices shown are final amounts
- **Total amount**: Sum of all selected products
- **Currency**: All amounts in Indian Rupees (₹)

### 🎯 User Experience
- **Intuitive icons**: 📦 for sets, 🧵 for fabric, 🎨 for color
- **Loading states**: Visual feedback during API calls
- **Error handling**: Clear error messages with icons
- **Accessibility**: ARIA labels and keyboard navigation
- **Empty states**: Helpful messages when no products available

## Technical Implementation

### API Endpoints
- `POST /api/retailer/catalog-access`: Authenticate retailer and fetch catalog data
- `POST /api/orders`: Submit completed orders

### Data Flow
1. **Authentication**: Retailer enters phone number to access catalog
2. **Catalog Loading**: Fetches catalog details and associated products
3. **Product Browsing**: Display products with quantity selectors
4. **Order Building**: Real-time calculation of totals
5. **Order Submission**: Send order data to backend with complete summary

### State Management
- **Catalog Data**: Catalog info and product list
- **Order Items**: Selected products with quantities
- **Order Summary**: Calculated totals and pricing
- **UI States**: Loading, error, and submission states

### Key Components
- **Product Cards**: Individual product display with all details
- **Quantity Selector**: +/- buttons with visual feedback
- **Order Summary Bar**: Sticky bottom bar with totals
- **Submit Button**: Order submission with loading state

## Usage

### For Retailers
1. Navigate to `/retailer/catalog/[catalogCode]`
2. Enter your registered phone number
3. Browse products in the catalog
4. Use +/- buttons to select quantities
5. Review order summary at bottom
6. Click "Submit Order" to complete purchase

### For Administrators
1. Create catalogs in admin panel
2. Add products to catalogs
3. Assign catalog access to retailers
4. Monitor orders through admin dashboard

## Mobile Optimization

### Touch Targets
- All buttons are minimum 44x44px
- Large text for easy reading
- Adequate spacing between interactive elements

### Layout
- Single column layout on mobile
- Sticky elements for easy access
- Bottom navigation for order summary
- Responsive images and cards

### Performance
- Optimized image loading
- Efficient state updates
- Minimal API calls
- Fast order submission

## Accessibility

### Screen Readers
- ARIA labels on interactive elements
- Semantic HTML structure
- Clear error messages
- Descriptive button text

### Keyboard Navigation
- Tab order follows logical flow
- Focus indicators on all interactive elements
- Keyboard shortcuts for quantity adjustment

### Visual Design
- High contrast text
- Clear visual hierarchy
- Consistent color coding
- Intuitive icon usage 