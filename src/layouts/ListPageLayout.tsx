import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BaseTable from '../components/BaseTable'; // Adjust path if needed

interface BaseListPageProps<T> {
  title: string;
  feature: string;
  headers: string[];
  rows: T[];
  onCreateClick?: () => void;
  createDialog?: React.ReactNode;
  disableCreateButton?: boolean;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  sx?: object;
  getRowId: (row: T) => string;
  getCellValue: (row: T, header: string) => React.ReactNode;
}

const ListPageLayout = <T,>({
  title,
  feature,
  headers,
  rows,
  onCreateClick,
  createDialog,
  disableCreateButton = false,
  loading = false,
  error = null,
  emptyMessage = 'No data available.',
  sx = {},
  getRowId,
  getCellValue,
}: BaseListPageProps<T>) => {
  const theme = useTheme();

  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" py={theme.spacing(5)}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography
          color="error"
          variant="h6"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: theme.spacing(5) }}
        >
          {error}
        </Typography>
      );
    }

    if (rows.length === 0) {
      return (
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: theme.spacing(5),
            color: theme.palette.text.secondary,
          }}
        >
          {emptyMessage}
        </Typography>
      );
    }

    return <BaseTable headers={headers} feature={feature} rows={rows} getRowId={getRowId} getCellValue={getCellValue} />;
  }, [loading, error, rows, headers, emptyMessage, theme, getRowId, getCellValue]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        ...sx,
      }}
    >
      <Box
        px={theme.spacing(3)}
        py={theme.spacing(1)}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">{title}</Typography>
        {!disableCreateButton && onCreateClick && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={onCreateClick}
            disableElevation
          >
            Add
          </Button>
        )}
      </Box>

      <Box>{renderContent}</Box>
      {createDialog}
    </Box>
  );
};

export default ListPageLayout;