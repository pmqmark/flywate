'use client';

import React, { useState } from 'react';
import OrderList from '@/app/admin/components/orders/OrderList';
import OrderDetails from '@/app/admin/components/orders/OrderDetails';

export default function OrdersPage() {
  const [view] = useState<'list' | 'details'>('list');

  return (
    <div>
      {view === 'list' && <OrderList />}
      {view === 'details' && <OrderDetails />}
    </div>
  );
}
