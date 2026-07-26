import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import User from "./routes/user.js";
import Doctor from "./routes/doctor.js";
import appointment from "./routes/appointment.js";
import Specialty from "./routes/specialty.js";
import Insurance from "./routes/insurance.js";
import Profile from "./routes/profile.js";
import mongoose from "mongoose";

const port = 3000;
const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://zakaria:zakisisi@ac-kml8sgp-shard-00-00.jyzbhfh.mongodb.net:27017,ac-kml8sgp-shard-00-01.jyzbhfh.mongodb.net:27017,ac-kml8sgp-shard-00-02.jyzbhfh.mongodb.net:27017/?ssl=true&replicaSet=atlas-txsgk3-shard-0&authSource=admin&appName=zakaria",
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://fullstack-booking-doctor.vercel.app",
    credentials: true,
  }),
);

app.use("/user", User);
app.use("/doctor", Doctor);
app.use("/appointment", appointment);
app.use("/specialty", Specialty);
app.use("/insurance", Insurance);
app.use("/profile", Profile);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
