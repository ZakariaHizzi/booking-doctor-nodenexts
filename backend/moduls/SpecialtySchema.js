import mongoose from "mongoose";

const SpecialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Specialty = mongoose.model("Specialty", SpecialtySchema);
export default Specialty;
