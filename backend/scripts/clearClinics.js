import mongoose from "mongoose";
import dotenv from "dotenv";
import Clinic from "../models/Clinic.js";

dotenv.config();

async function clearData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Clinic.deleteMany({});
    console.log("All clinics deleted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

clearData();
