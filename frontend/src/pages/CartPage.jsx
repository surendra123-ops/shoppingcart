import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState.jsx';
import { Loader } from '../components/Loader.jsx';
import { PageContainer } from '../components/PageContainer.jsx';
import { CartItemRow } from '../components/CartItemRow.jsx';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/currency.js';

export const CartPage = () => {
  const { items, total, loading, isEmpty } = useCart();

  return (
    <PageContainer
      title="Your Cart"
      subtitle="Manage your selections before checkout"
      action={!isEmpty && (
        <Link
          to="/checkout"
          className="inline-flex items-center rounded-full bg-primary-dark px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary"
        >
          Proceed to Checkout
        </Link>
      )}
    >
      {loading ? (
        <Loader label="Loading cart" />
      ) : isEmpty ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse products and add them to build your mock order."
          action={(
            <Link
              to="/"
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              View products
            </Link>
          )}
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow key={item._id} item={item} />
            ))}
          </div>
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-800">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm text-neutral-600">
              <div className="flex justify-between">
                <dt>Items ({items.length})</dt>
                <dd>{formatCurrency(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>FREE</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax</dt>
                <dd>Included</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
              <span className="text-sm font-medium text-neutral-500">Total</span>
              <span className="text-xl font-semibold text-primary-dark">{formatCurrency(total)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </PageContainer>
  );
};


