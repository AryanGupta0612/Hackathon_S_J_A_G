import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import OfflineFallback from "./components/OfflineFallback";

function Root() {
  const [online, setOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return online ? <App /> : <OfflineFallback />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
