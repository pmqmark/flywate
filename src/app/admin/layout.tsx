'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/admin/components/shared/Sidebar';
import Header from '@/app/admin/components/shared/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-background text-white'>
      <div className='flex'>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Content Area */}
          <main className='flex-1 p-4 md:p-8 overflow-auto'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
