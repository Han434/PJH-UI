import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Skeleton,
  Stack,
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  fetchUsers,
  fetchUserById,
  deleteUser,
} from '../../store/User/userSlice';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './EditUserDialog';
import ConfirmActionDialog from '../../components/ConfirmActionDialog';
import DetailLayout from '../../layouts/DetailLayout';
import ListInDetail from '../../layouts/ListInDetail';
import useToggle from '../../hooks/useToggle';

interface ListItemData {
  id: string;
  name: string;
  userName: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { users, selectedUser } = useSelector((state: RootState) => state.user);
  const [refetch, setRefetch] = useState(false);

  const tableData: ListItemData[] = users.map((user) => ({
    id: user._id,
    name: user.name,
    userName: user.userName,
  }));

  const editDialog = useToggle();
  const deleteDialog = useToggle();
  const statusDialog = useToggle();
  const createDialog = useToggle(); // ✅ Create dialog toggle

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const handleSave = () => setRefetch((prev) => !prev);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, refetch]);

  const handleBack = () => navigate('/user');
  const handleEditClick = () => editDialog.setOn();
  const handleDeleteClick = () => deleteDialog.setOn();
  const handleStatusClick = () => statusDialog.setOn();

  const confirmDelete = async () => {
    try {
      if (id) {
        await dispatch(deleteUser(id));
        navigate('/user', { state: { successMessage: 'User deleted successfully!' } });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const menuItems = (
    <>
      <MenuItem onClick={handleEditClick}>
        <EditOutlinedIcon sx={{ mr: 2 }} /> Edit
      </MenuItem>
      <MenuItem onClick={handleDeleteClick}>
        <DeleteOutlineOutlinedIcon sx={{ mr: 2 }} /> Delete
      </MenuItem>
    </>
  );

  return (
    <Stack direction="row">
      {/* Sidebar List */}
      <ListInDetail
        title="Users"
        items={tableData}
        activeId={id}
        onItemClick={(userId) => navigate(`/user/${userId}`)}
        onCreateClick={createDialog.setOn}
        renderItemContent={(user, isActive) => (
          <Stack>
            <Typography
              color='text.primary'
              variant="body1"
            >
              {user.name}
            </Typography>
            <Typography
              color='text.secondary'
              variant="body2"
            >
              {user.userName}
            </Typography>
          </Stack>
        )}
      />

      {/* Detail View */}
      <DetailLayout
        title={selectedUser?.name || 'Loading...'}
        status={selectedUser?.status || 'inactive'}
        statusActionLabel={selectedUser?.status === 'active' ? 'Deactivate' : 'Activate'}
        onBack={handleBack}
        onStatusClick={handleStatusClick}
        onMenuOpen={(e) => setMenuAnchorEl(e.currentTarget)}
        menuAnchorEl={menuAnchorEl}
        menuOpen={Boolean(menuAnchorEl)}
        onMenuClose={() => setMenuAnchorEl(null)}
        menuItems={menuItems}
      >
        {selectedUser ? (
          <>
            <Box mb={2}>
              <Typography variant="body2">Username</Typography>
              <Typography variant="body1">{selectedUser.userName}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2">Password</Typography>
              <Typography variant="body1">••••••••</Typography>
            </Box>
          </>
        ) : (
          <Skeleton variant="text" width="80%" />
        )}

        {/* Edit Dialog */}
        {selectedUser && (
          <EditUserDialog
            open={editDialog.value}
            onClose={() => {
              editDialog.setOff();
              handleSave();
            }}
            user={selectedUser}
          />
        )}

        {/* Delete Dialog */}
        <ConfirmActionDialog
          open={deleteDialog.value}
          onClose={deleteDialog.setOff}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          description={`Are you sure you want to delete ${selectedUser?.name || 'this user'}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />

        {/* Create Dialog */}
        {createDialog.value && (
          <CreateUserDialog
            open={createDialog.value}
            onClose={() => {
              createDialog.setOff();
              handleSave();
            }}
          />
        )}
      </DetailLayout>
    </Stack>
  );
};

export default UserDetail;