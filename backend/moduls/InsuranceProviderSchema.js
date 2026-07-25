import mongoose from "mongoose";

const InsuranceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const InsuranceProvider = mongoose.model("InsuranceProvider", InsuranceProviderSchema);
export default InsuranceProvider;
