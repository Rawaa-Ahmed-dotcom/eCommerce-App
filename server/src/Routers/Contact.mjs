import {Router} from "express";
import { createMessage } from "../controllers/Contact/createMessage.mjs";
import { authMiddleWare } from "../middlewares/authMiddleware.mjs";
const router = Router();


router.post("/" , authMiddleWare ,createMessage);

export default router;