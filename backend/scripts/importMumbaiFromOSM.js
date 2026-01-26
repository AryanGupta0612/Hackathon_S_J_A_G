import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Clinic from "../models/Clinic.js";

dotenv.config();

const OVERPASS_URL = "https://overpass.kumi.systems/api/interpreter";

// Mumbai bounding box (south, west, north, east)
const OVERPASS_QUERY = `
[out:json][timeout:60];
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

    const response = await axios.post(OVERPASS_URL, OVERPASS_QUERY, {
      headers: { "Content-Type": "text/plain" },
      timeout: 60000,
    });

    const elements = Array.isArray(response.data?.elements)
      ? response.data.elements
      : [];

    if (elements.length === 0) {
      console.log("No data received from Overpass API");
      process.exit(0);
    }

    const clinics = elements
      .map((el) => {
        const tags = el.tags || {};
        if (!tags.name) return null;

        // ✅ FIX: extract coordinates safely
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        if (lat == null || lon == null) return null;

        const amenity = tags.amenity;

        // Hospitals → always include
        if (amenity === "hospital") {
          return {
            name: tags.name,
            type: "hospital",
            location: "Mumbai",
            lat,
            lon,
            medicines: [],
          };
        }

        // Clinics → government heuristic
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
            name: tags.name,
            type: "clinic",
            location: "Mumbai",
            lat,
            lon,
            medicines: [],
          };
        }

        return null;
      })
      .filter(Boolean);

    for (const clinic of clinics) {
      await Clinic.updateOne(
        { name: clinic.name, location: "Mumbai" },
        { $set: clinic },
        { upsert: true }
      );
    }

    console.log(`Imported ${clinics.length} facilities with coordinates`);
    process.exit(0);
  } catch (err) {
    console.error("Import failed:", err.message);
    process.exit(1);
  }
}

importData();
