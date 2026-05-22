import { Router } from "express";
import categoriesRouter from "./Categories.mjs";
import productsRouter from "./Products.mjs";
const router = Router();

router.use("/api/categories",categoriesRouter);
router.use("/api/products",productsRouter);

export default router;