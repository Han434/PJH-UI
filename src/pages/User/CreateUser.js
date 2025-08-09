import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomForm from '../../components/CustomForm';
import { createUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();  // <-- Define navigate here

  const fields = [
    { name: 'username', label: 'User Name', required: true, type: 'text' },
    { name: 'password', label: 'Password', required: true, type: 'text' }
  ];

  const handleCreateClick = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setOpen(true);
  };

  const handleSuccess = (data) => {
    let userId = data.user._id;
    if (userId) {
      console.log("User ID:", userId);
      navigate(`/users/${userId}`);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleCreateClick}
      >
        Add
      </Button>

      <CustomForm
        open={open}
        handleClose={() => setOpen(false)}
        mode={editData ? 'edit' : 'create'}
        title={editData ? 'Edit User' : 'Create User'}
        initialData={editData}
        fields={fields}
        onSubmitAction={editData ? updateUser : createUser}
        onSuccess={editData ? null : handleSuccess}
      />
    </>
  );
};

export default CreateUser;