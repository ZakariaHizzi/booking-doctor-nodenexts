import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  education: {
    type: [String],
    default: [],
  },
  certifications: {
    type: [String],
    default: [],
  },
  languages: {
    type: [String],
    default: [],
  },
  experience_years: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  reviews_count: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    default: "",
  },
  image_initials: {
    type: String,
    default: "",
  },
  image_color: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: "",
  },
  next_available: {
    type: String,
    default: "",
  },
  accepted_insurance: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
