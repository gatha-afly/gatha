import React from "react";
import ReactDOM from "react-dom/client";
import { APIInterceptors } from "./api/userAPI.jsx";
import App from "./App.jsx";

APIInterceptors();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
