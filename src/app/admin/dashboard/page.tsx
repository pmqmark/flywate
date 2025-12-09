'use client';

import React from 'react';

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function AdminDashboard() {
  const stats: StatCard[] = [
    {
      label: 'Total Orders',
      value: 1254,
      icon: '🛒',
      color: 'from-blue-500/10 to-blue-500/5',
    },
    {
      label: 'Pending Orders',
      value: 47,
      icon: '⏳',
      color: 'from-yellow-500/10 to-yellow-500/5',
    },
    {
      label: 'Delivered Orders',
      value: 1180,
      icon: '✅',
      color: 'from-green-500/10 to-green-500/5',
    },
    {
      label: 'Total Products',
      value: 156,
      icon: '📦',
      color: 'from-purple-500/10 to-purple-500/5',
    },
    {
      label: 'Total Reviews',
      value: 342,
      icon: '⭐',
      color: 'from-orange-500/10 to-orange-500/5',
    },
  ];

  return (
    <div>
      {/* Page Title */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-white mb-2'>Dashboard</h1>
        <p className='text-white/60'>Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition`}
          >
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-white/60 font-medium'>{stat.label}</h3>
              <span className='text-3xl'>{stat.icon}</span>
            </div>
            <p className='text-4xl font-bold text-white'>{stat.value}</p>
            <p className='text-primary text-sm mt-2'>View details →</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold text-white mb-6'>Recent Orders</h2>
        <div className='bg-primary/5 border border-primary/20 rounded-lg overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-primary/10'>
              <tr>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Order #
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Customer
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD001', customer: 'John Doe', amount: '$245.00', status: 'Pending' },
                { id: '#ORD002', customer: 'Jane Smith', amount: '$156.50', status: 'Shipped' },
                { id: '#ORD003', customer: 'Mike Johnson', amount: '$320.00', status: 'Delivered' },
                { id: '#ORD004', customer: 'Sarah Williams', amount: '$89.99', status: 'Pending' },
              ].map((order, idx) => (
                <tr
                  key={idx}
                  className='border-t border-primary/10 hover:bg-primary/5 transition'
                >
                  <td className='px-6 py-4 text-white font-medium'>{order.id}</td>
                  <td className='px-6 py-4 text-white/80'>{order.customer}</td>
                  <td className='px-6 py-4 text-white/80'>{order.amount}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : order.status === 'Shipped'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
