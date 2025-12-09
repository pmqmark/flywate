'use client';

import React, { useState } from 'react';
import Button from '@/app/admin/components/shared/Button';
import { MdContentCopy, MdCheckCircle } from 'react-icons/md';

interface OrderProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderDetails() {
  const [orderStatus, setOrderStatus] = useState<'pending' | 'shipped' | 'delivered'>('pending');
  const [trackingId, setTrackingId] = useState('');
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [savedTrackingId, setSavedTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  // Mock data
  const orderNumber = 'ORD-2024-001234';
  const customerInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
  };

  const products: OrderProduct[] = [
    {
      id: 1,
      name: 'Flywate Nylon Shuttle - Professional',
      quantity: 2,
      price: 299.99,
    },
    {
      id: 2,
      name: 'Flywate Badminton Racket - Carbon',
      quantity: 1,
      price: 599.99,
    },
  ];

  const subtotal = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveTracking = () => {
    setSavedTrackingId(trackingId);
    setShowTrackingForm(false);
  };

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Order Details</h1>
        <p className='text-white/60'>Manage order information and tracking</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Order Number Card */}
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
            <h2 className='text-xl font-bold text-white mb-4'>Order Number</h2>
            <div className='flex items-center gap-3 bg-background border border-primary/20 rounded-lg p-4'>
              <div>
                <p className='text-white/60 text-sm'>Order ID</p>
                <p className='text-2xl font-bold text-primary'>{orderNumber}</p>
              </div>
              <button
                onClick={handleCopyOrderNumber}
                className='ml-auto p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition'
                title='Copy to clipboard'
              >
                {copied ? (
                  <MdCheckCircle className='text-green-400 text-2xl' />
                ) : (
                  <MdContentCopy className='text-primary text-2xl' />
                )}
              </button>
            </div>
          </div>

          {/* Customer Info Card */}
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
            <h2 className='text-xl font-bold text-white mb-4'>Customer Information</h2>
            <div className='space-y-3'>
              <div>
                <p className='text-white/60 text-sm'>Name</p>
                <p className='text-white font-medium'>{customerInfo.name}</p>
              </div>
              <div>
                <p className='text-white/60 text-sm'>Email</p>
                <p className='text-white font-medium'>{customerInfo.email}</p>
              </div>
              <div>
                <p className='text-white/60 text-sm'>Phone</p>
                <p className='text-white font-medium'>{customerInfo.phone}</p>
              </div>
              <div>
                <p className='text-white/60 text-sm'>Delivery Address</p>
                <p className='text-white font-medium'>{customerInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
            <h2 className='text-xl font-bold text-white mb-4'>Products</h2>
            <div className='space-y-4'>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='flex items-center justify-between pb-4 border-b border-primary/10 last:border-0'
                >
                  <div>
                    <p className='text-white font-medium'>{product.name}</p>
                    <p className='text-white/60 text-sm'>
                      Qty: {product.quantity}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-white font-semibold'>
                      ${(product.quantity * product.price).toFixed(2)}
                    </p>
                    <p className='text-white/60 text-sm'>
                      ${product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
            <h2 className='text-xl font-bold text-white mb-4'>Update Order Status</h2>
            <select
              value={orderStatus}
              onChange={(e) =>
                setOrderStatus(e.target.value as 'pending' | 'shipped' | 'delivered')
              }
              className='w-full bg-background border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary'
            >
              <option value='pending'>🟡 Pending</option>
              <option value='shipped'>🔵 Shipped</option>
              <option value='delivered'>🟢 Delivered</option>
            </select>
            <p className='text-white/60 text-sm mt-3'>
              Current status: <span className='text-white font-medium capitalize'>{orderStatus}</span>
            </p>
          </div>

          {/* Tracking ID */}
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
            <h2 className='text-xl font-bold text-white mb-4'>Tracking Information</h2>
            {savedTrackingId ? (
              <div className='bg-green-500/10 border border-green-500/30 rounded-lg p-4'>
                <p className='text-green-400 text-sm mb-2'>Tracking ID</p>
                <div className='flex items-center gap-3'>
                  <p className='text-white font-mono font-bold text-lg'>
                    {savedTrackingId}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(savedTrackingId);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className='p-2 bg-green-500/20 hover:bg-green-500/30 rounded transition'
                  >
                    <MdContentCopy className='text-green-400' />
                  </button>
                </div>
                <button
                  onClick={() => setShowTrackingForm(true)}
                  className='text-green-400 text-sm mt-3 hover:underline'
                >
                  Update Tracking ID
                </button>
              </div>
            ) : showTrackingForm ? (
              <div className='space-y-4'>
                <input
                  type='text'
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder='Enter tracking ID (e.g., UPS123456789)'
                  className='w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary'
                />
                <div className='flex gap-3'>
                  <Button
                    variant='primary'
                    onClick={handleSaveTracking}
                    className='flex-1'
                  >
                    Save Tracking ID
                  </Button>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setShowTrackingForm(false);
                      setTrackingId('');
                    }}
                    className='flex-1'
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant='secondary'
                onClick={() => setShowTrackingForm(true)}
                className='w-full'
              >
                Add Tracking ID
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar - Price Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6 sticky top-24'>
            <h2 className='text-xl font-bold text-white mb-6'>Order Summary</h2>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-white/60'>Subtotal</span>
                <span className='text-white font-medium'>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-white/60'>Tax (10%)</span>
                <span className='text-white font-medium'>${tax.toFixed(2)}</span>
              </div>
              <div className='border-t border-primary/10 pt-4 flex justify-between'>
                <span className='text-white font-bold'>Total</span>
                <span className='text-primary font-bold text-xl'>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Save Button */}
            <Button variant='primary' className='w-full mt-6'>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
