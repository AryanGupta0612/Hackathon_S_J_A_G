function Notices() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ marginBottom: "12px" }}>Public Health Notices</h1>

      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Official notices and updates (static for now)
      </p>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          marginBottom: "16px",
        }}
      >
        <h3>🩺 Seasonal Flu Advisory</h3>
        <p style={{ color: "#374151" }}>
          Flu cases are rising. If you experience fever, cough, or fatigue,
          consult a nearby clinic.
        </p>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3>🏥 Hospital Capacity Update</h3>
        <p style={{ color: "#374151" }}>
          Some hospitals may experience longer wait times during peak hours.
        </p>
      </div>
    </div>
  );
}

export default Notices;
