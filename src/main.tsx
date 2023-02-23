import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EditorProvider } from "./context/EditorContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EditorProvider
      defaultValues={{
        adapt: true,
        aspectRatio: "16:9",
        roundness: 0,
        size: 75,
      }}
    >
      <App />
    </EditorProvider>
  </React.StrictMode>
);
