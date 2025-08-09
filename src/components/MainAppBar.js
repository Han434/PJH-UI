// MainAppBar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeToggle } from '../themes/ThemeContext'; // adjust path if needed
import { useTheme } from '@mui/material/styles';

export default function MainAppBar() {
  const { mode, toggleTheme } = useThemeToggle();
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: theme.spacing(1), py: theme.spacing(2) }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          H.O.M.E
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
          {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}