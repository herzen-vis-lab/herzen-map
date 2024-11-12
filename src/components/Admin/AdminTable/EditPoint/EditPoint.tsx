import { useEffect, useState } from 'react';
import { TextField, MenuItem, Grid, Typography, Button } from '@mui/material';
import { getTypeLabel, getStatusLabel } from 'utils';
import { Point } from "components/Admin/type";
import SendIcon from '@mui/icons-material/Send';
import { getPoint, patchPoint } from 'api/points';
import { useParams } from 'react-router';

const EditPoint = () => {
  const [point, setPoint] = useState<Point | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const pointId = String(params.pointId);

  const handleSave = async () => {
    if (!point) return;
    setLoading(true);
    setError(null);
    try {
      await patchPoint(pointId, point);
      console.log("Point updated successfully");
    } catch (error) {
      console.error("Error updating point:", error);
      setError("Не удалось сохранить изменения." + error);
    } finally {
      setLoading(false);
    }
  };

  // обработчик для обновления выпадающих полей
  const handleChange = (field: keyof Point, value: any) => {
    setPoint((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  // обработчик для обновления вложенных полей (например, names и descriptions)
  const handleNestedChange = (section: keyof Pick<Point, 'names' | 'descriptions'>, subfield: string, value: any) => {
    setPoint((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [subfield]: value,
        },
      };
    });
  };

  // Обработчик для полей верхнего уровня (например, longitude, latitude)
  const handleSimpleChange = (field: keyof Omit<Point, 'names' | 'descriptions'>, value: any) => {
    setPoint((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // Обработчик для обновления первого элемента массива photos
  const handlePhotoChange = (index: number, value: string) => {
    setPoint((prev) => {
      if (!prev) return prev;

      const updatedPhotos = [...prev.photos];
      updatedPhotos[index] = value;

      return { ...prev, photos: updatedPhotos };
    });
  };


  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await getPoint(pointId);
        setPoint(response);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoint();
  }, [pointId]);

  return (
    <Grid container spacing={3} sx={{ padding: 5 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">Редактирование точки</Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Название (RU)"
          variant="outlined"
          fullWidth
          value={point?.names?.ru || ''}
          onChange={(e) => handleNestedChange('names', 'ru', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (EN)"
          variant="outlined"
          fullWidth
          value={point?.names?.en || ''}
          onChange={(e) => handleNestedChange('names', 'en', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Название (ZH)"
          variant="outlined"
          fullWidth
          value={point?.names?.zh || ''}
          onChange={(e) => handleNestedChange('names', 'zh', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      
      <Grid item container spacing={2} xs={12}>
        <Grid item xs={4}>
          <TextField
            label="Описание (RU)"
            variant="outlined"
            fullWidth
            multiline
            value={point?.descriptions?.ru || ''}
            onChange={(e) => handleNestedChange('descriptions', 'ru', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Описание (EN)"
            variant="outlined"
            fullWidth
            multiline
            value={point?.descriptions?.en || ''}
            onChange={(e) => handleNestedChange('descriptions', 'en', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Описание (ZH)"
            variant="outlined"
            fullWidth
            multiline
            value={point?.descriptions?.zh || ''}
            onChange={(e) => handleNestedChange('descriptions', 'zh', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Долгота"
          variant="outlined"
          fullWidth
          value={point?.longitude || ''}
          onChange={(e) => handleSimpleChange('longitude', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Широта"
          variant="outlined"
          fullWidth
          value={point?.latitude || ''}
          onChange={(e) => handleSimpleChange('latitude', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Тип"
          select
          variant="outlined"
          fullWidth
          value={point?.type_id ?? ''}
          onChange={(e) => handleChange('type_id', Number(e.target.value))}
          InputLabelProps={{ shrink: true }}
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
          value={point?.status_id ?? ''}
          onChange={(e) => handleSimpleChange('status_id', Number(e.target.value))}
          InputLabelProps={{ shrink: true }}
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
          value={point?.web || ''}
          onChange={(e) => handleSimpleChange('web', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Фото URL"
          variant="outlined"
          fullWidth
          value={point?.photos?.[0] || ''}
          onChange={(e) => handlePhotoChange(0, e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        {/* <img src={point?.photos?.[0] || ''}
          width={250}
          height={200}
        /> */}
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
        {error && <Typography color="error">{error}</Typography>}
      </Grid>
    </Grid>
  );
};

export default EditPoint;