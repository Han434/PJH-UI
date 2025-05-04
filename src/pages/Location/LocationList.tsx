import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../store/Location/locationSlice';
import { RootState, AppDispatch } from '../../store';
import ListPageLayout from '../../layouts/ListPageLayout';
import CreateLocationDialog from './CreateLocationDialog';
import useToggle from '../../hooks/useToggle';
import { Location } from '../../types';

const HEADERS = ['Location Name', 'Business', 'User'];

const LocationList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { locations, loading, error } = useSelector(
    (state: RootState) => state.location
  );

  const {
    value: isDialogOpen,
    setOn: openDialog,
    setOff: closeDialog,
  } = useToggle();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const tableData = useMemo(
    () =>
      locations.map((location: Location) => ({
        ...location,
        id: location._id,
      })),
    [locations]
  );

  const getRowId = (location: Location) => location._id;

  const getCellValue = (location: Location, header: string): React.ReactNode => {
    const keyMap: Record<string, keyof Location> = {
      'Location Name': 'locationName',
      Business: 'business',
      User: 'user'
    };
    const key = keyMap[header];

    return location[key];
  };

  return (
    <ListPageLayout<Location>
      title="Location"
      feature='location'
      headers={HEADERS}
      rows={tableData}
      loading={loading}
      error={error}
      emptyMessage="No locations found."
      onCreateClick={openDialog}
      createDialog={<CreateLocationDialog open={isDialogOpen} onClose={closeDialog} />}
      getRowId={getRowId}
      getCellValue={getCellValue}   />
  );
};

export default LocationList;