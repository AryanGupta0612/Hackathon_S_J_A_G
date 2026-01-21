import { useState } from "react";

function SymptomForm({ onSubmit }) {
  const [symptoms, setSymptoms] = useState("");
  const [location, setLocation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(symptoms, location);
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = { latitude, longitude };
        setLocation(loc);
        onSubmit(symptoms, loc);
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Describe your symptoms (e.g. fever, accident, chest pain)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Symptoms
        </button>

        <button
          type="button"
          onClick={handleLocation}
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Use My Location
        </button>
      </div>
    </form>
  );
}

export default SymptomForm;
