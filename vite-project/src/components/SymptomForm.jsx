import { useState } from "react";

function SymptomForm() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState("");

  const checkSymptom = async () => {
  const res = await fetch("http://localhost:5000/api/symptom/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptom })
  });

  const data = await res.json();
  setResult(data.advice);
};


  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Symptom Checker</h2>

      <input
        type="text"
        placeholder="Enter symptom (e.g. fever)"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
      />

      <button onClick={checkSymptom} style={{ marginLeft: "10px" }}>
        Check
      </button>

      {result && <p><b>Advice:</b> {result}</p>}
    </div>
  );
}

export default SymptomForm;
