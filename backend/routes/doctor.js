import express from "express";
import Doctor from "../moduls/DoctorSchema.js";

const router = express.Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/Doctor", async (req, res) => {
  try {
    const {
      name,
      specialty,
      title,
      bio,
      education,
      certifications,
      languages,
      experience_years,
      rating,
      reviews_count,
      location,
      image_initials,
      image_color,
      image_url,
      next_available,
      accepted_insurance,
    } = req.body;
    if (!name || !specialty || !title || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newDoctor = new Doctor({
      name,
      specialty,
      title,
      bio,
      education,
      certifications,
      languages,
      experience_years,
      rating,
      reviews_count,
      location,
      image_initials,
      image_color,
      image_url,
      next_available,
      accepted_insurance,
    });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
