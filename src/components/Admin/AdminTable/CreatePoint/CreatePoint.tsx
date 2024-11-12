import { useState } from 'react';
import { TextField, MenuItem, Grid, Typography, Button } from '@mui/material';
import { getTypeLabel, getStatusLabel } from 'utils';
import { Point } from "components/Admin/type";
import { initialData } from './initialData';
import SendIcon from '@mui/icons-material/Send';


const CreatePoint = () => {
  const [formData, setFormData] = useState<Point>(initialData);

  const handleChange = (field: keyof Point, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (
    field: 'names' | 'descriptions',
    nestedField: keyof Point['names'] | keyof Point['descriptions'],
    value: string
  ) => {
    setFormData((prev) => ({
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
          value={formData.names.ru}
          onChange={(e) => handleNestedChange('names', 'ru', e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (EN)"
          variant="outlined"
          fullWidth
          value={formData.names.en}
          onChange={(e) => handleNestedChange('names', 'en', e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (ZH)"
          variant="outlined"
          fullWidth
          value={formData.names.zh}
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
            value={formData.descriptions.ru}
            onChange={(e) => handleNestedChange('descriptions', 'ru', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Описание (EN)"
            variant="outlined"
            fullWidth
            multiline
            value={formData.descriptions.en}
            onChange={(e) => handleNestedChange('descriptions', 'en', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Описание (ZH)"
            variant="outlined"
            fullWidth
            multiline
            value={formData.descriptions.zh}
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
          value={formData.longitude}
          onChange={(e) => handleChange('longitude', e.target.value ? parseFloat(e.target.value) : '')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Широта"
          variant="outlined"
          fullWidth
          type="number"
          value={formData.latitude}
          onChange={(e) => handleChange('latitude', e.target.value ? parseFloat(e.target.value) : '')}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Тип"
          select
          variant="outlined"
          fullWidth
          value={formData.type_id}
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
          value={formData.status_id}
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
          value={formData.web}
          onChange={(e) => handleChange('web', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Фото URL"
          variant="outlined"
          fullWidth
          value={formData.photos[0] || ''}
          onChange={(e) => handleChange('photos', [e.target.value])}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
         variant="contained"
         color="info"
         fullWidth
         startIcon={<SendIcon />}
        >
          СОХРАНИТЬ
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreatePoint;