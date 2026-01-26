import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home({ setSymptoms, setUserLocation }) {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setSymptoms(input);
    setShowModal(true); // 👈 show explanation modal
  };

  const requestLocation = () => {
    setShowModal(false);

    if (!("geolocation" in navigator)) {
      navigate("/results");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        navigate("/results");
      },
      () => {
        // User denied → still continue
        navigate("/results");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      {/* MAIN CARD */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
        }}
      >
        <form
          onSubmit={handleSearch}
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "8px" }}>
            How can I help you?
          </h1>

          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Describe your symptoms to find nearby healthcare
          </p>

          <div
  style={{
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  }}
>
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="e.g. fever, chest pain"
    style={{
      flex: 1,
      height: "52px",
      padding: "0 16px",
      borderRadius: "12px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      outline: "none",
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#2563eb";
      e.target.style.boxShadow =
        "0 0 0 3px rgba(37,99,235,0.15)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#d1d5db";
      e.target.style.boxShadow = "none";
    }}
  />

  <button
    type="submit"
    style={{
      height: "52px",
      padding: "0 28px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
    }}
  >
    Search
  </button>
</div>
    
        </form>
      </div>

      {/* LOCATION EXPLANATION MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              width: "90%",
              maxWidth: "360px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>
              Allow location access?
            </h2>

            <p style={{ color: "#6b7280", marginBottom: "20px" }}>
              We use your location only to show nearby hospitals and clinics.
              Your data is not stored.
            </p>

            <button
              onClick={requestLocation}
              style={{
                width: "100%",
                padding: "12px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Allow Location
            </button>

            <button
              onClick={() => navigate("/results")}
              style={{
                width: "100%",
                padding: "12px",
                background: "#e5e7eb",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              Continue without location
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
