'use client';

import React, { useState } from 'react';
import Button from '@/app/admin/components/shared/Button';
import { MdCloudUpload } from 'react-icons/md';
import Image from 'next/image';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  image?: File;
}

interface AddProductProps {
  onSubmit?: (data: ProductFormData) => void;
}

export default function AddProduct({ onSubmit }: AddProductProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 'in-stock',
    image: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: 'in-stock',
      image: undefined,
    });
    setImagePreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Add Product</h1>
        <p className='text-white/60'>Create a new product in your catalog</p>
      </div>

      {/* Form Card */}
      <div className='bg-primary/5 border border-primary/20 rounded-lg p-8 max-w-2xl'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Product Name */}
          <div>
            <label className='block text-sm font-medium text-white/80 mb-2'>
              Product Name *
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter product name'
              className='w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary'
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-white/80 mb-2'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter product description'
              rows={4}
              className='w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary'
            />
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-medium text-white/80 mb-2'>
              Price *
            </label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              placeholder='0.00'
              step='0.01'
              className='w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary'
              required
            />
          </div>

          {/* Category and Stock */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-white/80 mb-2'>
                Category
              </label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary'
              >
                <option value=''>Select Category</option>
                <option value='nylon'>Nylon Shuttles</option>
                <option value='feather'>Feather Shuttles</option>
                <option value='rackets'>Rackets</option>
                <option value='accessories'>Accessories</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-white/80 mb-2'>
                Stock Status
              </label>
              <select
                name='stock'
                value={formData.stock}
                onChange={handleChange}
                className='w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary'
              >
                <option value='in-stock'>In Stock</option>
                <option value='low-stock'>Low Stock</option>
                <option value='out-of-stock'>Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className='block text-sm font-medium text-white/80 mb-2'>
              Product Image
            </label>
            <div className='relative'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
                id='image-upload'
              />
              <label
                htmlFor='image-upload'
                className='cursor-pointer block'
              >
                {imagePreview ? (
                  <div className='relative w-full h-40 bg-background border border-primary/20 rounded-lg overflow-hidden'>
                    <Image
                      src={imagePreview}
                      alt='Preview'
                      fill
                      className='object-cover'
                    />
                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition'>
                      <span className='text-white text-sm'>Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className='w-full h-40 bg-background border border-dashed border-primary/40 rounded-lg flex flex-col items-center justify-center hover:border-primary transition'>
                    <MdCloudUpload className='text-4xl text-primary/60 mb-2' />
                    <span className='text-white/60 text-sm'>
                      Click to upload image
                    </span>
                    <span className='text-white/40 text-xs mt-1'>
                      PNG, JPG, GIF max 5MB
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4 pt-4'>
            <Button type='submit' variant='primary' size='lg' className='flex-1'>
              Save Product
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='lg'
              onClick={handleReset}
              className='flex-1'
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
