// SecondaryAppBar.jsx
import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { MoreHoriz, LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useThemeToggle } from '../themes/ThemeContext'; // adjust the path if needed

export default function SecondaryAppBar() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <Toolbar sx={{ px: theme.spacing(1), py: theme.spacing(1) }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          User
        </Typography>
        <IconButton
          onClick={toggleTheme}
          aria-label="toggle theme"
          sx={{ color: theme.palette.text.primary }}
        >
          {mode === 'dark' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}