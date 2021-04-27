import express from "express";
import {
  createComposer,
  getComposers,
} from "../controllers/composer.controller.js";
const router = express.Router();

// CREATE
router.post("/", createComposer);

// GET ALL
router.get("/", getComposers);

export default router;
