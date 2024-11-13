import { useState } from 'react';
import { Modal, Box, Typography, Grid, Button } from '@mui/material';
import { modalStyle } from './ModalStyle';
import { CustomSnackbar } from 'components';
import { useNavigate } from 'react-router';

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  pointName: string;
};

const DeleteModal = ({ open, onClose, pointName }: DeleteModalProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onClose();
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate(`/admin`);
    }, 750);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            Вы действительно хотите удалить "{pointName}"?
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={5}>
              <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                Удалить
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" color="info" fullWidth onClick={onClose}>
                Закрыть
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <CustomSnackbar
        open={snackbarOpen}
        message={`Точка успешно удалена!`}
        severity="success"
      />
    </>
  );
};

export default DeleteModal;
