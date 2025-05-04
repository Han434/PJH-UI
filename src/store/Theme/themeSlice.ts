import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial theme state
type ThemeState = {
    isDarkMode: boolean;
};

// Check localStorage for saved theme preference, default to 'light' if not found
const initialState: ThemeState = {
    isDarkMode: localStorage.getItem("theme") === "dark", // Read from localStorage
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            // Save the current theme to localStorage
            localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
