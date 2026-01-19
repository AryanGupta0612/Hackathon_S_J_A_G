import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Clinic from "../models/Clinic.js";

dotenv.config();

const OVERPASS_URL = "https://overpass.kumi.systems/api/interpreter";

// Overpass QL query for Mumbai government hospitals & PHCs
const query = `
[out:json][timeout:25];
(
  node["amenity"="hospital"](18.85,72.75,19.30,73.05);
  way["amenity"="hospital"](18.85,72.75,19.30,73.05);
  node["amenity"="clinic"](18.85,72.75,19.30,73.05);
  way["amenity"="clinic"](18.85,72.75,19.30,73.05);
);
out center tags;
`;


async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const response = await axios.post(OVERPASS_URL, query, {
      headers: { "Content-Type": "text/plain" },
    });

    const elements = response.data.elements;

    const clinics = elements
  .map((el) => {
    const tags = el.tags || {};
    const name = tags.name;
    if (!name) return null;

    const amenity = tags.amenity;

    // Assume hospitals are government by default
    if (amenity === "hospital") {
      return {
        name,
        type: "hospital",
        location: "Mumbai",
        medicines: [],
      };
    }

    // For clinics, apply heuristic
    if (amenity === "clinic") {
      const operator = (tags.operator || "").toLowerCase();
      const ownership = (tags.ownership || "").toLowerCase();

      const looksGovernment =
        operator.includes("government") ||
        operator.includes("municipal") ||
        operator.includes("bmc") ||
        ownership.includes("government") ||
        ownership.includes("public");

      if (!looksGovernment) return null;

      return {
        name,
        type: "clinic",
        location: "Mumbai",
        medicines: [],
      };
    }

    return null;
  })
  .filter(Boolean);


    // Optional: prevent duplicates by name
    for (const clinic of clinics) {
      await Clinic.updateOne(
        { name: clinic.name, location: "Mumbai" },
        { $setOnInsert: clinic },
        { upsert: true }
      );
    }

    console.log(`Imported ${clinics.length} government facilities from OSM`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

importData();
