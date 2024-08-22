import express from "express";
import cookieParser from "cookie-parser"
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken"

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use (cors({
    credentials : true,
    origin : "http://localhost:5173"
}))

app.post

app.listen(()=>{
    console.log("app is listening");
})

