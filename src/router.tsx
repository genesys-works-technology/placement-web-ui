import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavigationLayout } from "./layouts/NavigationLayout";
import { MatchPage } from "./pages/Match";

export default function Router() {
  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route index element={<div>Dashboard</div>} />
        {/* <Route path="/match" element={<div>Select a position</div>} />
        <Route
          path="/match/:placementId"
          element={<div>Select a student</div>}
        /> */}
        <Route
          path="/match/:placementId?/:studentId?"
          element={<MatchPage />}
        />
        <Route path="/ai" element={<div>AI</div>} />
      </Route>
    </Routes>
  );
}
