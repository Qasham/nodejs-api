import express from 'express';
import { createOrder, getOrder } from '../controllers/order.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getOrder);
router.post('/', auth, createOrder);

export default router;
