import express from "express";
import InsuranceProvider from "../moduls/InsuranceProviderSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const providers = await InsuranceProvider.find().select("name -_id");
    res.json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
