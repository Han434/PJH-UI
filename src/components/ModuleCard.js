// ModuleCard.jsx
import React from 'react';
import { Stack, Typography, useTheme, Paper } from '@mui/material';

export default function ModuleCard({ icon, label }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: theme.palette.primary.main,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        height: '100%',
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
        '&:active': {
          bgcolor: theme.palette.action.selected,
        },
      }}
    >
      <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
        {icon}
        <Typography variant="body1" align="center">
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}