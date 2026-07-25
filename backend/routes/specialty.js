import express from "express";
import Specialty from "../moduls/SpecialtySchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const specialties = await Specialty.find().select("name -_id");
    res.json(specialties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
