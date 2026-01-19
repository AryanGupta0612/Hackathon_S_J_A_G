import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import SymptomForm from "./components/SymptomForm";
import ClinicList from "./components/ClinicList";
import Noticeboard from "./components/Noticeboard";
import Admin from "./components/Admin";

import { getRecommendedCare } from "./utils/symptomLogic";

function App() {
  const [recommendedCare, setRecommendedCare] = useState("any");
  const [userLocation, setUserLocation] = useState(null);

  const handleSymptoms = (symptoms, location = null) => {
  if (symptoms) {
    const care = getRecommendedCare(symptoms);
    setRecommendedCare(care);
  }
  if (location) {
    setUserLocation(location);
  }
};


  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>Rural Health Access Assistant</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link> | <Link to="/admin">Admin</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* 👇 symptom input */}
                <SymptomForm onSubmit={handleSymptoms} />

                {/* 👇 clinic prioritization */}
                <ClinicList
                  recommendedCare={recommendedCare}
                  userLocation={userLocation}
                />


                <Noticeboard />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
