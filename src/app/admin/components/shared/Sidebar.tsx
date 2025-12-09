'use client';

import React from 'react';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Products', href: '/admin/products', icon: '📦' },
  { label: 'Orders', href: '/admin/orders', icon: '🛒' },
  { label: 'Reviews', href: '/admin/reviews', icon: '⭐' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 md:hidden z-30'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gradient-to-b from-primary/10 to-background border-r border-primary/20 p-6 transform transition-transform md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className='md:hidden absolute top-4 right-4 text-white/60'
        >
          <MdClose size={24} />
        </button>

        {/* Logo */}
        <div className='mb-8 mt-4 md:mt-0'>
          <h2 className='text-2xl font-bold text-primary'>Flywate</h2>
          <p className='text-white/50 text-sm'>Admin Panel</p>
        </div>

        {/* Menu Items */}
        <nav className='space-y-2'>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-primary text-background font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-primary/10'
                }`}
              >
                <span className='text-xl'>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className='absolute bottom-6 left-6 right-6'>
          <button className='w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 py-2 rounded-lg transition font-medium flex items-center justify-center gap-2'>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
