'use client';

import React, { useState } from 'react';
import Button from '@/app/admin/components/shared/Button';
import { MdSearch, MdVisibility } from 'react-icons/md';

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'pending' | 'shipped' | 'delivered';
  date: string;
}

export default function OrderList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shipped' | 'delivered'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Mock data
  const orders: Order[] = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerName: 'John Doe',
      totalAmount: 245.0,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      date: '2024-12-09',
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'Jane Smith',
      totalAmount: 156.5,
      paymentStatus: 'paid',
      orderStatus: 'shipped',
      date: '2024-12-08',
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customerName: 'Mike Johnson',
      totalAmount: 320.0,
      paymentStatus: 'paid',
      orderStatus: 'delivered',
      date: '2024-12-07',
    },
    {
      id: 4,
      orderNumber: 'ORD-2024-004',
      customerName: 'Sarah Williams',
      totalAmount: 89.99,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      date: '2024-12-06',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || order.orderStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: 'pending' | 'shipped' | 'delivered') => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
    }
  };

  const getPaymentStatusColor = (status: 'paid' | 'pending' | 'failed') => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>Orders</h1>
          <p className='text-white/60'>Manage and track customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        {/* Search */}
        <div className='flex-1 relative'>
          <MdSearch className='absolute left-3 top-3.5 text-primary/60' />
          <input
            type='text'
            placeholder='Search by order number or customer...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className='w-full bg-background border border-primary/20 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary'
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value as 'all' | 'pending' | 'shipped' | 'delivered');
            setCurrentPage(1);
          }}
          className='bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary'
        >
          <option value='all'>All Status</option>
          <option value='pending'>Pending</option>
          <option value='shipped'>Shipped</option>
          <option value='delivered'>Delivered</option>
        </select>
      </div>

      {/* Table */}
      <div className='bg-primary/5 border border-primary/20 rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-primary/10'>
              <tr>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Order Number
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Customer
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Payment
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className='border-t border-primary/10 hover:bg-primary/5 transition'
                >
                  <td className='px-6 py-4 text-white font-medium'>
                    {order.orderNumber}
                  </td>
                  <td className='px-6 py-4 text-white/80'>{order.customerName}</td>
                  <td className='px-6 py-4 text-white font-semibold'>
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <select
                      value={order.orderStatus}
                      onChange={() => {}}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border-0 focus:outline-none cursor-pointer ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      <option value='pending'>Pending</option>
                      <option value='shipped'>Shipped</option>
                      <option value='delivered'>Delivered</option>
                    </select>
                  </td>
                  <td className='px-6 py-4'>
                    <Button variant='secondary' size='sm' className='gap-1'>
                      <MdVisibility /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between p-6 border-t border-primary/10'>
          <p className='text-white/60 text-sm'>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length)} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{' '}
            {filteredOrders.length} orders
          </p>
          <div className='flex gap-2'>
            <Button
              variant='secondary'
              size='sm'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              Previous
            </Button>
            <div className='flex items-center gap-1'>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 rounded ${
                    currentPage === idx + 1
                      ? 'bg-primary text-background'
                      : 'bg-primary/10 text-white hover:bg-primary/20'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <Button
              variant='secondary'
              size='sm'
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
