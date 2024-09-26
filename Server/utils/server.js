import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
 
import authRoutes from "../routes/authRoute.js";
import postRoutes from "../routes/postRoute.js"
import userRoutes from "../routes/userRoutes.js"
import commentRoutes from "../routes/commentRoute.js" 
import weatherRoutes from '../routes/weatherRoute.js'

const port = process.env.PORT;

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database connected");
}

main().catch(err => console.log(err));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use(weatherRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
