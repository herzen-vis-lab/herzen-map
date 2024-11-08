import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  points: any[];
};

const AdminTable = ({ points }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: "95vh" }} >
        <Table sx={{ minWidth: "100vw", borderCollapse: 'collapse' }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Названия</TableCell>
              <TableCell align="center" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Описания</TableCell>
              <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Долгота</TableCell>
              <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Широта</TableCell>
              <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Тип</TableCell>
              <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Статус</TableCell>
              <TableCell align="center" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Ссылка</TableCell>
              <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd', fontWeight: 'bold' }}>Фото</TableCell>
              <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>Видео</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((point) => (
              <TableRow key={point.id} hover={true} sx={{ cursor: 'pointer' }}>
                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.names.ru}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.descriptions.ru}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.longitude}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.latitude}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.type_id}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.status_id}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  <Link to={point.web} target="_blank" rel="noopener noreferrer">
                    {point.web}
                  </Link>
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ddd' }}>
                  {point.photos.length > 0 ? <img src={point.photos[0]} alt="Фото" width="50" /> : 'Нет фото'}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {point.videos.length > 0 ? (
                    <a href={point.videos[0]} target="_blank" rel="noopener noreferrer">
                      Видео
                    </a>
                  ) : (
                    'Нет видео'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 40]}
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
