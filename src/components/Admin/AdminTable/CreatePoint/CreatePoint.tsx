import { useState } from 'react';
import { TextField, MenuItem, Grid, Typography, Button, AlertColor } from '@mui/material';
import { getTypeLabel, getStatusLabel } from 'utils';
import { Point } from "components/Admin/type";
import { initialData } from './initialData';
import { postPoint } from 'api/points';
import SendIcon from '@mui/icons-material/Send';
import { ImagePreviewOnHover } from '../ImagePreviewOnHover';
import { CustomSnackbar } from 'components/SnackBar';
import { useNavigate } from 'react-router';


const CreatePoint = () => {
  const [point, setPoint] = useState<Point>(initialData);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (field: keyof Point, value: any) => {
    setPoint((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!point) return;
    setLoading(true);
    try {
      await postPoint(point);
      setTimeout(() => {
        navigate('/admin');
      }, 500);
      setSnackbarMessage("Точка успешно создана!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    } catch (error) {
      console.error("Error creating point:", error);
      setSnackbarMessage("Не удалось создать точку!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNestedChange = (
    field: 'names' | 'descriptions',
    nestedField: keyof Point['names'] | keyof Point['descriptions'],
    value: string
  ) => {
    setPoint((prev) => ({
      ...prev,
      [field]: { ...prev[field], [nestedField]: value },
    }));
  };

  return (
    <Grid container spacing={3} sx={{ padding: 5 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">Создание точки</Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Название (RU)"
          variant="outlined"
          fullWidth
          value={point.names.ru}
          onChange={(e) => handleNestedChange('names', 'ru', e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (EN)"
          variant="outlined"
          fullWidth
          value={point.names.en}
          onChange={(e) => handleNestedChange('names', 'en', e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (ZH)"
          variant="outlined"
          fullWidth
          value={point.names.zh}
          onChange={(e) => handleNestedChange('names', 'zh', e.target.value)}
        />
      </Grid>

      <Grid item container spacing={2} xs={12}>
        <Grid item xs={4}>
          <TextField
            label="Описание (RU)"
            variant="outlined"
            fullWidth
            multiline
            value={point.descriptions.ru}
            onChange={(e) => handleNestedChange('descriptions', 'ru', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Описание (EN)"
            variant="outlined"
            fullWidth
            multiline
            value={point.descriptions.en}
            onChange={(e) => handleNestedChange('descriptions', 'en', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Описание (ZH)"
            variant="outlined"
            fullWidth
            multiline
            value={point.descriptions.zh}
            onChange={(e) => handleNestedChange('descriptions', 'zh', e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Долгота"
          variant="outlined"
          fullWidth
          type="number"
          value={point.longitude}
          onChange={(e) => handleChange('longitude', e.target.value ? parseFloat(e.target.value) : '')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Широта"
          variant="outlined"
          fullWidth
          type="number"
          value={point.latitude}
          onChange={(e) => handleChange('latitude', e.target.value ? parseFloat(e.target.value) : '')}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Тип"
          select
          variant="outlined"
          fullWidth
          value={point.type_id}
          onChange={(e) => handleChange('type_id', Number(e.target.value))}
        >
          {Array.from({ length: 21 }, (_, index) => index + 2).map((typeId) => (
            <MenuItem key={typeId} value={typeId}>
              {getTypeLabel(typeId)}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Статус"
          select
          variant="outlined"
          fullWidth
          value={point.status_id}
          onChange={(e) => handleChange('status_id', Number(e.target.value))}
        >
          {[0, 1, 2].map((statusId) => (
            <MenuItem key={statusId} value={statusId}>
              {getStatusLabel(statusId)}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Веб-сайт"
          variant="outlined"
          fullWidth
          value={point.web}
          onChange={(e) => handleChange('web', e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <ImagePreviewOnHover src={point?.picture || ''} width={350} height={270}>
          <TextField
            label="Фото URL"
            variant="outlined"
            fullWidth
            value={point?.picture || ''}
            onChange={(e) => handleChange('picture', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </ImagePreviewOnHover>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="info"
          fullWidth
          startIcon={<SendIcon />}
          onClick={handleSave}
          disabled={loading}
        >
          СОХРАНИТЬ
        </Button>
        <CustomSnackbar
          onClose={handleSnackbarClose}
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </Grid>
    </Grid>
  );
};

export default CreatePoint;