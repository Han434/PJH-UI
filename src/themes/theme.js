// theme.js
import { createTheme } from '@mui/material/styles';

const borderRadiusDefault = 4; // MUI default borderRadius in px

const breakpoints = {
  xs: 27.75 * 16, // rem to px
  sm: 37.5 * 16,
  md: 56.25 * 16,
  lg: 75 * 16,
  xl: 96 * 16,
};

// Dark mode colors
const darkColors = {
  primaryMain: '#1e1e1e',
  textMain: '#000000',
  textSecondary: '#ffffff',
  secondaryMain: '#2d2d2d',
  primaryContrast: '#fdfdfd',
  dividerMain: 'rgba(255, 255, 255, 0.1)',
  secondaryContrast: '#fdfdfd',
  backgroundJelly: 'rgba(253, 253, 253, 0.6)', // 60% opacity
};

// Light mode colors
const lightColors = {
  primaryMain: '#fdfdfd',
  textMain: '#1e1e1e',
  textSecondary: '#2d2d2d',
  secondaryMain: '#e0e0e0',
  primaryContrast: '#1e1e1e',
  dividerMain: 'rgba(45, 45, 45, 0.1)',
  secondaryContrast: '#2d2d2d',
  backgroundJelly: 'rgba(30, 30, 30, 0.6)', // 60% opacity
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkColors.primaryMain,
      contrastText: darkColors.primaryContrast,
    },
    secondary: {
      main: darkColors.secondaryMain,
      contrastText: darkColors.secondaryContrast,
    },
    text: {
      primary: darkColors.textSecondary,
      secondary: darkColors.textMain,
    },
    divider: darkColors.dividerMain,
    background: {
      default: darkColors.secondaryMain,
      paper: darkColors.primaryMain,
      jelly: darkColors.backgroundJelly,
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&.Mui-focused': {
            color: '#90caf9',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&.Mui-focused': {
            color: '#90caf9',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90caf9',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90caf9',
            borderWidth: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: darkColors.primaryContrast,
          color: darkColors.primaryMain,
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightColors.primaryMain,
      contrastText: lightColors.primaryContrast,
    },
    secondary: {
      main: lightColors.secondaryMain,
      contrastText: lightColors.secondaryContrast,
    },
    text: {
      primary: lightColors.textMain,
      secondary: lightColors.textSecondary,
    },
    divider: lightColors.dividerMain,
    background: {
      default: lightColors.secondaryMain,
      paper: lightColors.primaryMain,
      jelly: lightColors.backgroundJelly,
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#333333',
          '&.Mui-focused': {
            color: '#1976d2',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#333333',
          '&.Mui-focused': {
            color: '#1976d2',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
            borderWidth: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: lightColors.primaryMain,
          color: lightColors.primaryContrast,
          '&:hover': {
            backgroundColor: '#cccccc',
          },
        },
      },
    },
  },
  typography: { 
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});