import Router from "express";
import { getCartItems } from "../controllers/Cart/GetCartItems.mjs";
import { authMiddleWare } from "../middlewares/authMiddleware.mjs";
import { mergeCart } from "../controllers/Cart/mergeCart.mjs";

const router = Router();

router.get("/getCartItems", authMiddleWare, getCartItems);
router.post("/mergeCart",authMiddleWare,mergeCart);

export default router;

