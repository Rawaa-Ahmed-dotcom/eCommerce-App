import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.mjs";
import router from "./src/Routers/index.mjs";
import QueryString  from "qs" ;
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.set('query parser', (str) => QueryString.parse(str));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

connectDB();
app.listen(process.env.PORT,(req,res) => {
    console.log("Server running on port 5000")
})


