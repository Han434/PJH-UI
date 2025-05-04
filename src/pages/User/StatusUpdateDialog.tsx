import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface StatusUpdateDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void; // The onClose function will receive a confirmation (true or false)
  currentStatus: string;
}

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({ open, onClose, currentStatus }) => {

  const handleConfirm = () => {
    onClose(true); // Confirm status change to inactive
  };

  const handleCancel = () => {
    onClose(false); // Cancel status change
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirm Status Change</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to change the status of this user to "Inactive"? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">Cancel</Button>
        <Button onClick={handleConfirm} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateDialog;