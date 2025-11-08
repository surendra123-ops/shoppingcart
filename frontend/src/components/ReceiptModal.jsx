import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../utils/currency.js';

export const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!receipt) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                    <CheckCircleIcon className="h-10 w-10 text-green-600" />
                  </div>
                  <Dialog.Title as="h3" className="text-2xl font-bold text-neutral-900 mb-2">
                    Thank you, {receipt.customer.name}!
                  </Dialog.Title>
                  <p className="text-sm text-neutral-600">
                    Your order has been successfully placed.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Order Date</span>
                    <span className="font-semibold text-neutral-800">
                      {new Date(receipt.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="border-t border-neutral-200 pt-4">
                    <p className="text-sm font-semibold text-neutral-700 mb-3">Order Items</p>
                    <ul className="space-y-2">
                      {receipt.items.map((item) => (
                        <li
                          key={item._id || item.product?._id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-neutral-600">
                            {item.product?.title || item.title}
                            <span className="text-neutral-400 ml-2">× {item.quantity}</span>
                          </span>
                          <span className="font-semibold text-neutral-800">
                            {formatCurrency((item.product?.price || item.price) * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-neutral-200 pt-4 flex items-center justify-between">
                    <span className="text-base font-semibold text-neutral-700">Total Amount</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-primary text-transparent bg-clip-text">
                      {formatCurrency(receipt.total)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-primary-dark to-primary px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:scale-105"
                >
                  Continue Shopping
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
