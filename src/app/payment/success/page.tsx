'use client';

import React, { useState } from 'react';
import PublicButton from '@/components/common/ui/PublicButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  // Mock order data
  const orderId = 'ORD-2024-001234';
  const customerEmail = 'customer@example.com';
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-4'>
      {/* Navigation */}
      <div className='bg-background border-b border-primary/20 sticky top-0 z-40 w-full fixed'>
        <div className='max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            Flywate
          </Link>
          <div className='flex items-center gap-4'>
            <span className='text-green-400 text-sm font-semibold'>
              Order Confirmed ✓
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-2xl w-full mt-32 md:mt-0'>
        <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12'>
          {/* Success Icon */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 mb-6'>
              <span className='text-5xl'>✅</span>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
              Order Confirmed!
            </h1>
            <p className='text-white/60 text-lg'>
              Your payment has been received and your order is confirmed
            </p>
          </div>

          {/* Order Details Card */}
          <div className='bg-background border border-primary/20 rounded-lg p-8 mb-8'>
            {/* Order ID Section */}
            <div className='mb-8'>
              <p className='text-white/60 text-sm mb-2'>Order ID</p>
              <div className='flex items-center gap-3'>
                <span className='text-2xl md:text-3xl font-bold text-primary'>
                  {orderId}
                </span>
                <button
                  onClick={handleCopyOrderId}
                  className='ml-auto px-4 py-2 bg-primary/20 border border-primary/30 hover:bg-primary/30 rounded-lg transition-colors text-white text-sm font-medium flex items-center gap-2'
                >
                  {copiedOrderId ? (
                    <>
                      <span>✓</span>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <span>📋</span>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className='border-t border-white/10 pt-8'>
              {/* Order Details Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                {/* Order Date */}
                <div>
                  <p className='text-white/60 text-sm mb-2'>Order Date</p>
                  <p className='text-white font-semibold'>{orderDate}</p>
                </div>

                {/* Order Status */}
                <div>
                  <p className='text-white/60 text-sm mb-2'>Order Status</p>
                  <div className='inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full'>
                    <span className='w-2 h-2 bg-green-400 rounded-full' />
                    <span className='text-green-300 font-semibold text-sm'>
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className='bg-primary/5 border border-primary/20 rounded-lg p-4'>
                <div className='flex gap-3'>
                  <span className='text-xl'>✉️</span>
                  <div className='flex-1'>
                    <p className='text-white font-semibold mb-1'>
                      Confirmation Email Sent
                    </p>
                    <p className='text-white/70 text-sm'>
                      A detailed confirmation email has been sent to{' '}
                      <span className='text-primary'>{customerEmail}</span>
                    </p>
                    <p className='text-white/50 text-xs mt-2'>
                      Please check your spam folder if you don&apos;t see it in your
                      inbox
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className='bg-background border border-white/10 rounded-lg p-6 mb-8'>
            <h3 className='text-white font-semibold mb-4'>What&apos;s Next?</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3 text-white/80 text-sm'>
                <span className='text-primary font-bold mt-0.5'>1</span>
                <span>
                  You will receive a confirmation email with order details and
                  payment receipt
                </span>
              </li>
              <li className='flex items-start gap-3 text-white/80 text-sm'>
                <span className='text-primary font-bold mt-0.5'>2</span>
                <span>
                  Our team will process your order and update you on the status
                </span>
              </li>
              <li className='flex items-start gap-3 text-white/80 text-sm'>
                <span className='text-primary font-bold mt-0.5'>3</span>
                <span>
                  You can track your order anytime using your order ID
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4 flex-col md:flex-row'>
            <PublicButton
              onClick={() => router.push('/orders')}
              variant='primary'
              size='lg'
              className='flex-1'
            >
              Track Order
            </PublicButton>
            <PublicButton
              onClick={() => router.push('/')}
              variant='secondary'
              size='lg'
              className='flex-1'
            >
              Back to Home
            </PublicButton>
          </div>
        </div>

        {/* Support Section */}
        <div className='text-center mt-8'>
          <p className='text-white/60 text-sm'>
            Need help?{' '}
            <a
              href='mailto:support@flywate.com'
              className='text-primary hover:underline'
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
