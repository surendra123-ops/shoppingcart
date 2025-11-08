import {
  addOrUpdateCartItem,
  clearCart,
  getCartForUser,
  removeCartItem,
} from '../services/cartService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCart = asyncHandler(async (req, res) => {
  const { items, total } = await getCartForUser(req.user.id);
  res.json({ items, total });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error('productId is required');
  }
  const quantity = Number(qty) || 1;
  const item = await addOrUpdateCartItem(req.user.id, productId, quantity);
  res.status(201).json({ item });
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await removeCartItem(req.user.id, id);
  res.status(204).send();
});

export const checkoutCart = asyncHandler(async (req, res) => {
  const { name, email, cartItems } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error('Name and email are required');
  }

  let itemsPayload = cartItems;
  let total = 0;

  if (!Array.isArray(itemsPayload) || itemsPayload.length === 0) {
    const computed = await getCartForUser(req.user.id);
    itemsPayload = computed.items;
    total = computed.total;
  } else {
    total = itemsPayload.reduce(
      (sum, item) => sum + Number(item.product?.price || item.price || 0) * Number(item.quantity || 1),
      0
    );
  }

  if (!itemsPayload || itemsPayload.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  await clearCart(req.user.id);

  const timestamp = new Date().toISOString();

  res.json({
    message: `Checkout successful`,
    total,
    timestamp,
    receipt: {
      customer: {
        name,
        email,
      },
      items: itemsPayload,
    },
  });
});

