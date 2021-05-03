import express from 'express';
import {
  createProduct,
  getProducts,
} from '../controllers/product.controller.js';

const router = express.Router();

router.route('/').post(createProduct).get(getProducts);

export default router;
