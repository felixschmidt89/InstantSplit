import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./i18n/config.js";
import { CONFIG } from "./config/index.js";

if (CONFIG.IS_DEV) {
  console.log(`🛠️ Mode: ${CONFIG.MODE}`);
  console.log(`🔗 API: ${CONFIG.API_URL}`);
}
console.log("RAW VITE ENV:", import.meta.env);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
