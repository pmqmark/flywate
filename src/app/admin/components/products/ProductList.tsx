'use client';

import React, { useState } from 'react';
import Button from '@/app/admin/components/shared/Button';
import Modal from '@/app/admin/components/shared/Modal';
import { MdEdit, MdDelete, MdSearch } from 'react-icons/md';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; productId: number | null }>({
    open: false,
    productId: null,
  });

  const itemsPerPage = 10;

  // Mock data
  const products: Product[] = [
    {
      id: 1,
      image: '🏸',
      name: 'Flywate Nylon Shuttle - Professional',
      price: 299.99,
      status: 'in-stock',
    },
    {
      id: 2,
      image: '🏸',
      name: 'Flywate Nylon Shuttle - Training',
      price: 199.99,
      status: 'in-stock',
    },
    {
      id: 3,
      image: '🏸',
      name: 'Flywate Feather Shuttle - Premium',
      price: 499.99,
      status: 'low-stock',
    },
    {
      id: 4,
      image: '🏸',
      name: 'Flywate Nylon Shuttle - Beginner',
      price: 99.99,
      status: 'in-stock',
    },
    {
      id: 5,
      image: '🏸',
      name: 'Flywate Badminton Racket - Carbon',
      price: 599.99,
      status: 'low-stock',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = () => {
    // TODO: Implement delete API call
    setDeleteModal({ open: false, productId: null });
  };

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>Products</h1>
          <p className='text-white/60'>Manage your product catalog</p>
        </div>
        <Button variant='primary' size='lg'>
          + Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        {/* Search */}
        <div className='flex-1 relative'>
          <MdSearch className='absolute left-3 top-3.5 text-primary/60' />
          <input
            type='text'
            placeholder='Search products...'
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
            setFilterStatus(e.target.value as 'all' | 'in-stock' | 'low-stock' | 'out-of-stock');
            setCurrentPage(1);
          }}
          className='bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary'
        >
          <option value='all'>All Status</option>
          <option value='in-stock'>In Stock</option>
          <option value='low-stock'>Low Stock</option>
          <option value='out-of-stock'>Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className='bg-primary/5 border border-primary/20 rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-primary/10'>
              <tr>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Image
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Name
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Price
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-white/80 font-semibold'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className='border-t border-primary/10 hover:bg-primary/5 transition'
                >
                  <td className='px-6 py-4'>
                    <div className='w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-xl'>
                      {product.image}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-white font-medium max-w-xs truncate'>
                    {product.name}
                  </td>
                  <td className='px-6 py-4 text-white/80'>${product.price.toFixed(2)}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'in-stock'
                          ? 'bg-green-500/20 text-green-400'
                          : product.status === 'low-stock'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {product.status === 'in-stock'
                        ? 'In Stock'
                        : product.status === 'low-stock'
                          ? 'Low Stock'
                          : 'Out of Stock'}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-2'>
                      <Button
                        variant='secondary'
                        size='sm'
                        className='gap-1'
                      >
                        <MdEdit /> Edit
                      </Button>
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() =>
                          setDeleteModal({ open: true, productId: product.id })
                        }
                        className='gap-1'
                      >
                        <MdDelete /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between p-6 border-t border-primary/10'>
          <p className='text-white/60 text-sm'>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
            {filteredProducts.length} products
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

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        title='Delete Product'
        onClose={() => setDeleteModal({ open: false, productId: null })}
        onConfirm={handleDelete}
        confirmText='Delete'
        confirmVariant='danger'
      >
        <p className='text-white/80'>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}
