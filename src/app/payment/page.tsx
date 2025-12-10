'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MdContentCopy, MdCheckCircle } from 'react-icons/md';
import Link from 'next/link';

type PaymentMethod = 'upi' | 'bank';

export default function PaymentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mock data - Client will replace with real QR and bank details
  const paymentData = {
    upi: {
      qrCodeUrl: '/payment/upi-qr.png', // Client to provide
      upiId: 'flywate@upi',
      qrAlt: 'UPI QR Code for payment',
    },
    bank: {
      accountHolderName: 'Flywate India Sports Private Limited',
      accountNumber: '1234567890123456',
      ifscCode: 'EXMP0000001',
      bankName: 'Example Bank Limited',
      accountType: 'Current Account',
    },
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-primary/5'>
      {/* Navigation */}
      <div className='bg-background border-b border-primary/20 sticky top-0 z-40'>
        <div className='max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            Flywate
          </Link>
          <div className='flex items-center gap-4'>
            <span className='text-white/60 text-sm'>Step 3 of 3</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-5xl mx-auto px-4 md:px-8 py-12'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
            Complete Your Payment
          </h1>
          <p className='text-white/60 text-lg'>
            Scan the QR code or transfer using bank account details below
          </p>
        </div>

        {/* Payment Methods Container */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
          {/* UPI QR Code Section */}
          <div
            onClick={() => setSelectedMethod('upi')}
            className={`cursor-pointer transition-all duration-300 p-8 rounded-xl border-2 ${
              selectedMethod === 'upi'
                ? 'border-primary bg-primary/10'
                : 'border-primary/20 bg-primary/5 hover:border-primary/40'
            }`}
          >
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'upi'
                    ? 'border-primary bg-primary'
                    : 'border-white/30'
                }`}
              >
                {selectedMethod === 'upi' && (
                  <MdCheckCircle className='text-background' size={20} />
                )}
              </div>
              <h2 className='text-2xl font-bold text-white'>UPI Payment</h2>
            </div>

            {/* QR Code Container */}
            <div className='bg-white rounded-lg p-4 mb-6 flex items-center justify-center min-h-80'>
              {paymentData.upi.qrCodeUrl ? (
                <Image
                  src={paymentData.upi.qrCodeUrl}
                  alt={paymentData.upi.qrAlt}
                  width={300}
                  height={300}
                  className='w-full h-full object-contain max-w-xs'
                />
              ) : (
                <div className='text-center text-white/60'>
                  <div className='text-6xl mb-3'>📱</div>
                  <p>QR Code will appear here</p>
                  <p className='text-sm mt-2'>(Client to provide)</p>
                </div>
              )}
            </div>

            {/* UPI ID */}
            <div className='bg-background rounded-lg p-4 border border-primary/20'>
              <p className='text-white/60 text-sm mb-2'>Or use UPI ID:</p>
              <div className='flex items-center justify-between gap-3'>
                <p className='text-white font-mono font-bold text-lg'>
                  {paymentData.upi.upiId}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(paymentData.upi.upiId, 'upi');
                  }}
                  className={`p-2 rounded-lg transition ${
                    copiedField === 'upi'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-primary/20 hover:bg-primary/30 text-primary'
                  }`}
                >
                  {copiedField === 'upi' ? (
                    <MdCheckCircle size={20} />
                  ) : (
                    <MdContentCopy size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className='mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg'>
              <p className='text-blue-300 text-sm'>
                💡 <strong>Tip:</strong> Scan the QR code using any UPI app
                (Google Pay, PhonePe, Paytm, etc.)
              </p>
            </div>
          </div>

          {/* Bank Account Section */}
          <div
            onClick={() => setSelectedMethod('bank')}
            className={`cursor-pointer transition-all duration-300 p-8 rounded-xl border-2 ${
              selectedMethod === 'bank'
                ? 'border-primary bg-primary/10'
                : 'border-primary/20 bg-primary/5 hover:border-primary/40'
            }`}
          >
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMethod === 'bank'
                    ? 'border-primary bg-primary'
                    : 'border-white/30'
                }`}
              >
                {selectedMethod === 'bank' && (
                  <MdCheckCircle className='text-background' size={20} />
                )}
              </div>
              <h2 className='text-2xl font-bold text-white'>Bank Transfer</h2>
            </div>

            {/* Bank Details */}
            <div className='space-y-4'>
              {/* Account Holder */}
              <div className='bg-background rounded-lg p-4 border border-primary/20'>
                <p className='text-white/60 text-sm mb-1'>Account Holder Name</p>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-white font-medium'>
                    {paymentData.bank.accountHolderName}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(paymentData.bank.accountHolderName, 'holder');
                    }}
                    className={`p-2 rounded-lg transition ${
                      copiedField === 'holder'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-primary/20 hover:bg-primary/30 text-primary'
                    }`}
                  >
                    {copiedField === 'holder' ? (
                      <MdCheckCircle size={18} />
                    ) : (
                      <MdContentCopy size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className='bg-background rounded-lg p-4 border border-primary/20'>
                <p className='text-white/60 text-sm mb-1'>Account Number</p>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-white font-mono font-bold'>
                    {paymentData.bank.accountNumber}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(paymentData.bank.accountNumber, 'account');
                    }}
                    className={`p-2 rounded-lg transition ${
                      copiedField === 'account'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-primary/20 hover:bg-primary/30 text-primary'
                    }`}
                  >
                    {copiedField === 'account' ? (
                      <MdCheckCircle size={18} />
                    ) : (
                      <MdContentCopy size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* IFSC Code */}
              <div className='bg-background rounded-lg p-4 border border-primary/20'>
                <p className='text-white/60 text-sm mb-1'>IFSC Code</p>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-white font-mono font-bold'>
                    {paymentData.bank.ifscCode}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(paymentData.bank.ifscCode, 'ifsc');
                    }}
                    className={`p-2 rounded-lg transition ${
                      copiedField === 'ifsc'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-primary/20 hover:bg-primary/30 text-primary'
                    }`}
                  >
                    {copiedField === 'ifsc' ? (
                      <MdCheckCircle size={18} />
                    ) : (
                      <MdContentCopy size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Bank Name */}
              <div className='bg-background rounded-lg p-4 border border-primary/20'>
                <p className='text-white/60 text-sm mb-1'>Bank Name</p>
                <p className='text-white font-medium'>{paymentData.bank.bankName}</p>
              </div>

              {/* Account Type */}
              <div className='bg-background rounded-lg p-4 border border-primary/20'>
                <p className='text-white/60 text-sm mb-1'>Account Type</p>
                <p className='text-white font-medium'>{paymentData.bank.accountType}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className='mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg'>
              <p className='text-blue-300 text-sm'>
                💡 <strong>Tip:</strong> Use your bank&apos;s mobile app or visit an ATM
                to transfer funds
              </p>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className='bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12'>
          <p className='text-yellow-200 text-sm'>
            ⚠️ <strong>Important:</strong> After completing the payment, click the
            &quot;I Have Paid&quot; button below to confirm your payment. Your order will be
            confirmed automatically once payment is verified.
          </p>
        </div>

        {/* Action Button */}
        <div className='flex gap-4'>
          <Link href='/checkout' className='flex-1'>
            <button className='w-full px-6 py-3 text-lg bg-primary/10 hover:bg-primary/20 text-white border border-primary/30 rounded-lg font-medium transition'>
              Back to Checkout
            </button>
          </Link>
          <Link href='/payment/confirm' className='flex-1'>
            <button className='w-full px-6 py-3 text-lg bg-primary hover:bg-primary/90 text-background rounded-lg font-medium transition'>
              I Have Paid ✓
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
