'use client';

import React from 'react';
import PublicButton from '@/components/common/ui/PublicButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentFailurePage() {
  const router = useRouter();

  const failureReasons = [
    'Payment confirmation timeout',
    'Incorrect payment amount transferred',
    'Payment was cancelled',
    'Transaction declined by bank',
    'Technical error during payment processing',
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-red-500/5 flex items-center justify-center p-4'>
      {/* Navigation */}
      <div className='bg-background border-b border-red-500/20 sticky top-0 z-40 w-full fixed'>
        <div className='max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            Flywate
          </Link>
          <div className='flex items-center gap-4'>
            <span className='text-red-400 text-sm font-semibold'>
              Payment Failed
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-2xl w-full mt-32 md:mt-0'>
        <div className='bg-red-500/5 border border-red-500/20 rounded-2xl p-8 md:p-12'>
          {/* Error Icon */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 mb-6'>
              <span className='text-5xl'>❌</span>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
              Payment Failed
            </h1>
            <p className='text-white/60 text-lg'>
              We couldn&apos;t process your payment. Please try again.
            </p>
          </div>

          {/* Error Details Card */}
          <div className='bg-background border border-red-500/20 rounded-lg p-8 mb-8'>
            {/* Error Message */}
            <div className='mb-8'>
              <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6'>
                <p className='text-white font-semibold mb-2'>Error Details</p>
                <p className='text-red-300 text-sm'>
                  Your payment could not be confirmed. This could be due to
                  several reasons listed below. Please verify and try again.
                </p>
              </div>

              {/* Possible Reasons */}
              <div>
                <p className='text-white/60 text-sm mb-3'>
                  Possible reasons for payment failure:
                </p>
                <ul className='space-y-2'>
                  {failureReasons.map((reason, index) => (
                    <li
                      key={index}
                      className='flex items-start gap-3 text-white/70 text-sm p-3 rounded-lg bg-background border border-white/5'
                    >
                      <span className='text-red-400 font-bold mt-0.5'>•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What You Can Do */}
            <div className='border-t border-white/10 pt-8'>
              <h3 className='text-white font-semibold mb-4'>What you can do:</h3>
              <div className='space-y-4'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
                    <span className='text-primary font-semibold text-sm'>1</span>
                  </div>
                  <div>
                    <p className='text-white font-medium mb-1'>Verify Amount</p>
                    <p className='text-white/60 text-sm'>
                      Make sure you transferred the exact amount shown on the
                      payment page
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
                    <span className='text-primary font-semibold text-sm'>2</span>
                  </div>
                  <div>
                    <p className='text-white font-medium mb-1'>Check Account</p>
                    <p className='text-white/60 text-sm'>
                      Verify that you have enough balance and the account is
                      active
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
                    <span className='text-primary font-semibold text-sm'>3</span>
                  </div>
                  <div>
                    <p className='text-white font-medium mb-1'>
                      Contact Your Bank
                    </p>
                    <p className='text-white/60 text-sm'>
                      If the issue persists, reach out to your bank&apos;s support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4 flex-col md:flex-row mb-8'>
            <PublicButton
              onClick={() => window.history.back()}
              variant='primary'
              size='lg'
              className='flex-1'
            >
              Try Again
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

          {/* Help Section */}
          <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
            <div className='flex gap-4'>
              <span className='text-2xl'>💬</span>
              <div className='flex-1'>
                <p className='text-white font-semibold mb-2'>Need Help?</p>
                <p className='text-white/70 text-sm mb-3'>
                  Our support team is here to help you. Contact us if you need
                  further assistance.
                </p>
                <a
                  href='mailto:support@flywate.com'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 hover:bg-primary/30 rounded-lg text-primary hover:text-primary text-sm font-medium transition-colors'
                >
                  <span>✉️</span>
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className='text-center mt-8'>
          <p className='text-white/60 text-sm'>
            Your order details have been saved. You can retry payment anytime
            from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
