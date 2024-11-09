import { Routes, Route } from "react-router-dom";
import { MapWrapper } from "./components/MapWrapper";
import { Admin } from "./components";
import { PointDetails } from "./components";
import { CreatePoint } from "./components";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MapWrapper />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/edit/:pointId" element={<PointDetails />} />
      <Route path="/admin/create" element={<CreatePoint />} />
    </Routes>
  );
}

export default AppRoutes;
