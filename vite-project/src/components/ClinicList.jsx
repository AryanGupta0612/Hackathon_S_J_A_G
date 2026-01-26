import { useEffect, useState } from "react";
import { getClinics } from "../api";
import ClinicMap from "./ClinicMap";

function ClinicList({ recommendedCare, userLocation }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClinics();
      setClinics(data);
    }
    fetchData();
  }, []);

  // Haversine distance
  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  // Add distance
  const enrichedClinics = clinics.map((clinic) => {
    if (!userLocation || clinic.lat == null || clinic.lon == null) {
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

  // Sort by relevance + distance
  const sortedClinics = enrichedClinics
  .filter(c => c.distance != null) // safety
  .sort((a, b) => {
    const aTypeBonus =
      recommendedCare === "any" || a.type === recommendedCare ? -0.5 : 0;
    const bTypeBonus =
      recommendedCare === "any" || b.type === recommendedCare ? -0.5 : 0;

    const aScore = a.distance + aTypeBonus;
    const bScore = b.distance + bTypeBonus;

    return aScore - bScore;
  });


  // ✅ ONLY top 3
  const top3 = sortedClinics.slice(0, 3);

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Healthcare Facilities</h2>

      {userLocation && (
        <>
          <p style={{ color: "#6b7280", marginBottom: "8px" }}>
            Showing the best nearby healthcare facilities for you
          </p>
          <ClinicMap clinics={top3} userLocation={userLocation} />
        </>
      )}

      <h3 style={{ marginTop: "20px" }}>Top Recommendations</h3>

      {top3.map((clinic, idx) => (
        <div
          key={clinic._id}
          style={{
            background: "#f0fdf4",
            border: "2px solid #16a34a",
            borderRadius: "10px",
            padding: "14px",
            marginTop: "10px",
          }}
        >
          <h3 style={{ margin: 0 }}>
            #{idx + 1} {clinic.name}
          </h3>

          {clinic.distance != null ? (
            <p style={{ margin: "6px 0" }}>
              📍 {clinic.distance.toFixed(2)} km away
            </p>
          ) : (
            <p style={{ margin: "6px 0", color: "#6b7280" }}>
              📍 Distance unavailable
            </p>
          )}

          <p style={{ color: "#16a34a", fontWeight: "bold" }}>
            Recommended for your symptoms
          </p>

          {/* ✅ ROUTING (real roads, ETA, navigation) */}
          {userLocation && clinic.lat && clinic.lon && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${clinic.lat},${clinic.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "6px",
                color: "#2563eb",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              🚗 Get Directions
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default ClinicList;
