import { httpClient } from './httpClient.js';

export const fetchProducts = async () => {
  const { data } = await httpClient.get('/products');
  return data.products;
};

