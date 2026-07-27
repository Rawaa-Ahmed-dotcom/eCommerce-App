import { Router } from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.mjs";
import { createOrder } from "../controllers/Orders/createOrder.mjs";
import { getUserOrders } from "../controllers/Orders/getUserOrders.mjs";
import { getSingleOrder } from "../controllers/Orders/getSingleOrder.mjs";
import { adminMiddleware } from "../middlewares/adminMiddleware.mjs";
import { getAllOrders } from "../controllers/Orders/getAllOrders.mjs";
import { updateOrderToDelivered } from "../controllers/Orders/updateOrderToDelivered.mjs";
import { updateOrderToPaid } from "../controllers/Orders/updateOrderToPaid.mjs";

const router = Router();

router.post("/", authMiddleWare, createOrder);
router.get("/myorders", authMiddleWare, getUserOrders);
router.get("/:id", authMiddleWare, getSingleOrder);
router.get("/", authMiddleWare, adminMiddleware, getAllOrders);
router.put("/:id/deliver",authMiddleWare,adminMiddleware,updateOrderToDelivered);
router.put("/:id/pay",authMiddleWare,adminMiddleware,updateOrderToPaid);
export default router;