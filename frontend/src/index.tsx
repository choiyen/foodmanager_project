import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PageRenderProvider } from "./components/organisms/PageRenderContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <PageRenderProvider>
        <App />
      </PageRenderProvider>
    </React.StrictMode>
  );
}
