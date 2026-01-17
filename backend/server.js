const express = require("express");
const cors = require("cors");

const symptomRoutes = require("./routes/symptom");
const clinicRoutes = require("./routes/clinics");
const noticeRoutes = require("./routes/notices");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/symptom", symptomRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/notices", noticeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
