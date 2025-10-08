import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavigationLayout } from "./layouts/NavigationLayout";

export default function Router() {
  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="/match" element={<div>Create matches</div>} />
        <Route path="/ai" element={<div>AI</div>} />
      </Route>
    </Routes>
  );
}
