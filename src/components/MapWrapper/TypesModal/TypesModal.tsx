import { useState, useEffect } from 'react';
import { Modal, Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getTypeLabel } from 'utils';
import { Theme } from '@mui/material/styles'; 

type TypesModalProps = {
  open: boolean;
  onClose: () => void;
};

const TypesModal = ({ open, onClose }: TypesModalProps) => {
  const { t } = useTranslation();
  const typeIds = Array.from({ length: 21 }, (_, index) => index + 2);

  const [selectedTypes, setSelectedTypes] = useState<number[]>(() => {
    const storedTypes = localStorage.getItem('selectedTypeIds');
    return storedTypes ? JSON.parse(storedTypes) : typeIds;
  });

  useEffect(() => {
    localStorage.setItem('selectedTypeIds', JSON.stringify(selectedTypes));
  }, [selectedTypes]);

  const handleCheckboxChange = (typeId: number) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(typeId)
        ? prevSelected.filter((id) => id !== typeId)
        : [...prevSelected, typeId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedTypes.length === typeIds.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(typeIds);
    }
  };

  return (
    <Modal
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          padding: 3,
          borderRadius: 2,
          maxWidth: 400,
          margin: 'auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Typography variant="h5" component="h2">
          {t('site settings')}
        </Typography>
        <Box
          sx={{
            maxHeight: '75vh',
            overflowY: 'scroll',
            mt: 1,
            pr: 1,
            pl: 1.5,
            pb: 2
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTypes.length === typeIds.length}
                  onChange={handleSelectAllChange}
                />
              }
              label={t('select all')}
            />
            {typeIds.map((typeId) => (
              <FormControlLabel
                key={typeId}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(typeId)}
                    onChange={() => handleCheckboxChange(typeId)}
                  />
                }
                label={getTypeLabel(typeId)}
              />
            ))}
          </FormGroup>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 65,
            background: (theme: Theme) => 
              `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`,
            pointerEvents: 'none',
          }}
        />
      </Box>
    </Modal>
  );
};

export default TypesModal;