import { Router } from "express";
import { handleRegister } from "../controllers/User/Register.mjs";
import { handleLogin } from "../controllers/User/Login.mjs";
import { handleRefresh } from "../controllers/User/Refresh.mjs";

const router = Router();

router.post("/register",handleRegister);
router.post("/login", handleLogin);
router.get("/refresh",handleRefresh);

export default router;