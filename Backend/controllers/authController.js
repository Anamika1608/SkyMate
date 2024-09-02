import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';

import User from '../models/user.js';
import oauth2client from '../config/auth.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
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
}

export const register = async (req, res) => {
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

};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "logged-out" });
};

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            throw new Error("Authorization code not provided");
        }

        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name } = userRes.data;
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, password: process.env.DEFAULT_PASSWORD });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log("Error during Google login:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
