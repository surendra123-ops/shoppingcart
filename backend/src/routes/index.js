import { Router } from 'express';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import checkoutRoutes from './checkoutRoutes.js';
import authRoutes from './authRoutes.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', authenticate, cartRoutes);
router.use('/checkout', authenticate, checkoutRoutes);

export default router;

