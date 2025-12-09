'use client';

import React, { ReactNode } from 'react';

interface PublicButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantStyles = {
  primary: 'bg-primary hover:bg-primary/90 text-background',
  secondary: 'bg-primary/10 hover:bg-primary/20 text-white border border-primary/30',
  danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30',
  success: 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function PublicButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}: PublicButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {loading && <span className='inline-block animate-spin'>⌛</span>}
      {children}
    </button>
  );
}
