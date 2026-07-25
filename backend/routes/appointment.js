import express from "express";
import Appointment from "../moduls/appointementSchema.js";
import auth from "../auth/middleware.js";

const router = express.Router();

router.get("/myAppointments", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient_id: req.user.id,
    })
      .populate("doctor_id", "name specialty image_initials image_color")
      .sort({ appointment_date: -1 });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/providerAppointments", auth, async (req, res) => {
  try {
    const doctor = await (
      await import("../moduls/DoctorSchema.js")
    ).default.findOne({ profile_id: req.user.id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    const appointments = await Appointment.find({ doctor_id: doctor._id })
      .populate("patient_id", "full_name email")
      .sort({ appointment_date: -1 });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/count", auth, async (req, res) => {
  try {
    const total = await Appointment.countDocuments({
      patient_id: req.user.id,
    });
    const scheduled = await Appointment.countDocuments({
      patient_id: req.user.id,
      status: "scheduled",
    });
    const completed = await Appointment.countDocuments({
      patient_id: req.user.id,
      status: "completed",
    });
    res.json({ total, scheduled, completed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/createAppointment", auth, async (req, res) => {
  try {
    console.log("Create appointment - req.user:", req.user);
    console.log("Create appointment - req.body:", req.body);

    const {
      doctor_id,
      appointment_date,
      appointment_time,
      reason_for_visit,
      is_first_visit,
      insurance_provider,
      insurance_member_id,
      insurance_group_number,
    } = req.body;
    if (!doctor_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const appointment = await Appointment.create({
      patient_id: req.user.id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason_for_visit,
      is_first_visit,
      insurance_provider,
      insurance_member_id,
      insurance_group_number,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Create appointment error:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deleteAppointment/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateStatus/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !["scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
