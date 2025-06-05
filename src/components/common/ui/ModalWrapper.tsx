
'use client'
import { ModalWrapperProps } from '@/types/common'
import { cs } from '@/utils/helper/cn'
import React, { useEffect, useState } from 'react'

const ModalWrapper = ({ className, children }: ModalWrapperProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    setTimeout(() => setShow(true), 5);
    return () => setShow(false); // Clean up on unmount
  }, []);

  return (
    <main className={cs(
      'fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center',
      className
    )}>
      <div className={cs(
        'transition-all duration-300 transform',
        show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      )}>
        {children}
      </div>
    </main>
  );
};

export default ModalWrapper;

