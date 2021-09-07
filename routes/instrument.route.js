import express from 'express';
import {
  createInstrument,
  getAllInstruments,
} from '../controllers/instrument.controller.js';

const router = express.Router();

router.route('/').post(createInstrument).get(getAllInstruments);

export default router;
