import express from 'express';
import {
  addToBasket,
  editAddress,
  getBasket,
  removeFromBasket,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/get-basket/', auth, getBasket);
router.post('/add-to-basket/:id', auth, addToBasket);
router.put('/edit-address', auth, editAddress);
router.delete('/remove-from-basket/:id', auth, removeFromBasket);

export default router;
