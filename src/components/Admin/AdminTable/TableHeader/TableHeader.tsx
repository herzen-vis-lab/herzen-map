import TableCell from '@mui/material/TableCell';

interface TableHeaderCellProps {
  label: string;
  maxWidth: number;
}

const headerCellStyles = {
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  borderRight: '1px solid #ddd',
};

const TableHeader = ({ label, maxWidth }: TableHeaderCellProps) => (
  <TableCell align="center" sx={{ ...headerCellStyles, maxWidth }}>{label}</TableCell>
);

export default TableHeader;
