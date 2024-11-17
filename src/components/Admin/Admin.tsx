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