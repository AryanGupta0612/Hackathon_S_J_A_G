import { useEffect } from "react";
import ClinicList from "../components/ClinicList";
import { getRecommendedCare } from "../utils/symptomLogic";
import "./Results.css";

function Results({
  symptoms,
  userLocation,
  recommendedCare,
  setRecommendedCare,
}) {
  useEffect(() => {
    if (symptoms) {
      const care = getRecommendedCare(symptoms);
      setRecommendedCare(care);
    }
  }, [symptoms, setRecommendedCare]);

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Healthcare Near You</h1>
        <p>
          Based on your symptoms: <strong>{symptoms}</strong>
        </p>
      </div>

      <ClinicList
        recommendedCare={recommendedCare}
        userLocation={userLocation}
      />
    </div>
  );
}

export default Results;
