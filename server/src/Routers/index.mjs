import { Router } from "express";
import categoriesRouter from "./Categories.mjs";
import productsRouter from "./Products.mjs";
import AuthRouter from "./User.mjs";
import ordersRouter from "./Orders.mjs";

const router = Router();

router.use("/api/categories",categoriesRouter);
router.use("/api/products",productsRouter);
router.use("/api/auth",AuthRouter);
router.use("/api/orders",ordersRouter);

export default router;