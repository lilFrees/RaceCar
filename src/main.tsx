import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "./context/api-context.tsx";
import "./index.scss";
import { AppStateProvider } from "./context/app-state.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </AppStateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
