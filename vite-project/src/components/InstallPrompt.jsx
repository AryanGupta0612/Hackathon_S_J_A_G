import { useEffect, useState } from "react";

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#16a34a",
        color: "white",
        padding: "14px 18px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        zIndex: 100,
      }}
    >
      <p style={{ margin: 0, fontWeight: "600" }}>
        Install this app for faster access
      </p>

      <button
        onClick={handleInstall}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "8px",
          background: "white",
          color: "#16a34a",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Install App
      </button>
    </div>
  );
}

export default InstallPrompt;
