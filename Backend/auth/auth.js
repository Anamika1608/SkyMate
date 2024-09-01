import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import oauth2client from './googleConfig.js'
import axios from 'axios';

const JWT_SECRET = 'mystery';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SkyMate');
  console.log("Database connected");
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("inside try catch");

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {

    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    console.log("comparing pw");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    console.log("generating token");
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "12h" });
    res.cookie("token", token, { httpOnly: true });

    // Respond with success
    res.status(200).json({ message: "Logged in successfully", user: { name: user.name, email: user.email } });

  } catch (error) {
    console.error("Login error:", error);  // Log the specific error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "logged-out"
  })
})

app.post("/googleLogin", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw new Error("Authorization code not provided");
    }

    const googleRes = await oauth2client.getToken(code); // Make sure this line is correctly awaiting the response
    oauth2client.setCredentials(googleRes.tokens);

    console.log(googleRes.tokens.access_token);
    // Fetch user data from Google API
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, password: "defaultPassword" }); // Modify as necessary, ensure 'password' field is handled properly
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    console.log("Error during Google login:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// app.get("/check-auth", (req, res) => {
//   const token = req.cookies.token;
//   if (token) {
//     try {
//       jwt.verify(token, JWT_SECRET);
//       res.json({ isLoggedIn: true });
//     } catch (error) {
//       res.json({ isLoggedIn: false });
//     }
//   } else {
//     res.json({ isLoggedIn: false });
//   }
// });


app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
