import { useState } from "react";

function SymptomForm({ onSubmit }) {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(symptoms);
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

      <button
        type="button"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              onSubmit(null, { latitude, longitude });
            },
            () => {
              alert("Location access denied");
            }
          );
        }}
        style={{
          padding: "8px 16px",
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

    </form>
  );
}

export default SymptomForm;
