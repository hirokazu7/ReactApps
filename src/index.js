import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
