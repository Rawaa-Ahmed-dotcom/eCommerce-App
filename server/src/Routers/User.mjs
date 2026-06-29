import { Router } from "express";
import { handleRegister } from "../controllers/User/Register.mjs";
import { handleLogin } from "../controllers/User/Login.mjs";
import { handleRefresh } from "../controllers/User/Refresh.mjs";
import { handleLogout } from "../controllers/User/Logout.mjs";

const router = Router();

router.post("/register",handleRegister);
router.post("/login", handleLogin);
router.get("/refresh",handleRefresh);
router.get("/logout",handleLogout);

export default router;