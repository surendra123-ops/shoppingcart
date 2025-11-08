import { Router } from 'express';
import { addToCart, deleteCartItem, getCart } from '../controllers/cartController.js';

const router = Router();

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:id', deleteCartItem);

export default router;

