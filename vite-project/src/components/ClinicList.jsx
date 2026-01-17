import { useEffect, useState } from "react";
import { getClinics } from "../api";

function ClinicList() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClinics();
      setClinics(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Clinics</h2>

      {clinics.length === 0 && <p>No clinics found</p>}

      {clinics.map((clinic) => (
        <div key={clinic._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{clinic.name}</h3>
          <p>Type: {clinic.type}</p>
          <p>Location: {clinic.location}</p>
        </div>
      ))}
    </div>
  );
}

export default ClinicList;
