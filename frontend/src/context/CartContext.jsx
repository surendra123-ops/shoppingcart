/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { addToCartRequest, fetchCart, removeCartItemRequest } from '../api/cartApi.js';
import { useAuthContext } from './AuthContext.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { status, isAuthenticated } = useAuthContext();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const hydrate = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchCart();
      setItems(Array.isArray(data.items) ? data.items : []);
      setTotal(Number(data.total) || 0);
    } catch (error) {
      toast.error(error.message || 'Unable to load cart');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (status === 'authenticated') {
      hydrate();
    }
    if (status === 'unauthenticated') {
      setItems([]);
      setTotal(0);
    }
  }, [status, hydrate]);

  const addItem = useCallback(
    async ({ productId, qty = 1 }) => {
      if (!isAuthenticated) {
        toast.error('Please login to add items to your cart');
        return;
      }
      try {
        await addToCartRequest({ productId, qty });
        toast.success('Item added to cart');
        await hydrate();
      } catch (error) {
        toast.error(error.message || 'Unable to add item');
      }
    },
    [hydrate, isAuthenticated]
  );

  const updateQuantity = useCallback(
    async ({ productId, quantity }) => {
      if (!isAuthenticated) {
        return;
      }
      try {
        await addToCartRequest({ productId, qty: quantity });
        await hydrate();
      } catch (error) {
        toast.error(error.message || 'Unable to update quantity');
        await hydrate();
      }
    },
    [hydrate, isAuthenticated]
  );

  const removeItem = useCallback(
    async (cartItemId) => {
      if (!isAuthenticated) {
        return;
      }
      try {
        await removeCartItemRequest(cartItemId);
        toast.success('Item removed');
        await hydrate();
      } catch (error) {
        toast.error(error.message || 'Unable to remove item');
        await hydrate();
      }
    },
    [hydrate, isAuthenticated]
  );

  const clearCartState = useCallback(() => {
    setItems([]);
    setTotal(0);
  }, []);

  const value = useMemo(
    () => ({
      items,
      total,
      loading,
      isEmpty: items.length === 0,
      addItem,
      updateQuantity,
      removeItem,
      hydrate,
      clearCartState,
    }),
    [items, total, loading, addItem, updateQuantity, removeItem, hydrate, clearCartState]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

