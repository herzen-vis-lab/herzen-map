import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPoints } from "api/points";
import { AppDispatch } from "store/store"; 
import { AdminTable } from "./AdminTable";
import { columns } from "components/Admin/AdminTable/ColumnsConfig";
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
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
{
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be45",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be46",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be47",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be48",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be49",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be412",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be4123",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be490",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be498",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be407",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be405",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be450",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546b",
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
  },{
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be",
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
  {
    "id": "9e5e6d69-0231-47ab-aa9b-85feec546be0",
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
  }]

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


  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  const filteredPoints = points.filter((point) =>
    columns.some((col) => {
        const value = getNestedValue(point, col.accessor);
            return (
                typeof value === 'string' &&
                value.toLowerCase().includes(searchQuery.toLowerCase())
            );
    })
  );

  return (
    <>
        <IconButton
            sx={{position: 'absolute', top: '8px', left: '52px', zIndex: '3'}}
            color="inherit"
            aria-label="add"
            onClick={() => setShowSearch(!showSearch)}
        >
            <SearchOutlinedIcon />
        </IconButton>

        {showSearch && (
            <TextField
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название / описание"
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                position: 'absolute',
                top: '8px',
                left: '100px',
                width: '200px',
                zIndex: 5,
            }}
            />
        )}

        <AdminTable points={filteredPoints} />
    </>
  );
};

export default Admin;