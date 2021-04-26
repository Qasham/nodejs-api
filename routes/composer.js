import express from "express";
import { createComposer } from "../controllers/composer.js";
const router = express.Router();

// CREATE COMPOSER
router.post("/", createComposer);

export default router;
