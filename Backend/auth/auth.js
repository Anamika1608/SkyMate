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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First, find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If credentials are correct, create a token
    const token = jwt.sign({ id: user._id }, Jwt_Secret);
    
    // Send the token as a cookie
    res.cookie("token", token, { httpOnly: true });
    
    // Send a success response
    res.status(200).json({ message: "Logged in successfully", user: { email: user.email } });

  } catch (error) {
    res.status(500).json({ message: "Error in login", error: error.message });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "logged-out"
  })
})

app.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      jwt.verify(token, Jwt_Secret);
      res.json({ isLoggedIn: true });
    } catch (error) {
      res.json({ isLoggedIn: false });
    }
  } else {
    res.json({ isLoggedIn: false });
  }
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
