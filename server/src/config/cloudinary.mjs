import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "products",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 800, height: 800, crop: "limit" }],
      public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname.split(".")[0]}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("نوع الملف غير مسموح. مسموح فقط: jpg, jpeg, png, webp"),
      false
    );
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 ميجا لكل صورة
    files: 5, // أقصى عدد صور مسموح بيه (عدله حسب احتياجك)
  },
});

export default cloudinary;