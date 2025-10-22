import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import "./index.css";
import Router from "./router";

const isMockMode = import.meta.env.MODE === "mock";

if (isMockMode) {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

const fetcher = (url: string) => {
  const fetchUrl = isMockMode ? url : new URL(url, "http://localhost:4010").toString();
  return fetch(fetchUrl).then((res) => res.json());
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
);
