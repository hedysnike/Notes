import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ItemsProvider } from "./useItems";
import { LabelsProvider } from "./useLabels";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ItemsProvider>
      <LabelsProvider>
        <App />
      </LabelsProvider>
    </ItemsProvider>
  </React.StrictMode>
);
