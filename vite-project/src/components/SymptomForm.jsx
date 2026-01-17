import { useState } from "react";

function SymptomForm() {
  const [symptoms, setSymptoms] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = symptoms.toLowerCase();

    if (input.includes("accident") || input.includes("chest") || input.includes("fracture")) {
      setSuggestion("Recommended: Hospital");
    } else if (input.includes("fever") || input.includes("cold") || input.includes("cough")) {
      setSuggestion("Recommended: Clinic / PHC");
    } else {
      setSuggestion("Recommended: Nearest Clinic");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Symptom Checker</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter symptoms (e.g. fever, cough)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button type="submit">Check</button>
      </form>

      {suggestion && <p><strong>{suggestion}</strong></p>}
    </div>
  );
}

export default SymptomForm;
