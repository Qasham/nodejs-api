import express from "express";
import {
  createComposer,
  getComposers,
} from "../controllers/composer.controller.js";

const router = express.Router();

router.route("/").get(getComposers).post(createComposer);

export default router;
