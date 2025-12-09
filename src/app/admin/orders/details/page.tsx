'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Modal from '@/app/admin/components/shared/Modal';
import Button from '@/app/admin/components/shared/Button';

function AdminOrderDetailsContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || '1';

  // Mock order data
  const [order, setOrder] = useState({
    id: orderId,
    orderNumber: 'ORD-2024-001234',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    status: 'shipped',
    paymentMethod: 'Bank Transfer',
    totalAmount: 5999,
    products: [
      { id: 1, name: 'Product A', quantity: 2, price: 2499 },
      { id: 2, name: 'Product B', quantity: 1, price: 1001 },
    ],
    trackingId: 'BLUEDART12345',
    courierName: 'Blue Dart Express',
    estimatedDelivery: 'December 12, 2025',
    orderDate: 'December 8, 2025',
  });

  const [tempTrackingId, setTempTrackingId] = useState(order.trackingId);
  const [tempStatus, setTempStatus] = useState(order.status);
  const [tempCourier, setTempCourier] = useState(order.courierName);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveTracking = () => {
    setOrder({
      ...order,
      trackingId: tempTrackingId,
      status: tempStatus,
      courierName: tempCourier,
    });
    setSuccessMessage('Order details updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleModalConfirm = () => {
    handleSaveTracking();
    setShowModal(false);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const courierOptions = [
    'Blue Dart Express',
    'FedEx',
    'DHL',
    'DTDC',
    'Speedpost',
    'Other',
  ];

  return (
    <div className='flex-1 p-6 md:p-8 bg-background overflow-auto'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>Order Details</h1>
          <p className='text-white/60'>
            Order #{order.orderNumber} - Manage tracking and status
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className='mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg'>
            <p className='text-green-300 font-semibold'>✓ {successMessage}</p>
          </div>
        )}

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Order Summary Card */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Order Information
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Order Number</p>
                  <p className='text-xl font-bold text-primary'>
                    {order.orderNumber}
                  </p>
                </div>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Order Date</p>
                  <p className='text-white font-semibold'>{order.orderDate}</p>
                </div>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Total Amount</p>
                  <p className='text-white font-semibold'>₹{order.totalAmount}</p>
                </div>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Payment Method</p>
                  <p className='text-white font-semibold'>
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-white mb-6'>
                Customer Information
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Name</p>
                  <p className='text-white font-semibold'>{order.customerName}</p>
                </div>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Email</p>
                  <p className='text-white font-semibold'>{order.customerEmail}</p>
                </div>
                <div className='md:col-span-2'>
                  <p className='text-white/60 text-sm mb-2'>Phone</p>
                  <p className='text-white font-semibold'>{order.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-white mb-6'>Products</h3>

              <div className='space-y-4'>
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className='flex items-center justify-between p-4 bg-background rounded-lg border border-white/10'
                  >
                    <div className='flex-1'>
                      <p className='text-white font-semibold'>{product.name}</p>
                      <p className='text-white/60 text-sm'>
                        Qty: {product.quantity}
                      </p>
                    </div>
                    <p className='text-primary font-bold'>₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Tracking & Status */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Status Update */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <h3 className='text-lg font-bold text-white mb-4'>Order Status</h3>

              <select
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value)}
                className='w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary mb-6'
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full'>
                <span className='w-2 h-2 bg-primary rounded-full animate-pulse' />
                <span className='text-primary font-semibold text-sm capitalize'>
                  {tempStatus}
                </span>
              </div>
            </div>

            {/* Tracking ID */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <h3 className='text-lg font-bold text-white mb-4'>Tracking ID</h3>

              <label className='block text-white/60 text-sm mb-2'>
                Tracking Number
              </label>
              <input
                type='text'
                value={tempTrackingId}
                onChange={(e) => setTempTrackingId(e.target.value)}
                placeholder='e.g., BLUEDART12345'
                className='w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary mb-4'
              />

              <label className='block text-white/60 text-sm mb-2'>
                Courier Company
              </label>
              <select
                value={tempCourier}
                onChange={(e) => setTempCourier(e.target.value)}
                className='w-full px-4 py-2 bg-background border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary mb-6'
              >
                {courierOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {order.trackingId && (
                <div className='p-3 bg-green-500/10 border border-green-500/20 rounded-lg'>
                  <p className='text-green-300 text-xs font-semibold'>
                    ✓ Current: {order.trackingId}
                  </p>
                </div>
              )}
            </div>

            {/* Estimated Delivery */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <h3 className='text-lg font-bold text-white mb-4'>
                Estimated Delivery
              </h3>
              <p className='text-white font-semibold'>
                {order.estimatedDelivery}
              </p>
            </div>

            {/* Save Button */}
            <Button
              onClick={() => setShowModal(true)}
              variant='primary'
              className='w-full'
            >
              Save Tracking Details
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          title='Save Changes'
          onClose={() => setShowModal(false)}
          onConfirm={handleModalConfirm}
          confirmText='Save'
        >
          <p className='text-white/80'>
            Are you sure you want to update the order status and tracking details?
          </p>
        </Modal>
      )}
    </div>
  );
}

export default function AdminOrderDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className='flex-1 p-6 md:p-8 bg-background overflow-auto'>
          <div className='max-w-6xl mx-auto'>
            <div className='h-8 bg-white/10 rounded w-48 mb-4 animate-pulse' />
            <div className='h-4 bg-white/5 rounded w-96 mb-8 animate-pulse' />
            <div className='space-y-4'>
              <div className='h-32 bg-white/5 rounded animate-pulse' />
              <div className='h-32 bg-white/5 rounded animate-pulse' />
            </div>
          </div>
        </div>
      }
    >
      <AdminOrderDetailsContent />
    </Suspense>
  );
}
