import { Snackbar, Alert, AlertColor } from '@mui/material';

type CustomSnackbarProps = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
};

const CustomSnackbar= ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 2500,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
