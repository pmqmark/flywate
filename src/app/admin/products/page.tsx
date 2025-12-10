'use client';

import React, { useState } from 'react';
import AddProduct from '@/app/admin/components/products/AddProduct';
import ProductList from '@/app/admin/components/products/ProductList';

export default function ProductsPage() {
  const [view] = useState<'list' | 'add' | 'edit'>('list');

  return (
    <div>
      {view === 'list' && (
        <ProductList />
      )}
      {view === 'add' && (
        <AddProduct />
      )}
    </div>
  );
}
