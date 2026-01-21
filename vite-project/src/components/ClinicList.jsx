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

      {/* ✅ STEP B — THIS IS IT */}
      {userLocation && (
        <ClinicMap
          clinics={sortedClinics}
          userLocation={userLocation}
        />
      )}

      {sortedClinics.map((clinic) => (
        <div
          key={clinic._id}
          style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}
        >
          <h3>{clinic.name}</h3>
          <p>Type: {clinic.type}</p>

          {clinic.distance != null && (
            <p>
              <strong>Distance:</strong> {clinic.distance.toFixed(2)} km
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ClinicList;
