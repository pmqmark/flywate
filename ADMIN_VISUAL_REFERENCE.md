# Admin Panel - Visual Reference & Component Map

## 🎯 Page Navigation Map

```
/admin
├── /login                    ← Start here
│   └── Email + Password form
│       └── Success → Redirect to /dashboard
│
├── /dashboard               ← Main overview
│   ├── Stats Cards (5 types)
│   ├── Recent Orders Table
│   └── Navigation via Sidebar
│
├── /products                ← Product Management
│   ├── Product List View (default)
│   │   ├── Search bar
│   │   ├── Status filter
│   │   ├── Table (Image | Name | Price | Status | Actions)
│   │   ├── Pagination
│   │   └── Edit/Delete buttons
│   │
│   └── Add Product View (modal/route)
│       ├── Name input
│       ├── Description textarea
│       ├── Price input
│       ├── Category dropdown
│       ├── Stock dropdown
│       ├── Image upload
│       └── Save/Reset buttons
│
├── /orders                  ← Order Management
│   ├── Order List View (default)
│   │   ├── Search bar
│   │   ├── Status filter
│   │   ├── Table (Order# | Customer | Amount | Payment | Status | View)
│   │   ├── Status dropdown selector
│   │   ├── Pagination
│   │   └── View button
│   │
│   └── Order Details View
│       ├── Order number (copy button)
│       ├── Customer info card
│       ├── Products section
│       ├── Status dropdown
│       ├── Tracking ID section
│       │   └── Add/Update/Display tracking
│       └── Price summary sidebar
│
└── /reviews                 ← Review Management
    └── Review List View
        ├── Review cards
        │   ├── Customer name
        │   ├── Product name
        │   ├── Star rating
        │   ├── Review text
        │   └── Delete button
        └── Empty state (if no reviews)
```

## 🏗️ Component Hierarchy

```
AdminLayout (layout.tsx)
├── Sidebar
│   ├── Logo
│   └── Menu Items
│       ├── Dashboard
│       ├── Products
│       ├── Orders
│       ├── Reviews
│       └── Logout
│
├── Header
│   ├── Menu Button (mobile)
│   ├── Notification Icon
│   ├── Admin Name
│   └── Avatar
│
└── Main Content Area
    ├── Dashboard Page
    │   ├── StatsCard (x5)
    │   └── RecentOrdersTable
    │
    ├── Products Page
    │   ├── ProductList
    │   │   ├── SearchBar
    │   │   ├── FilterDropdown
    │   │   ├── Table
    │   │   │   ├── ProductRow (x multiple)
    │   │   │   └── ActionButtons
    │   │   └── Pagination
    │   │
    │   └── AddProduct
    │       ├── Form
    │       │   ├── InputField (x3)
    │       │   ├── TextArea
    │       │   ├── SelectDropdown (x2)
    │       │   └── ImageUpload
    │       └── ActionButtons
    │
    ├── Orders Page
    │   ├── OrderList
    │   │   ├── SearchBar
    │   │   ├── FilterDropdown
    │   │   ├── Table
    │   │   │   ├── OrderRow (x multiple)
    │   │   │   └── StatusDropdown
    │   │   └── Pagination
    │   │
    │   └── OrderDetails
    │       ├── OrderNumberCard
    │       ├── CustomerInfoCard
    │       ├── ProductsSection
    │       ├── StatusUpdateSection
    │       ├── TrackingSection
    │       │   └── TrackingForm or TrackingDisplay
    │       └── PriceSummarySidebar
    │
    └── Reviews Page
        └── ReviewList
            ├── ReviewCard (x multiple)
            │   ├── ProductName
            │   ├── CustomerInfo
            │   ├── RatingStars
            │   ├── ReviewText
            │   └── DeleteButton
            └── EmptyState (conditional)
```

## 📐 Layout Grid System

### Desktop Layout (> 1024px)
```
┌─────────────────────────────────────────────┐
│         Header (height: 80px)               │
├──────┬──────────────────────────────────────┤
│      │                                      │
│      │                                      │
│ 25%  │        Main Content Area             │
│      │               75%                    │
│      │                                      │
│      │                                      │
└──────┴──────────────────────────────────────┘
```

### Tablet Layout (768px - 1024px)
```
┌──────────────────────────────────────┐
│     Header (height: 80px)           │
├──────────────────────────────────────┤
│ Sidebar    │  Main Content Area    │
│(hidden)    │       (full)          │
│(hamburger) │                       │
└──────────────────────────────────────┘
```

### Mobile Layout (< 768px)
```
┌────────────────────┐
│  Header (h: 64px)  │
├────────────────────┤
│ Main Content Area  │
│    (full width)    │
│                    │
│ (Sidebar as modal) │
└────────────────────┘
```

## 🎨 Color Reference

