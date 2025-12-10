'use client';

import React, { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  confirmVariant = 'primary',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-background border border-primary/20 rounded-lg shadow-2xl max-w-md w-full'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-primary/10'>
          <h2 className='text-xl font-bold text-white'>{title}</h2>
          <button
            onClick={onClose}
            className='text-white/60 hover:text-white transition'
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>{children}</div>

        {/* Footer */}
        {onConfirm && (
          <div className='flex gap-3 p-6 border-t border-primary/10'>
            <button
              onClick={onClose}
              className='flex-1 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-white py-2 rounded-lg transition'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2 rounded-lg transition font-medium ${
                confirmVariant === 'danger'
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                  : 'bg-primary hover:bg-primary/90 text-background'
              }`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
