import express from "express";
import { login, refresh, logout } from "../controllers/auth.js";
import loginLimiter from "../middleware/loginLimiter.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

router.get("/refresh", refresh);
router.post("/login", loginLimiter, login);
router.post("/logout", verifyToken, logout);
export default router;
