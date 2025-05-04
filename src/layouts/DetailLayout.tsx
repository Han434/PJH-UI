import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  Menu,
  Button,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DetailLayoutProps {
  title: string;
  status: string;
  statusActionLabel: string;
  onBack: () => void;
  onStatusClick: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  menuOpen: boolean;
  menuAnchorEl: null | HTMLElement;
  children: React.ReactNode;
  menuItems: React.ReactNode;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  status,
  statusActionLabel,
  onBack,
  onStatusClick,
  onMenuOpen,
  onMenuClose,
  menuOpen,
  menuAnchorEl,
  children,
  menuItems,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        overflowY: 'auto',
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Sticky Header */}
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: theme.spacing(3),
          py: theme.spacing(1),
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Left Side: Back + Title + Status */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={onBack} aria-label="Go back">
              <ArrowBackIcon />
            </IconButton>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5">{title}</Typography>
            </Stack>
          </Stack>

          {/* Right Side: Actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={onMenuOpen}
              aria-label="Open menu"
              aria-controls="detail-menu"
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="detail-menu"
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={onMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {menuItems}
            </Menu>
          </Stack>
        </Stack>
      </Box>

      {/* Content */}
      <Box px={theme.spacing(3)} py={theme.spacing(2)}>
        <Stack spacing={3}>{children}</Stack>
      </Box>
    </Box>
  );
};

export default DetailLayout;