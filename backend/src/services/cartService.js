import { CartItem } from '../models/CartItem.js';
import { Product } from '../models/Product.js';

export const addOrUpdateCartItem = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const existingItem = await CartItem.findOne({ user: userId, product: productId });
  const parsedQuantity = Number(quantity);
  const finalQuantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0
    ? Math.floor(parsedQuantity)
    : existingItem
      ? existingItem.quantity + 1
      : 1;

  if (existingItem) {
    existingItem.quantity = finalQuantity;
    await existingItem.save();
    await existingItem.populate('product');
    return existingItem;
  }

  const cartItem = await CartItem.create({
    user: userId,
    product: productId,
    quantity: finalQuantity,
  });
  await cartItem.populate('product');
  return cartItem;
};

export const getCartForUser = async (userId) => {
  const items = await CartItem.find({ user: userId }).populate('product').lean();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { items, total };
};

export const removeCartItem = async (userId, cartItemId) => {
  const deleted = await CartItem.findOneAndDelete({ _id: cartItemId, user: userId });
  if (!deleted) {
    const error = new Error('Cart item not found');
    error.status = 404;
    throw error;
  }
  return deleted;
};

export const clearCart = async (userId) => {
  await CartItem.deleteMany({ user: userId });
};

