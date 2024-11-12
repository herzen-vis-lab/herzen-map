import { Snackbar, Alert, AlertColor } from '@mui/material';

type CustomSnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
};

const CustomSnackbar= ({
  open,
  onClose,
  message,
  severity = 'info',
  autoHideDuration = 3000,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
