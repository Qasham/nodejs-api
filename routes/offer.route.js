import express from 'express';
import { createOffer, getOffer } from '../controllers/offer.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getOffer);
router.post('/', auth, createOffer);

export default router;
