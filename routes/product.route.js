import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// CREATE PRODUCT
router.post("/", createProduct);

// GET ALL
router.get("/", getProducts);

export default router;
