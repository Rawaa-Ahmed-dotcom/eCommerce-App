import { Router } from "express";
import {getAllCategories} from "../controllers/Categories/getCategories.mjs";
import { createCategory } from "../controllers/Categories/addCategory.mjs";
import { updateCategory } from "../controllers/Categories/updateCategory.mjs";
import { deleteCategory } from "../controllers/Categories/deleteCategory.mjs";
import {upload} from "../config/cloudinary.mjs";
import { getSingleCategory } from "../controllers/Categories/getSingleCategory.mjs";

const router = Router();

router.get("/",getAllCategories);
router.get("/:slug",getSingleCategory);
router.post("/", upload.single('img'), createCategory); 
router.patch("/:slug" ,upload.single("img"),updateCategory);
router.delete("/:slug",deleteCategory);
export default router;