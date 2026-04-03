import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./config/i18n/config.js";
import CONFIG from "./config/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
