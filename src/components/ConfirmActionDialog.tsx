import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  useTheme,
} from '@mui/material';

interface ConfirmActionDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: (confirmed: boolean) => void;
  onConfirm: () => Promise<void>;
}

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  open,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onClose,
  onConfirm,
}) => {
  const theme = useTheme(); // Accessing the theme

  const handleConfirm = async () => {
    await onConfirm();
    onClose(true);
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: theme.spacing(2) }}>
        <Button
          onClick={handleCancel}
          color="primary"
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;