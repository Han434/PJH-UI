import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/User/userSlice';
import { RootState, AppDispatch } from '../../store';
import ListPageLayout from '../../layouts/ListPageLayout';
import CreateUserDialog from './CreateUserDialog';
import useToggle from '../../hooks/useToggle';
import { User } from '../../types';

const HEADERS = ['Name', 'Username', 'Status', 'Business'];

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);

  const {
    value: isDialogOpen,
    setOn: openDialog,
    setOff: closeDialog,
  } = useToggle();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const tableData = useMemo(
    () =>
      users.map((user: User) => ({
        ...user,
        id: user._id, // For consistent row keying
      })),
    [users]
  );

  const getRowId = (user: User) => user._id;

  const getCellValue = (user: User, header: string): React.ReactNode => {
    const keyMap: Record<string, keyof User> = {
      Name: 'name',
      Username: 'userName',
      Status: 'status',
      Business: 'businessID',
    };
    const key = keyMap[header];
    return user[key];
  };

  return (
    <ListPageLayout<User>
      title="User"
      feature='user'
      headers={HEADERS}
      rows={tableData}
      loading={loading}
      error={error}
      emptyMessage="No users found."
      onCreateClick={openDialog}
      createDialog={<CreateUserDialog open={isDialogOpen} onClose={closeDialog} />}
      getRowId={getRowId}
      getCellValue={getCellValue}
    />
  );
};

export default UserList;