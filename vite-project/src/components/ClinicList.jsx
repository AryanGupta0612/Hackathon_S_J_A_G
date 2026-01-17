import { useEffect, useState } from "react";

function ClinicList() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clinics")
      .then(res => res.json())
      .then(data => setClinics(data));
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Nearby Clinics</h2>
      <ul>
        {clinics.map(clinic => (
          <li key={clinic.id}>
            <b>{clinic.name}</b> – Medicines: {clinic.medicines.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClinicList;
