import TableCell from '@mui/material/TableCell';
import { ReactNode } from 'react';

interface TableCellComponentProps {
  isHeader?: boolean;
  value?: any;
  render?: (value: any) => ReactNode;
  label?: string;
  maxWidth: number;
}

const TableCellComponent = ({
  isHeader = false,
  value,
  render,
  label,
  maxWidth,
}: TableCellComponentProps) => {
  const styles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderRight: '1px solid #ddd',
    fontWeight: isHeader ? 'bold' : 'normal',
    maxWidth,
  };

  return (
    <TableCell align="center" sx={styles}>
      {isHeader ? label : render ? render(value) : value}
    </TableCell>
  );
};

export default TableCellComponent;
