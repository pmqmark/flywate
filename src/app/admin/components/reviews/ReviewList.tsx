'use client';

import React, { useState } from 'react';
import Button from '@/app/admin/components/shared/Button';
import Modal from '@/app/admin/components/shared/Modal';
import { MdDelete, MdStar } from 'react-icons/md';

interface Review {
  id: number;
  customerName: string;
  productName: string;
  rating: number;
  message: string;
  date: string;
}

export default function ReviewList() {
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    reviewId: number | null;
  }>({
    open: false,
    reviewId: null,
  });

  // Mock data
  const reviews: Review[] = [
    {
      id: 1,
      customerName: 'John Doe',
      productName: 'Flywate Nylon Shuttle - Professional',
      rating: 5,
      message:
        'Excellent quality! The shuttles are very durable and perform great. Highly recommended!',
      date: '2024-12-08',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      productName: 'Flywate Badminton Racket - Carbon',
      rating: 4,
      message:
        'Great racket with good balance. A bit pricey but worth it for the quality.',
      date: '2024-12-07',
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      productName: 'Flywate Nylon Shuttle - Training',
      rating: 5,
      message:
        'Perfect for training sessions. Love the consistency and flight path.',
      date: '2024-12-06',
    },
  ];

  const handleDelete = () => {
    // TODO: Implement delete API call
    setDeleteModal({ open: false, reviewId: null });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <MdStar
        key={idx}
        className={
          idx < rating
            ? 'text-yellow-400'
            : 'text-white/20'
        }
        size={16}
      />
    ));
  };

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Reviews</h1>
        <p className='text-white/60'>Manage customer product reviews</p>
      </div>

      {reviews.length === 0 ? (
        // Empty State
        <div className='bg-primary/5 border border-dashed border-primary/20 rounded-lg p-12 text-center'>
          <div className='text-5xl mb-4'>⭐</div>
          <h3 className='text-xl font-bold text-white mb-2'>No Reviews Found</h3>
          <p className='text-white/60'>
            There are no customer reviews yet. They will appear here once customers
            start leaving reviews for your products.
          </p>
        </div>
      ) : (
        // Reviews Grid
        <div className='space-y-4'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='bg-primary/5 border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition'
            >
              <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4'>
                <div>
                  <h3 className='text-lg font-bold text-white'>
                    {review.productName}
                  </h3>
                  <p className='text-white/60 text-sm mt-1'>
                    By {review.customerName} • {review.date}
                  </p>
                </div>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={() =>
                    setDeleteModal({ open: true, reviewId: review.id })
                  }
                  className='gap-1'
                >
                  <MdDelete /> Delete
                </Button>
              </div>

              {/* Rating */}
              <div className='flex items-center gap-1 mb-3'>
                {renderStars(review.rating)}
                <span className='text-white/60 text-sm ml-2'>
                  {review.rating}.0 out of 5
                </span>
              </div>

              {/* Review Message */}
              <p className='text-white/80'>{review.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        title='Delete Review'
        onClose={() => setDeleteModal({ open: false, reviewId: null })}
        onConfirm={handleDelete}
        confirmText='Delete'
        confirmVariant='danger'
      >
        <p className='text-white/80'>
          Are you sure you want to delete this review? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}
