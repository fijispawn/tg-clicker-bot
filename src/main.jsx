import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl="https://magical-rabanadas-3a22bb.netlify.app/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  </StrictMode>
);


