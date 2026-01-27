import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import InstallPrompt from "./components/InstallPrompt";

import Home from "./pages/Home";
import Results from "./pages/Results";
import Notices from "./pages/Notices";

function App() {
  const [recommendedCare, setRecommendedCare] = useState("any");
  const [userLocation, setUserLocation] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  return (
    <BrowserRouter>
      <InstallPrompt />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSymptoms={setSymptoms}
              setUserLocation={setUserLocation}
            />
          }
        />

        <Route
          path="/results"
          element={
            <Results
              symptoms={symptoms}
              userLocation={userLocation}
              recommendedCare={recommendedCare}
              setRecommendedCare={setRecommendedCare}
            />
          }
        />

        <Route path="/notices" element={<Notices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
