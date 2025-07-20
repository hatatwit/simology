import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@assets/styles/Main.css";
import { ThemeProvider } from "@contexts/ThemeContext";
import { ReactFlowProvider } from "@xyflow/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </ThemeProvider>
  </StrictMode>
);