### Button States
```
Primary Button:
- Default:  bg-primary (cyan)
- Hover:    bg-primary/90 (darker)
- Disabled: bg-primary/50 (muted)
- Text:     text-background (dark)

Secondary Button:
- Default:  bg-primary/10 + border-primary/30
- Hover:    bg-primary/20
- Text:     text-white

Danger Button:
- Default:  bg-red-500/20 + border-red-500/30
- Hover:    bg-red-500/30
- Text:     text-red-400

Success Button:
- Default:  bg-green-500/20 + border-green-500/30
- Text:     text-green-400
```

### Status Badge Colors
```
In Stock:     bg-green-500/20  text-green-400   🟢
Low Stock:    bg-yellow-500/20 text-yellow-400 🟡
Out of Stock: bg-red-500/20    text-red-400    🔴

Pending:      bg-yellow-500/20 text-yellow-400 ⏳
Shipped:      bg-blue-500/20   text-blue-400   📦
Delivered:    bg-green-500/20  text-green-400  ✅

Paid:         bg-green-500/20  text-green-400  ✓
Failed:       bg-red-500/20    text-red-400    ✗
```

## 📊 Data Display Patterns

### Table Row Hover Effect
```
Normal:    bg-transparent
Hover:     bg-primary/5 (slight highlight)
Transition: ease-in-out 300ms
```

### Card Hover Effect
```
Normal Border:    border-primary/20
Hover Border:     border-primary/40
Transition:       smooth
Shadow:           Added on desktop
```

### Input Focus State
```
Default Border:   border-primary/20
Focus Border:     border-primary (full opacity)
Background:       bg-primary/10 (subtle highlight)
Transition:       smooth 200ms
```

## 🎭 Component Size Reference

### Buttons
```
Small (sm):
- Padding:    px-3 py-1.5
- Font Size:  text-sm
- Height:     ~28px

Medium (md):
- Padding:    px-4 py-2
- Font Size:  text-base
- Height:     ~36px

Large (lg):
- Padding:    px-6 py-3
- Font Size:  text-lg
- Height:     ~44px
```

### Input Fields
```
Height:           40-48px
Padding:          px-4 py-2.5
Border Radius:    6px
Font Size:        14px
```

### Cards & Containers
```
Border Radius:    8-10px
Padding:          p-6 (24px)
Border Width:     1px
Background:       bg-primary/5 or bg-background
```

## 🔄 User Flow Examples

### Add Product Flow
```
1. Admin navigates to /admin/products
2. Clicks "+ Add Product" button
3. Form appears (modal or page switch)
4. Fills in product details
5. Uploads product image
6. Clicks "Save Product"
7. Toast notification shows success
8. Returns to product list
9. New product appears in table
```

### Update Order Status Flow
```
1. Admin goes to /admin/orders
2. Clicks "View" on an order
3. Navigates to order details page
4. Sees current order status
5. Clicks status dropdown
6. Selects new status (e.g., Shipped)
7. Optionally adds tracking ID
8. Clicks "Save Changes"
9. Receives confirmation
10. Status updates in UI
```

### Delete Review Flow
```
1. Admin goes to /admin/reviews
2. Sees review cards
3. Clicks "Delete" on a review
4. Confirmation modal appears
5. Reviews changes with confirmation
6. Review is removed from list
7. Empty state shows (if no reviews left)
```

## 🎯 Accessibility Features

```
✓ Semantic HTML (buttons, inputs, labels)
✓ ARIA labels where needed
✓ Keyboard navigation support
✓ Focus states visible
✓ Color not sole indicator
✓ Sufficient contrast ratios
✓ Form validation messages
✓ Error states clearly marked
✓ Loading states announced
✓ Icons paired with text labels
```

## 📱 Responsive Behavior

### Mobile (< 768px)
- Sidebar: Hidden by default, slide-out drawer
- Tables: Horizontal scroll
- Forms: Single column
- Buttons: Full width
- Modals: Full screen
- Font sizes: Slightly larger

### Tablet (768px - 1024px)
- Sidebar: Can be toggled visible
- Tables: Adaptive columns
- Forms: Two column where space allows
- Grid: 2 column layouts
- Some condensed spacing

### Desktop (> 1024px)
- Sidebar: Always visible
- Tables: Full columns visible
- Forms: Multi-column layouts
- Grid: 3+ column layouts
- Full spacing and typography

## 🧪 Testing Scenarios

### Login
```
✓ Valid email and password → Success
✓ Invalid credentials → Error message
✓ Empty fields → Validation error
✓ Loading state displays → Spinner shows
✓ Can copy email/password hint
```

### Product Management
```
✓ Add product with all fields
✓ Add product with missing required fields → Validation
✓ Upload image and preview
✓ Edit existing product
✓ Delete product with confirmation
✓ Search by product name
✓ Filter by status
✓ Pagination works correctly
```

### Order Management
```
✓ View order list
✓ Search by order number
✓ Search by customer name
✓ Filter by status
✓ Update order status
✓ Add tracking ID
✓ Copy order number
✓ Copy tracking ID
✓ See price calculations
```

### Reviews
```
✓ View all reviews
✓ See star ratings
✓ Delete review with confirmation
✓ Empty state when no reviews
```

---

**Visual Guide Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** Complete Reference
