import { useState } from 'react';
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../utils/currency.js';
import { useCart } from '../hooks/useCart.js';

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem({ productId: product._id });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="inline-block rounded-full bg-primary-light/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-dark">
            {product.category}
          </span>
          <h3 className="mt-2 text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-primary-dark transition-colors">
            {product.title}
          </h3>
        </div>
        <p className="flex-1 text-sm text-neutral-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-primary text-transparent bg-clip-text">
            {formatCurrency(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ${
              justAdded
                ? 'bg-green-500 cursor-default'
                : 'bg-gradient-to-r from-primary-dark to-primary hover:shadow-lg hover:scale-105'
            } disabled:opacity-70`}
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCartIcon className="h-4 w-4" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
