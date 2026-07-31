import { Router } from "express";
import categoriesRouter from "./Categories.mjs";
import productsRouter from "./Products.mjs";
import AuthRouter from "./User.mjs";
import ordersRouter from "./Orders.mjs";
import contactRouter from "./Contact.mjs";

const router = Router();

router.use("/api/categories",categoriesRouter);
router.use("/api/products",productsRouter);
router.use("/api/auth",AuthRouter);
router.use("/api/orders",ordersRouter);
router.use("/api/contact",contactRouter);
export default router;