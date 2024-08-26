import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Jwt_Secret = "mystery";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SkyMate');
  console.log("Database connected");
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));


app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("inside try catch");

    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, Jwt_Secret);

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {

    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

app.get("/login", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, Jwt_Secret);
    console.log(decoded);
    
    const userId = decoded._id;
    const user = await User.findById(userId);
    if (!user) res.send("user not found");

    res.send("logged in");
    console.log(user);
  }

  catch (error) {
    res.status(404).send("error in fetching details");
  }
})

app.post("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "logged-out"
  })
})

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
