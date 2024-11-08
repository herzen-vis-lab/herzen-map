import { Routes, Route } from "react-router-dom";
import { MapWrapper } from "./components/MapWrapper";
import { Admin } from "./components/Admin";
import { PointDetails } from "./components/Admin/AdminTable/PointDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MapWrapper />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/details/:pointId" element={<PointDetails />} />
    </Routes>
  );
}

export default AppRoutes;
