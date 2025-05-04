// darkTheme.ts
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#222222",
        },
        background: {
            default: "#222222",
            paper: "#000000",
        },
        text: {
            primary: "#FFFFFF",
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
        divider: "rgba(255, 255, 255, 0.12)",
        action: {
            active: "#FFFFFF",
            hover: "rgba(255, 255, 255, 0.08)",
            selected: "rgba(255, 255, 255, 0.16)",
            disabled: "rgba(255, 255, 255, 0.3)",
            disabledBackground: "rgba(255, 255, 255, 0.12)",
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
