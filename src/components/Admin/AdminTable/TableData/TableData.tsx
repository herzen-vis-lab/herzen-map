import TableCell from '@mui/material/TableCell';
import { ReactElement } from 'react';


interface TableDataCellProps {
  value: any;
  render?: (value: any) => ReactElement | string;
  maxWidth: number;
}

const cellStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  borderRight: '1px solid #ddd',
};

const TableData = ({ value, render, maxWidth }: TableDataCellProps) => (
  <TableCell align="center" sx={{ ...cellStyles, maxWidth }}>
    {render ? render(value) : value}
  </TableCell>
);

export default TableData;
