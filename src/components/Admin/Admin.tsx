import { useDispatch } from "react-redux";
import { getAllPoints } from "../../api/points";
import type { AppDispatch } from "../../store/store"; 
import { AdminTable } from "./AdminTable";
import { useEffect, useState } from "react";

const Admin = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const [points, setPoints] = useState([]);

  const points = [
    {
          "id": "9e5e6d69-0231-47ab-aa9b-85feec546be2",
          "longitude": 59.933365,
          "latitude": 30.319796,
          "names": {
              "en": "Chemical faculty",
              "ru": "Факультет химии",
              "zh": "zhcuiehrff adqwe"
          },
          "descriptions": {
              "en": "",
              "ru": "Факультет химии",
              "zh": ""
          },
          "type_id": 12,
          "status_id": 1,
          "web": "ya.ru",
          "photos": [
              ""
          ],
          "videos": [
              ""
          ],
          "project_id": "1",
          "createdAt": "2024-09-11T13:28:44.106Z",
          "updatedAt": "2024-09-11T14:15:32.436Z"
  },
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be3",
    "longitude": 58.933365,
    "latitude": 20.319796,
    "names": {
        "en": "Chemical faculty",
        "ru": "Факультет географии",
        "zh": "zhcuiehrff adqwe"
    },
    "descriptions": {
        "en": "",
        "ru": "Факультет географии описание",
        "zh": ""
    },
    "type_id": 2,
    "status_id": 0,
    "web": "ya.ru",
    "photos": [
        ""
    ],
    "videos": [
        ""
    ],
    "project_id": "1",
    "createdAt": "2024-09-11T13:28:44.106Z",
    "updatedAt": "2024-09-11T14:15:32.436Z"
},
{
  "id": "9e5e6d69-0231-47ab-aa9b-85feec546be4",
  "longitude": 99.933365,
  "latitude": 10.319796,
  "names": {
      "en": "Chemical faculty",
      "ru": "Факультет физики",
      "zh": "zhcuiehrff adqwe"
  },
  "descriptions": {
      "en": "",
      "ru": "Факультет физики описание на русском",
      "zh": ""
  },
  "type_id": 6,
  "status_id": 2,
  "web": "ya.ru",
  "photos": [
      ""
  ],
  "videos": [
      ""
  ],
  "project_id": "1",
  "createdAt": "2024-09-11T13:28:44.106Z",
  "updatedAt": "2024-09-11T14:15:32.436Z"
},

  ]

  // useEffect(() => {
  //   const fetchPoints = async () => {
  //     try {
  //       const response = await dispatch(getAllPoints()).unwrap();
  //       setPoints(response);
  //     } catch (error) {
  //       console.error("Error fetching points:", error);
  //     }
  //   };

  //   fetchPoints();
  // }, [dispatch]);

  return (
    <>
      <AdminTable points={points} />
    </>
  );
};

export default Admin;
