# Admin Panel Documentation

## Overview
The Flywate admin panel is a complete management system for handling products, orders, reviews, and customer operations. Built with Next.js, React, and Tailwind CSS.

## 📁 Directory Structure
```
src/app/admin/
├── login/
│   └── page.tsx                 # Admin login page
├── dashboard/
│   └── page.tsx                 # Dashboard home
├── products/
│   └── page.tsx                 # Products management
├── orders/
│   └── page.tsx                 # Orders management
├── reviews/
│   └── page.tsx                 # Reviews management
├── layout.tsx                    # Admin layout wrapper
└── components/
    ├── shared/
    │   ├── Sidebar.tsx          # Navigation sidebar
    │   ├── Header.tsx           # Top header
    │   ├── Button.tsx           # Reusable button
    │   └── Modal.tsx            # Confirmation modal
    ├── products/
    │   ├── AddProduct.tsx       # Add product form
    │   └── ProductList.tsx      # Product list table
    ├── orders/
    │   ├── OrderList.tsx        # Order list table
    │   └── OrderDetails.tsx     # Order details & tracking
    └── reviews/
        └── ReviewList.tsx        # Review list table
```

## 🔐 Login Page (`/admin/login`)

### Features
- Email and password input fields
- Icon-based input design
- Error message display
- Loader animation on submit
- Centered card layout with gradient background
- Form validation

### Usage
```tsx
import AdminLogin from '@/app/admin/login/page';
```

## 📊 Dashboard (`/admin/dashboard`)

### Stats Cards
- **Total Orders**: Display total number of orders
- **Pending Orders**: Count of pending orders
- **Delivered Orders**: Count of delivered orders
- **Total Products**: Number of products in catalog
- **Total Reviews**: Number of customer reviews

### Recent Orders Table
Displays the 4 most recent orders with:
- Order ID
- Customer name
- Order amount
- Order status badge

## 📦 Product Management

### Add Product Form (`/admin/products?view=add`)
**Form Fields:**
- Product Name (required)
- Description (textarea)
- Price (required)
- Category dropdown
- Stock Status dropdown
- Product Image upload with preview
- Save and Reset buttons

### Product List (`/admin/products`)
**Features:**
- Table with columns: Image, Name, Price, Status, Actions
- Search functionality by product name
- Filter by status (In Stock, Low Stock, Out of Stock)
- Pagination with page numbers
- Edit and Delete buttons per product
- Delete confirmation modal

**Mock Data Structure:**
```tsx
interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}
```

## 🛒 Order Management

### Order List (`/admin/orders`)
**Features:**
- Table with columns: Order #, Customer, Amount, Payment Status, Order Status, View Button
- Search by order number or customer name
- Filter by order status (Pending, Shipped, Delivered)
- Status dropdown for quick updates
- View Order Details button
- Pagination

**Mock Data Structure:**
```tsx
interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'delivered';
  date: string;
}
```

### Order Details (`/admin/orders/[id]`)
**Features:**

#### Order Number Card
- Displays auto-generated order number
- Copy-to-clipboard button with visual feedback

#### Customer Information
- Customer name
- Email address
- Phone number
- Delivery address

#### Products Section
- Product name
- Quantity
- Unit price
- Total price per product

#### Update Order Status
- Dropdown to change status: Pending → Shipped → Delivered
- Real-time status update

#### Tracking Information
- Add tracking ID field
- Save/Update tracking ID
- Display saved tracking ID with copy button
- Visual confirmation (green badge)

#### Price Summary Sidebar
- Subtotal
- Tax calculation (10%)
- Total amount
- Save changes button

**Mock Data Structure:**
```tsx
interface OrderProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
```

## ⭐ Review Management

### Review List (`/admin/reviews`)
**Features:**
- Card-based layout for each review
- Customer name and product name
- Star rating display (1-5 stars)
- Review message
- Delete button per review
- Delete confirmation modal
- Empty state UI when no reviews exist

**Mock Data Structure:**
```tsx
interface Review {
  id: number;
  customerName: string;
  productName: string;
  rating: number;
  message: string;
  date: string;
}
```

## 🎨 Shared Components

### Button Component
```tsx
<Button 
  variant='primary' | 'secondary' | 'danger' | 'success'
  size='sm' | 'md' | 'lg'
  loading={boolean}
  disabled={boolean}
  onClick={handleClick}
  type='button' | 'submit' | 'reset'
>
  Button Text
</Button>
```

### Modal Component
```tsx
<Modal
  isOpen={boolean}
  title='Modal Title'
  onClose={handleClose}
  onConfirm={handleConfirm}
  confirmText='Confirm'
  confirmVariant='primary' | 'danger'
>
  Modal content here
</Modal>
```

### Sidebar Component
- Auto-routes based on pathname
- Mobile responsive with overlay
- Menu items: Dashboard, Products, Orders, Reviews, Logout
- Smooth transitions

### Header Component
- Admin name display
- Notification icon with badge
- Admin avatar with initials
- Hamburger menu for mobile

## 🎯 Key Features Implemented

✅ **Authentication**
- Login page with email/password
- Error handling
- Loading states

✅ **Dashboard**
- Statistics overview
- Recent orders preview
- Icon-based stat cards

✅ **Product Management**
- Full CRUD interface
- Image upload UI
- Search and filter
- Pagination

✅ **Order Management**
- Order list with advanced filtering
- Detailed order view
- Automatic order number generation display
- Order status tracking
- Tracking ID management
- Customer information display
- Price summary calculation

✅ **Review Management**
- Review list with star ratings
- Delete functionality
- Empty state handling

✅ **UI/UX**
- Dark theme matching main website
- Responsive design
- Loading states
- Confirmation modals
- Icon-based navigation
- Smooth transitions

## 🚀 Future Enhancements

1. **API Integration**
   - Connect to real database
   - Authentication/Authorization
   - Real-time data updates

2. **Advanced Features**
   - Bulk actions for products
   - Order analytics/charts
   - Export functionality
   - Email notifications
   - Inventory management alerts

3. **User Management**
   - Multiple admin accounts
   - Role-based access control
   - Activity logging

4. **Additional Pages**
   - Customer management
   - Reports & analytics
   - Settings page
   - Backup & restore

## 📱 Responsive Design
All pages are fully responsive:
- Mobile (< 768px): Sidebar collapses to hamburger menu
- Tablet (768px - 1024px): Adaptive layout
- Desktop (> 1024px): Full sidebar visible

## 🎨 Color Scheme
- **Primary Color**: Cyan/Teal (used for highlights and active states)
- **Background**: Dark background (from main site)
- **Status Colors**:
  - Pending: Yellow
  - Shipped: Blue
  - Delivered: Green
  - Paid: Green
  - Failed: Red

## 📝 Notes
- All data is currently mock/static
- Ready for API integration
- Forms handle validation errors
- Copy-to-clipboard functionality includes visual feedback
- Modals require confirmation before actions
