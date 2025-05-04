// lightTheme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#FFFFFF",
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#000000",
            secondary: "#B0B0B0",
        },
        error: {
            main: "#d32f2f",
        },
        warning: {
            main: "#ffa000",
        },
        info: {
            main: "#1976d2",
        },
        success: {
            main: "#388e3c",
        },
        divider: "rgba(0, 0, 0, 0.12)",
        action: {
            active: "#000000",
            hover: "rgba(0, 0, 0, 0.04)",
            selected: "rgba(0, 0, 0, 0.08)",
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    shape: {
        borderRadius: 4,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    spacing: 8,
});
