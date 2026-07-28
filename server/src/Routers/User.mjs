import { Router } from "express";
import { handleRegister } from "../controllers/User/Register.mjs";
import { handleLogin } from "../controllers/User/Login.mjs";
import { handleRefresh } from "../controllers/User/Refresh.mjs";
import { handleLogout } from "../controllers/User/Logout.mjs";
import { authMiddleWare } from "../middlewares/authMiddleware.mjs";
import { upload } from "../config/cloudinary.mjs";
import { uploadProfilePic } from "../controllers/User/uploadProfileImg.mjs";
import { updateProfile } from "../controllers/User/updateProfile.mjs";
import { changePassword } from "../controllers/User/changePassword.mjs";
import { getProfile } from "../controllers/User/getProfile.mjs";
import { deleteAccount } from "../controllers/User/deleteAccount.mjs";

const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/refresh", handleRefresh);
router.get("/logout", handleLogout);
router.patch("/profile-picture", authMiddleWare, upload.single("profileImage"), uploadProfilePic);
router.patch("/profile", authMiddleWare, updateProfile);
router.patch("/change-password", authMiddleWare, changePassword);
router.get("/profile", authMiddleWare, getProfile);
router.delete("/profile", authMiddleWare, deleteAccount);


export default router;