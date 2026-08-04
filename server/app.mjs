import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import QueryString from "qs";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/config/db.mjs";
import router from "./src/Routers/index.mjs";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-app-ten-kohl.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.set("query parser", (str) => QueryString.parse(str));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database Connection Failed", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "E-Commerce API is running smoothly!"
  });
});

app.use(router);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;