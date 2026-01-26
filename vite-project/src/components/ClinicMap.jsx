import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// 🧍 User location icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
});

// 🏥 Clinic icon
const clinicIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// 🔁 Routing component
function Routing({ userLocation, clinic }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !clinic) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.latitude, userLocation.longitude),
        L.latLng(clinic.lat, clinic.lon),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 5 }],
      },
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [userLocation, clinic, map]);

  return null;
}

function ClinicMap({ clinics, userLocation }) {
  const [selectedClinic, setSelectedClinic] = useState(null);

  if (!userLocation) return null;

  return (
    <MapContainer
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={13}
      style={{ height: "350px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* USER LOCATION */}
      <Marker
        position={[userLocation.latitude, userLocation.longitude]}
        icon={userIcon}
      >
        <Popup>You are here</Popup>
      </Marker>

      {/* CLINIC MARKERS */}
      {clinics.map((clinic) => (
        <Marker
          key={clinic._id}
          position={[clinic.lat, clinic.lon]}
          icon={clinicIcon}
          eventHandlers={{
            click: () => setSelectedClinic(clinic),
          }}
        >
          <Popup>
            <strong>{clinic.name}</strong>
            <br />
            {clinic.distance?.toFixed(2)} km away
            <br />
            <em>Click to show route</em>
          </Popup>
        </Marker>
      ))}

      {/* ROUTE */}
      {selectedClinic && (
        <Routing
          userLocation={userLocation}
          clinic={selectedClinic}
        />
      )}
    </MapContainer>
  );
}

export default ClinicMap;
