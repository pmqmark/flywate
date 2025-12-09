'use client';

import React from 'react';
import { MdMenu, MdNotifications } from 'react-icons/md';

interface HeaderProps {
  onMenuClick: () => void;
  adminName?: string;
}

export default function Header({ onMenuClick, adminName = 'Admin' }: HeaderProps) {
  return (
    <header className='bg-background border-b border-primary/20 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20'>
      {/* Left - Menu Button */}
      <button
        onClick={onMenuClick}
        className='md:hidden text-white/70 hover:text-white'
      >
        <MdMenu size={24} />
      </button>

      {/* Center/Right - Admin Name and Notification */}
      <div className='flex-1 md:flex-none flex items-center justify-end gap-6'>
        {/* Notification */}
        <button className='text-white/60 hover:text-primary transition relative'>
          <MdNotifications size={24} />
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
            3
          </span>
        </button>

        {/* Admin Profile */}
        <div className='text-right'>
          <p className='text-white font-medium'>{adminName}</p>
          <p className='text-white/50 text-sm'>Administrator</p>
        </div>

        {/* Avatar */}
        <div className='w-10 h-10 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center text-primary font-bold'>
          {adminName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
