'use client';

import React, { useState } from 'react';
import PublicButton from '@/components/common/ui/PublicButton';
import OrderStatusBadge from '@/components/common/ui/OrderStatusBadge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(true);

  // Mock order data - in real app, this would come from backend
  const mockOrders: Record<string, {
    orderNumber: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'failed';
    trackingId: string;
    courierName: string;
    estimatedDelivery: string;
    orderDate: string;
    items: number;
    totalAmount: number;
    steps: Array<{
      label: string;
      completed: boolean;
      date: string;
    }>;
  }> = {
    'ORD-2024-001234': {
      orderNumber: 'ORD-2024-001234',
      status: 'shipped',
      trackingId: 'BLUEDART12345',
      courierName: 'Blue Dart Express',
      estimatedDelivery: 'December 12, 2025',
      orderDate: 'December 8, 2025',
      items: 3,
      totalAmount: 5999,
      steps: [
        { label: 'Order Placed', completed: true, date: 'Dec 8, 2025' },
        { label: 'Processing', completed: true, date: 'Dec 9, 2025' },
        { label: 'Shipped', completed: true, date: 'Dec 9, 2025' },
        { label: 'Delivered', completed: false, date: 'Dec 12, 2025 (Expected)' },
      ],
    },
  };

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      alert('Please enter an order number');
      return;
    }

    const order = mockOrders[orderNumber.toUpperCase()];
    setSearched(true);
    setFound(!!order);
  };

  const currentOrder = mockOrders[orderNumber.toUpperCase()];

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-primary/5'>
      {/* Navigation */}
      <div className='bg-background border-b border-primary/20 sticky top-0 z-40 w-full'>
        <div className='max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            Flywate
          </Link>
          <div className='flex items-center gap-4'>
            <span className='text-white/60 text-sm'>Track Your Order</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 md:px-8 py-12'>
        {!searched ? (
          <>
            {/* Search Section */}
            <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 mb-8'>
              <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
                  Track Your Order
                </h1>
                <p className='text-white/60 text-lg'>
                  Enter your order number to track delivery status
                </p>
              </div>

              {/* Input Section */}
              <div className='max-w-md mx-auto'>
                <label className='block text-white font-semibold mb-3'>
                  Order Number
                </label>
                <input
                  type='text'
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                  placeholder='e.g., ORD-2024-001234'
                  className='w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary mb-6 transition'
                />
                <PublicButton
                  onClick={handleTrackOrder}
                  variant='primary'
                  size='lg'
                  className='w-full'
                >
                  Track Order
                </PublicButton>
              </div>

              {/* Demo Info */}
              <div className='mt-12 text-center'>
                <p className='text-white/60 text-sm mb-3'>
                  Demo order number to try:
                </p>
                <button
                  onClick={() => {
                    setOrderNumber('ORD-2024-001234');
                  }}
                  className='text-primary hover:underline font-semibold text-sm'
                >
                  ORD-2024-001234
                </button>
              </div>
            </div>
          </>
        ) : !found ? (
          // Order Not Found
          <div className='bg-red-500/5 border border-red-500/20 rounded-2xl p-8 md:p-12 text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 mb-6'>
              <span className='text-5xl'>❌</span>
            </div>

            <h2 className='text-3xl font-bold text-white mb-3'>
              Order Not Found
            </h2>
            <p className='text-white/60 text-lg mb-2'>
              We couldn&apos;t find an order with this number
            </p>
            <p className='text-white/50 text-sm mb-8'>
              Please check your order number and try again
            </p>

            <div className='flex gap-4 flex-col md:flex-row justify-center'>
              <PublicButton
                onClick={() => {
                  setSearched(false);
                  setOrderNumber('');
                  setFound(true);
                }}
                variant='primary'
                size='lg'
              >
                Try Again
              </PublicButton>
              <PublicButton
                onClick={() => router.push('/')}
                variant='secondary'
                size='lg'
              >
                Back to Home
              </PublicButton>
            </div>
          </div>
        ) : (
          // Order Found - Tracking Details
          <div className='space-y-8'>
            {/* Header */}
            <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                <div>
                  <p className='text-white/60 text-sm mb-2'>Order Number</p>
                  <h2 className='text-3xl md:text-4xl font-bold text-primary'>
                    {currentOrder.orderNumber}
                  </h2>
                  <p className='text-white/60 text-sm mt-2'>
                    Ordered on {currentOrder.orderDate}
                  </p>
                </div>
                <OrderStatusBadge status={currentOrder.status} size='lg' />
              </div>
            </div>

            {/* Progress Stepper */}
            <div className='bg-background border border-primary/20 rounded-2xl p-8'>
              <h3 className='text-white font-bold mb-8'>Delivery Progress</h3>
              <div className='space-y-6'>
                {currentOrder.steps.map((step: { label: string; completed: boolean; date: string }, index: number) => (
                  <div key={index} className='flex gap-4'>
                    {/* Step Circle */}
                    <div className='flex-shrink-0 flex flex-col items-center'>
                      <div
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg ${
                          step.completed
                            ? 'bg-green-500/20 border-green-500/50 text-green-400'
                            : 'bg-white/5 border-white/20 text-white/60'
                        }`}
                      >
                        {step.completed ? '✓' : index + 1}
                      </div>
                      {index < currentOrder.steps.length - 1 && (
                        <div
                          className={`w-1 h-12 my-2 ${
                            step.completed
                              ? 'bg-green-500/30'
                              : 'bg-white/10'
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className='flex-1 pt-1'>
                      <p
                        className={`font-semibold ${
                          step.completed
                            ? 'text-green-300'
                            : 'text-white/60'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className='text-white/50 text-sm'>{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Tracking ID */}
              <div className='bg-background border border-primary/20 rounded-lg p-6'>
                <p className='text-white/60 text-sm mb-3'>Tracking ID</p>
                <div className='flex items-center gap-3'>
                  <span className='text-2xl font-bold text-primary'>
                    {currentOrder.trackingId}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentOrder.trackingId);
                    }}
                    className='px-3 py-2 bg-primary/20 border border-primary/30 hover:bg-primary/30 rounded text-primary text-xs font-medium transition'
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Courier Info */}
              <div className='bg-background border border-primary/20 rounded-lg p-6'>
                <p className='text-white/60 text-sm mb-3'>Courier Company</p>
                <p className='text-xl font-semibold text-white'>
                  {currentOrder.courierName}
                </p>
              </div>

              {/* Estimated Delivery */}
              <div className='bg-background border border-primary/20 rounded-lg p-6'>
                <p className='text-white/60 text-sm mb-3'>Estimated Delivery</p>
                <p className='text-xl font-semibold text-white'>
                  {currentOrder.estimatedDelivery}
                </p>
              </div>

              {/* Order Summary */}
              <div className='bg-background border border-primary/20 rounded-lg p-6'>
                <p className='text-white/60 text-sm mb-3'>Order Summary</p>
                <p className='text-white font-semibold mb-1'>
                  {currentOrder.items} item(s)
                </p>
                <p className='text-primary text-lg font-bold'>
                  ₹{currentOrder.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
              <p className='text-white/70 text-sm'>
                💡 <strong>Tip:</strong> Use your tracking ID on the courier
                company&apos;s website for real-time updates on your delivery.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 flex-col md:flex-row'>
              <PublicButton
                onClick={() => {
                  setSearched(false);
                  setOrderNumber('');
                  setFound(true);
                }}
                variant='secondary'
                size='lg'
                className='flex-1'
              >
                Track Another Order
              </PublicButton>
              <PublicButton
                onClick={() => router.push('/')}
                variant='primary'
                size='lg'
                className='flex-1'
              >
                Back to Home
              </PublicButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
