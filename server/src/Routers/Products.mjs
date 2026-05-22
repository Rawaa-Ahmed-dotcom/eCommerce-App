import { upload } from "../config/cloudinary.mjs";
import { addProduct } from "../controllers/Products/addProduct.mjs";
import { getProducts } from "../controllers/Products/getProducts.mjs";
import { Router } from "express";
const router = Router();

router.get("/",getProducts);
// router.post("/",upload.array("images"),addProduct);

router.post(
  "/",
  (req, res, next) => {

    upload.array("images")(req, res, (err) => {

      if (err) {
        console.log("UPLOAD ERROR => ", err);

        return res.status(500).json({
          message: err.message,
          error: err
        });
      }

      next();
    });

  },
  addProduct
);
export default router;