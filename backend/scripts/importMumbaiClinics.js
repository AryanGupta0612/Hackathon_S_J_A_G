import mongoose from "mongoose";
import dotenv from "dotenv";
import Clinic from "../models/Clinic.js";

dotenv.config();

const clinics = [
  {
    name: "KEM Hospital",
    type: "government_hospital",
    location: "Mumbai",
    medicines: [],
  },
  {
    name: "Nair Hospital",
    type: "government_hospital",
    location: "Mumbai",
    medicines: [],
  },
  {
    name: "JJ Hospital",
    type: "government_hospital",
    location: "Mumbai",
    medicines: [],
  },
  {
    name: "Municipal PHC – Dharavi",
    type: "phc",
    location: "Mumbai",
    medicines: [],
  },
  {
    name: "Municipal PHC – Govandi",
    type: "phc",
    location: "Mumbai",
    medicines: [],
  },
];

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Clinic.insertMany(clinics);
    console.log("Mumbai government clinics imported");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

importData();
