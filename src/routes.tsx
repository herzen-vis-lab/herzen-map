import { Routes, Route } from "react-router-dom";
import { MapWrapper } from "./components/MapWrapper";
import { Admin } from "./components/Admin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MapWrapper />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AppRoutes;
