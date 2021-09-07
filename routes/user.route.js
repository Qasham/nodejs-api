import express from 'express';
import {
  addToBasket,
  editAccountInformation,
  editAddress,
  getBasket,
  getUserData,
  removeFromBasket,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', auth, getUserData);
router.get('/get-basket/', auth, getBasket);
router.post('/add-to-basket/:id', auth, addToBasket);
router.put('/edit-address', auth, editAddress);
router.put('/', auth, editAccountInformation);
router.delete('/remove-from-basket/:id', auth, removeFromBasket);

export default router;
