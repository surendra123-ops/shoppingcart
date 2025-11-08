import { httpClient } from './httpClient.js';

export const fetchCart = async () => {
  const { data } = await httpClient.get('/cart');
  return data;
};

export const addToCartRequest = async ({ productId, qty }) => {
  const { data } = await httpClient.post('/cart', { productId, qty });
  return data.item;
};

export const removeCartItemRequest = async (cartItemId) => {
  await httpClient.delete(`/cart/${cartItemId}`);
};

