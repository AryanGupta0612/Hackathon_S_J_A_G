import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InstallPrompt from "./components/InstallPrompt";
  
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  const [recommendedCare, setRecommendedCare] = useState("any");
  const [userLocation, setUserLocation] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  <InstallPrompt />
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
