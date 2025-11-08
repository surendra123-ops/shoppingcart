import { httpClient } from './httpClient.js';

export const checkoutRequest = async (payload) => {
  const { data } = await httpClient.post('/checkout', payload);
  return data;
};

