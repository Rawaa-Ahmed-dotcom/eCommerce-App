import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.mjs";
import router from "./src/Routers/index.mjs";
import QueryString from "qs";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-app-ten-kohl.vercel.app"
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.set("query parser", (str) => QueryString.parse(str));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;