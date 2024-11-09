import { useState } from 'react';
import { TextField, MenuItem, Grid, Typography, Button } from '@mui/material';
import { getTypeLabel, getStatusLabel } from 'utils';
import { Point } from "components/Admin/type";


const mockPoint: Point = {
  id: '1',
  longitude: 30.3158,
  latitude: 59.939,
  names: {
    ru: 'Точка на русском',
    en: 'Point in English',
    zh: '中文点',
  },
  descriptions: {
    ru: 'Описание на русском языке',
    en: 'Description in English',
    zh: '中文描述',
  },
  type_id: 2,
  status_id: 1,
  web: 'https://example.com',
  photos: ['https://example.com/photo1.jpg'],
};

const PointDetails = () => {
  const [formData, setFormData] = useState<Point>(mockPoint);

  const handleChange = (field: keyof Point, value: Number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <Grid container spacing={3} sx={{padding: 5}}>
      <Grid item xs={12}>
        <Typography variant="h4" align='center'>Редактирование точки</Typography>
      </Grid>

      {/* Names fields (ru, en, zh) */}
      <Grid item xs={4}>
        <TextField
          label="Название (RU)"
          variant="outlined"
          fullWidth
          value={formData.names.ru}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (EN)"
          variant="outlined"
          fullWidth
          value={formData.names.en}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (ZH)"
          variant="outlined"
          fullWidth
          value={formData.names.zh}
        />
      </Grid>
      

      {/* Descriptions fields (ru, en, zh) */}
        <Grid item container spacing={2} xs={12}>
            <Grid item xs={4}>
                <TextField
                label="Описание (RU)"
                variant="outlined"
                fullWidth
                multiline
                value={formData.descriptions.ru}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="Описание (EN)"
                variant="outlined"
                fullWidth
                multiline
                value={formData.descriptions.en}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                label="Описание (ZH)"
                variant="outlined"
                fullWidth
                multiline
                value={formData.descriptions.zh}
                />
            </Grid>
        </Grid>


      {/* Longitude and Latitude fields */}
      <Grid item xs={6}>
        <TextField
          label="Долгота"
          variant="outlined"
          fullWidth
          value={formData.longitude}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Широта"
          variant="outlined"
          fullWidth
          value={formData.latitude}
        />
      </Grid>

      {/* Type and Status dropdowns */}
      <Grid item xs={6}>
        <TextField
          label="Тип"
          select
          variant="outlined"
          fullWidth
          value={formData.type_id}
          onChange={(e) => handleChange('type_id', Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((typeId) => (
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

      {/* Web and Photos fields */}
      <Grid item xs={12}>
        <TextField
          label="Веб-сайт"
          variant="outlined"
          fullWidth
          value={formData.web}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Фото URL"
          variant="outlined"
          fullWidth
          value={formData.photos[0] || ''}
        />
      </Grid> 
        <Grid item xs={12}>
            <Button variant="contained" color="info" fullWidth>
                СОХРАНИТЬ
            </Button>
        </Grid>
    </Grid>
  );
};

export default PointDetails;