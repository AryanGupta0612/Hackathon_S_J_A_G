import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons (VERY IMPORTANT)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ClinicMap({ clinics, userLocation }) {
  // Default center (Mumbai fallback)
  const center = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [19.076, 72.8777];

  return (
    <div style={{ height: "400px", marginTop: "20px" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User marker */}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Clinic markers */}
        {clinics.map(
          (clinic) =>
            clinic.lat &&
            clinic.lon && (
              <Marker
                key={clinic._id}
                position={[clinic.lat, clinic.lon]}
              >
                <Popup>
                  <strong>{clinic.name}</strong>
                  <br />
                  Type: {clinic.type}
                  {clinic.distance != null && (
                    <>
                      <br />
                      Distance: {clinic.distance.toFixed(2)} km
                    </>
                  )}
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}

export default ClinicMap;
