import {
  MapWrapper,
  Admin,
  EditPoint,
  CreatePoint,
  NotFound,
  Login
} from "components";
import { Routes, Route, Navigate } from "react-router-dom";


const PrivateRoute = ({ children }: any) => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MapWrapper />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/edit/:pointId"
        element={
          <PrivateRoute>
            <EditPoint />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <PrivateRoute>
            <CreatePoint />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;