import { Modal, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getTypeLabel } from 'utils';

type TypesModalProps = {
  open: boolean;
  onClose: () => void;
};

const TypesModal = ({ open, onClose }: TypesModalProps) => {
  const { t } = useTranslation();

  const typeIds = Array.from({ length: 21 }, (_, index) => index + 2);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        className="settings-modal"
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          padding: 2,
          borderRadius: 2,
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        <h2>{t("site settings")}</h2>
        <Box className="fields-container">
          <FormGroup>
            {typeIds.map((typeId) => (
              <FormControlLabel
                key={typeId}
                control={<Checkbox />}
                label={getTypeLabel(typeId)}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Modal>
  );
};

export default TypesModal;
