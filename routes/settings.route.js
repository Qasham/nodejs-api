import express from 'express';

import {
  getAllFilterItems,
  sendContactMessage,
} from '../controllers/settings.controller.js';

const router = express.Router();

router.route('/filter-items').get(getAllFilterItems);
router.route('/message').post(sendContactMessage);

export default router;
