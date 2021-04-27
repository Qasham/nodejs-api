import express from "express";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

// CREATE PRODUCT
router.post("/", createProduct);

export default router;
