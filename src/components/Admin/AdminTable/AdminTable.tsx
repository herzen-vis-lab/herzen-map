import { columns } from './ColumnsConfig';
import { useNavigate } from 'react-router-dom';
import { Point } from 'components/Admin/type';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined';
import { TableCellComponent } from './TableCell';

type Props = {
  points: Point[];
};

const AdminTable = ({ points }: Props) => {
  const navigate = useNavigate();

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  const openEditData = (pointId: string) => {
    navigate(`/admin/edit/${pointId}`);
  };

  const openCreateData = () => {
    navigate(`/admin/create`);
  };

  return (
    <div>
    <TableContainer component={Paper} sx={{ maxHeight: '100vh' }}>
        <Table sx={{ minWidth: '100vw', borderCollapse: 'collapse' }} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCellComponent
                  key={col.label}
                  isHeader
                  label={col.label}
                  maxWidth={col.maxWidth}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {points.map((point) => (
              <TableRow
                key={point.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => openEditData(point.id)}
              >
                {columns.map((col) => (
                  <TableCellComponent
                    key={col.label}
                    value={getNestedValue(point, col.accessor)}
                    render={col.render}
                    maxWidth={col.maxWidth}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
          sx={{position: 'absolute', top: '8px', left: '8px', zIndex: '2'}}
          color="inherit"
          aria-label="add"
          onClick={() => openCreateData()}
      >
          <DataSaverOnOutlinedIcon />
      </IconButton>
  </div>
  );
};

export default AdminTable;