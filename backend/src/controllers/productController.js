import { listProducts } from '../services/productService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await listProducts();
  res.json({ products });
});

