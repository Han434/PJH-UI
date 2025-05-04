import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  Skeleton,
  Stack,
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  fetchLocations,
  fetchLocationById,
  deleteLocation,
} from '../../store/Location/locationSlice';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import CreateLocationDialog from './CreateLocationDialog';
import EditLocationDialog from './EditLocationDialog';
import ConfirmActionDialog from '../../components/ConfirmActionDialog';
import DetailLayout from '../../layouts/DetailLayout';
import ListInDetail from '../../layouts/ListInDetail';
import useToggle from '../../hooks/useToggle';

interface ListItemData {
  id: string;
  locationName: string;
  manager: string;
}

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { locations, selectedLocation } = useSelector((state: RootState) => state.location);
  const [refetch, setRefetch] = useState(false);

  const tableData: ListItemData[] = locations.map((location) => ({
    id: location._id,
    locationName: location.locationName,
    manager: location.user
  }));

  const editDialog = useToggle();
  const deleteDialog = useToggle(); // ✅ delete toggle added
  const statusDialog = useToggle();
  const createDialog = useToggle();

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(!!location.state?.successMessage);
  const [snackbarMessage, setSnackbarMessage] = useState(location.state?.successMessage || '');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = () => setRefetch((prev) => !prev);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
    }
  }, [dispatch, id, refetch]);

  useEffect(() => {
    if (snackbarOpen) {
      const timeout = setTimeout(() => setSnackbarOpen(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [snackbarOpen]);

  const handleBack = () => navigate('/location');
  const handleEditClick = () => editDialog.setOn();
  const handleDeleteClick = () => deleteDialog.setOn();
  const handleStatusClick = () => statusDialog.setOn();
  const handleCreateClick = () => createDialog.setOn();

  const confirmDelete = async () => {
    try {
      if (id) {
        await dispatch(deleteLocation(id));
        navigate('/location', { state: { successMessage: 'Location deleted successfully!' } });
      }
    } catch (error) {
      console.error('Failed to delete location:', error);
      setErrorMessage('Failed to delete location. Please try again.');
      setErrorSnackbarOpen(true);
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
        title="Location"
        items={tableData}
        activeId={id}
        onItemClick={(locationId) => navigate(`/location/${locationId}`)}
        onCreateClick={handleCreateClick}
        renderItemContent={(location, isActive) => (
          <Stack>
            <Typography color='text.primary' variant="body1">
              {location.locationName}
            </Typography>
            <Typography color='text.secondary' variant="body2">
              {location.manager}
            </Typography>
          </Stack>
        )}
      />

      {/* Detail View */}
      <DetailLayout
        title={selectedLocation?.locationName || 'Loading...'}
        status=""
        statusActionLabel=""
        onBack={handleBack}
        onStatusClick={handleStatusClick}
        onMenuOpen={(e) => setMenuAnchorEl(e.currentTarget)}
        menuAnchorEl={menuAnchorEl}
        menuOpen={Boolean(menuAnchorEl)}
        onMenuClose={() => setMenuAnchorEl(null)}
        menuItems={menuItems}
      >
        {selectedLocation ? (
          <>
            <Box mb={2}>
              <Typography variant="body2">Business</Typography>
              <Typography variant="body1">{selectedLocation.business}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2">Manager</Typography>
              <Typography variant="body1">{selectedLocation.user}</Typography>
            </Box>
          </>
        ) : (
          <Skeleton variant="text" width="80%" />
        )}

        {/* Edit Dialog */}
        {selectedLocation && (
          <EditLocationDialog
            open={editDialog.value}
            onClose={() => {
              editDialog.setOff();
              handleSave();
            }}
            location={selectedLocation}
          />
        )}

        {/* ✅ Delete Confirmation Dialog */}
        <ConfirmActionDialog
          open={deleteDialog.value}
          onClose={deleteDialog.setOff}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          description={`Are you sure you want to delete ${selectedLocation?.locationName || 'this location'}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />

        {/* ✅ Snackbar Alerts */}
        <Snackbar open={snackbarOpen} autoHideDuration={3000}>
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={errorSnackbarOpen} autoHideDuration={3000}>
          <Alert severity="error" onClose={() => setErrorSnackbarOpen(false)}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </DetailLayout>
    </Stack>
  );
};

export default LocationDetail;