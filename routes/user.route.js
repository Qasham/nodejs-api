import express from "express";
import { signUp, signIn } from "../controllers/user.controller.js";
const router = express.Router();

// CREATE USER
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
