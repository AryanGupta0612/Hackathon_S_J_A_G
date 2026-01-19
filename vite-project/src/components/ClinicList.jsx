import { useEffect, useState } from "react";
import { getClinics } from "../api";

function ClinicList({ recommendedCare, userLocation }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClinics();
      setClinics(data);
    }
    fetchData();
  }, []);

  // Haversine distance formula
  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  // Add distance to clinics
  const enrichedClinics = clinics.map((clinic) => {
    if (
      !userLocation ||
      clinic.lat == null ||
      clinic.lon == null
    ) {
      return clinic;
    }

    return {
      ...clinic,
      distance: getDistanceKm(
        userLocation.latitude,
        userLocation.longitude,
        clinic.lat,
        clinic.lon
      ),
    };
  });

  // Sort by recommended care first, then nearest distance
  const sortedClinics = enrichedClinics.sort((a, b) => {
    const aMatch = recommendedCare === "any" || a.type === recommendedCare;
    const bMatch = recommendedCare === "any" || b.type === recommendedCare;

    if (aMatch !== bMatch) return bMatch - aMatch;
    if (a.distance == null) return 1;
    if (b.distance == null) return -1;
    return a.distance - b.distance;
  });

  return (
    <div>
      <h2>Healthcare Facilities</h2>

      {recommendedCare !== "any" && (
        <p
          style={{
            backgroundColor: "#e0f2fe",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          Based on your symptoms, visiting a{" "}
          <span style={{ color: "#0f172a" }}>
            {recommendedCare === "hospital" ? "hospital" : "clinic"}
          </span>{" "}
          is recommended.
        </p>
      )}

      {sortedClinics.length === 0 && <p>No clinics found</p>}

      {sortedClinics.map((clinic) => {
        const isRecommended =
          recommendedCare === "any" ||
          clinic.type === recommendedCare;

        return (
          <div
            key={clinic._id}
            style={{
              border: isRecommended
                ? "2px solid green"
                : "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              opacity: isRecommended ? 1 : 0.35,
              backgroundColor: isRecommended ? "#f0fff4" : "#fff",
            }}
          >
            <h3>{clinic.name}</h3>
            <p>Type: {clinic.type}</p>

            {clinic.distance != null && (
              <p>
                <strong>Distance:</strong>{" "}
                {clinic.distance.toFixed(2)} km
              </p>
            )}

            {isRecommended && (
              <strong style={{ color: "green" }}>
                Recommended for your symptoms
              </strong>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ClinicList;
