import {
  MapWrapper,
  Admin,
  PointDetails,
  CreatePoint
} from "components";
import { Routes, Route } from "react-router-dom";


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
