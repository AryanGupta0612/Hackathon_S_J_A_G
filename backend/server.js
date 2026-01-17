const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const symptomRoutes = require("./routes/symptom");
const clinicRoutes = require("./routes/clinics");
const noticeRoutes = require("./routes/notices");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/symptom", symptomRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/notices", noticeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
