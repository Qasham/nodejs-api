import express from 'express';
import { addToBasket } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/add-to-basket/:id', addToBasket);

export default router;
