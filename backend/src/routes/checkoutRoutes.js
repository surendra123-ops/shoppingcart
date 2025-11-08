import { Router } from 'express';
import { checkoutCart } from '../controllers/cartController.js';

const router = Router();

router.post('/', checkoutCart);

export default router;

