import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableData } from './TableData';
import { columns } from './ColumnsConfig';
import { useNavigate } from 'react-router-dom';

type Props = {
  points: any[];
};

const AdminTable = ({ points }: Props) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openData = (pointId: string) => {
    navigate(`/admin/edit/${pointId}`);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: '95vh' }}>
        <Table sx={{ minWidth: '100vw', borderCollapse: 'collapse' }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableHeader key={col.label} label={col.label} maxWidth={col.maxWidth} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {points.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((point) => (
              <TableRow key={point.id} hover={true} sx={{ cursor: 'pointer' }} onClick={() => openData(point.id)}>
                {columns.map((col) => (
                  <TableData
                    key={col.label}
                    value={col.accessor.split('.').reduce((obj, key) => obj?.[key], point)}
                    render={col.render}
                    maxWidth={col.maxWidth}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 40, 50]}
        component="div"
        count={points.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AdminTable;
