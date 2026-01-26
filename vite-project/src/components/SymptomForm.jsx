import { useState } from "react";

function SymptomForm({ onSubmit }) {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
        How can we help you today?
      </h2>

      <p style={{ color: "#6b7280", marginBottom: "12px" }}>
        Describe your symptoms or allow location to find nearby healthcare facilities.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. fever, accident, chest pain"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "15px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            marginBottom: "10px",
          }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 16px",
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
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const { latitude, longitude } = pos.coords;
                  onSubmit(null, { latitude, longitude });
                },
                () => alert("Location access denied")
              );
            }}
            style={{
              padding: "10px 16px",
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
    </div>
  );
}

export default SymptomForm;
