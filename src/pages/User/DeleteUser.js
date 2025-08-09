import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ConfirmDialog from '../../components/CustomConfirmationModel';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from '../../features/user/userSlice';

const DeleteUser = ({ id }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigate hook

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await dispatch(deleteUser(id)).unwrap(); // Wait for deletion to complete
      navigate('/users'); // Navigate after success
    } catch (error) {
      console.error('Delete failed:', error); // Optional error handling
    } finally {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="primary.contractText" startIcon={<DeleteIcon />} variant="text" onClick={handleDeleteClick}>
        Delete
      </Button>

      <ConfirmDialog
        open={open}
        title="Delete User"
        message="This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default DeleteUser;