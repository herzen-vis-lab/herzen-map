import { useDispatch } from "react-redux";
import { getAllPoints } from "../../api/points";
import type { AppDispatch } from "../../store/store"; 
import { AdminTable } from "./AdminTable";
import { useEffect, useState } from "react";

const Admin = () => {
  const dispatch: AppDispatch = useDispatch();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await dispatch(getAllPoints()).unwrap();
        setPoints(response);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, [dispatch]);

  return (
    <>
      <AdminTable points={points} />
    </>
  );
};

export default Admin;
