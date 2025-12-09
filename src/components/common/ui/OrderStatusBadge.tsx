import React from 'react';

export type OrderStatusType = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'failed';

interface OrderStatusBadgeProps {
  status: OrderStatusType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<OrderStatusType, {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
}> = {
  pending: {
    label: 'Pending',
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-300',
    borderColor: 'border-yellow-500/30',
    icon: '⏳',
  },
  confirmed: {
    label: 'Confirmed',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-300',
    borderColor: 'border-green-500/30',
    icon: '✅',
  },
  shipped: {
    label: 'Shipped',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-300',
    borderColor: 'border-blue-500/30',
    icon: '📦',
  },
  delivered: {
    label: 'Delivered',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-300',
    borderColor: 'border-green-500/30',
    icon: '🎉',
  },
  cancelled: {
    label: 'Cancelled',
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-300',
    borderColor: 'border-red-500/30',
    icon: '❌',
  },
  failed: {
    label: 'Failed',
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-300',
    borderColor: 'border-red-500/30',
    icon: '⚠️',
  },
};

const sizeConfig = {
  sm: {
    containerClass: 'px-2 py-1 text-xs gap-1.5',
    iconClass: 'text-sm',
    labelClass: 'text-xs',
  },
  md: {
    containerClass: 'px-3 py-1.5 text-sm gap-2',
    iconClass: 'text-base',
    labelClass: 'text-sm',
  },
  lg: {
    containerClass: 'px-4 py-2 text-base gap-2.5',
    iconClass: 'text-lg',
    labelClass: 'text-base',
  },
};

export default function OrderStatusBadge({
  status,
  size = 'md',
  className = '',
}: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const size_config = sizeConfig[size];

  return (
    <div
      className={`
        inline-flex items-center
        rounded-full border
        font-semibold
        ${config.bgColor}
        ${config.borderColor}
        ${config.textColor}
        ${size_config.containerClass}
        ${className}
      `}
    >
      <span className={size_config.iconClass}>{config.icon}</span>
      <span className={size_config.labelClass}>{config.label}</span>
    </div>
  );
}
