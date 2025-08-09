import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CustomTable from '../../components/CustomTable';
import { fetchUsers } from '../../features/user/userSlice';
import SecondaryAppBar from '../../components/SecondaryAppBar';
import CreateUser from './CreateUser';

const columns = [
  { field: 'username', headerName: 'User Name', width: 'auto' },
];

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme(); // ✅ Access theme

  const { items: users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRowClick = (user) => {
    navigate(`/users/${user._id}`);
  };

  return (
    <Box>
      <SecondaryAppBar />
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      >
        {/* Sticky Header Row */}
        <Stack
          bgcolor={theme.palette.background.default}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar + 1,
            py: theme.spacing(1),
            px: theme.spacing(1),
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CreateUser />
        </Stack>

        <Box>
          {status === 'loading' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: theme.spacing(2) }}>
              <CircularProgress />
            </Box>
          )}

          {status === 'failed' && (
            <Alert severity="error">{error}</Alert>
          )}

          {status === 'succeeded' && users.length === 0 && (
            <Typography variant="body1">No users found.</Typography>
          )}

          {status === 'succeeded' && users.length > 0 && (
            <CustomTable
              columns={columns}
              data={users}
              onRowClick={handleRowClick}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;