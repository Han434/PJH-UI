// src/pages/UserDetail.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import CustomMenu from '../../components/CustomMenu';
import { fetchUserById } from '../../features/user/userSlice';
import SecondaryAppBar from '../../components/SecondaryAppBar';
import DeleteUser from './DeleteUser';

const UserDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedUser: user, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  return (
    <Box>
      <SecondaryAppBar />
      <Box>
        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {status === 'failed' && (
          <Alert severity="error">{error}</Alert>
        )}

        {status === 'succeeded' && user && (
          <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ px:2, py:1, borderBottom: 1, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="h6">{user.username}</Typography>
              <CustomMenu>
                <DeleteUser id={user._id} />
              </CustomMenu>
            </Stack>
            <Stack sx={{ p: 2 }} spacing={2}>
              <Typography variant="body1">
                Password: {user.password}
              </Typography>
            </Stack>
          </Box>
        )}

        {status === 'succeeded' && !user && (
          <Typography>No user found with ID: {id}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserDetail;