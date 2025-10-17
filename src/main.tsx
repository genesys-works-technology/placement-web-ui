import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import "./index.css";
import Router from "./router";

const fetcher = (url: string) =>
  fetch(new URL(url, "http://localhost:4010")).then((res) => res.json());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
);
