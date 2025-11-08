import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { formatCurrency } from '../utils/currency.js';
import { useCart } from '../hooks/useCart.js';
import { QuantitySelector } from './QuantitySelector.jsx';

export const CartItemRow = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (nextQuantity) => {
    setQuantity(nextQuantity);
    setIsUpdating(true);
    await updateQuantity({ productId: item.product._id, quantity: nextQuantity });
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await removeItem(item._id);
    setIsUpdating(false);
  };

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-light sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={item.product.image}
            alt={item.product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-neutral-900 group-hover:text-primary-dark transition-colors">
            {item.product.title}
          </h4>
          <p className="mt-1 text-sm font-semibold text-primary-dark">
            {formatCurrency(item.product.price)} each
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-between gap-4">
        <QuantitySelector value={quantity} onChange={handleQuantityChange} disabled={isUpdating} />
        <div className="text-right">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Subtotal</p>
          <p className="mt-1 text-xl font-bold bg-gradient-to-r from-primary-dark to-primary text-transparent bg-clip-text">
            {formatCurrency(item.product.price * quantity)}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          disabled={isUpdating}
          className="rounded-full border-2 border-transparent p-2.5 text-neutral-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
          title="Remove item"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
