'use client';

import React, { useState } from 'react';
import PublicButton from '@/components/common/ui/PublicButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    'Verifying payment...',
    'Confirming order...',
    'Sending confirmation email...',
  ];

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStep(i + 1);
    }

    // Redirect to success page
    router.push('/payment/success');
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
            <span className='text-white/60 text-sm'>Confirming Order...</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-2xl w-full mt-32 md:mt-0'>
        <div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
              Confirm Payment
            </h1>
            <p className='text-white/60 text-lg'>
              Please confirm that you have completed the payment
            </p>
          </div>

          {/* Processing Section */}
          {isProcessing ? (
            <div className='mb-12'>
              {/* Steps Indicator */}
              <div className='space-y-4 mb-10'>
                {processingSteps.map((step, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-4 p-4 rounded-lg bg-background border border-primary/20'
                  >
                    {/* Step Icon */}
                    <div className='flex-shrink-0'>
                      {index < processingStep ? (
                        <div className='w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center'>
                          <span className='text-green-400 font-bold'>✓</span>
                        </div>
                      ) : index === processingStep ? (
                        <div className='w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
                          <div className='w-3 h-3 bg-primary rounded-full animate-pulse' />
                        </div>
                      ) : (
                        <div className='w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center'>
                          <span className='text-white/40 text-sm'>{index + 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Step Text */}
                    <div className='flex-1'>
                      <p className='text-white font-medium'>{step}</p>
                    </div>

                    {/* Status Icon */}
                    {index < processingStep && (
                      <span className='text-green-400'>Complete</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Processing Complete Message */}
              {processingStep === processingSteps.length && (
                <div className='bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center mb-8'>
                  <div className='text-5xl mb-3'>✅</div>
                  <p className='text-green-300 font-semibold'>
                    Processing complete! Redirecting...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Info Box */}
              <div className='bg-background border border-primary/20 rounded-lg p-6 mb-10'>
                <div className='flex gap-4'>
                  <div className='text-3xl'>💳</div>
                  <div>
                    <p className='text-white font-semibold mb-2'>
                      Payment Confirmation
                    </p>
                    <p className='text-white/70 text-sm'>
                      By clicking &quot;Confirm Payment&quot;, you confirm that you have
                      completed the payment using one of the methods shown. Your
                      order will be confirmed immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className='space-y-3 mb-10'>
                <div className='flex items-center gap-3 text-white/80'>
                  <span className='text-primary text-lg'>✓</span>
                  <span>I have transferred the exact amount</span>
                </div>
                <div className='flex items-center gap-3 text-white/80'>
                  <span className='text-primary text-lg'>✓</span>
                  <span>I have scanned the UPI QR code</span>
                </div>
                <div className='flex items-center gap-3 text-white/80'>
                  <span className='text-primary text-lg'>✓</span>
                  <span>I am ready to confirm my order</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4'>
                <PublicButton
                  onClick={() => window.history.back()}
                  variant='secondary'
                  size='lg'
                  className='flex-1'
                >
                  Go Back
                </PublicButton>
                <PublicButton
                  onClick={handleConfirmPayment}
                  variant='primary'
                  size='lg'
                  disabled={isProcessing}
                  className='flex-1'
                >
                  Confirm Payment
                </PublicButton>
              </div>
            </>
          )}
        </div>

        {/* Support Info */}
        <div className='text-center mt-8'>
          <p className='text-white/60 text-sm'>
            Having trouble? Contact us at{' '}
            <a
              href='mailto:support@flywate.com'
              className='text-primary hover:underline'
            >
              support@flywate.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
