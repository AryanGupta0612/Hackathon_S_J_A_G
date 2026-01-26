function OfflineFallback() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        background: "#f8fafc",
      }}
    >
      <h1>⚠️ You’re Offline</h1>

      <p style={{ color: "#6b7280", maxWidth: "360px" }}>
        Internet connection is unavailable.  
        You can still view previously loaded healthcare data.
      </p>

      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "20px",
          padding: "12px 18px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontWeight: "600",
        }}
      >
        Try Again
      </button>
    </div>
  );
}

export default OfflineFallback;
