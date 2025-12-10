import React from 'react';

interface EmailConfirmationProps {
  email: string;
  variant?: 'inline' | 'card';
  showResend?: boolean;
  onResend?: () => void;
  className?: string;
}

export default function EmailConfirmation({
  email,
  variant = 'inline',
  showResend = false,
  onResend,
  className = '',
}: EmailConfirmationProps) {
  if (variant === 'card') {
    return (
      <div
        className={`
          bg-primary/5 border border-primary/20 
          rounded-lg p-6
          ${className}
        `}
      >
        <div className='flex gap-4'>
          <div className='text-3xl flex-shrink-0'>✉️</div>
          <div className='flex-1'>
            <p className='text-white font-semibold mb-2'>
              Confirmation Email Sent
            </p>
            <p className='text-white/70 text-sm mb-3'>
              A detailed confirmation email has been sent to{' '}
              <span className='text-primary font-medium'>{email}</span>
            </p>
            <p className='text-white/50 text-xs mb-4'>
              Please check your spam folder if you don&apos;t see it in your inbox
            </p>
            {showResend && (
              <button
                onClick={onResend}
                disabled
                className='px-3 py-1.5 bg-primary/20 border border-primary/30 rounded text-primary text-xs font-medium opacity-60 cursor-not-allowed'
              >
                Resend Email (disabled)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        flex items-center gap-3
        p-4 rounded-lg
        bg-primary/5 border border-primary/20
        ${className}
      `}
    >
      <span className='text-xl flex-shrink-0'>✉️</span>
      <div className='flex-1 min-w-0'>
        <p className='text-white text-sm font-medium'>Email confirmation sent</p>
        <p className='text-white/60 text-xs truncate'>{email}</p>
      </div>
      {showResend && (
        <button
          onClick={onResend}
          disabled
          className='flex-shrink-0 px-2 py-1 text-xs font-medium text-primary bg-primary/20 border border-primary/30 rounded opacity-60 cursor-not-allowed whitespace-nowrap'
        >
          Resend
        </button>
      )}
    </div>
  );
}
