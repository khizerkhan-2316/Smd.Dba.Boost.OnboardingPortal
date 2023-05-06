import { FC } from 'react';
import {
  Modal,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';

import { ModalProps } from '../../types/componentProps';

const CustomModal: FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  showCancelButton = true,
  onCancel,
  open,
}) => {
  const handleClose = () => {
    if (onCancel) onCancel();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Card
        sx={{
          width: '25%',
          height: '35%',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <CardHeader
            title={title}
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              backgroundColor: '#E1EEFA',
            }}
          />
          <CardContent>
            <Typography variant="body1">{message}</Typography>
          </CardContent>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '8px',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <Button variant="contained" onClick={onConfirm}>
              Okay
            </Button>
            {showCancelButton && (
              <Button style={{ marginLeft: '10px' }} onClick={handleClose}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default CustomModal;
