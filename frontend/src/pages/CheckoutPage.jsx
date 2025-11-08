import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkoutRequest } from '../api/checkoutApi.js';
import { EmptyState } from '../components/EmptyState.jsx';
import { Loader } from '../components/Loader.jsx';
import { PageContainer } from '../components/PageContainer.jsx';
import { ReceiptModal } from '../components/ReceiptModal.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/currency.js';

export const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, total, isEmpty, loading, clearCartState, hydrate } = useCart();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email) {
      toast.error('Please provide your name and email.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        email,
        cartItems: items.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          product: {
            _id: item.product._id,
            title: item.product.title,
            price: item.product.price,
          },
        })),
      };
      const data = await checkoutRequest(payload);
      setReceipt({ ...data.receipt, total: data.total, timestamp: data.timestamp });
      setIsModalOpen(true);
      clearCartState();
      await hydrate();
      toast.success('Checkout successful');
    } catch (error) {
      toast.error(error.message || 'Unable to process checkout');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReceipt(null);
  };

  return (
    <PageContainer title="Checkout" subtitle="Complete your mock order">
      {loading ? (
        <Loader label="Loading your cart" />
      ) : isEmpty ? (
        <EmptyState
          title="Cart is empty"
          description="Add products to your cart before heading to checkout."
          action={(
            <Link
              to="/"
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Browse products
            </Link>
          )}
        />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Contact Details</h2>
              <p className="mt-1 text-sm text-neutral-500">
                We&apos;ll use this to personalize your receipt.
              </p>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-neutral-700">
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
                  placeholder="Jane Doe"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-70"
            >
              {submitting ? 'Processing...' : 'Complete Checkout'}
            </button>
          </form>
          <aside className="h-fit space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Order Summary</h2>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                {items.map((item) => (
                  <li key={item._id} className="flex justify-between">
                    <span>
                      {item.product.title}
                      <span className="text-neutral-400"> × {item.quantity}</span>
                    </span>
                    <span className="font-medium">{formatCurrency(item.product.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-neutral-200 pt-4 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Included</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
              <span className="text-sm font-medium text-neutral-500">Total</span>
              <span className="text-xl font-semibold text-primary-dark">{formatCurrency(total)}</span>
            </div>
          </aside>
        </div>
      )}
      <ReceiptModal isOpen={isModalOpen} onClose={handleCloseModal} receipt={receipt} />
    </PageContainer>
  );
};


