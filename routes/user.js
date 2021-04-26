import express from "express";
import { signUp } from "../controllers/user.js";
const router = express.Router();

// CREATE USER
router.post("/", signUp);

export default router;
