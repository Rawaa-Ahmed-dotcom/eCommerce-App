import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.mjs";
import router from "./src/Routers/index.mjs";
import QueryString  from "qs" ;
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-app-ten-kohl.vercel.app" 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);
app.use(express.json());
app.set('query parser', (str) => QueryString.parse(str));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

connectDB();
app.listen(process.env.PORT,(req,res) => {
    console.log("Server running on port 5000")
})


export default app;