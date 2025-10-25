import { Route, Routes } from "react-router-dom";
import { NavigationLayout } from "./layouts/NavigationLayout";
import { MatchPage } from "./pages/Match";

export default function Router() {
  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/ai" element={<div>AI</div>} />
      </Route>
    </Routes>
  );
}
