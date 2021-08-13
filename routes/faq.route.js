import express from 'express';
import { createFaq, getAllFaqs } from '../controllers/faq.controller.js';

const router = express.Router();

router.route('/').post(createFaq).get(getAllFaqs);

export default router;
