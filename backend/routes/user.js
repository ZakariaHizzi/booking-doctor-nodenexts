import express from "express";
import User from "../moduls/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import auth from "../auth/middleware.js";

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV,
  sameSite: "none",
  path: "/",
};

function setAuthCookie(res, token) {
  res.cookie("token", token, COOKIE_OPTIONS);
}

router.post("/auth/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    setAuthCookie(res, token);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        full_name: newUser.full_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password is not correct" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" },
    );
    setAuthCookie(res, token);
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signout", (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.json({ message: "Signed out successfully" });
});

export default router;
